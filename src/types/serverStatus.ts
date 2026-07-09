export type ServerAvailability = "online" | "offline" | "configuring";

export type PublicServerStatus = {
  status: ServerAvailability;
  online: boolean;
  stale: boolean;
  serverName: string;
  description: string | null;
  version: string | null;
  currentPlayers: number | null;
  maxPlayers: number | null;
  serverFps: number | null;
  uptimeSeconds: number | null;
  worldDay: number | null;
  baseCampCount: number | null;
  updatedAt: string | null;
};

export type ServerStatusUpdate = {
  online: boolean;
  serverName?: string;
  description?: string;
  version?: string;
  currentPlayers?: number;
  maxPlayers?: number;
  serverFps?: number;
  uptimeSeconds?: number;
  worldDay?: number;
  baseCampCount?: number;
};
