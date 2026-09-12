"use client";

import { useState } from "react";
import {
  QUESTIONS,
  QUESTION_TOPIC_LABELS,
  type QuestionTopic,
} from "@/lib/questions";

export default function QuestionBank() {
  const [active, setActive] = useState<QuestionTopic | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = active === "all" ? QUESTIONS : QUESTIONS.filter((q) => q.topic === active);
  const topics = Object.keys(QUESTION_TOPIC_LABELS) as QuestionTopic[];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-mono border transition-colors ${
            active === "all"
              ? "border-accent bg-accent-soft text-accent-strong"
              : "border-border text-muted hover:text-foreground"
          }`}
        >
          all ({QUESTIONS.length})
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setActive(topic)}
            className={`rounded-full px-3 py-1.5 text-xs font-mono border transition-colors ${
              active === topic
                ? "border-accent bg-accent-soft text-accent-strong"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {QUESTION_TOPIC_LABELS[topic]} ({QUESTIONS.filter((q) => q.topic === topic).length})
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((q) => {
          const open = openId === q.id;
          return (
            <div key={q.id} className="rounded-lg border border-border bg-surface overflow-hidden">
              <button
                onClick={() => setOpenId(open ? null : q.id)}
                className="w-full flex items-start justify-between gap-4 text-left px-5 py-4"
              >
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-accent">
                    {QUESTION_TOPIC_LABELS[q.topic]}
                  </span>
                  <p className="mt-1 font-medium text-foreground">{q.question}</p>
                </div>
                <span className="shrink-0 text-muted font-mono text-sm mt-1">{open ? "-" : "+"}</span>
              </button>
              {open && (
                <div className="px-5 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">
                  {q.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
