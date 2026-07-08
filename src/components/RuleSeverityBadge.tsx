import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import type { RuleSeverity } from "@/data/rules";

const severityMap = {
  info: {
    label: "Info",
    className: "border-reef-300/30 bg-reef-300/10 text-reef-300",
    icon: Info
  },
  warning: {
    label: "Important",
    className: "border-ember-400/[0.35] bg-ember-500/[0.12] text-ember-400",
    icon: AlertTriangle
  },
  danger: {
    label: "Strict",
    className: "border-red-300/[0.35] bg-red-400/[0.12] text-red-200",
    icon: ShieldAlert
  }
};

export function RuleSeverityBadge({ severity }: { severity: RuleSeverity }) {
  const item = severityMap[severity];
  const Icon = item.icon;

  return (
    <span className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-bold ${item.className}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {item.label}
    </span>
  );
}
