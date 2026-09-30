import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${SITE_NAME}.`,
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Disclaimer</h1>
      <p className="mt-2 text-sm text-muted">Last updated: 30 September 2026</p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Educational content</h2>
      <p className="mt-3 text-muted leading-relaxed">
        {SITE_NAME} shares technical articles and tools about design verification
        (SystemVerilog, UVM, SVA, and related topics) for general educational
        purposes. It is not professional or career advice, and code examples are
        provided as-is without warranty.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">No guaranteed outcomes</h2>
      <p className="mt-3 text-muted leading-relaxed">
        Studying this material may help you prepare, but we make no promise of any
        specific result — interview success, a job offer, or otherwise. Outcomes
        depend on your own preparation and circumstances.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Accuracy &amp; third parties</h2>
      <p className="mt-3 text-muted leading-relaxed">
        Tools, standards, and EDA products evolve; we aim to keep content correct
        but cannot guarantee it — always verify against official documentation.
        Trademarks (e.g. tool and vendor names) belong to their respective owners
        and are referenced for description only; those companies do not endorse us.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
      <p className="mt-3 text-muted leading-relaxed">
        {SITE_NAME} is operated by Teja. Questions:{" "}
        <a
          href="mailto:verechek.official@gmail.com"
          className="text-accent-strong hover:underline"
        >
          verechek.official@gmail.com
        </a>
        .
      </p>
    </div>
  );
}
