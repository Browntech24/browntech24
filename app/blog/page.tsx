import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building fast, accessible web apps — placeholder page for milestone 5.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes from the build"
        description="Short, practical posts about performance, accessibility and shipping software."
      />
      <Container className="py-16">
        <p className="max-w-2xl text-muted-foreground">
          Posts, tag filtering, reading time and the RSS feed arrive with the blog milestone.
        </p>
      </Container>
    </>
  );
}
