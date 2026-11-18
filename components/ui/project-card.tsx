import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

function initials(title: string) {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

type ProjectCardProps = {
  project: Project;
  /** Match the surrounding document outline: h2 on indexes, h3 inside sections. */
  titleAs?: "h2" | "h3";
  className?: string;
};

export function ProjectCard({ project, titleAs: Title = "h3", className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "h-full overflow-hidden transition-colors focus-within:border-accent/60 hover:border-accent/50",
        className,
      )}
    >
      <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col">
        <div
          aria-hidden="true"
          className="grid aspect-[16/10] place-items-center border-b border-border bg-[radial-gradient(120%_120%_at_0%_0%,var(--accent-subtle),var(--surface-2))]"
        >
          <span className="text-4xl font-semibold tracking-tight text-accent/35">
            {initials(project.title)}
          </span>
        </div>
        <CardContent className="flex flex-1 flex-col pt-5">
          <Title className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {project.title}
          </Title>
          <p className="mt-2 text-sm text-pretty text-muted-foreground">{project.summary}</p>
          {project.tags.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-auto pt-5 text-xs text-muted-foreground">
            <time dateTime={project.date}>{formatDate(project.date)}</time>
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
