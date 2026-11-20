import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { GitHubIcon } from "@/components/ui/social-icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation about a role, a project or a problem worth fixing.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: site.brand,
    locale: "en_US",
    title: "Contact",
    description: "Start a conversation about a role, a project or a problem worth fixing.",
    url: "/contact",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description: "Start a conversation about a role, a project or a problem worth fixing.",
  },
};

export default function ContactPage() {
  const github = site.socials.find((social) => social.icon === "github");

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's work together"
        description="Hiring, a project with a deadline, or a question about something I wrote — it all lands in the same inbox."
      />

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            <ContactForm />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-border bg-surface p-6">
              <h2 className="text-sm font-medium tracking-[0.14em] text-accent uppercase">
                Direct
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="break-all">{site.email}</span>
                  </a>
                </li>
                {github ? (
                  <li>
                    <a
                      href={github.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <GitHubIcon
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-accent"
                      />
                      <span>github.com/Browntech24</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="rounded-card border border-border p-6">
              <h2 className="flex items-center gap-2 text-sm font-medium tracking-[0.14em] text-accent uppercase">
                <Clock aria-hidden="true" className="size-4" />
                Response time
              </h2>
              <p className="mt-3 text-sm text-pretty text-muted-foreground">
                I usually reply within two working days. If your message is time-sensitive, say so
                in the subject and use the direct email above.
              </p>
            </div>

            <div className="rounded-card border border-border p-6">
              <h2 className="text-sm font-medium tracking-[0.14em] text-accent uppercase">
                Good fits
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                <li>Full-stack or frontend roles on a product team</li>
                <li>Focused builds: a marketing site, a reader, an internal tool</li>
                <li>Performance and accessibility rescues</li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
