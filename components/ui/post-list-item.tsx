import Link from "next/link";

import { Tag } from "@/components/ui/tag";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

type PostListItemProps = {
  post: Post;
  /** h2 on the blog index, h3 inside a home-page section. */
  titleAs?: "h2" | "h3";
};

export function PostListItem({ post, titleAs: Title = "h2" }: PostListItemProps) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTimeMinutes} min read</span>
        {post.draft ? <Tag>Draft</Tag> : null}
      </div>

      <Title className="mt-2 text-xl font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent">
          {post.title}
        </Link>
      </Title>

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
  );
}
