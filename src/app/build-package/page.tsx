import type { Metadata } from "next";
import { BuildPackageFlow } from "@/components/build-package/build-package-flow";

export const metadata: Metadata = {
  title: "בנו חבילה אישית — מתנפחים ותוספות לאירוע | FUN-ISRAEL",
  description:
    "בנו חבילה אישית של מתנפחים ותוספות לאירוע. בוחרים סוג אירוע, מתנפחים ותוספות — ושולחים לבדיקת זמינות בוואטסאפ. בלי תשלום באתר.",
  keywords: [
    "בנו חבילה אישית",
    "חבילת מתנפחים מותאמת",
    "השכרת מתנפחים לאירוע",
    "תוספות לאירוע ילדים",
    "פופקורן ובובות ענק",
    "מגרש ספורט מתנפח",
    "פארק מים בגינה"
  ],
  alternates: { canonical: "/build-package" }
};

export default function BuildPackagePage() {
  return <BuildPackageFlow />;
}
