"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import type { ArticleSummary } from "@/lib/articles";
import { TOPIC_LABELS, type ArticleTopic } from "@/lib/site";

export default function ArticleFilters({ articles }: { articles: ArticleSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Driven directly by the URL (not local state) so a tab click is a real
  // browser-history entry: pressing Back/Forward moves between topic
  // filters instead of leaving the page entirely, on any device.
  const active = (searchParams.get("topic") as ArticleTopic | null) ?? "all";
  const topics = Array.from(new Set(articles.map((a) => a.topic)));
  const visible = active === "all" ? articles : articles.filter((a) => a.topic === active);

  function selectTopic(topic: ArticleTopic | "all") {
    const qs = topic === "all" ? "" : `?topic=${topic}`;
    router.push(`${pathname}${qs}`, { scroll: false });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => selectTopic("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-mono border transition-colors ${
            active === "all"
              ? "border-accent bg-accent-soft text-accent-strong"
              : "border-border text-muted hover:text-foreground"
          }`}
        >
          all ({articles.length})
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => selectTopic(topic)}
            className={`rounded-full px-3 py-1.5 text-xs font-mono border transition-colors ${
              active === topic
                ? "border-accent bg-accent-soft text-accent-strong"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {TOPIC_LABELS[topic]} ({articles.filter((a) => a.topic === topic).length})
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group rounded-xl border border-border bg-surface p-6 hover:border-accent/50 transition-colors flex flex-col"
          >
            <span className="font-mono text-[11px] uppercase tracking-wide text-accent">
              {TOPIC_LABELS[article.topic]}
            </span>
            <h3 className="mt-2 font-semibold text-foreground group-hover:text-accent-strong transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
              {article.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
