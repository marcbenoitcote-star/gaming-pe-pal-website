"use client";

import {
  Activity,
  CalendarDays,
  Clock3,
  Copy,
  Gauge,
  RefreshCw,
  Server,
  Users,
  Wifi,
  WifiOff
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { serverConfig } from "@/data/serverConfig";
import type { PublicServerStatus } from "@/types/serverStatus";

const REFRESH_INTERVAL_MS = 30_000;

function formatDuration(totalSeconds: number | null) {
  if (totalSeconds === null) return "—";

  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);

  if (days > 0) return `${days} j ${hours} h`;
  if (hours > 0) return `${hours} h ${minutes} min`;
  return `${minutes} min`;
}

function formatNumber(value: number | null, suffix = "") {
  return value === null ? "—" : `${value.toLocaleString("fr-CA")}${suffix}`;
}

function formatLastUpdate(value: string | null) {
  if (!value) return "Aucun signal reçu";

  return new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "America/Toronto"
  }).format(new Date(value));
}

export function ServerStatusPanel() {
  const [serverStatus, setServerStatus] = useState<PublicServerStatus | null>(null);
  const [requestFailed, setRequestFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const refreshStatus = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);

    try {
      const response = await fetch("/api/server-status", {
        cache: "no-store",
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setServerStatus((await response.json()) as PublicServerStatus);
      setRequestFailed(false);
    } catch {
      setRequestFailed(true);
    } finally {
      if (manual) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void refreshStatus();
    const interval = window.setInterval(() => void refreshStatus(), REFRESH_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [refreshStatus]);

  const availability = requestFailed
    ? "error"
    : serverStatus?.status ?? "loading";

  const appearance = {
    online: {
      label: "Serveur en ligne",
      detail: "Les données sont actualisées automatiquement.",
      classes: "border-moss-400/30 bg-moss-400/10 text-moss-300",
      icon: <Wifi className="h-5 w-5" aria-hidden="true" />
    },
    offline: {
      label: "Serveur hors ligne",
      detail: serverStatus?.stale
        ? "Le serveur n'envoie plus de signal récent."
        : "Le serveur a signalé un arrêt.",
      classes: "border-red-400/30 bg-red-400/10 text-red-300",
      icon: <WifiOff className="h-5 w-5" aria-hidden="true" />
    },
    configuring: {
      label: "Connexion en préparation",
      detail: "Le panneau attend son premier signal du serveur Palworld.",
      classes: "border-amber-400/30 bg-amber-400/10 text-amber-200",
      icon: <Server className="h-5 w-5" aria-hidden="true" />
    },
    loading: {
      label: "Vérification du serveur",
      detail: "Connexion au service de statut…",
      classes: "border-reef-400/30 bg-reef-400/10 text-reef-300",
      icon: <Activity className="h-5 w-5 animate-pulse" aria-hidden="true" />
    },
    error: {
      label: "Statut indisponible",
      detail: "La vérification a échoué. Une nouvelle tentative sera faite automatiquement.",
      classes: "border-slate-400/30 bg-slate-400/10 text-slate-200",
      icon: <WifiOff className="h-5 w-5" aria-hidden="true" />
    }
  }[availability];

  const metrics = [
    {
      label: "Joueurs connectés",
      value:
        serverStatus?.currentPlayers === null || serverStatus?.currentPlayers === undefined
          ? "—"
          : `${serverStatus.currentPlayers} / ${serverStatus.maxPlayers ?? "?"}`,
      icon: <Users className="h-5 w-5" aria-hidden="true" />
    },
    {
      label: "Temps en ligne",
      value: formatDuration(serverStatus?.uptimeSeconds ?? null),
      icon: <Clock3 className="h-5 w-5" aria-hidden="true" />
    },
    {
      label: "Performance",
      value: formatNumber(serverStatus?.serverFps ?? null, " FPS"),
      icon: <Gauge className="h-5 w-5" aria-hidden="true" />
    },
    {
      label: "Jour du monde",
      value: formatNumber(serverStatus?.worldDay ?? null),
      icon: <CalendarDays className="h-5 w-5" aria-hidden="true" />
    }
  ];

  return (
    <section className="border-y border-white/10 bg-night-850 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ember-400">
              État du serveur
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              {serverStatus?.serverName ?? "Gaming P&E Pal"}
            </h2>
          </div>

          <div className="flex items-center gap-3" aria-live="polite">
            <div className={`flex min-h-12 items-center gap-3 rounded-lg border px-4 py-2 ${appearance.classes}`}>
              {appearance.icon}
              <div>
                <p className="text-sm font-bold">{appearance.label}</p>
                <p className="text-xs text-slate-300">{appearance.detail}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void refreshStatus(true)}
              disabled={refreshing}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:border-reef-400/50 hover:text-reef-300 disabled:cursor-wait disabled:opacity-60"
              title="Actualiser le statut"
              aria-label="Actualiser le statut du serveur"
            >
              <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-white/10 bg-night-800 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-slate-300">
            <Copy className="h-5 w-5 text-ember-300" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Adresse de connexion
              </p>
              <p className="mt-1 text-lg font-black text-white">{serverConfig.connectionAddress}</p>
            </div>
          </div>
          <CopyButton value={serverConfig.connectionAddress} ariaLabel="Copier l'adresse du serveur" />
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-lg border border-white/10 bg-night-800 p-4">
              <div className="flex items-center gap-3 text-slate-400">
                {metric.icon}
                <p className="text-sm font-medium">{metric.label}</p>
              </div>
              <p className="mt-3 text-2xl font-black text-white">{metric.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <p>Dernière mesure : {formatLastUpdate(serverStatus?.updatedAt ?? null)}</p>
          {serverStatus?.version ? <p>Palworld {serverStatus.version}</p> : null}
        </div>
      </div>
    </section>
  );
}
