import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const VERECHEK_URL = "https://verechek-website.vercel.app";

export const metadata: Metadata = {
  title: "VereChek — AI-Assisted UVM/SV Verification Tool",
  description:
    "VereChek is an AI-assisted verification tool built by a working DV engineer: point it at your RTL and get a UVM or SystemVerilog testbench, a verification plan with SVA assertions, and architecture diagrams. Currently in early access.",
  openGraph: {
    images: [{ url: `${SITE_URL}/og/tools.png`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [`${SITE_URL}/og/tools.png`] },
};

const FEATURES = [
  {
    name: "RTL-to-testbench, in seconds",
    description:
      "Point it at your RTL and get a ready-to-run UVM or SystemVerilog testbench skeleton — agents, sequences, scoreboard, and coverage stubs generated for your design, not a generic template.",
  },
  {
    name: "AI-generated verification plan",
    description:
      "A design-specific verification plan with SVA assertions and coverage goals, built from an AI read of your actual RTL rather than boilerplate checklist items.",
  },
  {
    name: "Architecture diagrams",
    description:
      "Auto-generated block/interface diagrams so you and your team can sanity-check the DUT structure before writing a single testcase.",
  },
  {
    name: "Runs from a single binary",
    description:
      "No Python environment, no dependency wrangling. Local generation never leaves your machine; AI-powered analysis is opt-in and routed through a dedicated relay.",
  },
];

export default function VereChekPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-accent">Built by the same engineer as this site</p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground">
        VereChek — AI-assisted UVM/SV verification
      </h1>
      <p className="mt-4 text-muted max-w-2xl leading-relaxed">
        Every verification project starts the same way: hours of boilerplate
        UVM structure before a single real testcase gets written. VereChek
        closes that gap. Point it at your RTL and it generates the testbench
        skeleton, a design-specific verification plan, and architecture
        diagrams — so your time goes into the verification work that
        actually needs a human.
      </p>

      <a
        href={VERECHEK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-strong transition-colors"
      >
        Visit VereChek &rarr;
      </a>
      <p className="mt-2 text-xs text-muted">
        Currently in early access &mdash; built for VCS, Questa, and Xcelium workflows.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div
            key={feature.name}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="font-semibold text-foreground">{feature.name}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-accent/30 bg-accent-soft p-6 text-center">
        <p className="text-foreground font-medium">
          Want to see it before everyone else?
        </p>
        <p className="mt-1 text-sm text-muted">
          Early-access slots are limited and go to a small group first.
        </p>
        <a
          href={VERECHEK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-md border border-accent/40 bg-background px-5 py-2.5 text-sm font-medium text-accent-strong hover:bg-accent/10 transition-colors"
        >
          Reserve an early-access slot &rarr;
        </a>
      </div>
    </div>
  );
}
