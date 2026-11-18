# Personal Portfolio Website: Specification

> Fill in every `[TODO]` before starting development. Everything else is a sensible default you can change.

## 1. Overview

| Item                   | Value                                                                    |
| ---------------------- | ------------------------------------------------------------------------ |
| Owner                  | [TODO: your name]                                                        |
| Role / tagline         | [TODO: e.g. "Full-stack developer building fast, accessible web apps"]   |
| Purpose                | Showcase projects, tell my story, attract job offers / freelance clients |
| Target audience        | Recruiters, hiring managers, potential clients, fellow developers        |
| Primary call to action | Contact me / view my projects                                            |
| Domain                 | [TODO: e.g. yourname.dev]                                                |

### Success criteria

- Visitor understands who I am and what I do within 5 seconds of landing.
- Lighthouse scores of 90+ for Performance, Accessibility, Best Practices, SEO.
- Contact form delivers messages reliably to my inbox.
- I can add a new project or blog post in under 10 minutes without touching layout code.

## 2. Tech Stack

| Layer            | Choice                                           | Notes                                                |
| ---------------- | ------------------------------------------------ | ---------------------------------------------------- |
| Framework        | Next.js (App Router) + TypeScript                | Static generation for speed and SEO                  |
| Styling          | Tailwind CSS                                     | Design tokens in `tailwind.config.ts`                |
| Content          | MDX files in `/content`                          | Projects and blog posts as Markdown with frontmatter |
| Animation        | Framer Motion (subtle only)                      | Respect `prefers-reduced-motion`                     |
| Forms            | Next.js Route Handler + Resend (or Formspree)    | Email delivery, spam protection                      |
| Spam protection  | Honeypot field + Cloudflare Turnstile (optional) |                                                      |
| Analytics        | Plausible or Vercel Analytics                    | Privacy-friendly                                     |
| Hosting          | Vercel                                           | Preview deploys on every PR                          |
| Linting / format | ESLint, Prettier, Husky pre-commit               |                                                      |
| Testing          | Playwright (smoke + a11y checks)                 | Optional unit tests with Vitest                      |

## 3. Site Map and Routes

```
/                       Home
/projects               Projects index
/projects/[slug]        Project case study
/about                  About + resume/CV
/blog                   Blog index
/blog/[slug]            Blog post
/contact                Contact form
/resume.pdf             Downloadable CV (static asset)
/rss.xml                Blog RSS feed
/sitemap.xml, /robots.txt
/404                    Custom not-found page
```

## 4. Pages and Features

### 4.1 Global layout

- **Header:** logo/name, nav links (Projects, About, Blog, Contact), theme toggle.
- **Footer:** social links (GitHub, LinkedIn, X, email), copyright, RSS link.
- Sticky header on scroll, collapses to hamburger menu on mobile.
- Skip-to-content link for keyboard users.
- Light/dark mode, defaulting to system preference, saved to localStorage.

### 4.2 Home (`/`)

1. **Hero:** name, tagline, one-sentence intro, buttons: "View projects" and "Contact me".
2. **Featured projects:** 3 cards (image, title, short description, tech tags).
3. **Short about teaser:** photo, 2-3 sentences, link to `/about`.
4. **Skills snapshot:** grouped tech icons or tags.
5. **Latest blog posts:** 2-3 most recent.
6. **Closing CTA:** "Let's work together" with link to `/contact`.

### 4.3 Projects (`/projects`, `/projects/[slug]`)

**Index**

- Grid of project cards, filter by tech tag (client-side).
- Card: cover image, title, one-line summary, tags, links (live, repo).

**Case study page**

- Title, summary, role, timeline, tech stack, links (live demo, GitHub).
- Sections: Problem, Approach, Solution, Results/Learnings.
- Image or video gallery with alt text.
- "Next project" navigation.

**Project frontmatter**

```yaml
title: ""
slug: ""
summary: ""
date: 2026-01-01
featured: true
cover: "/images/projects/slug/cover.jpg"
tags: ["Next.js", "TypeScript"]
role: ""
links:
  live: ""
  repo: ""
```

### 4.4 About + Resume (`/about`)

- Photo and personal bio (professional story, interests).
- Experience timeline (company, role, dates, highlights).
- Education and certifications.
- Skills grouped by category (Frontend, Backend, Tools, etc.).
- "Download resume" button linking to `/resume.pdf`.

### 4.5 Blog (`/blog`, `/blog/[slug]`)

- Index: list of posts sorted by date, with title, date, reading time, tags, excerpt.
- Tag filter and pagination (or "load more") once there are more than 10 posts.
- Post page: MDX rendering, syntax-highlighted code blocks (Shiki or rehype-pretty-code), table of contents, reading time, share links.
- RSS feed generated at build time.

**Post frontmatter**

```yaml
title: ""
slug: ""
date: 2026-01-01
excerpt: ""
tags: []
cover: ""
draft: false
```

Posts with `draft: true` are excluded from production builds.

### 4.6 Contact (`/contact`)

- Fields: name, email, subject (optional), message.
- Client and server validation (e.g. Zod); inline error messages.
- Honeypot field + rate limiting (e.g. 5 submissions per IP per hour).
- States: idle, submitting, success, error.
- Messages sent to my email via Resend/Formspree; no data stored long-term.
- Also show direct email and social links as fallbacks.

