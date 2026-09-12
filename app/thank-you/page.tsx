import type { Metadata } from "next";
import Link from "next/link";
import { LEAD_MAGNET_PDF_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thanks — Here's Your Cheat-Sheet",
  description: "Download your free DV interview cheat-sheet PDF.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wide text-accent">One more step</p>
      <h1 className="mt-3 text-3xl font-semibold text-foreground">
        Check your inbox to confirm, then grab your PDF
      </h1>
      <p className="mt-4 text-muted leading-relaxed">
        We sent a confirmation email to the address you entered. Once you
        confirm, you&rsquo;re on the list. You can also download the
        cheat-sheet right now:
      </p>
      <a
        href={LEAD_MAGNET_PDF_PATH}
        className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-strong transition-colors"
      >
        Download the cheat-sheet (PDF) &rarr;
      </a>
      <p className="mt-10 text-sm text-muted">
        <Link href="/articles" className="text-accent-strong hover:underline">
          Browse more articles
        </Link>{" "}
        or{" "}
        <Link href="/tools" className="text-accent-strong hover:underline">
          try the free tools
        </Link>
        .
      </p>
    </div>
  );
}
