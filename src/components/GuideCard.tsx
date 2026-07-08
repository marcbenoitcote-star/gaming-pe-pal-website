import Image from "next/image";
import { BookOpen, ExternalLink, Tags } from "lucide-react";
import type { GuideResource } from "@/data/guides";

export function GuideCard({ guide }: { guide: GuideResource }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] transition hover:-translate-y-1 hover:border-reef-300/[0.35] hover:bg-white/[0.07]">
      <div className="relative h-40 bg-night-800" aria-hidden="true">
        <Image src={guide.imageSrc} alt="" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-900/80 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-lg border border-reef-300/25 bg-reef-300/10 text-reef-300">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="rounded-lg border border-white/[0.12] bg-white/[0.08] px-2.5 py-1 text-xs font-bold text-slate-300">
            {guide.source}
          </span>
        </div>
        <h2 className="mt-5 text-xl font-bold text-white">{guide.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{guide.description}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
            <Tags className="h-3.5 w-3.5" aria-hidden="true" />
            {guide.category}
          </span>
          <a
            href={guide.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-reef-300/25 px-3 py-2 text-xs font-bold text-reef-300 hover:bg-reef-300/10"
            aria-label={`Ouvrir ${guide.source} dans un nouvel onglet`}
          >
            Ouvrir
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
