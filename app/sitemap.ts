import type { MetadataRoute } from "next";

import { getAllPosts, getAllProjects } from "@/lib/content";
import { site } from "@/lib/site";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
  { url: `${site.url}/projects`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.7 },
  { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getAllPosts(), getAllProjects()]);

  return [
    ...staticRoutes,
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified: new Date(`${project.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
