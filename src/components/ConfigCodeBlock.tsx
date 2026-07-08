import { CopyButton } from "@/components/CopyButton";

export function ConfigCodeBlock({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#081014]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <p className="text-sm font-semibold text-slate-200">Configuration serveur</p>
        <CopyButton value={code} />
      </div>
      <pre className="max-h-[560px] overflow-auto p-4 text-xs leading-6 text-reef-100 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
