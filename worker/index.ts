/// <reference types="@cloudflare/workers-types" />

import type { PublicServerStatus, ServerStatusUpdate } from "../src/types/serverStatus";

interface WorkerEnv {
  ASSETS: Fetcher;
  SERVER_STATUS: KVNamespace;
  STATUS_UPDATE_TOKEN: string;
}

type StoredServerStatus = Omit<PublicServerStatus, "stale">;

const STATUS_KEY = "palworld:server-status";
const STALE_AFTER_MS = 2 * 60 * 1000;
const MAX_BODY_BYTES = 8 * 1024;

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
