import type { Metadata } from "next";

import { ProjectExplorer } from "@/components/sections/project-explorer";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies on performance, reliability and design systems — what the problem was and what changed.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = (await getAllProjects()).map((project) => ({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    date: project.date,
    tags: project.tags,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        description="Case studies on performance, reliability and design systems. Each one covers the problem, the trade-offs and the outcome."
      />

      <Container className="py-16">
        {projects.length === 0 ? (
          <p className="text-muted-foreground">No projects yet.</p>
        ) : (
          <ProjectExplorer projects={projects} />
        )}
      </Container>
    </>
  );
}
