import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Tag } from "@/components/ui/tag";
import { getAllPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on performance, accessibility, content pipelines and the unglamorous parts of shipping software.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes from the build"
        description="Short, practical posts about performance, accessibility and shipping software."
      />

      <Container className="py-16">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((post) => (
              <li key={post.slug} className="py-9 first:pt-0 last:pb-0">
                <article>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTimeMinutes} min read</span>
                    {post.draft ? <Tag>Draft</Tag> : null}
                  </div>

                  <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">{post.excerpt}</p>

                  {post.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <Tag>{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
