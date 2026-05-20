import type { Locale } from "@/lib/i18n/config";
import { buildWhatsAppLink } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { RentalPackage } from "./types";

/**
 * Build a WhatsApp link for a package CTA. Uses the per-package
 * localized message template defined in `src/lib/packages/data.ts`.
 */
export function packageWhatsAppLink(pkg: RentalPackage, locale: Locale) {
  const message = pkg.whatsappTemplate[locale] ?? pkg.whatsappTemplate.he;
  return buildWhatsAppLink(siteConfig.whatsapp, message);
}

/**
 * Generic "build a custom package" WhatsApp link.
 */
export function customPackageWhatsAppLink(locale: Locale) {
  const fallback: Record<Locale, string> = {
    he: "שלום, אני רוצה לבנות חבילה מותאמת אישית 🧩\nגילאי הילדים:\nתאריך:\nמיקום:\nתודה!",
    en: "Hi, I'd like to build a custom package 🧩\nKids' ages:\nDate:\nLocation:\nThanks!",
    ru: "Здравствуйте, хочу собрать индивидуальный пакет 🧩\nВозраст детей:\nДата:\nМесто:\nСпасибо!"
  };
  return buildWhatsAppLink(siteConfig.whatsapp, fallback[locale]);
}
