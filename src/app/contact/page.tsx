import type { Metadata } from "next";
import { CalendarClock, Camera, MessageCircle, ShieldCheck, UserRound } from "lucide-react";
import { DiscordCTA } from "@/components/DiscordCTA";
import { SectionTitle } from "@/components/SectionTitle";
import { discordInvite } from "@/data/serverConfig";

export const metadata: Metadata = {
  title: "Contact et tickets",
  description: "Comment ouvrir un ticket Discord et contacter les admins Gaming P&E Pal avec les bonnes preuves."
};

const ticketItems = [
  { title: "Date et heure", text: "Mentionne la date, l'heure approximative et le fuseau si possible.", icon: <CalendarClock className="h-5 w-5" /> },
  { title: "Joueurs et guildes", text: "Ajoute les pseudos, guildes et rôles de chaque personne impliquée.", icon: <UserRound className="h-5 w-5" /> },
  { title: "Preuves", text: "Capture d'écran, vidéo, extrait de chat ou toute information vérifiable.", icon: <Camera className="h-5 w-5" /> },
  { title: "Contexte calme", text: "Explique les faits sans insultes pour aider les admins à trancher.", icon: <ShieldCheck className="h-5 w-5" /> }
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionTitle
              eyebrow="Contact"
              title="Ouvrir un ticket Discord"
              description="Les conflits ne se règlent pas par insultes. Un ticket clair avec preuves permet aux admins de comprendre vite et d'agir justement."
            />
            <a
              href={discordInvite}
              target="_blank"
              rel="noreferrer"
              aria-label="Ouvrir Discord pour créer un ticket"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-ember-500 px-5 py-3 text-sm font-bold text-night-900 shadow-ember hover:bg-ember-400"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Ouvrir Discord
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {ticketItems.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <div className="grid h-11 w-11 place-items-center rounded-lg border border-reef-300/25 bg-reef-300/10 text-reef-300">
                  {item.icon}
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night-850 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-lg border border-ember-400/30 bg-ember-500/10 p-6">
          <h2 className="text-2xl font-bold text-white">À fournir dans un ticket</h2>
          <p className="mt-4 text-sm leading-6 text-ember-50">
            Date, heure, nom du joueur, guilde, capture ou vidéo. Plus le signalement est factuel,
            plus il est facile de vérifier sans alimenter le conflit.
          </p>
        </div>
      </section>

      <DiscordCTA
        title="Besoin d'un admin ?"
        description="Ouvre un ticket Discord et ajoute les preuves disponibles. Les admins traiteront la situation selon les règles du serveur."
        secondaryHref="/regles"
        secondaryLabel="Relire les règles"
      />
    </>
  );
}
