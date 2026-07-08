import type { Metadata } from "next";
import { DiscordCTA } from "@/components/DiscordCTA";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SectionTitle } from "@/components/SectionTitle";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur Gaming P&E Pal : PvP, raids, guildes, bases, Discord et signalement d'abus."
};

export default function FAQPage() {
  return (
    <>
      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            eyebrow="FAQ"
            title="Questions fréquentes"
            description="Les réponses rapides pour comprendre le serveur avant de rejoindre le Discord."
            align="center"
          />
          <div className="mt-10">
            <FAQAccordion items={faq} />
          </div>
        </div>
      </section>

      <DiscordCTA
        title="Ta question n'est pas ici ?"
        description="Passe sur Discord pour demander une clarification ou ouvrir un ticket."
        secondaryHref="/contact"
        secondaryLabel="Contacter les admins"
      />
    </>
  );
}
