import type { Metadata } from "next";
import { Bell, HandCoins, HelpCircle, MessageCircle, ShieldQuestion, Users, Vote } from "lucide-react";
import { DecorativeImageStrip } from "@/components/DecorativeImageStrip";
import { DiscordCTA } from "@/components/DiscordCTA";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionTitle } from "@/components/SectionTitle";
import { communityDecorativeMedia, communityFeatureImages } from "@/data/media";
import { discordInvite } from "@/data/serverConfig";

export const metadata: Metadata = {
  title: "Communauté Discord",
  description: "Rejoindre le Discord Gaming P&E Pal pour annonces serveur, tickets, événements, votes, commerce et support."
};

const discordReasons = [
  {
    title: "Annonces serveur",
    description: "Infos importantes, horaires et changements de configuration.",
    icon: <Bell className="h-5 w-5" />,
    imageSrc: communityFeatureImages[0]
  },
  {
    title: "Tickets admin",
    description: "Signaler un abus avec preuves sans régler le conflit dans le chat.",
    icon: <ShieldQuestion className="h-5 w-5" />,
    imageSrc: communityFeatureImages[1]
  },
  {
    title: "Recherche de guilde",
    description: "Trouver une équipe de 3 joueurs maximum ou recruter proprement.",
    icon: <Users className="h-5 w-5" />,
    imageSrc: communityFeatureImages[2]
  },
  {
    title: "Commerce",
    description: "Échanger ressources, services et besoins sans spammer le serveur.",
    icon: <HandCoins className="h-5 w-5" />,
    imageSrc: communityFeatureImages[3]
  },
  {
    title: "Événements",
    description: "Boss en groupe, tournois, captures et guerres organisées.",
    icon: <MessageCircle className="h-5 w-5" />,
    imageSrc: communityFeatureImages[4]
  },
  {
    title: "Votes de communauté",
    description: "Décider des évolutions importantes avec les joueurs actifs.",
    icon: <Vote className="h-5 w-5" />,
    imageSrc: communityFeatureImages[5]
  }
];

export default function CommunityPage() {
  return (
    <>
      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="Discord"
              title="Rejoins la communauté Gaming P&E Pal"
              description="Discord est le centre de la communauté. Les annonces serveur, tickets, événements, règles, votes et discussions passent par Discord."
            />
            <a
              href={discordInvite}
              target="_blank"
              rel="noreferrer"
              aria-label="Rejoindre le Discord Gaming P&E Pal"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-ember-500 px-5 py-3 text-sm font-bold text-night-900 shadow-ember hover:bg-ember-400"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Rejoindre le Discord
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {discordReasons.map((reason) => (
              <FeatureCard key={reason.title} {...reason} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night-850 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          {[
            {
              title: "Comment bien se présenter ?",
              text: "Indique ton pseudo, ton style de jeu, ton expérience et si tu cherches une guilde ou préfères débuter tranquillement."
            },
            {
              title: "Où signaler un problème ?",
              text: "Ouvre un ticket avec preuves, heure approximative, noms des joueurs ou guildes et contexte clair."
            },
            {
              title: "Où lire les annonces ?",
              text: "Les annonces serveur et changements importants sont publiés dans les salons Discord dédiés."
            }
          ].map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
              <HelpCircle className="h-6 w-6 text-reef-300" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-7xl">
          <DecorativeImageStrip assets={communityDecorativeMedia} />
        </div>
      </section>

      <DiscordCTA />
    </>
  );
}
