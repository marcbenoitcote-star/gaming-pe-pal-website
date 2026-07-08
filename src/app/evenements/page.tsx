import type { Metadata } from "next";
import { DecorativeImageStrip } from "@/components/DecorativeImageStrip";
import { DiscordCTA } from "@/components/DiscordCTA";
import { EventCard } from "@/components/EventCard";
import { RaidWindowTable } from "@/components/RaidWindowTable";
import { SectionTitle } from "@/components/SectionTitle";
import { events } from "@/data/events";
import { eventsDecorativeMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "Événements",
  description: "Calendrier de raids, boss en groupe, tournois PvP, soirées capture et marché communautaire."
};

export default function EventsPage() {
  return (
    <>
      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Événements"
            title="Raids, boss, tournois et soirées communautaires"
            description="Les données sont mockées pour l'instant, mais la structure est prête pour un calendrier interactif ou une synchronisation Discord."
          />
          <div className="mt-8">
            <DecorativeImageStrip assets={eventsDecorativeMedia} />
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="mb-4 text-xl font-bold text-white">Calendrier des raids</h2>
              <RaidWindowTable />
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Ces horaires ne remplacent pas les annonces Discord. En cas d'événement spécial, les règles précises sont annoncées avant le départ.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {events.map((event) => (
                <EventCard key={event.title} event={event} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <DiscordCTA
        title="Les événements vivent sur Discord"
        description="Inscriptions, confirmations, votes et annonces de dernière minute passent par le serveur Discord."
        secondaryHref="/communaute"
        secondaryLabel="Voir la communauté"
      />
    </>
  );
}
