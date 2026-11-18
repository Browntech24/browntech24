"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { NavLinks } from "@/components/layout/nav-links";
import type { NavItem } from "@/lib/site";

export function MobileNav({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const panel = document.getElementById("mobile-menu");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        document.getElementById("mobile-menu-trigger")?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        id="mobile-menu-trigger"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-border bg-background px-5 py-6"
        >
          <nav aria-label="Mobile">
            <NavLinks
              items={items}
              className="flex-col items-stretch gap-1"
              onNavigate={() => setOpen(false)}
            />
          </nav>
        </div>
      ) : null}
    </div>
  );
}
