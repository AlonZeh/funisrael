"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Check, Globe } from "lucide-react";
import { locales, localeMeta, getLocaleFromPath } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLocale: Locale = getLocaleFromPath(pathname);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    if (next === currentLocale) {
      setOpen(false);
      return;
    }
    // Strip existing locale prefix
    let path = pathname.replace(/^\/(en|ru)(?=\/|$)/, "");
    if (path === "") path = "/";

    // Pages that exist in all 3 locales. Others fall back to locale home.
    const LOCALIZED_PATHS = new Set([
      "/",
      "/packages",
      "/accessibility"
    ]);
    const targetPath = LOCALIZED_PATHS.has(path) ? path : "/";

    const url =
      next === "he"
        ? targetPath
        : `/${next}${targetPath === "/" ? "" : targetPath}`;
    setOpen(false);
    router.push(url);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-ink-100 shadow-soft transition hover:bg-cream-100",
          compact ? "h-10 w-10 justify-center" : "px-3 py-2"
        )}
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Globe className="h-4 w-4 text-ink-600" />
        {!compact && (
          <span className="text-sm font-medium text-ink-700">
            {localeMeta[currentLocale].nativeLabel}
          </span>
        )}
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute end-0 mt-2 min-w-[160px] rounded-2xl bg-white shadow-card ring-1 ring-ink-100 p-1 z-50"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                role="menuitemradio"
                aria-checked={l === currentLocale}
                onClick={() => switchTo(l)}
                className={cn(
                  "w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                  l === currentLocale
                    ? "bg-cream-100 text-ink-800 font-semibold"
                    : "text-ink-600 hover:bg-cream-50"
                )}
              >
                <span aria-hidden>{localeMeta[l].flag}</span>
                <span className="flex-1 text-start">
                  {localeMeta[l].nativeLabel}
                </span>
                {l === currentLocale && (
                  <Check className="h-4 w-4 text-brand-500" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
