# Brown Portfolio

Personal portfolio and writing site for Eugene Brown: Next.js (App Router), TypeScript, Tailwind CSS 4,
MDX content.

**Live:** https://browntech24.vercel.app

The full specification lives in [`spec.md`](./spec.md). This README records the decisions made
before development and how to work with the repo.

## Status

**Milestones 1–7 are done; 8 (QA and launch) is complete apart from the manual steps listed below.**

- **M1 — setup and design system:** App Router scaffold, Tailwind 4 tokens, light/dark theme with no
  flash, base UI components, sticky header and mobile menu, footer, security headers, lint/format/
  typecheck and CI.
- **M2 — placeholder content and identity:** brand ("Brown Portfolio"), name, email and GitHub set in
  `lib/site.ts`; sample content replaced with real work, including the Ade Goes to School case study.
- **M3 — MDX content pipeline:** `content/projects` and `content/blog` MDX sources, Zod-validated
  frontmatter, statically generated index and detail pages, reading time, draft filtering and
  adjacent-project navigation.
- **M4 — pages:** home (hero, featured work, about teaser, skills, latest notes, CTA), projects index
  and detail, about page with timeline, skills and a downloadable resume PDF.
- **M5 — blog:** post index with tag filters, post pages with Shiki highlighting, a build-time table
  of contents, share links, and an RSS 2.0 feed at `/rss.xml`.
- **M6 — contact:** accessible form with shared client/server validation, honeypot, per-IP rate
  limiting (5/hour), Resend delivery and an honest direct-email fallback.
- **M7 — polish:** dynamic Open Graph/Twitter images for the site, posts and projects, `sitemap.xml`,
  `robots.txt`, canonical URLs and JSON-LD (`Person`, `BlogPosting`, `CreativeWork`).
- **M8 — QA:** responsive checks at 360/768/1440 in both themes, keyboard pass, contrast audit,
  bundle measurement, RSS/sitemap validation and a production build.

## Decisions

| Area       | Decision                                                               |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 16.3 (App Router, React 19, async route params)                |
| Styling    | Tailwind CSS 4, CSS-first tokens in `app/globals.css`                  |
| Content    | MDX files in `/content`, official `@next/mdx` + Zod                    |
| Contact    | Resend REST API + Upstash REST rate limiting + honeypot                |
| CSP        | Static header CSP without nonce, to preserve SSG                       |
| OG images  | `next/og` with the Geist font bundled with Next                        |
| Validation | Zod Mini shared by the form and the route (classic Zod is ~90 KB gzip) |
| Analytics  | Deferred — add a privacy-friendly provider if you want one             |

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build (SSG)
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run format     # Prettier write
```

Pre-commit runs ESLint and Prettier on staged files via Husky + lint-staged.

## Environment

Copy `.env.example` to `.env.local` and fill in values as needed. `NEXT_PUBLIC_SITE_URL` falls back to
`http://localhost:3000`; set it to the live URL before deploying so canonical URLs, the sitemap, the
RSS feed and share links are correct.

| Variable                       | Required | Purpose                                               |
| ------------------------------ | -------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | yes      | Canonical URL, sitemap, RSS, OG image paths           |
| `RESEND_API_KEY`               | for mail | Resend API key — without it the form says so          |
| `CONTACT_TO_EMAIL`             | no       | Inbox for the form (defaults to the site email)       |
| `CONTACT_FROM_EMAIL`           | no       | Verified sender (defaults to `onboarding@resend.dev`) |
| `UPSTASH_REDIS_REST_URL`       | no       | Durable rate limiting (in-memory fallback)            |
| `UPSTASH_REDIS_REST_TOKEN`     | no       | Durable rate limiting (in-memory fallback)            |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | no       | Privacy-friendly analytics, if added                  |

## Structure

