import Link from "next/link";
import CtaCard from "@/components/CtaCard";
import { getAllArticles } from "@/lib/articles";
import { TOPIC_LABELS } from "@/lib/site";

const TOOLS = [
  {
    href: "/tools/uvm-testbench-generator",
    name: "UVM Testbench Generator",
    description:
      "Pick an interface type and agent config, get a ready-to-drop UVM agent/env/test skeleton.",
  },
  {
    href: "/tools/sva-snippet-builder",
    name: "SVA Snippet Builder",
    description:
      "Pick a common assertion pattern, fill in your signal names, get a working property block.",
  },
  {
    href: "/tools/interview-questions",
    name: "DV Interview Question Bank",
    description:
      "50 free questions with answers across SV basics, UVM, SVA, and coverage.",
  },
];

export default function Home() {
  const latestArticles = getAllArticles().slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="py-20 sm:py-28 border-b border-border">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
          Free &middot; No signup wall &middot; Written by a working DV engineer
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground max-w-3xl leading-[1.1]">
          UVM and SystemVerilog reference for verification engineers, not marketing copy.
        </h1>
        <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
          Real code, real interview questions, and free interactive tools for
          the SV/UVM stack &mdash; built by someone who ships testbenches for a
          living. When you want the deeper, structured version, it&rsquo;s a
          $35 bundle away.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/articles"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent-strong transition-colors"
          >
            Browse articles
          </Link>
          <Link
            href="/tools"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent/50 transition-colors"
          >
            Try the tools
          </Link>
          <a
            href="https://divyatejareddy.gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-accent/40 bg-accent-soft px-5 py-2.5 text-sm font-semibold text-accent-strong hover:bg-accent/20 transition-colors"
          >
            See the Gumroad bundle
          </a>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 border-b border-border">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Free interactive tools</h2>
          <Link href="/tools" className="text-sm text-accent-strong hover:underline">
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
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
      </section>

      {/* Articles */}
      <section className="py-16 border-b border-border">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Latest articles</h2>
          <Link href="/articles" className="text-sm text-accent-strong hover:underline">
            View all &rarr;
          </Link>
        </div>
        {latestArticles.length === 0 ? (
          <p className="text-sm text-muted">Articles are being published &mdash; check back soon.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group rounded-xl border border-border bg-surface p-6 hover:border-accent/50 transition-colors flex flex-col"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide text-accent">
                  {TOPIC_LABELS[article.topic]}
                </span>
                <h3 className="mt-2 font-semibold text-foreground group-hover:text-accent-strong transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Credibility blurb */}
      <section className="py-16 border-b border-border grid gap-8 sm:grid-cols-2 items-start">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Why this site exists</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Most SV/UVM content online is either outdated vendor documentation
            or interview-question lists with no real explanation. This is a
            free reference built from actual verification work &mdash;
            testbench structure, assertions, and coverage models that show up
            in real projects and real interviews.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Want the structured version?</h2>
          <p className="mt-4 text-muted leading-relaxed">
            &ldquo;Roadmap to Verification Engineer&rdquo; is five focused docs
            &mdash; SystemVerilog, SVA, UVM, EDA Tools, and Python for VLSI
            &mdash; for engineers who want a study path instead of scattered
            blog posts. $10 each, or $35 for all five.
          </p>
        </div>
      </section>

      <CtaCard />
    </div>
  );
}
