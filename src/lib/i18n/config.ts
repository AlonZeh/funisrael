export const locales = ["he", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "he";

export const localeMeta: Record<
  Locale,
  { label: string; nativeLabel: string; dir: "rtl" | "ltr"; flag: string }
> = {
  he: { label: "Hebrew", nativeLabel: "עברית", dir: "rtl", flag: "🇮🇱" },
  en: { label: "English", nativeLabel: "English", dir: "ltr", flag: "🇬🇧" },
  ru: { label: "Russian", nativeLabel: "Русский", dir: "ltr", flag: "🇷🇺" }
};

/**
 * For our hybrid routing:
 * - Hebrew = root paths ("/", "/packages", ...)
 * - English = "/en/..." prefix
 * - Russian = "/ru/..." prefix
 */
export function localizePath(path: string, locale: Locale) {
  const clean = path.replace(/^\/(en|ru)(\/|$)/, "/");
  if (locale === "he") return clean === "" ? "/" : clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ru")) return "ru";
  return "he";
}

/** Generic multilingual field */
export type LocalizedString = Record<Locale, string>;
export type LocalizedStringArray = Record<Locale, string[]>;
