import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ShareLinks } from "@/components/blog/share-links";
import { Container } from "@/components/ui/container";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { Tag } from "@/components/ui/tag";
import { getPost, getPublishedPostSlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPostSlugs().then((slugs) => slugs.map((slug) => ({ slug })));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const Content = post.Content;

  return (
    <article className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All posts
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} min read</span>
            {post.draft ? <Tag>Draft</Tag> : null}
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">{post.excerpt}</p>

          {post.tags.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8">
            <TableOfContents headings={post.headings} />
          </div>

          <hr className="my-10 border-border" />

          <Content />

          <footer className="mt-14 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to all posts
            </Link>
            <ShareLinks url={`${site.url}/blog/${post.slug}`} title={post.title} />
          </footer>
        </div>
      </Container>
    </article>
  );
}
