export interface ServiceArea {
  slug: string;
  name: string;
  /** Search keyword for SEO (e.g. "השכרת מתנפחים ברחובות") */
  keyword: string;
  /** Drive time from pickup point in minutes (approx, no claims) */
  driveMinutes: number;
  /** Short tagline for area card */
  blurb: string;
  /** Detailed page lives under /areas/<slug> only if pageReady */
  pageReady: boolean;
}

/**
 * Service-area data, ordered by relevance to the business.
 * Owner notes:
 * 👉 Edit drive times when needed (approximate, no SLA promised).
 * 👉 Mark `pageReady: true` to enable a dedicated /areas/<slug> landing page.
 */
export const serviceAreas: ServiceArea[] = [
  {
    slug: "rehovot",
    name: "רחובות",
    keyword: "השכרת מתנפחים ברחובות",
    driveMinutes: 0,
    blurb: "העיר הביתית שלנו — איסוף מהיר בדרך יבנה 52.",
    pageReady: true
  },
  {
    slug: "ness-ziona",
    name: "נס ציונה",
    keyword: "השכרת מתנפחים בנס ציונה",
    driveMinutes: 10,
    blurb: "חצרות פרטיות נעימות, אידיאליות לחבילות בסיס.",
    pageReady: false
  },
  {
    slug: "yavne",
    name: "יבנה",
    keyword: "השכרת מתנפחים ביבנה",
    driveMinutes: 12,
    blurb: "מרחבים פתוחים, מתאים גם לפארקי מים גדולים.",
    pageReady: false
  },
  {
    slug: "gedera",
    name: "גדרה",
    keyword: "השכרת מתנפחים בגדרה",
    driveMinutes: 18,
    blurb: "אירועים אינטימיים בחצרות יישוביות.",
    pageReady: false
  },
  {
    slug: "mazkeret-batya",
    name: "מזכרת בתיה",
    keyword: "השכרת מתנפחים במזכרת בתיה",
    driveMinutes: 15,
    blurb: "אווירה כפרית, מתאים לחבילת פרימיום או לבן.",
    pageReady: false
  },
  {
    slug: "kiryat-ekron",
    name: "קריית עקרון",
    keyword: "השכרת מתנפחים בקריית עקרון",
    driveMinutes: 12,
    blurb: "ימי הולדת משפחתיים, איסוף קרוב.",
    pageReady: false
  },
  {
    slug: "beer-yaakov",
    name: "באר יעקב",
    keyword: "השכרת מתנפחים בבאר יעקב",
    driveMinutes: 15,
    blurb: "אזור מתפתח, חצרות חדשות מעולות לחבילות.",
    pageReady: false
  },
  {
    slug: "rishon-letzion",
    name: "ראשון לציון",
    keyword: "השכרת מתנפחים בראשון לציון",
    driveMinutes: 20,
    blurb: "באיסוף עצמי, נוח מהדרום של העיר.",
    pageReady: false
  },
  {
    slug: "ashdod",
    name: "אשדוד",
    keyword: "השכרת מתנפחים באשדוד",
    driveMinutes: 25,
    blurb: "נסיעה קצרה לאיסוף עצמי, חבילות קיץ פופולריות.",
    pageReady: false
  },
  {
    slug: "modiin",
    name: "מודיעין",
    keyword: "השכרת מתנפחים במודיעין",
    driveMinutes: 30,
    blurb: "באיסוף עצמי, להורים שמתכננים מראש.",
    pageReady: false
  }
];

export const getArea = (slug: string) =>
  serviceAreas.find((a) => a.slug === slug);
