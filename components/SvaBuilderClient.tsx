"use client";

import { useMemo, useState } from "react";
import CopyableCode from "./CopyableCode";
import { SVA_PATTERNS, getPattern, type SvaPatternId } from "@/lib/svaTemplates";

function defaultValues(patternId: SvaPatternId): Record<string, string> {
  const pattern = getPattern(patternId);
  const values: Record<string, string> = {};
  for (const field of pattern.fields) values[field.key] = field.default;
  return values;
}

export default function SvaBuilderClient() {
  const [patternId, setPatternId] = useState<SvaPatternId>("implication");
  const [values, setValues] = useState<Record<string, string>>(() => defaultValues("implication"));

  const pattern = getPattern(patternId);
  const code = useMemo(() => pattern.generate(values), [pattern, values]);

  function selectPattern(id: SvaPatternId) {
    setPatternId(id);
    setValues(defaultValues(id));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
      <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-5 h-fit">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wide text-muted mb-1.5">
            Assertion pattern
          </label>
          <div className="flex flex-col gap-1.5">
            {SVA_PATTERNS.map((p) => (
              <button
                key={p.id}
                onClick={() => selectPattern(p.id)}
                className={`text-left rounded-md border px-3 py-2 text-sm transition-colors ${
                  patternId === p.id
                    ? "border-accent bg-accent-soft text-accent-strong"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted leading-relaxed">{pattern.description}</p>
        </div>

        <div className="flex flex-col gap-3">
          {pattern.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-mono uppercase tracking-wide text-muted mb-1">
                {field.label}
              </label>
              <input
                value={values[field.key] ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <CopyableCode code={code} filename={`${values.name ?? "assertion"}.sv`} language="systemverilog" />
      </div>
    </div>
  );
}
