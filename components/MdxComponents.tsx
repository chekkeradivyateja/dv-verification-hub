import type { MDXComponents } from "mdx/types";
import type { ReactElement } from "react";
import CopyableCode from "./CopyableCode";

function extractText(node: unknown): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as ReactElement<{ children?: unknown }>).props?.children);
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  pre: (props) => {
    const child = props.children as ReactElement<{ className?: string; children?: unknown }>;
    const className = child?.props?.className ?? "";
    const match = /language-(\w+)/.exec(className);
    const code = extractText(child?.props?.children).replace(/\n$/, "");
    return <CopyableCode code={code} language={match?.[1] ?? "text"} />;
  },
};
