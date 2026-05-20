import type { Metadata } from "next";
import { PackagesPageContent } from "@/components/packages/packages-page-content";

export const metadata: Metadata = {
  title: "החבילות שלנו — מתנפחים להשכרה",
  description:
    "חבילות השכרת מתנפחים של FUN-ISRAEL — ימי הולדת, מים, פעוטות, פרימיום, אינדור, Combo משפחתי ועוד. השכרה ל-12 שעות, איסוף עצמי מדרך יבנה 52.",
  keywords: [
    "חבילות מתנפחים",
    "השכרת מתנפחים לימי הולדת",
    "חבילת מתנפחים לילדים",
    "מתנפחים להשכרה במרכז",
    "מתנפחי מים להשכרה",
    "חבילת יום הולדת עם מתנפחים",
    "השכרת מתנפחים באיסוף עצמי"
  ],
  alternates: {
    canonical: "/packages",
    languages: { he: "/packages", en: "/en/packages", ru: "/ru/packages" }
  }
};

export default function PackagesPage() {
  return <PackagesPageContent />;
}
