import type { ReactNode } from "react";

type ServerStatCardProps = {
  label: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
};

export function ServerStatCard({ label, value, detail, icon }: ServerStatCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-night-800 p-5 transition hover:border-ember-400/[0.35] hover:bg-white/[0.065]">
      {icon ? (
        <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg border border-ember-400/25 bg-ember-500/10 text-ember-400">
          {icon}
        </div>
      ) : null}
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
      {detail ? <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p> : null}
    </article>
  );
}
