import type { ComponentType, ComponentProps } from "react";
import { Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/social-icons";
import { site, type SocialIcon } from "@/lib/site";

type IconComponent = ComponentType<ComponentProps<"svg">>;

const iconMap: Record<SocialIcon, IconComponent> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  mail: Mail,
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} {site.name}. All rights reserved.
          </p>
          <a
            href="/rss.xml"
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            RSS
          </a>
        </div>

        <ul className="flex items-center gap-1">
          {site.socials.map((social) => {
            const Icon = iconMap[social.icon];
            const isExternal = social.href.startsWith("http");

            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                  className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  <Icon aria-hidden="true" className="size-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </footer>
  );
}
