import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/data/faq";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="group rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-bold text-white [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown className="h-5 w-5 shrink-0 text-reef-300 transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="mt-4 text-sm leading-6 text-slate-300">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
