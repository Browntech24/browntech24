import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { PostListItem } from "@/components/ui/post-list-item";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts } from "@/lib/content";

export async function LatestPosts() {
  const posts = (await getAllPosts()).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="latest-posts-heading"
      className="border-t border-border py-20 sm:py-24"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="latest-posts-heading"
            eyebrow="Writing"
            title="Latest notes"
            description="Short, practical posts about the unglamorous parts of shipping software."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            All posts
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ul className="mt-10 divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-8 first:pt-0 last:pb-0">
              <PostListItem post={post} titleAs="h3" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
