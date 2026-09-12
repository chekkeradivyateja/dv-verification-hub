"use client";

import { useState } from "react";

export default function CopyableCode({
  code,
  language = "systemverilog",
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable -- silently ignore, code is still selectable
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden not-prose">
      <div className="flex items-center justify-between border-b border-border bg-surface-raised px-4 py-2">
        <span className="font-mono text-xs text-muted">{filename ?? language}</span>
        <button
          onClick={handleCopy}
          className="font-mono text-xs text-muted hover:text-accent-strong transition-colors"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-[#c8d1da]">{code}</code>
      </pre>
    </div>
  );
}
