import type { ArticleCategory } from "./types";

export interface ArticleCategoryMeta {
  id: ArticleCategory;
  label: string;
  emoji: string;
}

export const articleCategories: ArticleCategoryMeta[] = [
  { id: "birthdays", label: "ימי הולדת", emoji: "🎂" },
  { id: "birthday-by-age", label: "ימי הולדת לפי גיל", emoji: "🎈" },
  { id: "water", label: "מתנפחי מים", emoji: "💦" },
  { id: "safety", label: "בטיחות", emoji: "🛡️" },
  { id: "packages", label: "חבילות", emoji: "📦" },
  { id: "event-equipment", label: "ציוד לאירועים", emoji: "🪑" },
  { id: "rehovot-area", label: "רחובות והסביבה", emoji: "📍" },
  { id: "parent-guides", label: "מדריכים להורים", emoji: "🧭" },
  { id: "seasons", label: "ימי מפתח ועונות", emoji: "🌤️" },
  { id: "ages", label: "גילאים", emoji: "👶" },
  { id: "events", label: "אירועים וקהילה", emoji: "🎉" }
];

export const articleCategoryLabel = (id: ArticleCategory) =>
  articleCategories.find((c) => c.id === id)?.label ?? id;
