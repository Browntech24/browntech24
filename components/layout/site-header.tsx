import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md text-sm font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-md bg-accent text-xs font-bold text-accent-foreground"
          >
            {site.initials}
          </span>
          <span>{site.brand}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <NavLinks items={site.nav} />
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav items={site.nav} />
        </div>
      </Container>
    </header>
  );
}
