export type ArticleCategory =
  | "birthdays"
  | "water"
  | "safety"
  | "packages"
  | "rehovot-area"
  | "parent-guides"
  | "seasons"
  | "ages"
  | "events"
  | "birthday-by-age"
  | "event-equipment";

export interface ArticleCallout {
  type: "tip" | "warning" | "info";
  title?: string;
  text: string;
}

export interface ArticleSection {
  /** H2 heading text */
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: ArticleCallout;
}

export interface ArticleFAQ {
  q: string;
  a: string;
}

export interface ArticleCTA {
  title: string;
  description: string;
  buttonLabel: string;
  /** URL or WhatsApp link */
  buttonUrl: string;
  variant: "community" | "whatsapp" | "packages";
}

export interface ArticleChecklist {
  title: string;
  items: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  category: ArticleCategory;
  /** Free-form tags surfaced as chips */
  tags: string[];
  /** Primary city, e.g. "רחובות" */
  city?: string;
  /** All cities the article targets (for local SEO chips) */
  cities?: string[];
  targetKeyword: string;
  secondaryKeywords: string[];
  readingTimeMinutes: number;
  author: string;
  /** Structured body — preferred over markdown for editor friendliness */
  body: ArticleSection[];
  checklist?: ArticleChecklist;
  faq: ArticleFAQ[];
  cta: ArticleCTA;
  relatedPackages?: string[];
  relatedProducts?: string[];
  relatedArticles?: string[];
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  isPublished: boolean;
}
