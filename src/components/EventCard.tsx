import { CalendarDays, ExternalLink } from "lucide-react";
import type { CommunityEvent } from "@/data/events";
import { discordInvite } from "@/data/serverConfig";

export function EventCard({ event }: { event: CommunityEvent }) {
  return (
    <article className="rounded-lg border border-white/10 bg-night-800 p-5 transition hover:border-ember-400/[0.35] hover:bg-white/[0.065]">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-lg border border-ember-400/25 bg-ember-500/10 text-ember-400">
          <CalendarDays className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="rounded-lg border border-white/[0.12] bg-white/[0.08] px-2.5 py-1 text-xs font-bold text-slate-300">
          {event.status}
        </span>
      </div>
      <h2 className="mt-5 text-xl font-bold text-white">{event.title}</h2>
      <p className="mt-2 text-sm font-semibold text-reef-300">
        {event.date} · {event.time}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{event.description}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-lg bg-white/[0.08] px-2.5 py-1 text-xs font-semibold text-slate-300">{event.type}</span>
        <a
          href={discordInvite}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-reef-300/25 px-3 py-2 text-xs font-bold text-reef-300 hover:bg-reef-300/10"
        >
          Voir sur Discord
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
