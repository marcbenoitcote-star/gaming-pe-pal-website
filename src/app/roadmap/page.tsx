import type { Metadata } from "next";
import { DiscordCTA } from "@/components/DiscordCTA";
import { RoadmapCard } from "@/components/RoadmapCard";
import { SectionTitle } from "@/components/SectionTitle";
import { roadmap } from "@/data/roadmap";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Fonctionnalités futures prévues pour le site Gaming P&E Pal et son évolution Discord/backend."
};

export default function RoadmapPage() {
  return (
    <>
      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="À venir"
            title="Roadmap du site"
            description="Le site fonctionne sans backend aujourd'hui, mais le code prépare une évolution vers Discord OAuth, un panneau admin et des données dynamiques."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((item) => (
              <RoadmapCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <DiscordCTA
        title="Vote les prochaines priorités"
        description="Les futures fonctionnalités doivent rester utiles à la communauté, pas devenir une usine à gaz."
        secondaryHref="/communaute"
        secondaryLabel="Voir Discord"
      />
    </>
  );
}