```
app/                 routes, layouts, metadata, OG images, sitemap/robots
components/ui/       design-system primitives
components/layout/   header, footer, navigation, theme
components/sections/ page sections
components/seo/      JSON-LD renderer
content/projects/    project case studies (MDX + YAML frontmatter)
content/blog/        blog posts (MDX + YAML frontmatter)
lib/                 site config, content loader, validators, rate limit, email, OG, utilities
```

## Writing content

Add an MDX file to `content/projects/` or `content/blog/`. The filename is the URL slug, and the
frontmatter `slug` must match it — the build fails loudly otherwise, as it does for a missing title,
an invalid date or an empty summary/excerpt.

- Projects: `title`, `slug`, `summary`, `date`, optional `featured`, `cover`, `tags`, `role`,
  `timeline`, and `links.live` / `links.repo`. Only `featured: true` entries appear on the home page
  (falling back to the newest projects if none are marked).
- Posts: `title`, `slug`, `date`, `excerpt`, optional `tags`, `cover` and `draft`.
- Drafts (`draft: true`) render in `npm run dev` but are excluded from production builds and from
  the generated route list.

Headings get slug ids (`rehype-slug`), code blocks are highlighted at build time with Shiki
(`rehype-pretty-code`) in both palettes, GFM tables and task lists work (`remark-gfm`), and both index
and detail pages are statically generated at build time.

## Measured results

- Page JavaScript: 146–151 KB transferred per page (React/Next runtime plus ~20 KB of app code).
  The contact form loads its validation schema on demand so the form page stays in budget.
- CSS: ~7.6 KB. Fonts are self-hosted through `next/font` with `display: swap`.
- Contrast: every text style on every page passes WCAG 2.2 AA (4.5:1 for body text, 3:1 for large
  text) in both themes.
- Keyboard: every focus stop on the home, contact and post pages has a visible focus ring; the skip
  link is the first stop.
- All routes are static except `/api/contact`.

## Deployment

The site lives at https://browntech24.vercel.app, in the Vercel project `browntech24` (team
`brown-5ac6`), connected to the GitHub repo [Browntech24/browntech24](https://github.com/Browntech24/browntech24)
with `main` as the production branch. Every push to `main` builds and deploys automatically; the
project also builds a preview for every pull request.

To deploy by hand (for example when only environment variables change):

```bash
vercel deploy --prod --yes
```

`NEXT_PUBLIC_SITE_URL` is inlined at build time, so change it and redeploy whenever the domain
changes:

```bash
vercel env add NEXT_PUBLIC_SITE_URL --environment production,preview \
  --value "https://browntech24.vercel.app"
```

Deployment protection (Vercel Authentication) is turned off so the site is public; preview
deployments are still `noindex` via the `X-Robots-Tag` header.

## Known constraints

- **Contact delivery is not configured.** Without `RESEND_API_KEY` the endpoint returns `503` with a
  direct-email fallback, and the form shows that message instead of pretending to send.
- **Rate limiting is per instance** until Upstash credentials are provided.
- **Versions:** dependencies are pinned to releases available in the local npm cache because the
  registry was degraded during setup (Next.js 16.3.8). Bump once the registry is reliable:
  `npm outdated`, then update and re-run the full check suite.
- **The Vercel CLI in this repo is 65.12.1** — upgrade with `npm i -g vercel@latest`.

## Content to replace before launch

- `lib/site.ts` — LinkedIn and X profiles (GitHub and email are already set)
- A headshot (the about page currently uses an initials monogram)
- `public/resume.pdf` if your CV changes
- A custom domain (`browntech24.vercel.app` works today)

## Remaining manual steps

1. Add `RESEND_API_KEY` (plus optional `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`) so the contact form
   delivers mail instead of showing the direct-email fallback.
2. Add Upstash Redis credentials for rate limiting that survives across instances.
3. Add LinkedIn and X links in `lib/site.ts` and the footer.
4. Attach a headshot in place of the initials monogram on the about page.
5. Point a custom domain at the project once you own one.
