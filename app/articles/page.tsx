import type { Metadata } from "next";
import ArticleFilters from "@/components/ArticleFilters";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "DV/UVM Articles",
  description:
    "Free, in-depth articles on SystemVerilog, UVM, and SVA for verification engineers, filterable by topic.",
  openGraph: { images: [{ url: `${SITE_URL}/og/articles.png`, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [`${SITE_URL}/og/articles.png`] },
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-foreground">Articles</h1>
      <p className="mt-3 text-muted max-w-2xl">
        Long-form, code-first references for the questions DV engineers
        actually search for. New ones added regularly.
      </p>
      <div className="mt-10">
        <ArticleFilters articles={articles} />
      </div>
    </div>
  );
}
