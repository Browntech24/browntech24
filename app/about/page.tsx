import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience and resume — placeholder page for milestone 4.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A developer who cares about the details"
        description="Bio, experience timeline, education and resume download land here next."
      />
      <Container className="py-16">
        <p className="max-w-2xl text-muted-foreground">
          This page will be driven by a single content file so the story, timeline and skills stay
          in sync with the rest of the site.
        </p>
      </Container>
    </>
  );
}
