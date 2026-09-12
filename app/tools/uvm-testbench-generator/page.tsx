import type { Metadata } from "next";
import CtaCard from "@/components/CtaCard";
import UvmGeneratorClient from "@/components/UvmGeneratorClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "UVM Testbench Skeleton Generator",
  description:
    "Free tool: pick an interface type and agent config to generate a ready-to-use UVM agent, sequencer, driver, monitor, env, and test skeleton.",
  openGraph: {
    images: [{ url: `${SITE_URL}/og/uvm-testbench-generator.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/og/uvm-testbench-generator.png`],
  },
};

export default function UvmTestbenchGeneratorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">UVM Testbench Skeleton Generator</h1>
      <p className="mt-3 text-muted max-w-2xl">
        Pick an interface type and agent config below. Everything runs in your
        browser &mdash; nothing is uploaded anywhere. Copy the files into your
        project and fill in the protocol-specific driving logic marked with
        TODOs.
      </p>
      <div className="mt-10">
        <UvmGeneratorClient />
      </div>
      <CtaCard topic="uvm" />
    </div>
  );
}
