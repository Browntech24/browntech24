import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { placeholderProjects } from "@/lib/placeholder-data";

export function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-projects-heading" className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="featured-projects-heading"
            eyebrow="Selected work"
            title="Featured projects"
            description="A few problems worth solving. Full case studies are on the way."
          />
          <Link
            href="/projects"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            All projects
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderProjects.map((project) => (
            <li key={project.slug}>
              <Card className="h-full overflow-hidden">
                <div
                  aria-hidden="true"
                  className="aspect-[16/10] border-b border-border bg-[radial-gradient(120%_120%_at_0%_0%,var(--accent-subtle),var(--surface-2))]"
                />
                <CardContent className="pt-5">
                  {/* Static until the MDX pipeline lands in M4. */}
                  <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {project.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
