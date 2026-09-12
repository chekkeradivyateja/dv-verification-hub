import { GUMROAD_DOC_URLS, GUMROAD_BUNDLE_URL } from "@/lib/site";
import EmailSignupForm from "./EmailSignupForm";

export default function CtaCard({ topic }: { topic?: string }) {
  const gumroadUrl = (topic && GUMROAD_DOC_URLS[topic]) || GUMROAD_BUNDLE_URL;

  return (
    <div className="not-prose my-12 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-accent/30 bg-accent-soft p-6 flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-wide text-accent-strong">
          Want the full roadmap?
        </p>
        <h3 className="text-lg font-semibold text-foreground">
          Roadmap to Verification Engineer
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          Five in-depth docs covering SystemVerilog, SVA, UVM, EDA Tools, and
          Python for VLSI. $10 each or $35 for the full bundle.
        </p>
        <a
          href={gumroadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent-strong transition-colors"
        >
          Get it on Gumroad &rarr;
        </a>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">
          Not ready to buy?
        </p>
        <h3 className="text-lg font-semibold text-foreground">
          Free DV interview cheat-sheet
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          Get a free PDF chapter covering the most-asked UVM/SV interview
          questions, straight to your inbox.
        </p>
        <div className="mt-auto">
          <EmailSignupForm tag={topic ?? "general"} />
        </div>
      </div>
    </div>
  );
}
