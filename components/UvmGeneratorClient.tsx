"use client";

import { useMemo, useState } from "react";
import CopyableCode from "./CopyableCode";
import { generateUvmTestbench, type InterfaceType } from "@/lib/uvmTemplates";

export default function UvmGeneratorClient() {
  const [name, setName] = useState("axi");
  const [interfaceType, setInterfaceType] = useState<InterfaceType>("axi-lite");
  const [active, setActive] = useState(true);
  const [includeScoreboard, setIncludeScoreboard] = useState(true);
  const [includeCoverage, setIncludeCoverage] = useState(true);
  const [includeVirtualSequencer, setIncludeVirtualSequencer] = useState(false);
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const files = useMemo(
    () =>
      generateUvmTestbench({
        name,
        interfaceType,
        active,
        includeScoreboard,
        includeCoverage,
        includeVirtualSequencer,
      }),
    [name, interfaceType, active, includeScoreboard, includeCoverage, includeVirtualSequencer]
  );

  const fileNames = Object.keys(files);
  const currentFile = activeFile && files[activeFile] ? activeFile : fileNames[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-5 h-fit">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wide text-muted mb-1.5">
            Component name prefix
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. axi, apb, my"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wide text-muted mb-1.5">
            Interface type
          </label>
          <div className="flex flex-col gap-1.5">
            {(["custom", "axi-lite", "apb"] as InterfaceType[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setInterfaceType(opt)}
                className={`text-left rounded-md border px-3 py-2 text-sm transition-colors ${
                  interfaceType === opt
                    ? "border-accent bg-accent-soft text-accent-strong"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {opt === "axi-lite" ? "AXI-Lite" : opt === "apb" ? "APB" : "Custom / generic"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wide text-muted mb-1.5">
            Agent config
          </label>
          <div className="flex gap-1.5">
            <button
              onClick={() => setActive(true)}
              className={`flex-1 rounded-md border px-3 py-2 text-sm transition-colors ${
                active
                  ? "border-accent bg-accent-soft text-accent-strong"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActive(false)}
              className={`flex-1 rounded-md border px-3 py-2 text-sm transition-colors ${
                !active
                  ? "border-accent bg-accent-soft text-accent-strong"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              Passive
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={includeScoreboard}
              onChange={(e) => setIncludeScoreboard(e.target.checked)}
              className="accent-accent"
            />
            Include scoreboard skeleton
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={includeCoverage}
              onChange={(e) => setIncludeCoverage(e.target.checked)}
              className="accent-accent"
            />
            Include coverage collector skeleton
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={includeVirtualSequencer}
              onChange={(e) => setIncludeVirtualSequencer(e.target.checked)}
              className="accent-accent"
            />
            Include virtual sequencer skeleton
          </label>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {fileNames.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFile(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-mono border transition-colors ${
                currentFile === f
                  ? "border-accent bg-accent-soft text-accent-strong"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        {currentFile && (
          <CopyableCode code={files[currentFile]} filename={currentFile} language="systemverilog" />
        )}
      </div>
    </div>
  );
}
