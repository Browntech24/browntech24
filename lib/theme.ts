export const THEME_STORAGE_KEY = "theme";
export const THEME_EVENT = "themechange";

export type Theme = "light" | "dark";

type ApplyThemeOptions = {
  /** Persist the explicit choice so system changes no longer win. */
  persist?: boolean;
};

/**
 * Runs before first paint (as the first element in <body>) so the page never
 * flashes the wrong theme. Kept dependency-free and stringified on purpose.
 */
export const themeScript = `(function(){try{var stored=localStorage.getItem("${THEME_STORAGE_KEY}");var dark=stored==="dark"||(stored!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var root=document.documentElement;root.dataset.theme=dark?"dark":"light";root.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;

export function applyTheme(theme: Theme, options: ApplyThemeOptions = {}) {
  if (typeof document === "undefined") return;

  const { persist = true } = options;
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked (private mode, policy). Theme still applies.
    }
  }

  window.dispatchEvent(new Event(THEME_EVENT));
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function getServerThemeSnapshot(): Theme {
  return "light";
}

export function subscribeToTheme(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== THEME_STORAGE_KEY) return;
    applyTheme(event.newValue === "dark" ? "dark" : "light", { persist: false });
  }

  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
