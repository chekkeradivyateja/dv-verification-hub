// Generates the free lead-magnet PDF (public/downloads/dv-interview-cheatsheet.pdf)
// straight from lib/questions.ts, so the PDF and the on-site question bank never
// drift out of sync. Run manually with `npm run generate-cheatsheet` whenever
// lib/questions.ts changes -- this is not part of the Next.js build, since the
// PDF is a checked-in static asset, not build output.

import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";
import { QUESTIONS, QUESTION_TOPIC_LABELS, type QuestionTopic } from "../lib/questions";
import { SITE_URL, GUMROAD_BUNDLE_URL } from "../lib/site";

const OUT_PATH = path.join(process.cwd(), "public", "downloads", "dv-interview-cheatsheet.pdf");

const ACCENT = "#0f766e";
const INK = "#111827";
const MUTED = "#6b7280";
const RULE = "#e5e7eb";

const TOPIC_ORDER: QuestionTopic[] = ["sv-basics", "uvm", "sva", "coverage"];

const MARGIN = 56;
const PAGE_OPTS = {
  size: "A4" as const,
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
};

function ensurePageSpace(doc: PDFKit.PDFDocument, needed: number) {
  const bottom = doc.page.height - doc.page.margins.bottom;
  if (doc.y + needed > bottom) doc.addPage();
}

function main() {
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });

  const doc = new PDFDocument(PAGE_OPTS);
  doc.pipe(fs.createWriteStream(OUT_PATH));
  doc.info.Title = "DV Interview Cheat-Sheet";
  doc.info.Author = "DV Verification Hub";

  // ---- Cover page ----
  doc.fillColor(ACCENT).font("Courier-Bold").fontSize(14).text("> DV Verification Hub", { align: "left" });
  doc.moveDown(3);
  doc
    .fillColor(INK)
    .font("Helvetica-Bold")
    .fontSize(30)
    .text("DV Interview Cheat-Sheet", { align: "left" });
  doc.moveDown(0.5);
  doc
    .font("Helvetica")
    .fontSize(14)
    .fillColor(MUTED)
    .text(`${QUESTIONS.length} free interview questions with real answers`, { align: "left" });
  doc.moveDown(0.3);
  doc
    .fontSize(12)
    .text("SystemVerilog basics, UVM, SVA, and functional coverage -- written by a working DV/UVM engineer.", {
      align: "left",
    });

  doc.moveDown(2);
  doc.strokeColor(RULE).lineWidth(1).moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
  doc.moveDown(1.5);

  doc.fontSize(11).fillColor(INK).font("Helvetica-Bold").text("What's inside:");
  doc.moveDown(0.3);
  for (const topic of TOPIC_ORDER) {
    const count = QUESTIONS.filter((q) => q.topic === topic).length;
    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor(INK)
      .text(`-  ${QUESTION_TOPIC_LABELS[topic]} (${count} questions)`);
  }

  doc.moveDown(2);
  doc
    .fontSize(10)
    .fillColor(MUTED)
    .text(
      `Want more? The full interactive version -- filterable, searchable -- is free at ${SITE_URL}/tools/interview-questions`,
      { align: "left" }
    );

  doc.addPage();

  // ---- Questions, grouped by topic ----
  for (const topic of TOPIC_ORDER) {
    const questions = QUESTIONS.filter((q) => q.topic === topic);

    ensurePageSpace(doc, 60);
    doc.moveDown(0.5);
    doc
      .fillColor(ACCENT)
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(QUESTION_TOPIC_LABELS[topic]);
    doc.moveDown(0.5);
    doc.strokeColor(RULE).lineWidth(1).moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
    doc.moveDown(0.8);

    for (const q of questions) {
      const qHeight = doc.heightOfString(q.question, {
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
      });
      ensurePageSpace(doc, qHeight + 40);

      doc
        .fillColor(INK)
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(q.question, {
          width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
        });
      doc.moveDown(0.25);
      doc
        .fillColor(MUTED)
        .font("Helvetica")
        .fontSize(10)
        .text(q.answer, {
          width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
          lineGap: 1,
        });
      doc.moveDown(0.9);
    }
  }

  // ---- Closing CTA page ----
  doc.addPage();
  doc.moveDown(4);
  doc
    .fillColor(INK)
    .font("Helvetica-Bold")
    .fontSize(20)
    .text("Want the deeper, structured version?", { align: "left" });
  doc.moveDown(0.6);
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor(MUTED)
    .text(
      '"Roadmap to Verification Engineer" is five focused docs -- SystemVerilog, SVA, UVM, EDA Tools, and Python for VLSI -- for engineers who want a study path instead of scattered blog posts. $10 each, or $35 for all five.',
      { width: doc.page.width - doc.page.margins.left - doc.page.margins.right }
    );
  doc.moveDown(1.2);
  doc.fillColor(ACCENT).font("Helvetica-Bold").fontSize(12).text(GUMROAD_BUNDLE_URL, {
    link: GUMROAD_BUNDLE_URL,
    underline: true,
  });

  doc.moveDown(3);
  doc
    .fillColor(INK)
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("More free tools:");
  doc.moveDown(0.4);
  const tools: [string, string][] = [
    ["UVM Testbench Skeleton Generator", `${SITE_URL}/tools/uvm-testbench-generator`],
    ["SVA Snippet Builder", `${SITE_URL}/tools/sva-snippet-builder`],
    ["Full Interview Question Bank", `${SITE_URL}/tools/interview-questions`],
    ["All Articles", `${SITE_URL}/articles`],
  ];
  for (const [label, url] of tools) {
    doc.font("Helvetica").fontSize(11).fillColor(ACCENT).text(`${label} -- ${url}`, { link: url });
    doc.moveDown(0.3);
  }

  doc.end();

  doc.on("end", () => {
    console.log(`[generate-cheatsheet] Wrote ${OUT_PATH}`);
  });
}

main();
