import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { GitHubIcon } from "@/components/ui/social-icons";
import { Tag } from "@/components/ui/tag";
import { getAdjacentProjects, getProject, getProjectSlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";
import { projectJsonLd } from "@/lib/structured-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      siteName: site.brand,
      locale: "en_US",
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      publishedTime: project.date,
      images: [`/projects/${project.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const { previous, next } = await getAdjacentProjects(project.slug);
  const Content = project.Content;

  return (
    <article>
      <JsonLd data={projectJsonLd(project)} />
      <header className="border-b border-border bg-surface/60">
        <Container className="py-16 sm:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All projects
          </Link>

          <p className="mt-6 text-sm font-medium tracking-[0.14em] text-accent uppercase">
            Case study
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-pretty text-muted-foreground">
            {project.summary}
          </p>

          <dl className="mt-10 grid gap-6 text-sm sm:grid-cols-3">
            {project.role ? (
              <div>
                <dt className="text-muted-foreground">Role</dt>
                <dd className="mt-1 font-medium text-foreground">{project.role}</dd>
              </div>
            ) : null}
            {project.timeline ? (
              <div>
                <dt className="text-muted-foreground">Timeline</dt>
                <dd className="mt-1 font-medium text-foreground">{project.timeline}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-muted-foreground">Shipped</dt>
              <dd className="mt-1 font-medium text-foreground">
                <time dateTime={project.date}>{formatDate(project.date)}</time>
              </dd>
            </div>
          </dl>

          {project.tags.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          ) : null}

          {project.links.live || project.links.repo ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live ? (
                <ButtonLink href={project.links.live} target="_blank" rel="noreferrer noopener">
                  View live site
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </ButtonLink>
              ) : null}
              {project.links.repo ? (
                <ButtonLink
                  href={project.links.repo}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <GitHubIcon aria-hidden="true" className="size-4" />
                  Source
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </Container>
      </header>

      <Container className="py-14">
        <div className="mx-auto max-w-3xl">
          <Content />
        </div>
      </Container>

      <nav aria-label="Project navigation" className="border-t border-border">
        <Container className="grid gap-4 py-8 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group rounded-card border border-border p-5 transition-colors hover:border-accent/50"
            >
              <span className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                <ArrowLeft aria-hidden="true" className="size-3.5" />
                Previous
              </span>
              <span className="mt-2 block font-semibold transition-colors group-hover:text-accent">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-card border border-border p-5 text-right transition-colors hover:border-accent/50 sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-2 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Next
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </span>
              <span className="mt-2 block font-semibold transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : null}
        </Container>
      </nav>
    </article>
  );
}
