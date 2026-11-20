/**
 * About-page copy and skills. Everything here is deliberately conservative:
 * no employers, dates or credentials are invented. Add real history to
 * `experience` as it becomes available — empty sections stay out of the page.
 */

export type SkillGroup = {
  label: string;
  items: string[];
};

export type ExperienceEntry = {
  period: string;
  role: string;
  organisation: string;
  summary: string;
  highlights: string[];
};

export const profile = {
  headline: "I build fast, accessible web apps end to end.",
  shortBio:
    "I'm a full-stack developer working across React, Next.js and Node.js. I care about the details that make software feel considered — typography, honest loading states, and interfaces that still work on a cheap phone.",
  bio: [
    "I'm a full-stack developer working across the React ecosystem and Node.js. Most of what I enjoy sits where a messy requirement turns into a small, clear interface: deciding what the page is for, removing everything that isn't that, and then making the result fast enough that nobody notices it loading.",
    "Recent work includes Ade Goes to School, an interactive reader with browser narration, a cultural glossary, comprehension questions and Gemini-backed story expansion, and this site — a statically generated portfolio with an MDX pipeline that fails the build when content is wrong.",
    "I'm open to full-time roles and focused freelance work. If you have something that should be simpler, faster or easier to use, my inbox is open.",
  ],
  skills: [
    { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "MDX"] },
    { label: "Backend", items: ["Node.js", "Express", "REST APIs"] },
    { label: "AI", items: ["Gemini API"] },
    { label: "Tooling", items: ["Vite", "Git & GitHub", "Vercel", "ESLint"] },
  ] satisfies readonly SkillGroup[],
  experience: [
    {
      period: "2026",
      role: "Independent developer",
      organisation: "Self-directed projects",
      summary:
        "Designing and building complete web applications: interface, data model, server endpoints and deployment.",
      highlights: [
        "Built Ade Goes to School, a React and Vite reader with speech narration, a glossary, comprehension questions and a Gemini-backed story studio.",
        "Built this portfolio with Next.js, Tailwind CSS 4 and an MDX content pipeline validated by Zod at build time.",
      ],
    },
  ] satisfies readonly ExperienceEntry[],
  resumePath: "/resume.pdf",
} as const;
