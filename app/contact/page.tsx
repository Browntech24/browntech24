import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — placeholder page, form arrives in milestone 6.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's work together"
        description="The form, validation and email delivery are coming next. Email works today."
      />
      <Container className="py-16">
        <p className="text-muted-foreground">
          Reach me at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
      </Container>
    </>
  );
}
