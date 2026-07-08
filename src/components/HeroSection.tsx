import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Server, ShieldCheck } from "lucide-react";
import { discordInvite, serverConfig } from "@/data/serverConfig";
import { heroMedia, logoMedia } from "@/data/media";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroMedia.src}
          alt={heroMedia.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-night-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,24,39,0.18),rgba(7,10,24,0.88)_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/20 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[78svh] max-w-7xl items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <div className="mb-5 inline-flex items-center rounded-lg border border-ember-400/[0.35] bg-ember-500/[0.12] px-3 py-2 text-sm font-semibold text-ember-400">
            PvP actif, grief limité, progression saine.
          </div>
          <h1 className="sr-only">Gaming P&E Pal</h1>
          <Image
            src={logoMedia.src}
            alt={logoMedia.alt}
            width={690}
            height={1024}
            priority
            className="mx-auto h-auto w-full max-w-[290px] drop-shadow-2xl sm:max-w-[370px] lg:max-w-[430px]"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            Serveur privé Palworld PvP léger, pensé pour les petites équipes, la progression saine
            et une communauté durable.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {serverConfig.heroBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-lg border border-white/[0.14] bg-white/[0.08] px-3 py-2 text-sm font-medium text-slate-100 backdrop-blur"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href={discordInvite}
              target="_blank"
              rel="noreferrer"
              aria-label="Rejoindre le Discord Gaming P&E Pal"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ember-500 px-5 py-3 text-sm font-bold text-night-900 shadow-ember transition hover:bg-ember-400 focus:outline-none focus:ring-2 focus:ring-ember-400 focus:ring-offset-2 focus:ring-offset-night-900"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Rejoindre le Discord
            </a>
            <Link
              href="/regles"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.18] bg-white/[0.08] px-5 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/[0.14]"
            >
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Lire les règles
            </Link>
            <Link
              href="/serveur"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-reef-300/30 bg-reef-300/10 px-5 py-3 text-sm font-bold text-reef-300 hover:bg-reef-300/[0.16]"
            >
              <Server className="h-5 w-5" aria-hidden="true" />
              Voir la configuration serveur
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
