import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedProjects } from "@/lib/content";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects(3);

  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="featured-projects-heading" className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="featured-projects-heading"
            eyebrow="Selected work"
            title="Featured projects"
            description="A few problems worth solving, written up as full case studies."
          />
          <Link
            href="/projects"
            className="-my-1 inline-block py-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            All projects
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
