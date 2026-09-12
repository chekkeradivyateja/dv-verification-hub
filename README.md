# DV Verification Hub

Free, SEO-driven UVM/SystemVerilog learning hub that funnels visitors into the
["Roadmap to Verification Engineer"](https://divyatejareddy.gumroad.com) Gumroad
bundle. Fully static (Next.js App Router, `output: 'export'`), zero server,
zero database, deployable for $0 on Vercel's free tier.

## Local development

```bash
npm install
npm run dev
```

## Production build (matches what Vercel runs)

```bash
npm run build   # runs scripts/generate-og.mjs, then next build -> out/
```

## Adding content

See [CONTENT.md](./CONTENT.md) — adding an article is: drop one `.mdx` file
in `content/articles/`, done. No code changes required.

## Deploying

See the deploy/subdomain/punch-list instructions given at the end of the
original build conversation, or:

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel
   auto-detects Next.js, no config needed.
3. Before going live, set the real values in `lib/site.ts`
   (`SITE_URL`, `BUTTONDOWN_USERNAME`, `GUMROAD_DOC_URLS`) and replace the
   placeholder PDF at `public/downloads/dv-interview-cheatsheet.pdf`.
