"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import {
  applyTheme,
  getServerThemeSnapshot,
  getStoredTheme,
  getThemeSnapshot,
  subscribeToTheme,
} from "@/lib/theme";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  // Follow the OS setting for as long as the visitor hasn't chosen explicitly.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function onChange(event: MediaQueryListEvent) {
      if (getStoredTheme()) return;
      applyTheme(event.matches ? "dark" : "light", { persist: false });
    }

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
    >
      {/* Icons are swapped with CSS so they are correct before hydration. */}
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
    </button>
  );
}
