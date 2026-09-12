import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ArticleTopic } from "./site";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleFrontmatter = {
  title: string;
  description: string;
  topic: ArticleTopic;
  date: string;
  keywords?: string[];
};

export type ArticleSummary = ArticleFrontmatter & { slug: string };

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleSource(slug: string): { content: string; frontmatter: ArticleFrontmatter } {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.mdx`), "utf8");
  const { content, data } = matter(raw);
  return { content, frontmatter: data as ArticleFrontmatter };
}

export function getAllArticles(): ArticleSummary[] {
  return getArticleSlugs()
    .map((slug) => {
      const { frontmatter } = getArticleSource(slug);
      return { slug, ...frontmatter };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
