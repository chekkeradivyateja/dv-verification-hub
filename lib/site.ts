export const SITE_NAME = "DV Verification Hub";
export const SITE_TAGLINE =
  "Free UVM, SystemVerilog, and SVA reference from a working DV engineer";

// Swap this for your real production domain once you buy/point one.
// Used for canonical URLs, sitemap.xml, robots.txt, and OG tags.
export const SITE_URL = "https://dv-verification-hub.vercel.app";

// Your Gumroad account + bundle.
export const GUMROAD_BUNDLE_URL = "https://divyatejareddy.gumroad.com/l/ttcedz";

// Per-topic doc links, keyed by ArticleTopic so CtaCard's `topic` prop
// resolves directly. Any topic not listed here (e.g. "protocols", which has
// no dedicated doc) safely falls back to the bundle link above.
export const GUMROAD_DOC_URLS: Record<string, string> = {
  "sv-basics": "https://divyatejareddy.gumroad.com/l/zidswul", // SystemVerilog Complete Guide
  uvm: "https://divyatejareddy.gumroad.com/l/danhu", // UVM From Zero to Hero
  sva: "https://divyatejareddy.gumroad.com/l/kesaga", // SVA -- Assertions & Coverage Made Simple
  coverage: "https://divyatejareddy.gumroad.com/l/kesaga", // same doc covers coverage
  "eda-tools": "https://divyatejareddy.gumroad.com/l/kbapes", // EDA Tools -- VCS, Questa, Xcelium
  python: "https://divyatejareddy.gumroad.com/l/eadoj", // Python for VLSI Automation
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
