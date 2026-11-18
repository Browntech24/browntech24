"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  items: readonly NavItem[];
  className?: string;
  onNavigate?: () => void;
};

export function NavLinks({ items, className, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
