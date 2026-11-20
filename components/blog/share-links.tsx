"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

import { LinkedInIcon, XIcon } from "@/components/ui/social-icons";

type ShareLinksProps = {
  url: string;
  title: string;
};

export function ShareLinks({ url, title }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the URL is visible in the address bar.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Share</span>
      <a
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer noopener"
        className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
      >
        <XIcon aria-hidden="true" className="size-4" />
        <span className="sr-only">Share on X</span>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer noopener"
        className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
      >
        <LinkedInIcon aria-hidden="true" className="size-4" />
        <span className="sr-only">Share on LinkedIn</span>
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4 text-accent" />
        ) : (
          <Link2 aria-hidden="true" className="size-4" />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
