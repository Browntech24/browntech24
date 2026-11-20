"use client";

import { useId, useMemo, useState } from "react";

import { ProjectCard, type ProjectCardData } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";

type ProjectExplorerProps = {
  projects: ProjectCardData[];
};

export function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const headingId = useId();

  const tags = useMemo(
    () =>
      [...new Set(projects.flatMap((project) => project.tags))].sort((a, b) => a.localeCompare(b)),
    [projects],
  );

  const visible = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="sr-only">
        All projects
      </h2>

      {tags.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-muted-foreground">Filter by tech</span>
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeTag === null
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground",
            )}
          >
            All
          </button>
          {tags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(isActive ? null : tag)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      ) : null}

      <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {activeTag ? ` tagged ${activeTag}` : ""}
      </p>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} titleAs="h3" />
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="mt-6 text-muted-foreground">Nothing tagged {activeTag} yet.</p>
      ) : null}
    </section>
  );
}
