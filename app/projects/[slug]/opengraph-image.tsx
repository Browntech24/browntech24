import { getProject, getProjectSlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Project case study on Brown Portfolio";
export const size = ogSize;
export const contentType = ogContentType;

/** Prerender one image per project instead of generating them on demand. */
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  return renderOgImage({
    eyebrow: "Case study",
    title: project?.title ?? "Projects",
    footer: project ? formatDate(project.date) : "Selected work",
    meta: project && project.tags.length > 0 ? project.tags.slice(0, 3).join(" · ") : "Projects",
  });
}
