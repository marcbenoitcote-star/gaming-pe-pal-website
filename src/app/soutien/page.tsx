import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, CircleDollarSign, Server, ShieldCheck } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { SupportPackExperience } from "@/components/SupportPackExperience";
import { supportPaymentConfig } from "@/data/supportPaymentConfig";
import {
  supportItemExplanations,
  supportPacks,
  supportTransparency
} from "@/data/supportPacks";

export const metadata: Metadata = {
  title: "Packs de soutien",
  description:
    "Contributions optionnelles pour soutenir les coûts du serveur Gaming P&E Pal avec avantages numériques obtenables en jeu.",
  alternates: {
    canonical: "/soutien/"
  },
  openGraph: {
    title: "Packs de soutien | Gaming P&E Pal",
    description:
      "Trois contributions optionnelles pour soutenir l'infrastructure et la durée de vie du serveur.",
    url: "/soutien/"
  }
};

export default function SupportPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/decor-lifmunk-family.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-night-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/35 to-night-900/20" />
        </div>
        <div className="mx-auto flex min-h-[52svh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-reef-300">Soutien communautaire</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Packs de soutien</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Des contributions entièrement optionnelles pour aider à payer le serveur, le site et les outils
              communautaires, avec des avantages numériques obtenables en jeu.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Choisir un pack"
            title="Trois façons de soutenir le serveur"
            description="Chaque pack reste optionnel. Il ne donne aucun pouvoir administratif, aucune immunité aux règles et aucun objet exclusif."
          />
          <div className="mt-10">
            <SupportPackExperience
              packs={supportPacks}
              paypalEmail={supportPaymentConfig.paypalEmail}
              paypalLinks={supportPaymentConfig.paypal}
              stripeLinks={supportPaymentConfig.stripe}
            />
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Objets inclus"
            title="Ce que contient chaque avantage"
            description="Les objets proposés accélèrent certains aspects de la progression, mais restent tous accessibles par le jeu."
          />
          <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {supportItemExplanations.map((item) => (
              <div key={item.name} className="border-l-2 border-reef-300/40 pl-5">
                <dt className="font-bold text-white">{item.name}</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-300">{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night-850 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Transparence"
            title="À quoi servent les contributions"
            description="Le soutien aide à maintenir l'infrastructure et à prolonger le projet au-delà de sa période initiale."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <ul className="grid gap-4 sm:grid-cols-2">
              {supportTransparency.map((item) => (
                <li key={item} className="flex gap-3 border-b border-white/10 pb-4 text-sm leading-6 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-moss-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <aside className="space-y-5 rounded-lg border border-white/10 bg-white/[0.045] p-6">
              <div className="flex gap-3">
                <Server className="mt-0.5 h-5 w-5 shrink-0 text-reef-300" aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-300">
                  Le serveur est prévu pour une durée minimale de 3 mois. Sa prolongation dépendra notamment du
                  soutien reçu.
                </p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-moss-300" aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-300">
                  Une contribution n'accorde aucun traitement spécial et ne remplace jamais le règlement du serveur.
                </p>
              </div>
              <div className="flex gap-3">
                <CircleDollarSign className="mt-0.5 h-5 w-5 shrink-0 text-ember-400" aria-hidden="true" />
                <div className="text-sm leading-6 text-slate-300">
                  <p>
                    Ces contributions ne sont pas des dons caritatifs et ne donnent pas droit à un reçu officiel de
                    don aux fins de l'impôt.
                  </p>
                  <p className="mt-3 font-semibold text-white">
                    Taxes non facturées — petit fournisseur non inscrit aux fichiers TPS/TVQ.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
