import type { ReactNode } from "react";
import Image from "next/image";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  imageSrc?: string;
};

export function FeatureCard({ icon, title, description, imageSrc }: FeatureCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] transition hover:-translate-y-1 hover:border-reef-300/[0.35] hover:bg-white/[0.075] hover:shadow-glow">
      <div className="p-5">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg border border-reef-300/25 bg-reef-300/10 text-reef-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      </div>
      {imageSrc ? (
        <div className="relative h-36 border-t border-white/10 bg-night-800" aria-hidden="true">
          <Image src={imageSrc} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night-900/70 to-transparent" />
        </div>
      ) : null}
    </article>
  );
}