## 5. Design Direction

- **Style:** clean, minimal, content-first; generous whitespace.
- **Typography:** one sans-serif for UI and body (e.g. Inter), optional monospace for code (e.g. JetBrains Mono).
- **Color:** neutral base with one accent color [TODO: pick accent]. Define as CSS variables for light and dark themes.
- **Layout:** max content width ~1100px; 12-column grid on desktop, single column on mobile.
- **Components:** Button, Card, Tag, Section heading, Container, Timeline, Form field, Toast.
- **Motion:** fade/slide on scroll, hover states; disabled with `prefers-reduced-motion`.
- **Imagery:** optimized with `next/image`, WebP/AVIF, always with alt text.
- **Inspiration:** [TODO: 2-3 portfolio links you like]

## 6. Non-Functional Requirements

### Performance

- Static generation (SSG) for all pages except the contact API route.
- LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Total JS per page under ~150 KB gzipped where possible.
- Fonts via `next/font` with `display: swap`.

### Accessibility (WCAG 2.2 AA)

- Semantic HTML, proper heading hierarchy.
- Color contrast of at least 4.5:1 for body text.
- Full keyboard navigation with visible focus states.
- ARIA only where native semantics fall short.
- Form labels and error messages announced to screen readers.

### SEO

- Unique title and meta description per page.
- Open Graph and Twitter card images (dynamic via `next/og`).
- Structured data (JSON-LD `Person`, `BlogPosting`).
- Sitemap, robots.txt, canonical URLs.

### Security and privacy

- Environment variables for API keys; never committed.
- Security headers (CSP, X-Frame-Options, Referrer-Policy).
- Input sanitization on the contact endpoint.
- No cookies beyond theme preference; privacy-friendly analytics only.

### Responsive

- Breakpoints: 360px (mobile), 768px (tablet), 1024px+ (desktop).
- Tested on latest Chrome, Safari, Firefox, and Edge.

## 7. Project Structure

```
/app
  layout.tsx
  page.tsx
  /projects
    page.tsx
    /[slug]/page.tsx
  /about/page.tsx
  /blog
    page.tsx
    /[slug]/page.tsx
  /contact/page.tsx
  /api/contact/route.ts
  rss.xml/route.ts
  sitemap.ts
  robots.ts
  not-found.tsx
/components
  /ui          (Button, Card, Tag, ...)
  /layout      (Header, Footer, ThemeToggle)
  /sections    (Hero, FeaturedProjects, ...)
/content
  /projects    (*.mdx)
  /blog        (*.mdx)
/lib
  content.ts   (load and parse MDX)
  validators.ts
  seo.ts
/public
  /images
  resume.pdf
/styles
  globals.css
tailwind.config.ts
```

## 8. Environment Variables

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ANALYTICS_DOMAIN=
TURNSTILE_SECRET_KEY=        # optional
```

## 9. Development Milestones

| #   | Milestone        | Deliverables                                                         |
| --- | ---------------- | -------------------------------------------------------------------- |
| 1   | Setup            | Repo, Next.js + TS + Tailwind, lint/format, CI, Vercel project       |
| 2   | Design system    | Tokens, theme toggle, base components, header/footer                 |
| 3   | Content pipeline | MDX loading, frontmatter schema, sample project and post             |
| 4   | Pages            | Home, Projects (index + detail), About                               |
| 5   | Blog             | Index, post page, tags, RSS, code highlighting                       |
| 6   | Contact          | Form, validation, API route, email delivery, spam protection         |
| 7   | Polish           | Animations, OG images, SEO, structured data, 404                     |
| 8   | QA and launch    | Lighthouse, a11y audit, cross-browser test, custom domain, analytics |

## 10. Acceptance Checklist

- [ ] All routes in Section 3 render without errors.
- [ ] Projects and blog posts are driven entirely by MDX content files.
- [ ] Contact form validates, sends email, and shows success/error states.
- [ ] Dark and light modes work with no flash on load.
- [ ] Lighthouse 90+ in all four categories on mobile.
- [ ] Keyboard-only navigation works across the whole site.
- [ ] OG images and meta tags verified with a social preview tool.
- [ ] Resume PDF downloads correctly.
- [ ] Sitemap and RSS feed are valid.
- [ ] No secrets in the repo; env vars configured in Vercel.

## 11. Content Checklist (to prepare)

- [ ] Professional headshot
- [ ] Short bio (50 words and 200 words)
- [ ] 3-6 projects with screenshots, descriptions, links, and outcomes
- [ ] Up-to-date resume PDF
- [ ] Work experience and education details
- [ ] Social profile URLs
- [ ] 1-2 starter blog posts

## 12. Future Enhancements (out of scope for v1)

- Testimonials section
- Search across blog and projects
- Newsletter signup
- i18n (multiple languages)
- CMS integration (e.g. Sanity or Contentlayer)
- Comments on blog posts

## 13. Open Questions

- [TODO] Domain name and registrar
- [TODO] Accent color and visual references
- [TODO] Preferred email service for the contact form
- [TODO] Deployment target if not Vercel
