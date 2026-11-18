import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and side projects — placeholder page for milestone 4.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        description="Case studies are being written. In the meantime, the featured work on the home page shows the shape of things."
      />
      <Container className="py-16">
        <p className="max-w-2xl text-muted-foreground">
          The filterable project index, tech tags and individual case-study pages arrive with the
          MDX content pipeline.
        </p>
      </Container>
    </>
  );
}
