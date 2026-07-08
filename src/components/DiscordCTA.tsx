import { MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { discordInvite } from "@/data/serverConfig";

type DiscordCTAProps = {
  title?: string;
  description?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function DiscordCTA({
  title = "Rejoins la communauté Gaming P&E Pal",
  description = "Discord centralise les annonces serveur, les tickets, les événements, les votes et la recherche de guilde.",
  secondaryHref = "/regles",
  secondaryLabel = "Lire les règles"
}: DiscordCTAProps) {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-gradient-to-r from-reef-400/[0.12] via-night-850 to-ember-500/[0.12]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-reef-300">Discord</p>
          <h2 className="mt-3 text-3xl font-bold text-white">{title}</h2>
          <p className="mt-3 text-base leading-7 text-slate-300">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={discordInvite}
            target="_blank"
            rel="noreferrer"
            aria-label="Rejoindre le Discord Gaming P&E Pal"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-ember-500 px-5 py-3 text-sm font-bold text-night-900 shadow-ember transition hover:bg-ember-400 focus:outline-none focus:ring-2 focus:ring-ember-400 focus:ring-offset-2 focus:ring-offset-night-900"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Rejoindre le Discord
          </a>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.15] px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
          >
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
