import fs from "node:fs";
import path from "node:path";

import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";
import { z } from "zod";

export type MdxContent = ComponentType<{ components?: MDXComponents }>;

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIRECTORY = path.join(CONTENT_ROOT, "projects");
const BLOG_DIRECTORY = path.join(CONTENT_ROOT, "blog");

/* -------------------------------------------------------------------------- */
/* Schemas                                                                     */
/* -------------------------------------------------------------------------- */

const dateOnly = z
  .union([z.string().min(1), z.date()])
  .transform((value) => {
    if (value instanceof Date) return value;
    const normalized = value.length === 10 ? `${value}T00:00:00Z` : value;
    return new Date(normalized);
  })
  .refine((date) => !Number.isNaN(date.getTime()), { message: "Expected a valid date" })
  .transform((date) => date.toISOString().slice(0, 10));

const optionalUrl = z.union([z.literal(""), z.url()]).optional();

const projectFrontmatterSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  summary: z.string().trim().min(1, "Summary is required").max(320),
  date: dateOnly,
  featured: z.boolean().default(false),
  cover: z.string().trim().optional(),
  tags: z.array(z.string().trim().min(1)).default([]),
  role: z.string().trim().optional(),
  timeline: z.string().trim().optional(),
  links: z
    .object({
      live: optionalUrl,
      repo: optionalUrl,
    })
    .default({}),
});

const postFrontmatterSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  date: dateOnly,
  excerpt: z.string().trim().min(1, "Excerpt is required").max(320),
  tags: z.array(z.string().trim().min(1)).default([]),
  cover: z.string().trim().optional(),
  draft: z.boolean().default(false),
});

export type Project = z.infer<typeof projectFrontmatterSchema> & {
  readingTimeMinutes: number;
};

export type ProjectEntry = Project & {
  Content: MdxContent;
};

export type Post = z.infer<typeof postFrontmatterSchema> & {
  readingTimeMinutes: number;
};

export type PostEntry = Post & {
  Content: MdxContent;
};

type MdxModule = {
  default: MdxContent;
  frontmatter: unknown;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function listSlugs(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.slice(0, -4))
    .sort();
}

function readSource(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Content file not found: ${path.relative(process.cwd(), filePath)}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function parseFrontmatter<T extends { slug: string }>(
  schema: z.ZodType<T>,
  value: unknown,
  filePath: string,
  slug: string,
): T {
  const result = schema.safeParse(value);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `Invalid frontmatter in ${path.relative(process.cwd(), filePath)}:\n${details}`,
    );
  }

  if (result.data.slug !== slug) {
    throw new Error(
      `Slug mismatch in ${path.relative(process.cwd(), filePath)}: frontmatter says "${result.data.slug}" but the filename says "${slug}".`,
    );
  }

  return result.data;
}

/** Rough estimate that accounts for code being slower to read than prose. */
function estimateReadingTime(source: string): number {
  const body = source
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ");

  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

async function importProjectModule(slug: string): Promise<MdxModule> {
  // Turbopack turns this into a context module for content/projects/*.mdx.
  return import(`@/content/projects/${slug}.mdx`);
}

async function importPostModule(slug: string): Promise<MdxModule> {
  return import(`@/content/blog/${slug}.mdx`);
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

const projectCache = new Map<string, Promise<ProjectEntry>>();

function loadProject(slug: string): Promise<ProjectEntry> {
  const cached = projectCache.get(slug);
  if (cached) return cached;

  const promise = (async () => {
    const filePath = path.join(PROJECTS_DIRECTORY, `${slug}.mdx`);
    const source = readSource(filePath);
    const mdxModule = await importProjectModule(slug);
    const frontmatter = parseFrontmatter(
      projectFrontmatterSchema,
      mdxModule.frontmatter,
      filePath,
      slug,
    );

    return {
      ...frontmatter,
      readingTimeMinutes: estimateReadingTime(source),
      Content: mdxModule.default,
    };
  })();

  projectCache.set(slug, promise);
  return promise;
}

export function getProjectSlugs(): string[] {
  return listSlugs(PROJECTS_DIRECTORY);
}

export async function getAllProjects(): Promise<ProjectEntry[]> {
  const projects = await Promise.all(getProjectSlugs().map(loadProject));
  return projects.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectEntry[]> {
  const projects = await getAllProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

export async function getProject(slug: string): Promise<ProjectEntry | null> {
  if (!getProjectSlugs().includes(slug)) return null;
  return loadProject(slug);
}

export async function getAdjacentProjects(slug: string) {
  const projects = await getAllProjects();
  const index = projects.findIndex((project) => project.slug === slug);

  return {
    previous: index > 0 ? (projects[index - 1] ?? null) : null,
    next: index >= 0 ? (projects[index + 1] ?? null) : null,
  };
}

export async function getProjectTags(): Promise<string[]> {
  const projects = await getAllProjects();
  return [...new Set(projects.flatMap((project) => project.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}

/* -------------------------------------------------------------------------- */
/* Blog                                                                        */
/* -------------------------------------------------------------------------- */

const postCache = new Map<string, Promise<PostEntry>>();

function loadPost(slug: string): Promise<PostEntry> {
  const cached = postCache.get(slug);
  if (cached) return cached;

  const promise = (async () => {
    const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
    const source = readSource(filePath);
    const mdxModule = await importPostModule(slug);
    const frontmatter = parseFrontmatter(
      postFrontmatterSchema,
      mdxModule.frontmatter,
      filePath,
      slug,
    );

    return {
      ...frontmatter,
      readingTimeMinutes: estimateReadingTime(source),
      Content: mdxModule.default,
    };
  })();

  postCache.set(slug, promise);
  return promise;
}

/** Drafts are visible while authoring, but never in a production build. */
export function isPublished(post: Pick<Post, "draft">): boolean {
  return process.env.NODE_ENV === "development" || !post.draft;
}

export function getPostSlugs(): string[] {
  return listSlugs(BLOG_DIRECTORY);
}

export async function getAllPosts(): Promise<PostEntry[]> {
  const posts = await Promise.all(getPostSlugs().map(loadPost));
  return posts.filter(isPublished).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

export async function getPost(slug: string): Promise<PostEntry | null> {
  if (!getPostSlugs().includes(slug)) return null;

  const post = await loadPost(slug);
  return isPublished(post) ? post : null;
}

export async function getPostTags(): Promise<string[]> {
  const posts = await getAllPosts();
  return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
}
