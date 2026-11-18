import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn("mt-12 mb-4 text-3xl font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-14 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn("mt-10 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={cn("mt-8 mb-2 text-lg font-semibold", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("my-5 leading-7 text-pretty text-muted-foreground", className)} {...props} />
  ),
  a: ({ className, href = "", ...props }) => {
    const isExternal = /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        className={cn(
          "font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent",
          className,
        )}
        {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "my-5 list-disc space-y-2 pl-6 text-muted-foreground marker:text-muted-foreground/50",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "my-5 list-decimal space-y-2 pl-6 text-muted-foreground marker:text-muted-foreground/50",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => <li className={cn("pl-1", className)} {...props} />,
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-8 border-l-2 border-accent pl-5 text-muted-foreground italic [&>p]:my-3",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-10 border-border", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.875em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-7 overflow-x-auto rounded-card border border-border bg-surface p-4 font-mono text-[13px] leading-6 text-foreground [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-8 overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b border-border px-3 py-2 text-left font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border-b border-border px-3 py-2 align-top text-muted-foreground", className)}
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
