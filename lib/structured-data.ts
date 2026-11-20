import type { Post, Project } from "@/lib/content";
import { site } from "@/lib/site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Full-stack developer",
    description: site.description,
    sameAs: site.socials.filter((social) => social.icon !== "mail").map((social) => social.href),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "Web accessibility",
      "Web performance",
    ],
  };
}

export function blogPostingJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: `${post.date}T00:00:00Z`,
    dateModified: `${post.date}T00:00:00Z`,
    url: `${site.url}/blog/${post.slug}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    image: `${site.url}/blog/${post.slug}/opengraph-image`,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${site.url}/projects/${project.slug}`,
    dateCreated: `${project.date}T00:00:00Z`,
    image: `${site.url}/projects/${project.slug}/opengraph-image`,
    keywords: project.tags.join(", "),
    creator: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };
}
