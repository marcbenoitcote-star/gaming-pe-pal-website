import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { discordInvite, siteVersion } from "@/data/serverConfig";
import { ImageCreditNotice } from "@/components/ImageCreditNotice";
import { LegalNotice } from "@/components/LegalNotice";

const footerLinks = [
  { href: "/serveur", label: "Configuration" },
  { href: "/regles", label: "Règles" },
  { href: "/guides", label: "Guides" },
  { href: "/soutien", label: "Packs de soutien" },
  { href: "/contact", label: "Tickets" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/credits", label: "Crédits images" }
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-night-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-xl font-bold text-white">Gaming P&E Pal</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Serveur privé Palworld francophone avec PvP léger, petites guildes, raids encadrés
            et progression saine.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={discordInvite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-reef-300/30 px-4 py-2 text-sm font-semibold text-reef-300 hover:bg-reef-300/10"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Discord
            </a>
            <span className="inline-flex items-center rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300">
              Version {siteVersion}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-slate-300">Liens utiles</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-3 border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <LegalNotice />
        <ImageCreditNotice />
        <p className="text-xs text-slate-500">© {year} Gaming P&E Pal. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
