"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copier la configuration serveur"
      className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.08] px-3 py-2 text-xs font-bold text-slate-100 hover:bg-white/[0.14]"
    >
      {copied ? <Check className="h-4 w-4 text-moss-300" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      {copied ? "Copié" : "Copier"}
    </button>
  );
}
