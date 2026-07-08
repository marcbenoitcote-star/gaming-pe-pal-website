import type { Metadata } from "next";
import { Construction, Gauge, Server, Users } from "lucide-react";
import { ConfigCodeBlock } from "@/components/ConfigCodeBlock";
import { DecorativeImageStrip } from "@/components/DecorativeImageStrip";
import { DiscordCTA } from "@/components/DiscordCTA";
import { RaidWindowTable } from "@/components/RaidWindowTable";
import { SectionTitle } from "@/components/SectionTitle";
import { ServerStatCard } from "@/components/ServerStatCard";
import { serverDecorativeMedia } from "@/data/media";
import { configCode, serverConfig, serverConfigEntries, serverInterpretations } from "@/data/serverConfig";

export const metadata: Metadata = {
  title: "Serveur",
  description: "Configuration, rates et format général du serveur privé Gaming P&E Pal."
};

const formatStats = [
  { label: "Format", value: "Équipes de 3", detail: "Guildes compactes pour limiter les méga-groupes.", icon: <Users className="h-5 w-5" /> },
  { label: "Population", value: "18 à 24 joueurs", detail: "Capacité maximum fixée à 24 joueurs.", icon: <Server className="h-5 w-5" /> },
  { label: "Progression", value: "x1.25 à x1.5", detail: "Plus confortable sans aller trop vite.", icon: <Gauge className="h-5 w-5" /> },
  { label: "Bases", value: "2 par guilde", detail: "Workers limités pour préserver la stabilité.", icon: <Construction className="h-5 w-5" /> }
];

const groupLabels = {
  Capacite: "Capacité",
  Rates: "Rates",
  Gameplay: "Gameplay",
  Construction: "Construction"
};

export default function ServerPage() {
  return (
    <>
      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Configuration serveur"
            title="Un format PvP léger, lisible et stable"
            description="La configuration cherche un équilibre entre confort de progression, compétition et stabilité technique."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {formatStats.map((stat) => (
              <ServerStatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="mt-8">
            <DecorativeImageStrip assets={serverDecorativeMedia} />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night-850 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionTitle
              eyebrow="Paramètres"
              title="Résumé technique"
              description="Les paramètres dupliqués fournis dans les specs sont affichés une seule fois dans le résumé final."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {serverConfigEntries.map((entry) => (
                <article key={entry.key} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">{groupLabels[entry.group]}</p>
                  <h2 className="mt-2 text-sm font-bold text-white">{entry.label}</h2>
                  <p className="mt-2 font-mono text-sm text-reef-300">{entry.key}={entry.value}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <ConfigCodeBlock code={configCode} />
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionTitle
              eyebrow="Interprétation"
              title="Ce que les rates changent en jeu"
              description="Le serveur reste axé survie et communauté, avec assez de confort pour réduire le grind inutile."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {serverInterpretations.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <h2 className="text-base font-bold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-850 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            eyebrow="Raids"
            title="Fenêtres de raid"
            description="Les raids de base ne sont autorisés que pendant ces fenêtres, et jamais offline."
            align="center"
          />
          <div className="mt-8">
            <RaidWindowTable />
          </div>
          <p className="mt-5 text-center text-sm text-slate-400">
            Format général : PvP activé, raids/base grief limités, perte légère à la mort, pas de perte de Pals.
          </p>
        </div>
      </section>

      <DiscordCTA
        title={`Rejoins ${serverConfig.name}`}
        description="La configuration peut évoluer avec les votes et les besoins de stabilité. Les annonces passent par Discord."
        secondaryHref="/regles"
        secondaryLabel="Voir les règles"
      />
    </>
  );
}
