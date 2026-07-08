import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { DecorativeImageStrip } from "@/components/DecorativeImageStrip";
import { DiscordCTA } from "@/components/DiscordCTA";
import { RaidWindowTable } from "@/components/RaidWindowTable";
import { RuleSection } from "@/components/RuleSection";
import { SectionTitle } from "@/components/SectionTitle";
import { rulesDecorativeMedia } from "@/data/media";
import { ruleSections, rulesIntro, spiritNotice } from "@/data/rules";

export const metadata: Metadata = {
  title: "Règles",
  description: "Règlement du serveur Palworld Gaming P&E Pal : PvP léger, raids encadrés et comportement attendu."
};

export default function RulesPage() {
  return (
    <>
      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Règlement" title="Règles du serveur Palworld — PvP Léger" description={rulesIntro} />
          <div className="mt-8 rounded-lg border border-ember-400/30 bg-ember-500/10 p-5 text-ember-50">
            <div className="flex gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-ember-400" aria-hidden="true" />
              <p className="text-sm leading-6">{spiritNotice}</p>
            </div>
          </div>

          <nav aria-label="Sommaire des règles" className="mt-8 rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <p className="text-sm font-bold uppercase text-slate-300">Sommaire</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ruleSections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-lg border border-white/10 bg-night-800 px-3 py-2 text-sm text-slate-200 hover:border-reef-300/[0.35] hover:text-white"
                >
                  {index + 1}. {section.navLabel}
                </a>
              ))}
            </div>
          </nav>
          <div className="mt-8">
            <DecorativeImageStrip assets={rulesDecorativeMedia} />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night-850 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            eyebrow="Fenêtres de raid"
            title="Raids autorisés seulement sur horaires annoncés"
            description="Aucun raid offline n'est permis. Une base peut être attaquée seulement si au moins un membre de la guilde défenseuse est connecté."
            align="center"
          />
          <div className="mt-8">
            <RaidWindowTable />
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-5">
          {ruleSections.map((section) => (
            <RuleSection key={section.id} section={section} />
          ))}
        </div>
      </section>

      <DiscordCTA
        title="Un doute sur une règle ?"
        description="Passe par Discord et ouvre un ticket avec preuves. Les admins peuvent clarifier avant qu'un conflit dégénère."
        secondaryHref="/contact"
        secondaryLabel="Ouvrir un ticket"
      />
    </>
  );
}
