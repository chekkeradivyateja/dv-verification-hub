# Adding content — no code changes required

This site is designed so you can add articles (and, with a bit more effort,
tools) without ever opening this repo's app logic again. Everything below
assumes you're in the project root (`dv-verification-hub/`).

## Add a new article

1. Create a new file in `content/articles/`, e.g.
   `content/articles/uvm-callbacks-explained.mdx`. The filename (minus
   `.mdx`) becomes the URL: `/articles/uvm-callbacks-explained`.

2. Start the file with frontmatter, then write the article in Markdown/MDX
   below it:

   ```mdx
   ---
   title: "UVM Callbacks Explained"
   description: "One or two sentences -- this shows in search results and article cards."
   topic: "uvm"
   date: "2026-03-01"
   keywords: ["uvm callback example", "uvm_callback vs factory override"]
   ---

   Your article content here. Regular Markdown works (headings, lists,
   **bold**, tables, links). Fenced code blocks get a copy button and syntax
   label automatically:

   \`\`\`systemverilog
   class my_callback extends uvm_callback;
     // ...
   endclass
   \`\`\`
   ```

3. `topic` must be one of the values defined in `lib/site.ts` under
   `ArticleTopic`: `sv-basics`, `uvm`, `sva`, `coverage`, `eda-tools`,
   `protocols`. If you want a new topic category, add it to the
   `ArticleTopic` type and `TOPIC_LABELS` in `lib/site.ts` (two lines).

4. That's it. The article automatically:
   - appears on the homepage's "Latest articles" section (sorted by `date`)
   - appears on `/articles` and is filterable by its `topic`
   - gets its own page at `/articles/<filename>` with a CTA card at the
     bottom (Gumroad + email capture)
   - is added to `sitemap.xml`
   - gets a real OG image generated automatically on the next `npm run
     build` (via `scripts/generate-og.mjs`, which reads the `title` and
     `topic` frontmatter)

No file other than the new `.mdx` needs to be touched.

## Add a new free tool

Tools take more effort since they're interactive, but the pattern is
consistent:

1. Put any code-generation logic in a plain TypeScript file under `lib/`
   (see `lib/uvmTemplates.ts` or `lib/svaTemplates.ts` for the pattern —
   pure functions, no React).
2. Build a client component in `components/` (`"use client"` at the top)
   that holds form state and renders `<CopyableCode />` for output — see
   `components/SvaBuilderClient.tsx` for the simplest example to copy.
3. Add a route folder under `app/tools/<your-tool>/page.tsx` — a server
   component with `export const metadata = {...}` for SEO, rendering your
   client component plus `<CtaCard topic="..." />` at the bottom.
4. Add the tool to the `TOOLS` array in `app/tools/page.tsx` and `app/page.tsx`
   (homepage) so it's discoverable.
5. Add the route to `STATIC_ROUTES` in `app/sitemap.ts`.
6. Add an entry to the `pages` array in `scripts/generate-og.mjs` so it gets
   a real OG image.

## Regenerating OG images manually

OG images regenerate automatically as part of `npm run build` (via the
`prebuild` npm script). To regenerate them without a full build:

```bash
npm run generate-og
```

Generated PNGs land in `public/og/` (gitignored — they're build output, not
source).

## Things you will NOT need to touch for routine content updates

- `app/layout.tsx`, `app/globals.css` — site chrome/theme
- `components/CtaCard.tsx`, `components/EmailSignupForm.tsx` — shared CTA,
  reused everywhere automatically
- `app/robots.ts`, `app/sitemap.ts` — pull from `content/articles/`
  automatically

## Updating the Gumroad / Buttondown config

All of it lives in one file: `lib/site.ts`.

- `GUMROAD_BUNDLE_URL` / `GUMROAD_DOC_URLS` — swap in real per-doc Gumroad
  links once you have them (currently all topics fall back to the bundle
  link).
- `BUTTONDOWN_USERNAME` — set this once you create your free Buttondown
  account (see the punch list from the original build for details).
- `LEAD_MAGNET_PDF_PATH` — path to the real cheat-sheet PDF once you've
  replaced the placeholder in `public/downloads/`.
