import Link from "next/link";
import { Menu, MessageCircle, Sparkles } from "lucide-react";
import { discordInvite } from "@/data/serverConfig";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/serveur", label: "Serveur" },
  { href: "/regles", label: "Règles" },
  { href: "/guides", label: "Guides" },
  { href: "/evenements", label: "Événements" },
  { href: "/soutien", label: "Soutien" },
  { href: "/faq", label: "FAQ" },
  { href: "/communaute", label: "Discord" }
];

function NavItems({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            mobile
              ? "block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
              : "rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
          }
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night-900/[0.86] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Accueil Gaming P&E Pal">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-reef-300/30 bg-reef-300/10 text-reef-300 shadow-glow">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-base font-bold text-white sm:text-lg">Gaming P&E Pal</span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          <NavItems />
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={discordInvite}
            target="_blank"
            rel="noreferrer"
            aria-label="Rejoindre le Discord Gaming P&E Pal"
            className="inline-flex items-center gap-2 rounded-lg bg-ember-500 px-4 py-2 text-sm font-bold text-night-900 shadow-ember transition hover:bg-ember-400 focus:outline-none focus:ring-2 focus:ring-ember-400 focus:ring-offset-2 focus:ring-offset-night-900"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Rejoindre Discord
          </a>
        </div>

        <details className="relative xl:hidden">
          <summary
            aria-label="Ouvrir la navigation"
            className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-lg border border-white/[0.15] bg-white/[0.08] text-white [&::-webkit-details-marker]:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 mt-3 w-72 rounded-lg border border-white/[0.12] bg-night-850 p-3 shadow-glow">
            <div className="space-y-1">
              <NavItems mobile />
            </div>
            <a
              href={discordInvite}
              target="_blank"
              rel="noreferrer"
              aria-label="Rejoindre le Discord Gaming P&E Pal"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ember-500 px-4 py-2 text-sm font-bold text-night-900"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Rejoindre Discord
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
