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
  name: "Your Name",
  initials: "YN",
  role: "Full-stack developer building fast, accessible web apps",
  intro:
    "I turn complex problems into simple, reliable products — from the first wireframe to the last deploy.",
  description:
    "Portfolio of Your Name, a full-stack developer focused on performance, accessibility and thoughtful interface design.",
  email: "hello@example.com",
  url: resolveSiteUrl(),
  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ] satisfies readonly NavItem[],
  socials: [
    { label: "GitHub", href: "https://github.com/yourusername", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yourusername", icon: "linkedin" },
    { label: "X", href: "https://x.com/yourusername", icon: "x" },
    { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
  ] satisfies readonly SocialLink[],
} as const;
