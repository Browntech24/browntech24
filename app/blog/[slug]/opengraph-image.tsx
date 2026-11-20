import { getPost, getPublishedPostSlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Article on Brown Portfolio";
export const size = ogSize;
export const contentType = ogContentType;

/** Prerender one image per post instead of generating them on demand. */
export function generateStaticParams() {
  return getPublishedPostSlugs().then((slugs) => slugs.map((slug) => ({ slug })));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return renderOgImage({
    eyebrow: post ? `Writing · ${post.readingTimeMinutes} min read` : "Writing",
    title: post?.title ?? "Notes from the build",
    footer: post ? formatDate(post.date) : "Brown Portfolio",
    meta: post && post.tags.length > 0 ? post.tags.slice(0, 3).join(" · ") : "Blog",
  });
}
