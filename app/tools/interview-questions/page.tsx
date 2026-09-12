import type { Metadata } from "next";
import CtaCard from "@/components/CtaCard";
import QuestionBank from "@/components/QuestionBank";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "DV Interview Question Bank (50 Free Questions)",
  description:
    "50 free design verification interview questions with answers, covering SystemVerilog basics, UVM, SVA, and functional coverage. Filterable by topic.",
  openGraph: {
    images: [{ url: `${SITE_URL}/og/interview-questions.png`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [`${SITE_URL}/og/interview-questions.png`] },
};

export default function InterviewQuestionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">DV Interview Question Bank</h1>
      <p className="mt-3 text-muted max-w-2xl">
        50 free questions with real answers, not one-liners. Filter by topic
        and click a question to reveal the answer.
      </p>
      <div className="mt-10">
        <QuestionBank />
      </div>
      <CtaCard topic="uvm" />
    </div>
  );
}
