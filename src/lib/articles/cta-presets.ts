import type { ArticleCTA } from "./types";

/** Shared CTA presets so all articles stay consistent. */

export const COMMUNITY_LINK_PRIMARY =
  "https://chat.whatsapp.com/JhjRrNzPjss6mMmUOnrwkY?mode=gi_t";

export const COMMUNITY_LINK_SECONDARY =
  "https://chat.whatsapp.com/IcpKfgbliUDAHrVNMNaGSS";

export const ctaCommunity: ArticleCTA = {
  title: "הצטרפו לקהילת ההורים של FUN-ISRAEL",
  description:
    "עדכוני זמינות לפני כולם, חבילות השקה ורעיונות לימי הולדת — ישירות לוואטסאפ.",
  buttonLabel: "הצטרפות לקהילה",
  buttonUrl: COMMUNITY_LINK_PRIMARY,
  variant: "community"
};

export const ctaWhatsAppBooking = (message: string): ArticleCTA => ({
  title: "בודקים זמינות לאירוע?",
  description: "כתבו לנו בוואטסאפ — נחזיר המלצה לפי גילאים, גודל המקום ותקציב.",
  buttonLabel: "בדיקת זמינות בוואטסאפ",
  buttonUrl: `https://wa.me/972509331313?text=${encodeURIComponent(message)}`,
  variant: "whatsapp"
});

export const ctaPackages: ArticleCTA = {
  title: "רוצים לראות את כל החבילות שלנו?",
  description:
    "10 חבילות עבודה — איסוף עצמי, פעוטות, מים, פרימיום, Combo משפחתי ועוד.",
  buttonLabel: "לכל החבילות",
  buttonUrl: "/packages",
  variant: "packages"
};

/**
 * Wave-3 "planning consult" CTA — the recommended block for new articles.
 * Used across age-based, seasonal, and parent-guide content.
 */
export const ctaPlanningConsult: ArticleCTA = {
  title: "רוצים להתאים חבילה ליום ההולדת שלכם?",
  description:
    "שלחו לנו בוואטסאפ את גיל הילדים, כמות המשתתפים, מיקום האירוע וגודל החצר או החלל. צוות FUN-ISRAEL יעזור לכם לבחור מתנפח או חבילת יום הולדת שמתאימה בדיוק לאירוע.",
  buttonLabel: "דברו עם FUN-ISRAEL בוואטסאפ",
  buttonUrl: COMMUNITY_LINK_PRIMARY,
  variant: "community"
};
