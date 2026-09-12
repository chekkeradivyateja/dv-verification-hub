import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import CtaCard from "@/components/CtaCard";
import { mdxComponents } from "@/components/MdxComponents";
import { getArticleSlugs, getArticleSource } from "@/lib/articles";
import { SITE_URL, TOPIC_LABELS } from "@/lib/site";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getArticleSlugs();
  if (!slugs.includes(slug)) return {};
  const { frontmatter } = getArticleSource(slug);
  const ogImage = `${SITE_URL}/og/${slug}.png`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    alternates: { canonical: `${SITE_URL}/articles/${slug}` },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      url: `${SITE_URL}/articles/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const slugs = getArticleSlugs();
  if (!slugs.includes(slug)) notFound();

  const { content, frontmatter } = getArticleSource(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <Link href="/articles" className="text-sm text-accent-strong hover:underline">
        &larr; All articles
      </Link>
      <span className="mt-6 block font-mono text-xs uppercase tracking-wide text-accent">
        {TOPIC_LABELS[frontmatter.topic]}
      </span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
        {frontmatter.title}
      </h1>
      <p className="mt-4 text-lg text-muted leading-relaxed">{frontmatter.description}</p>

      <div className="prose-dv mt-10">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      <CtaCard topic={frontmatter.topic} />
    </article>
  );
}
