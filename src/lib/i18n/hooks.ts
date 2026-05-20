"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, getLocaleFromPath, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

export function useLocale(): Locale {
  const pathname = usePathname() ?? "/";
  return pathname ? getLocaleFromPath(pathname) : defaultLocale;
}

export function useTranslations(): Dictionary & { locale: Locale } {
  const locale = useLocale();
  return { ...dictionaries[locale], locale };
}

export function pickLocalized<T extends string | string[]>(
  field: Record<Locale, T>,
  locale: Locale
): T {
  return field[locale] ?? field[defaultLocale];
}
