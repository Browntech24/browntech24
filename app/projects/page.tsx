import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/ui/project-card";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies on performance, reliability and design systems — what the problem was and what changed.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

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
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} titleAs="h2" />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
