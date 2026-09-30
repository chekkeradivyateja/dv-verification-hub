import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted">Last updated: 30 September 2026</p>

      <p className="mt-6 text-muted leading-relaxed">
        By using {SITE_NAME} you agree to these terms. If you don&rsquo;t agree,
        please don&rsquo;t use the site.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Content</h2>
      <p className="mt-3 text-muted leading-relaxed">
        Articles, tools, and guides are provided free for educational purposes.
        We aim for accuracy but make no warranty that content is complete,
        current, or suitable for your specific use. Verify anything important
        before relying on it.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Products &amp; purchases</h2>
      <p className="mt-3 text-muted leading-relaxed">
        Paid products are sold through <strong>Gumroad</strong>, which handles
        payment, delivery, and refunds under Gumroad&rsquo;s own terms and refund
        policy. Review the product page and Gumroad&rsquo;s terms before buying.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">No guarantees</h2>
      <p className="mt-3 text-muted leading-relaxed">
        We do not guarantee any specific result — including interview outcomes,
        job offers, or income — from using our content or products. Results depend
        on your own effort and circumstances.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Intellectual property</h2>
      <p className="mt-3 text-muted leading-relaxed">
        The content and branding on this site are ours. You may read and share
        links, but please don&rsquo;t republish the content as your own. Product
        names and trademarks referenced belong to their respective owners.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Limitation of liability</h2>
      <p className="mt-3 text-muted leading-relaxed">
        To the maximum extent permitted by law, {SITE_NAME} is not liable for any
        loss or damage arising from use of the site or reliance on its content.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Changes</h2>
      <p className="mt-3 text-muted leading-relaxed">
        We may update these terms; the &ldquo;last updated&rdquo; date shows the
        current version.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
      <p className="mt-3 text-muted leading-relaxed">
        {SITE_NAME} is operated by Teja. Questions about these terms:{" "}
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
