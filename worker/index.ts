/// <reference types="@cloudflare/workers-types" />

import { connect } from "cloudflare:sockets";
import type { PublicServerStatus, ServerStatusUpdate } from "../src/types/serverStatus";

interface WorkerEnv {
  ASSETS: Fetcher;
  SERVER_STATUS: KVNamespace;
  STATUS_UPDATE_TOKEN: string;
  PALWORLD_RCON_HOST?: string;
  PALWORLD_RCON_PORT?: string;
  PALWORLD_RCON_PASSWORD?: string;
  PALWORLD_MAX_PLAYERS?: string;
}

type StoredServerStatus = Omit<PublicServerStatus, "stale">;
type RconPacket = {
  id: number;
  type: number;
  body: string;
};

const STATUS_KEY = "palworld:server-status";
const STALE_AFTER_MS = 2 * 60 * 1000;
const MAX_BODY_BYTES = 8 * 1024;
const DEFAULT_RCON_HOST = "174.138.184.118";
const DEFAULT_RCON_PORT = 27050;
const DEFAULT_MAX_PLAYERS = 24;
const RCON_PACKET_AUTH = 3;
const RCON_PACKET_AUTH_RESPONSE = 2;
const RCON_PACKET_COMMAND = 2;
const RCON_MAX_PACKET_BYTES = 64 * 1024;
const rconEncoder = new TextEncoder();
const rconDecoder = new TextDecoder();

const emptyStatus: PublicServerStatus = {
  status: "configuring",
  online: false,
  stale: false,
  serverName: "Gaming P&E Pal",
  description: null,
  version: null,
  currentPlayers: null,
  maxPlayers: null,
  serverFps: null,
  uptimeSeconds: null,
  worldDay: null,
  baseCampCount: null,
  updatedAt: null
};

function jsonResponse(body: unknown, status = 200, cacheControl = "no-store") {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": cacheControl,
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim().replace(/\s+/g, " ");
  return cleaned ? cleaned.slice(0, maxLength) : undefined;
}

function cleanNumber(
  value: unknown,
  minimum: number,
  maximum: number,
  integer = true
): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  const bounded = Math.min(maximum, Math.max(minimum, value));
  return integer ? Math.round(bounded) : Math.round(bounded * 10) / 10;
}

function parsePositiveInteger(value: string | undefined, fallback: number, maximum = 100_000) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > maximum) return fallback;
  return parsed;
}

function sanitizeUpdate(value: unknown): ServerStatusUpdate | null {
  if (!isRecord(value) || typeof value.online !== "boolean") return null;

  return {
    online: value.online,
    serverName: cleanString(value.serverName, 100),
    description: cleanString(value.description, 300),
    version: cleanString(value.version, 50),
    currentPlayers: cleanNumber(value.currentPlayers, 0, 1000),
    maxPlayers: cleanNumber(value.maxPlayers, 1, 1000),
    serverFps: cleanNumber(value.serverFps, 0, 1000, false),
    uptimeSeconds: cleanNumber(value.uptimeSeconds, 0, 315_360_000),
    worldDay: cleanNumber(value.worldDay, 0, 10_000_000),
    baseCampCount: cleanNumber(value.baseCampCount, 0, 100_000)
  };
}

async function timingSafeMatch(left: string, right: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right))
  ]);
  const leftBytes = new Uint8Array(leftHash);
  const rightBytes = new Uint8Array(rightHash);
  let mismatch = 0;

  for (let index = 0; index < leftBytes.length; index += 1) {
    mismatch |= leftBytes[index] ^ rightBytes[index];
  }

  return mismatch === 0;
}

async function isAuthorized(request: Request, env: WorkerEnv) {
  const authorization = request.headers.get("Authorization") ?? "";
  const prefix = "Bearer ";
  const suppliedToken = authorization.startsWith(prefix) ? authorization.slice(prefix.length) : "";

  if (!suppliedToken || !env.STATUS_UPDATE_TOKEN) return false;
  return timingSafeMatch(suppliedToken, env.STATUS_UPDATE_TOKEN);
}

function concatBytes(left: Uint8Array, right: Uint8Array) {
  const combined = new Uint8Array(left.length + right.length);
  combined.set(left);
  combined.set(right, left.length);
  return combined;
}

function createRconPacket(id: number, type: number, body: string) {
  const encodedBody = rconEncoder.encode(body);
  const packetLength = 4 + 4 + encodedBody.length + 2;
  const bytes = new Uint8Array(4 + packetLength);
  const view = new DataView(bytes.buffer);

  view.setInt32(0, packetLength, true);
  view.setInt32(4, id, true);
  view.setInt32(8, type, true);
  bytes.set(encodedBody, 12);

  return bytes;
}

