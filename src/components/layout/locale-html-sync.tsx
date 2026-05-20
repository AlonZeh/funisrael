"use client";

import { useEffect } from "react";
import { localeMeta } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/hooks";

/**
 * Keeps <html lang> and <html dir> in sync with the current locale.
 * Avoids hydration mismatch by only running in effect, *after* the
 * initial server-rendered RTL Hebrew markup.
 */
export function LocaleHtmlSync() {
  const locale = useLocale();
  useEffect(() => {
    const meta = localeMeta[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
  }, [locale]);
  return null;
}
