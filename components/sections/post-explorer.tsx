"use client";

import { useId, useMemo, useState } from "react";

import { PostListItem } from "@/components/ui/post-list-item";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/content";

type PostExplorerProps = {
  posts: Post[];
};

export function PostExplorer({ posts }: PostExplorerProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const headingId = useId();

  const tags = useMemo(
    () => [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b)),
    [posts],
  );

  const visible = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="sr-only">
        All posts
      </h2>

      {tags.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-muted-foreground">Filter by topic</span>
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeTag === null
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground",
            )}
          >
            All
          </button>
          {tags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(isActive ? null : tag)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      ) : null}

      <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        {visible.length} {visible.length === 1 ? "post" : "posts"}
        {activeTag ? ` about ${activeTag}` : ""}
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 text-muted-foreground">Nothing filed under {activeTag} yet.</p>
      ) : (
        <ul className="mt-2 divide-y divide-border">
          {visible.map((post) => (
            <li key={post.slug} className="py-9 first:pt-6 last:pb-0">
              <PostListItem post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
