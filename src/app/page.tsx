import { Gauge, Handshake, Server, ShieldCheck, Swords, Users } from "lucide-react";
import { DecorativeImageStrip } from "@/components/DecorativeImageStrip";
import { DiscordCTA } from "@/components/DiscordCTA";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { ServerStatusPanel } from "@/components/ServerStatusPanel";
import { ServerStatCard } from "@/components/ServerStatCard";
import { featureImages, homeDecorativeMedia } from "@/data/media";
import { discordInvite, serverConfig } from "@/data/serverConfig";

const reasons = [
  {
    title: "PvP léger, pas toxique",
    description: "Le combat existe pour créer des histoires, pas pour empêcher les autres de jouer.",
    icon: <Swords className="h-5 w-5" aria-hidden="true" />,
    imageSrc: featureImages[0]
  },
  {
    title: "Raids encadrés",
    description: "Fenêtres claires, raid offline interdit et destruction gratuite sanctionnable.",
    icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
    imageSrc: featureImages[1]
  },
  {
    title: "Petites guildes équilibrées",
    description: "Trois joueurs maximum par guilde pour éviter les blocs impossibles à contester.",
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
    imageSrc: featureImages[2]
  },
  {
    title: "Progression modérée",
    description: "Rates x1.25 à x1.5 pour alléger le grind sans vider l'intérêt de la survie.",
    icon: <Gauge className="h-5 w-5" aria-hidden="true" />,
    imageSrc: featureImages[3]
  },
  {
    title: "Serveur stable",
    description: "Limites de workers, bases et constructions pensées pour préserver les performances.",
    icon: <Server className="h-5 w-5" aria-hidden="true" />,
    imageSrc: featureImages[4]
  },
  {
    title: "Discord organisé",
    description: "Tickets, annonces, votes, commerce et événements au même endroit.",
    icon: <Handshake className="h-5 w-5" aria-hidden="true" />,
    imageSrc: featureImages[5]
  }
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServerStatusPanel />

      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Pourquoi nous rejoindre ?"
            title="Un serveur fait pour les rivalités saines"
            description="Gaming P&E Pal est pensé pour les joueurs qui veulent du PvP sans toxicité, une progression agréable sans être trop rapide et des règles claires pour éviter le grief."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <FeatureCard key={reason.title} {...reason} />
            ))}
          </div>
          <div className="mt-8">
            <DecorativeImageStrip assets={homeDecorativeMedia} />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night-850 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Serveur en bref"
            title="Les limites importantes en un coup d'œil"
            description="Le format est volontairement compact : 24 joueurs maximum, petites guildes et raids qui servent le jeu au lieu de le casser."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serverConfig.briefStats.map((stat) => (
              <ServerStatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionTitle
              eyebrow="Résumé rapide"
              title="Gaming P&E Pal"
              description="Un serveur privé Palworld francophone, PvP léger, pensé pour les petites équipes et une communauté durable."
            />
            <a
              href={discordInvite}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex rounded-lg bg-ember-500 px-5 py-3 text-sm font-bold text-night-900 shadow-ember hover:bg-ember-400"
            >
              Rejoindre le Discord
            </a>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {[
              ["Nom", serverConfig.name],
              ["Type", serverConfig.type],
              ["Style", serverConfig.style],
              ["Guildes", "3 joueurs max"],
              ["Bases", "2 bases max par guilde"],
              ["Joueurs", "24 max"],
              ["Progression", "x1.25 à x1.5"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <dt className="text-sm text-slate-400">{label}</dt>
                <dd className="mt-1 text-lg font-bold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-gradient-to-b from-night-850 to-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="Esprit du serveur" title="Compétitif sans devenir invivable" align="center" />
          <p className="mt-7 text-center text-lg leading-8 text-slate-300">
            Le but de Gaming P&E Pal est d'avoir un serveur vivant, compétitif et amusant sans
            tomber dans le grief, le raid destructeur ou l'ambiance toxique. Le PvP est là pour
            créer des histoires, des rivalités et des moments mémorables, pas pour empêcher les
            autres de jouer.
          </p>
        </div>
      </section>

      <DiscordCTA />
    </>
  );
}
