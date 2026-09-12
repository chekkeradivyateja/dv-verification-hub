import type { Metadata } from "next";
import Link from "next/link";
import CtaCard from "@/components/CtaCard";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free DV/UVM Tools",
  description:
    "Free, client-side interactive tools for design verification engineers: a UVM testbench generator, an SVA snippet builder, and a 50-question interview bank.",
  openGraph: { images: [{ url: `${SITE_URL}/og/tools.png`, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [`${SITE_URL}/og/tools.png`] },
};

const TOOLS = [
  {
    href: "/tools/uvm-testbench-generator",
    name: "UVM Testbench Generator",
    description:
      "Pick an interface type (custom, AXI-Lite, APB) and agent config, get a ready-to-drop UVM agent/env/test skeleton with scoreboard and coverage stubs.",
  },
  {
    href: "/tools/sva-snippet-builder",
    name: "SVA Snippet Builder",
    description:
      "Pick a common assertion pattern (implication, edge-triggered, one-hot, handshake, FIFO overflow, stability window) and fill in your signal names.",
  },
  {
    href: "/tools/interview-questions",
    name: "DV Interview Question Bank",
    description:
      "50 free questions with full answers across SV basics, UVM, SVA, and coverage, filterable by topic.",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Free Tools</h1>
      <p className="mt-3 text-muted max-w-2xl">
        Everything below runs entirely in your browser. No signup, no data
        leaves your machine.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-xl border border-border bg-surface p-6 hover:border-accent/50 transition-colors flex flex-col"
          >
            <h3 className="font-semibold text-foreground group-hover:text-accent-strong transition-colors">
              {tool.name}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">{tool.description}</p>
            <span className="mt-4 text-sm font-mono text-accent">run &rarr;</span>
          </Link>
        ))}
      </div>
      <CtaCard />
    </div>
  );
}
