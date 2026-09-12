export const SITE_NAME = "DV Verification Hub";
export const SITE_TAGLINE =
  "Free UVM, SystemVerilog, and SVA reference from a working DV engineer";

// Swap this for your real production domain once you buy/point one.
// Used for canonical URLs, sitemap.xml, robots.txt, and OG tags.
export const SITE_URL = "https://dv-verification-hub.vercel.app";

// Your Gumroad account + bundle.
export const GUMROAD_BUNDLE_URL =
  "https://divyatejareddy.gumroad.com/l/roadmap-to-verification-engineer";

// Per-topic doc links. Fill in the real Gumroad product slugs for each of the
// five docs here once you have them handy -- until then every CTA safely
// falls back to the bundle link above. See CONTENT.md.
export const GUMROAD_DOC_URLS: Record<string, string> = {
  systemverilog: GUMROAD_BUNDLE_URL,
  sva: GUMROAD_BUNDLE_URL,
  uvm: GUMROAD_BUNDLE_URL,
  "eda-tools": GUMROAD_BUNDLE_URL,
  python: GUMROAD_BUNDLE_URL,
};

// Buttondown newsletter username -- https://dvverificationhub.buttondown.email
export const BUTTONDOWN_USERNAME = "dvverificationhub";

export const BUTTONDOWN_FORM_ACTION = `https://buttondown.email/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`;

// Path to the lead-magnet PDF you'll drop into /public. See CONTENT.md.
export const LEAD_MAGNET_PDF_PATH = "/downloads/dv-interview-cheatsheet.pdf";

export type ArticleTopic =
  | "sv-basics"
  | "uvm"
  | "sva"
  | "coverage"
  | "eda-tools"
  | "protocols";

export const TOPIC_LABELS: Record<ArticleTopic, string> = {
  "sv-basics": "SystemVerilog Basics",
  uvm: "UVM",
  sva: "SVA / Assertions",
  coverage: "Coverage",
  "eda-tools": "EDA Tools",
  protocols: "Bus Protocols",
};
