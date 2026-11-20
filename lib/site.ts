/**
 * Single source of truth for identity, navigation and social links.
 * TODO(content): replace every placeholder value with real content before launch.
 */
export type SocialIcon = "github" | "linkedin" | "x" | "mail";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export type NavItem = {
  href: string;
  label: string;
};

const fallbackSiteUrl = "http://localhost:3000";

function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return configured && configured.length > 0 ? configured.replace(/\/+$/, "") : fallbackSiteUrl;
}

export const site = {
  /** Wordmark used in the header and as the site name in metadata. */
  brand: "Brown Portfolio",
  name: "Eugene Brown",
  initials: "EB",
  role: "Full-stack developer building fast, accessible web apps",
  /** Shown next to the hero's availability badge. */
  aiRole: "AI Engineer",
  intro:
    "I turn complex problems into simple, reliable products — from the first wireframe to the last deploy.",
  description:
    "Portfolio of Eugene Brown, a full-stack developer focused on performance, accessibility and thoughtful interface design.",
  email: "eugenebrown4life@yahoo.com",
  url: resolveSiteUrl(),
  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ] satisfies readonly NavItem[],
  socials: [
    { label: "GitHub", href: "https://github.com/Browntech24", icon: "github" },
    { label: "Email", href: "mailto:eugenebrown4life@yahoo.com", icon: "mail" },
  ] satisfies readonly SocialLink[],
} as const;
