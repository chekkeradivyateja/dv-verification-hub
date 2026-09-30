import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: 30 September 2026</p>

      <p className="mt-6 text-muted leading-relaxed">
        This policy explains what data {SITE_NAME} collects and how it&rsquo;s used.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Who operates this site</h2>
      <p className="mt-3 text-muted leading-relaxed">
        {SITE_NAME} is operated by Teja. For any privacy question or data
        request, contact{" "}
        <a
          href="mailto:verechek.official@gmail.com"
          className="text-accent-strong hover:underline"
        >
          verechek.official@gmail.com
        </a>
        .
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Email sign-ups</h2>
      <p className="mt-3 text-muted leading-relaxed">
        If you subscribe to receive the free cheat-sheet or updates, your email
        address is collected and stored by <strong>Buttondown</strong>, our email
        provider, and used only to send the content you asked for and occasional
        related updates. You can unsubscribe at any time using the link in any
        email. We do not sell or share your email address.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Analytics</h2>
      <p className="mt-3 text-muted leading-relaxed">
        We use <strong>Vercel Analytics</strong>, a privacy-friendly service that
        measures aggregate traffic (page views, referrers) <em>without</em> using
        tracking cookies or building advertising profiles of individuals.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Purchases</h2>
      <p className="mt-3 text-muted leading-relaxed">
        When you buy a product you&rsquo;re taken to <strong>Gumroad</strong>, which
        handles your payment and any details you enter under Gumroad&rsquo;s own
        privacy policy and terms — not ours.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Hosting</h2>
      <p className="mt-3 text-muted leading-relaxed">
        The site is hosted on <strong>Vercel</strong>, which may process standard
        technical data (such as IP address) to serve and protect the site.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Your rights</h2>
      <p className="mt-3 text-muted leading-relaxed">
        Under laws such as GDPR/UK&nbsp;GDPR and CCPA you may request access to, or
        deletion of, personal data held about you. For your email, use the
        unsubscribe link or contact us and we&rsquo;ll remove you from the list.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
      <p className="mt-3 text-muted leading-relaxed">
        Email{" "}
        <a
          href="mailto:verechek.official@gmail.com"
          className="text-accent-strong hover:underline"
        >
          verechek.official@gmail.com
        </a>{" "}
        with any privacy questions, or reach us through our{" "}
        <a
          href="https://divyatejareddy.gumroad.com"
          className="text-accent-strong hover:underline"
        >
          Gumroad store
        </a>
        .
      </p>
    </div>
  );
}
