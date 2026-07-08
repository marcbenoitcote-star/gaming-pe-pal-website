import type { Metadata } from "next";
import { DiscordCTA } from "@/components/DiscordCTA";
import { GuideCard } from "@/components/GuideCard";
import { SectionTitle } from "@/components/SectionTitle";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides",
  description: "Liens utiles Gaming P&E Pal vers guides, bases de données, breeding calculator et carte interactive Palworld."
};

export default function GuidesPage() {
  return (
    <>
      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Guides et outils"
            title="Liens utiles pour mieux jouer"
            description="Cette page redirige les joueurs vers des ressources externes pratiques : guides, base de données, breeding calculator, carte interactive et wiki communautaire."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => (
              <GuideCard key={guide.title} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <DiscordCTA
        title="Tu veux proposer un guide ?"
        description="Les joueurs peuvent suggérer des astuces, avertissements et bonnes pratiques via Discord."
        secondaryHref="/contact"
        secondaryLabel="Voir les tickets"
      />
    </>
  );
}
