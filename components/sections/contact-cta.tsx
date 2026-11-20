import { Mail } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function ContactCta() {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-border py-20 sm:py-24">
      <Container>
        <div className="rounded-card border border-border bg-[radial-gradient(120%_140%_at_50%_0%,var(--accent-subtle),var(--surface))] px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-sm font-medium tracking-[0.14em] text-accent uppercase">Next step</p>
          <h2
            id="cta-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            Let&apos;s work together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            I&apos;m open to full-time roles and focused freelance work. Tell me what you&apos;re
            building and where it hurts.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Start a conversation
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary" size="lg">
              <Mail aria-hidden="true" className="size-4" />
              Email me
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
