import type { Heading } from "@/lib/content";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  headings: Heading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-labelledby="toc-label"
      className="rounded-card border border-border bg-surface px-5 py-4"
    >
      <p
        id="toc-label"
        className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
      >
        On this page
      </p>
      <ol className="mt-3 space-y-1.5 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && "pl-4")}>
            <a
              href={`#${heading.id}`}
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