function decodeRconBody(payload: Uint8Array) {
  let end = payload.length;
  while (end > 8 && payload[end - 1] === 0) {
    end -= 1;
  }

  return rconDecoder.decode(payload.slice(8, end)).trim();
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<null>((resolve) => {
    timeoutId = setTimeout(() => resolve(null), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
}

class RconSession {
  private receiveBuffer = new Uint8Array(0);
  private nextRequestId = 10;
  private readonly reader: ReadableStreamDefaultReader<Uint8Array>;
  private readonly writer: WritableStreamDefaultWriter<Uint8Array>;

  private constructor(private readonly socket: Socket) {
    this.reader = socket.readable.getReader() as ReadableStreamDefaultReader<Uint8Array>;
    this.writer = socket.writable.getWriter() as WritableStreamDefaultWriter<Uint8Array>;
  }

  static async open(hostname: string, port: number, password: string) {
    const socket = connect({ hostname, port }, { allowHalfOpen: false });
    const opened = await withTimeout(socket.opened, 5_000);
    if (!opened) throw new Error("Connexion RCON expiree.");
    const session = new RconSession(socket);
    await session.authenticate(password);
    return session;
  }

  async close() {
    await this.writer.close();
    await this.socket.close();
  }

  async authenticate(password: string) {
    const authId = 1;
    await this.writePacket(authId, RCON_PACKET_AUTH, password);

    for (let attempt = 0; attempt < 4; attempt += 1) {
      const packet = await this.readPacket(3_000);
      if (!packet) break;

      if (packet.type === RCON_PACKET_AUTH_RESPONSE) {
        if (packet.id === -1) throw new Error("Authentification RCON refusee.");
        return;
      }
    }

    throw new Error("Aucune confirmation RCON recue.");
  }

  async command(command: string) {
    const requestId = this.nextRequestId;
    this.nextRequestId += 1;

    await this.writePacket(requestId, RCON_PACKET_COMMAND, command);

    const chunks: string[] = [];
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const packet = await this.readPacket(attempt === 0 ? 3_000 : 350);
      if (!packet) break;
      if (packet.id === requestId && packet.body) chunks.push(packet.body);
    }

    return chunks.join("\n").trim();
  }

  private async writePacket(id: number, type: number, body: string) {
    await this.writer.write(createRconPacket(id, type, body));
  }

  private async readPacket(timeoutMs: number): Promise<RconPacket | null> {
    const header = await this.readBytes(4, timeoutMs);
    if (!header) return null;

    const length = new DataView(header.buffer, header.byteOffset, header.byteLength).getInt32(0, true);
    if (length < 10 || length > RCON_MAX_PACKET_BYTES) {
      throw new Error("Taille de paquet RCON invalide.");
    }

    const payload = await this.readBytes(length, timeoutMs);
    if (!payload) return null;

    const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
    return {
      id: view.getInt32(0, true),
      type: view.getInt32(4, true),
      body: decodeRconBody(payload)
    };
  }

  private async readBytes(count: number, timeoutMs: number) {
    while (this.receiveBuffer.length < count) {
      const result = await withTimeout(this.reader.read(), timeoutMs);
      if (!result || result.done) return null;
      this.receiveBuffer = concatBytes(this.receiveBuffer, result.value);
    }

    const output = this.receiveBuffer.slice(0, count);
    this.receiveBuffer = this.receiveBuffer.slice(count);
    return output;
  }
}

function parseVersionFromInfo(info: string) {
  const match = info.match(/v?\d+\.\d+\.\d+(?:\.\d+)?/i);
  return match?.[0] ?? undefined;
}

function parsePlayerCount(showPlayers: string) {
  const cleanLines = showPlayers
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (cleanLines.length === 0) return undefined;

  const playerRows = cleanLines.filter((line) => {
    const lower = line.toLowerCase();
    return (
      !lower.startsWith("name,") &&
      !lower.includes("playeruid") &&
      !lower.includes("steamid") &&
      !lower.includes("unknown command") &&
      lower !== "no players"
    );
  });

  return playerRows.length;
}

async function collectRconStatus(env: WorkerEnv): Promise<ServerStatusUpdate | null> {
  const password = env.PALWORLD_RCON_PASSWORD;
  if (!password) return null;

  const hostname = cleanString(env.PALWORLD_RCON_HOST, 253) ?? DEFAULT_RCON_HOST;
  const port = parsePositiveInteger(env.PALWORLD_RCON_PORT, DEFAULT_RCON_PORT, 65_535);
  const maxPlayers = parsePositiveInteger(env.PALWORLD_MAX_PLAYERS, DEFAULT_MAX_PLAYERS, 1000);
  let session: RconSession | null = null;

  try {
    session = await RconSession.open(hostname, port, password);
    const info = await session.command("Info");
    const showPlayers = await session.command("ShowPlayers");
    const currentPlayers = parsePlayerCount(showPlayers);

    return {
      online: true,
      serverName: emptyStatus.serverName,
      version: parseVersionFromInfo(info),
      currentPlayers,
      maxPlayers
    };
  } catch (error) {
    console.warn(JSON.stringify({
      event: "palworld_rcon_poll_failed",
      message: error instanceof Error ? error.message : "unknown_error"
    }));

    return {
      online: false,
      maxPlayers
    };
  } finally {
    if (session) {
      try {
        await session.close();
      } catch (error) {
        console.warn(JSON.stringify({
          event: "palworld_rcon_close_failed",
          message: error instanceof Error ? error.message : "unknown_error"
        }));
      }
    }
  }
}

async function readStatus(env: WorkerEnv): Promise<PublicServerStatus> {
  const stored = await env.SERVER_STATUS.get<StoredServerStatus>(STATUS_KEY, "json");
  if (!stored?.updatedAt) return emptyStatus;

  const updatedAt = Date.parse(stored.updatedAt);
  const stale = !Number.isFinite(updatedAt) || Date.now() - updatedAt > STALE_AFTER_MS;

  if (!stale) {
    return { ...stored, stale: false };
  }

  return {
    ...stored,
    status: "offline",
    online: false,
    stale: true,
    currentPlayers: 0,
    serverFps: 0,
    uptimeSeconds: 0
  };
}

async function writeServerStatus(env: WorkerEnv, update: ServerStatusUpdate) {
  const previous = await env.SERVER_STATUS.get<StoredServerStatus>(STATUS_KEY, "json");
  const record: StoredServerStatus = {
    status: update.online ? "online" : "offline",
    online: update.online,
    serverName: update.serverName ?? previous?.serverName ?? emptyStatus.serverName,
    description: update.description ?? previous?.description ?? null,
    version: update.version ?? previous?.version ?? null,
    currentPlayers: update.online ? update.currentPlayers ?? previous?.currentPlayers ?? null : 0,
    maxPlayers: update.maxPlayers ?? previous?.maxPlayers ?? null,
    serverFps: update.online ? update.serverFps ?? previous?.serverFps ?? null : 0,
    uptimeSeconds: update.online ? update.uptimeSeconds ?? previous?.uptimeSeconds ?? null : 0,
    worldDay: update.worldDay ?? previous?.worldDay ?? null,
    baseCampCount: update.baseCampCount ?? previous?.baseCampCount ?? null,
    updatedAt: new Date().toISOString()
  };

  await env.SERVER_STATUS.put(STATUS_KEY, JSON.stringify(record), {
    expirationTtl: 60 * 60 * 24 * 30
  });

  console.log(JSON.stringify({
    event: "palworld_status_updated",
    online: record.online,
    currentPlayers: record.currentPlayers,
    updatedAt: record.updatedAt
  }));

  return record;
}

async function refreshStatusFromRcon(env: WorkerEnv) {
  const update = await collectRconStatus(env);
  if (!update) return;
  await writeServerStatus(env, update);
}

async function updateStatus(request: Request, env: WorkerEnv) {
  if (!(await isAuthorized(request, env))) {
    return jsonResponse({ error: "Non autorise" }, 401);
  }

  const contentLength = Number(request.headers.get("Content-Length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: "Corps trop volumineux" }, 413);
  }

  if (!request.headers.get("Content-Type")?.toLowerCase().includes("application/json")) {
    return jsonResponse({ error: "Content-Type JSON requis" }, 415);
  }

  let rawPayload: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Corps trop volumineux" }, 413);
    }
    rawPayload = JSON.parse(body);
  } catch {
    return jsonResponse({ error: "JSON invalide" }, 400);
  }

  const update = sanitizeUpdate(rawPayload);
  if (!update) {
    return jsonResponse({ error: "Donnees invalides" }, 400);
  }

  const record = await writeServerStatus(env, update);

  return jsonResponse({ accepted: true, updatedAt: record.updatedAt }, 202);
}

async function handleApi(request: Request, env: WorkerEnv) {
  if (request.method === "GET" || request.method === "HEAD") {
    const status = await readStatus(env);
    const response = jsonResponse(status, 200, "public, max-age=10, stale-while-revalidate=20");
    return request.method === "HEAD"
      ? new Response(null, { status: response.status, headers: response.headers })
      : response;
  }

  if (request.method === "POST") {
    return updateStatus(request, env);
  }

  return jsonResponse({ error: "Methode non permise" }, 405);
}

export default {
  scheduled(_event, env, ctx): void {
    ctx.waitUntil(refreshStatusFromRcon(env));
  },

  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/server-status" || url.pathname === "/api/server-status/") {
      try {
        return await handleApi(request, env);
      } catch (error) {
        console.error("server_status_api_error", error);
        return jsonResponse({ error: "Erreur interne" }, 500);
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return jsonResponse({ error: "Route introuvable" }, 404);
    }

    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<WorkerEnv>;
