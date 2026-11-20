import type { Metadata } from "next";

import { PostExplorer } from "@/components/sections/post-explorer";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on performance, accessibility, content pipelines and the unglamorous parts of shipping software.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    siteName: site.brand,
    locale: "en_US",
    title: "Blog",
    description:
      "Notes on performance, accessibility, content pipelines and the unglamorous parts of shipping software.",
    url: "/blog",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Notes on performance, accessibility, content pipelines and the unglamorous parts of shipping software.",
  },
};

export default async function BlogPage() {
  const posts = (await getAllPosts()).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
    draft: post.draft,
    readingTimeMinutes: post.readingTimeMinutes,
  }));

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
          <PostExplorer posts={posts} />
        )}
      </Container>
    </>
  );
}
