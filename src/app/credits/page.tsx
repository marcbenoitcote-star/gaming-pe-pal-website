import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ImageCreditNotice } from "@/components/ImageCreditNotice";
import { LegalNotice } from "@/components/LegalNotice";
import { SectionTitle } from "@/components/SectionTitle";
import { palworldMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "Crédits images",
  description: "Crédits et règles d'utilisation des images pour le site Gaming P&E Pal."
};

export default function CreditsPage() {
  return (
    <section className="bg-night-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="Crédits"
          title="Images et mentions légales"
          description="Cette page garde la trace des assets visuels utilisés et rappelle les règles à respecter avant de remplacer les placeholders."
        />
        <div className="mt-8 space-y-4 rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <ImageCreditNotice />
          <div className="grid gap-4 sm:grid-cols-3">
            {palworldMedia.map((asset) => (
              <article key={asset.src} className="overflow-hidden rounded-lg border border-white/10 bg-night-800">
                <div className="relative aspect-video">
                  <Image src={asset.src} alt={asset.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-bold text-white">{asset.title}</h2>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{asset.credit}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-sm leading-6 text-slate-300">
            Les images décoratives ajoutées dans <code className="rounded bg-night-800 px-1.5 py-1">/public/images</code>{" "}
            sont créditées à Pocketpair, Inc. et ne doivent être utilisées que dans un contexte non
            officiel, non trompeur et non commercial.
          </p>
          <p className="text-sm leading-6 text-slate-300">
            Le fichier source des crédits est disponible dans{" "}
            <Link href="/assets/CREDITS.md" className="font-semibold text-reef-300 hover:text-white">
              /public/assets/CREDITS.md
            </Link>
            .
          </p>
          <LegalNotice />
        </div>
      </div>
    </section>
  );
}
