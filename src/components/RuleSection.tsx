import type { RuleSectionData } from "@/data/rules";
import { RuleSeverityBadge } from "@/components/RuleSeverityBadge";

export function RuleSection({ section }: { section: RuleSectionData }) {
  return (
    <section id={section.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-white/[0.045] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
        <RuleSeverityBadge severity={section.severity} />
      </div>
      {section.description ? <p className="mt-3 text-sm leading-6 text-slate-300">{section.description}</p> : null}
      <div className="mt-5 space-y-5">
        {section.blocks.map((block, index) => (
          <div key={`${section.id}-${index}`}>
            {block.heading ? <h3 className="mb-3 text-base font-bold text-reef-300">{block.heading}</h3> : null}
            {block.intro ? <p className="mb-3 text-sm font-semibold text-slate-200">{block.intro}</p> : null}
            {block.items ? (
              <ul className="space-y-2 text-sm leading-6 text-slate-300">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-reef-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {block.note ? (
              <p className="rounded-lg border border-ember-400/25 bg-ember-500/10 p-4 text-sm leading-6 text-ember-100">
                {block.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
