import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,var(--accent-subtle),transparent)]"
      />

      <Container className="relative py-20 sm:py-28">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Open to new opportunities
          </p>

          <p className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-subtle px-3 py-1 text-xs font-medium text-accent">
            <Sparkles aria-hidden="true" className="size-3.5" />
            {site.aiRole}
          </p>
        </div>

        <h1
          id="hero-heading"
          className="mt-7 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          {site.name}
          <span className="mt-3 block text-xl font-normal text-pretty text-muted-foreground sm:text-2xl">
            {site.role}
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
          {site.intro}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href="/projects" size="lg">
            View projects
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
          <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Contact me
          </Link>
        </div>
      </Container>
    </section>
  );
}
