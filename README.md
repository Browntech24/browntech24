# My Portfolio

Personal portfolio and writing site: Next.js (App Router), TypeScript, Tailwind CSS 4, MDX content.

The full specification lives in [`spec.md`](./spec.md). This README records the decisions made
before development and how to work with the repo.

## Status

**Milestone 1 — setup and design system.** Done: App Router scaffold, Tailwind 4 tokens, light/dark
theme with no flash, base UI components, header/footer, security headers, lint/format/typecheck and CI.

Placeholder content is clearly marked (`lib/site.ts`, `lib/placeholder-data.ts`) and gets replaced by
the MDX pipeline in milestone 3.

## Decisions

| Area      | Decision                                                                   |
| --------- | -------------------------------------------------------------------------- |
| Framework | Next.js 16.4 (App Router, React 19, async route params)                    |
| Styling   | Tailwind CSS 4, CSS-first tokens in `app/globals.css`                      |
| Content   | MDX files in `/content`, parsed with `next-mdx-remote` + Zod (milestone 3) |
| Contact   | Resend + Upstash rate limiting + honeypot (milestone 6)                    |
| CSP       | Static header CSP without nonce, to preserve SSG                           |
| Analytics | Deferred to milestone 8                                                    |

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

Copy `.env.example` to `.env.local` and fill in values as milestones need them. Nothing is required
for milestone 1; `NEXT_PUBLIC_SITE_URL` falls back to `http://localhost:3000`.

## Structure

```
app/                 routes, layouts, metadata
components/ui/       design-system primitives
components/layout/   header, footer, navigation, theme
components/sections/ page sections
lib/                 site config, theme helpers, utilities
```

## Known constraints

- **Page JS:** measured at ~184 KB gzipped on the home page (about 20 KB of app code; the rest is
  the Next.js/React runtime). That is above the ~150 KB target in the spec. Revisit in milestone 7
  with a bundle analyzer — the realistic lever is replacing the icon library with inline SVGs and
  keeping further interactions server-rendered.
- **Versions:** dependencies are pinned to releases available in the local npm cache because the
  registry was degraded during setup (Next.js 16.3.8 rather than 16.4.x). Bump once the registry is
  reliable: `npm outdated` then update and re-run the full check suite.
- **Placeholders:** identity, accent assets and project copy are intentionally fake. See the
  content list above.

## Content to replace before launch

- `lib/site.ts` — name, initials, role, intro, email, domain, social URLs
- Headshot, project covers, `public/resume.pdf`
- 3–6 project case studies and 1–2 posts (milestone 3)
- Domain and real accent assets (milestone 8)
