import type { Metadata } from "next";
import CtaCard from "@/components/CtaCard";
import SvaBuilderClient from "@/components/SvaBuilderClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "SVA Snippet Builder",
  description:
    "Free tool: pick a common SystemVerilog assertion pattern (implication, edge-triggered, one-hot, handshake, FIFO overflow, stability) and generate working SVA code.",
  openGraph: {
    images: [{ url: `${SITE_URL}/og/sva-snippet-builder.png`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [`${SITE_URL}/og/sva-snippet-builder.png`] },
};

export default function SvaSnippetBuilderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">SVA Snippet Builder</h1>
      <p className="mt-3 text-muted max-w-2xl">
        Pick a common assertion pattern, fill in your signal names, get a
        working <code className="font-mono text-accent-strong">property</code> +{" "}
        <code className="font-mono text-accent-strong">assert property</code> block.
        Runs entirely client-side.
      </p>
      <div className="mt-10">
        <SvaBuilderClient />
      </div>
      <CtaCard topic="sva" />
    </div>
  );
}
