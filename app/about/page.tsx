import type { Metadata } from "next";
import { ArrowRight, Download, Mail } from "lucide-react";

import { ContactCta } from "@/components/sections/contact-cta";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { GitHubIcon } from "@/components/ui/social-icons";
import { profile } from "@/lib/profile";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Eugene Brown is a full-stack developer building fast, accessible web applications with React, Next.js and Node.js.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const github = site.socials.find((social) => social.icon === "github");

  return (
    <>
      <PageHeader eyebrow="About" title={site.name} description={profile.headline} />

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div>
            <div className="space-y-5 text-pretty text-muted-foreground">
              {profile.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <SectionHeading
                id="experience-heading"
                eyebrow="Experience"
                title="What I've been building"
              />

              {profile.experience.length > 0 ? (
                <ol className="mt-8 space-y-8 border-l border-border pl-6">
                  {profile.experience.map((entry) => (
                    <li key={`${entry.period}-${entry.role}`} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 -left-[1.9rem] size-2.5 rounded-full border-2 border-background bg-accent"
                      />
                      <p className="text-sm font-medium text-accent">{entry.period}</p>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight">{entry.role}</h3>
                      <p className="text-sm text-muted-foreground">{entry.organisation}</p>
                      <p className="mt-3 text-pretty text-muted-foreground">{entry.summary}</p>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                        {entry.highlights.map((highlight) => (
                          <li key={highlight.slice(0, 32)}>{highlight}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>

            <div className="mt-14">
              <SectionHeading id="skills-heading" eyebrow="Toolkit" title="Skills" />
              <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {profile.skills.map((group) => (
                  <div key={group.label}>
                    <dt className="text-sm font-medium tracking-[0.14em] text-accent uppercase">
                      {group.label}
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-border bg-surface p-6">
              <div
                aria-hidden="true"
                className="grid aspect-square place-items-center rounded-xl border border-border bg-[radial-gradient(120%_120%_at_20%_0%,var(--accent-subtle),var(--surface-2))]"
              >
                <span className="text-5xl font-semibold tracking-tight text-accent/45">
                  {site.initials}
                </span>
              </div>

              <p className="mt-5 text-sm text-muted-foreground">{profile.shortBio}</p>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={profile.resumePath}
                  download
                  className={buttonVariants({ variant: "primary" })}
                >
                  <Download aria-hidden="true" className="size-4" />
                  Download resume
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  <Mail aria-hidden="true" className="size-4" />
                  Email me
                </a>
                <a
                  href={github?.href ?? site.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  <GitHubIcon aria-hidden="true" className="size-4" />
                  GitHub
                </a>
              </div>

              <p className="mt-5 text-xs text-muted-foreground">
                Prefer a conversation?{" "}
                <a
                  href="/contact"
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  Use the contact page
                  <ArrowRight aria-hidden="true" className="ml-1 inline size-3" />
                </a>
              </p>
            </div>
          </aside>
        </div>
      </Container>

      <ContactCta />
    </>
  );
}
