import type { ProductCategory } from "./types";

export interface CategoryMeta {
  id: ProductCategory;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  gradient: string;
}

export const categories: CategoryMeta[] = [
  {
    id: "birthday",
    slug: "birthday",
    name: "ימי הולדת",
    tagline: "הכוכב של המסיבה",
    description: "מתנפחים שמשדרגים כל יום הולדת לאירוע בלתי נשכח.",
    emoji: "🎉",
    gradient: "from-brand-100 via-sun-100 to-brand-50"
  },
  {
    id: "water",
    slug: "water",
    name: "מתנפחי מים",
    tagline: "קיץ בלתי נגמר",
    description: "מגלשות מים, פארקי מים ובריכות — חוויית קיץ מושלמת בחצר שלכם.",
    emoji: "💦",
    gradient: "from-sky-100 via-mint-50 to-sky-50"
  },
  {
    id: "indoor",
    slug: "indoor",
    name: "אינדור",
    tagline: "כיף גם בחורף",
    description: "מתנפחים קומפקטיים שמתאימים לסלון, מרפסת או חדר משחקים.",
    emoji: "🏠",
    gradient: "from-mint-100 via-cream-100 to-mint-50"
  },
  {
    id: "toddler",
    slug: "toddler",
    name: "פעוטות",
    tagline: "רך, בטוח, מתוק",
    description: "מתנפחים נמוכים ובטיחותיים במיוחד לגילאי 1-5.",
    emoji: "🧸",
    gradient: "from-cream-100 via-sun-100 to-cream-50"
  },
  {
    id: "premium",
    slug: "premium",
    name: "פרימיום לבן",
    tagline: "האסתטיקה של אינסטגרם",
    description: "סדרת מתנפחים בגוונים ניטרליים שנראים מדהים בצילומים.",
    emoji: "🤍",
    gradient: "from-cream-50 via-cream-100 to-cream-200"
  },
  {
    id: "soft-play",
    slug: "soft-play",
    name: "סופט-פליי",
    tagline: "אזורי משחק רכים",
    description: "סטים של רכיבי משחק רכים, מותאמים לאירועי פעוטות.",
    emoji: "🌈",
    gradient: "from-mint-100 via-sky-50 to-mint-50"
  },
  {
    id: "ball-pit",
    slug: "ball-pit",
    name: "בריכות כדורים",
    tagline: "צבעוני, מתוק, סוחף",
    description: "בריכות כדורים פרימיום במגוון גדלים — להוסיף לכל מתנפח.",
    emoji: "🎈",
    gradient: "from-sun-100 via-brand-50 to-sun-50"
  },
  {
    id: "sports",
    slug: "sports",
    name: "מתנפחי ספורט",
    tagline: "אנרגיה, תחרות וכיף",
    description: "מגרשים מתנפחים לכדורגל, כדורסל וכדורעף — אירועים ספורטיביים לגילאי 6-12.",
    emoji: "⚽",
    gradient: "from-mint-100 via-sky-100 to-mint-50"
  },
  {
    id: "activity",
    slug: "activity",
    name: "מתנפחי פעילות",
    tagline: "כמה משחקים במתנפח אחד",
    description: "מתנפחים משולבים עם תחנות פעילות, מגלשות, קיר טיפוס ובריכת כדורים.",
    emoji: "🎯",
    gradient: "from-sun-100 via-mint-50 to-sun-50"
  },
  {
    id: "event-extra",
    slug: "event-extras",
    name: "תוספות לאירוע",
    tagline: "השדרוגים שהופכים אירוע לחוויה",
    description: "פופקורן, בובות ענק, גנרטור, צידנית ורקעי צילום — להשלים את האירוע.",
    emoji: "🎁",
    gradient: "from-cream-100 via-brand-50 to-cream-50"
  }
];

export const getCategory = (id: ProductCategory): CategoryMeta | undefined =>
  categories.find((c) => c.id === id);

export const getCategoryBySlug = (slug: string): CategoryMeta | undefined =>
  categories.find((c) => c.slug === slug);
