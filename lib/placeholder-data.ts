/**
 * Temporary data for the M1 design-system pass. Replaced by the MDX content
 * pipeline in M3 — do not import this outside of placeholder sections.
 */
export type PlaceholderProject = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
};

export const placeholderProjects: PlaceholderProject[] = [
  {
    slug: "signal-dashboard",
    title: "Signal Dashboard",
    summary: "Real-time analytics for a logistics fleet, built for low-bandwidth field teams.",
    tags: ["Next.js", "TypeScript", "WebSockets"],
  },
  {
    slug: "ledger-api",
    title: "Ledger API",
    summary:
      "Double-entry accounting service processing millions of events with strict audit trails.",
    tags: ["Node.js", "PostgreSQL", "Redis"],
  },
  {
    slug: "atlas-design-system",
    title: "Atlas Design System",
    summary: "Accessible component library and tokens adopted by six product teams.",
    tags: ["React", "Storybook", "a11y"],
  },
];
