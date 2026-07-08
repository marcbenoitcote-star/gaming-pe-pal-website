import { CircleDashed, Compass, Hammer } from "lucide-react";
import type { RoadmapItem } from "@/data/roadmap";

const statusStyle = {
  Prepare: {
    label: "Préparé",
    className: "border-moss-300/30 bg-moss-300/10 text-moss-300",
    icon: Hammer
  },
  Explore: {
    label: "Exploration",
    className: "border-reef-300/30 bg-reef-300/10 text-reef-300",
    icon: Compass
  },
  "Plus tard": {
    label: "Plus tard",
    className: "border-white/[0.12] bg-white/[0.08] text-slate-300",
    icon: CircleDashed
  }
};

export function RoadmapCard({ item }: { item: RoadmapItem }) {
  const status = statusStyle[item.status];
  const Icon = status.icon;

  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:border-reef-300/[0.35] hover:bg-white/[0.07]">
      <span className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs font-bold ${status.className}`}>
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {status.label}
      </span>
      <h2 className="mt-4 text-lg font-bold text-white">{item.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
    </article>
  );
}
