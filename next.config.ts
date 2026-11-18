import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const shouldNoindex =
  process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";

/**
 * Pragmatic CSP: Next.js ships inline bootstrap scripts, and a nonce-based CSP
 * forces per-request rendering, which conflicts with the SSG requirement in the
 * spec. `'unsafe-inline'` for scripts is the documented trade-off; everything
 * else is locked down. Revisit if the site ever needs a strict nonce policy.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Keep preview deployments out of search results.
  ...(shouldNoindex ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  // The home directory contains another lockfile; keep Turbopack rooted here.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

/**
 * Turbopack requires plugin names as strings (JS functions can't cross into the
 * Rust MDX compiler). Options must be serializable for the same reason.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
