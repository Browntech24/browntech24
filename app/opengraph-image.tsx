import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Full-stack developer",
    title: "Fast, accessible web apps, built end to end.",
    footer: "React · Next.js · TypeScript · Node.js",
    meta: "Projects, writing and contact",
  });
}
