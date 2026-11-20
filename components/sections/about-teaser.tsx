import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/lib/profile";
import { site } from "@/lib/site";

export function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-teaser-heading"
      className="border-t border-border py-20 sm:py-24"
    >
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-16">
          <div>
            <SectionHeading
              id="about-teaser-heading"
              eyebrow="About"
              title="Careful software, plainly built"
            />
            <p className="mt-5 max-w-2xl text-pretty text-muted-foreground">{profile.bio[0]}</p>
            <Link
              href="/about"
              className="-my-1 inline-flex items-center gap-2 py-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              More about me
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div
            aria-hidden="true"
            className="grid aspect-square w-full place-items-center rounded-card border border-border bg-[radial-gradient(120%_120%_at_20%_0%,var(--accent-subtle),var(--surface-2))] md:aspect-auto md:h-full md:min-h-56"
          >
            <span className="text-5xl font-semibold tracking-tight text-accent/45">
              {site.initials}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
