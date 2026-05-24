export const siteConfig = {
  name: "FUN-ISRAEL",
  shortName: "FUN",
  tagline: "השכרת מתנפחים פרימיום",
  description:
    "FUN-ISRAEL — מתנפחים יוקרתיים לאירועי ילדים. השכרה ל-12 שעות, איסוף עצמי, ניקיון ובטיחות ברמה הגבוהה ביותר.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fun-israel.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972509331313",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "050-933-1313",
  pickupAddress: process.env.NEXT_PUBLIC_PICKUP_ADDRESS ?? "דרך יבנה 52",
  rentalDurationHours: 12,
  ogImage: "/og.png",
  locale: "he_IL",
  social: {
    instagram: "https://instagram.com/funisrael",
    tiktok: "https://tiktok.com/@funisrael",
    facebook: "https://facebook.com/funisrael"
  }
};

export type SiteConfig = typeof siteConfig;

export const navLinks = [
  { label: "בית", href: "/" },
  { label: "קטלוג", href: "/catalog" },
  { label: "חבילות", href: "/packages" },
  { label: "בנו חבילה", href: "/build-package" },
  { label: "מתנפחי מים", href: "/categories/water" },
  { label: "מתנפחי ספורט", href: "/categories/sports" },
  { label: "שאלות נפוצות", href: "/faq" },
  { label: "צור קשר", href: "/contact" }
];

export const footerLinks = {
  shop: [
    { label: "כל המתנפחים", href: "/catalog" },
    { label: "החבילות שלנו", href: "/packages" },
    { label: "בנו חבילה אישית", href: "/build-package" },
    { label: "מתנפחי מים", href: "/categories/water" },
    { label: "תוספות לאירוע", href: "/categories/event-extras" }
  ],
  info: [
    { label: "אודות", href: "/about" },
    { label: "מדריכים להורים", href: "/blog" },
    { label: "מתנפחים ברחובות", href: "/areas/rehovot" },
    { label: "הוראות איסוף", href: "/pickup" },
    { label: "בטיחות", href: "/safety" },
    { label: "שאלות נפוצות", href: "/faq" }
  ],
  legal: [
    { label: "תקנון", href: "/terms" },
    { label: "מדיניות פרטיות", href: "/privacy" },
    { label: "הצהרת נגישות", href: "/accessibility" },
    { label: "מדיניות ביטולים", href: "/terms#cancellation" }
  ]
};
