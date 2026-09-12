// Prebuild step: renders a real per-page OG image (1200x630 PNG) into
// public/og/<slug>.png for every article and tool, using satori + resvg.
// Runs entirely at build time -- no runtime cost, no edge function needed,
// compatible with `next build` + `output: 'export'`.
//
// If font download fails (e.g. no network in a sandboxed build), this script
// warns and exits without generating images rather than failing the build --
// pages simply reference a missing OG image, which does not break `next build`.

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import matter from "gray-matter";

const ROOT = process.cwd();
const OG_DIR = path.join(ROOT, "public", "og");
const FONT_CACHE_DIR = path.join(ROOT, ".og-fonts-cache");

const FONTS = [
  {
    name: "JetBrains Mono",
    weight: 700,
    file: "JetBrainsMono-Bold.ttf",
    url: "https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Bold.ttf",
  },
  {
    name: "JetBrains Mono",
    weight: 400,
    file: "JetBrainsMono-Regular.ttf",
    url: "https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Regular.ttf",
  },
];

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadFonts() {
  await mkdir(FONT_CACHE_DIR, { recursive: true });
  const loaded = [];
  for (const font of FONTS) {
    const cachePath = path.join(FONT_CACHE_DIR, font.file);
    if (!(await fileExists(cachePath))) {
      const res = await fetch(font.url);
      if (!res.ok) throw new Error(`Failed to fetch font ${font.url}: ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(cachePath, buf);
    }
    const data = await readFile(cachePath);
    loaded.push({ name: font.name, data, weight: font.weight, style: "normal" });
  }
  return loaded;
}

function card({ eyebrow, title }) {
  return {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#060809",
        backgroundImage:
          "radial-gradient(circle at 15% 15%, rgba(45,212,191,0.18), rgba(6,8,9,0) 55%)",
        padding: "72px",
        fontFamily: "JetBrains Mono",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", gap: "12px" },
            children: [
              {
                type: "div",
                props: {
                  style: { color: "#2dd4bf", fontSize: "32px", fontWeight: 700 },
                  children: ">",
                },
              },
              {
                type: "div",
                props: {
                  style: { color: "#e6edf3", fontSize: "28px", fontWeight: 700 },
                  children: "DV Verification Hub",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: "20px" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: "#5eead4",
                    fontSize: "24px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  },
                  children: eyebrow,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: "#e6edf3",
                    fontSize: "52px",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    maxWidth: "1000px",
                  },
                  children: title,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function renderOg(fonts, { slug, eyebrow, title }) {
  const svg = await satori(card({ eyebrow, title }), {
    width: 1200,
    height: 630,
    fonts,
  });
  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();
  await writeFile(path.join(OG_DIR, `${slug}.png`), png);
}

async function main() {
  await mkdir(OG_DIR, { recursive: true });

  let fonts;
  try {
    fonts = await loadFonts();
  } catch (err) {
    console.warn("[generate-og] Skipping OG image generation:", err.message);
    return;
  }

  const pages = [
    { slug: "home", eyebrow: "Free DV Reference", title: "UVM & SystemVerilog Reference" },
    { slug: "articles", eyebrow: "Free Articles", title: "UVM & SystemVerilog Articles" },
    { slug: "tools", eyebrow: "Free Tools", title: "Interactive UVM & SVA Tools" },
    {
      slug: "uvm-testbench-generator",
      eyebrow: "Free Tool",
      title: "UVM Testbench Skeleton Generator",
    },
    { slug: "sva-snippet-builder", eyebrow: "Free Tool", title: "SVA Snippet Builder" },
    {
      slug: "interview-questions",
      eyebrow: "Free Tool",
      title: "50 DV Interview Questions & Answers",
    },
  ];

  const articlesDir = path.join(ROOT, "content", "articles");
  const articleFiles = (await import("node:fs")).readdirSync(articlesDir).filter((f) => f.endsWith(".mdx"));
  for (const file of articleFiles) {
    const raw = await readFile(path.join(articlesDir, file), "utf8");
    const { data } = matter(raw);
    pages.push({
      slug: file.replace(/\.mdx$/, ""),
      eyebrow: data.topic ?? "Article",
      title: data.title ?? file,
    });
  }

  for (const page of pages) {
    await renderOg(fonts, page);
  }

  console.log(`[generate-og] Generated ${pages.length} OG images in public/og/`);
}

main();
