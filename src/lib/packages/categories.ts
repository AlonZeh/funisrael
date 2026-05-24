import type { PackageCategory } from "./types";

export const packageCategories: PackageCategory[] = [
  {
    id: "all",
    label: { he: "הכל", en: "All", ru: "Все" },
    emoji: "✨"
  },
  {
    id: "self-pickup",
    label: { he: "איסוף עצמי", en: "Self-pickup", ru: "Самовывоз" },
    emoji: "🚙"
  },
  {
    id: "birthday",
    label: { he: "ימי הולדת", en: "Birthdays", ru: "Дни рождения" },
    emoji: "🎂"
  },
  {
    id: "premium",
    label: { he: "פרימיום", en: "Premium", ru: "Премиум" },
    emoji: "💎"
  },
  {
    id: "water",
    label: { he: "מים", en: "Water", ru: "Вода" },
    emoji: "💦"
  },
  {
    id: "toddler",
    label: { he: "פעוטות", en: "Toddlers", ru: "Малыши" },
    emoji: "🧸"
  },
  {
    id: "luxury-white",
    label: { he: "לבן יוקרתי", en: "Luxury white", ru: "Белый люкс" },
    emoji: "🤍"
  },
  {
    id: "indoor",
    label: { he: "Indoor", en: "Indoor", ru: "Дом" },
    emoji: "🏠"
  },
  {
    id: "combo",
    label: { he: "Combo משפחתי", en: "Family combo", ru: "Семейный комбо" },
    emoji: "👨‍👩‍👧‍👦"
  },
  {
    id: "extra",
    label: { he: "Extra Fun", en: "Extra Fun", ru: "Extra Fun" },
    emoji: "🚀"
  },
  {
    id: "sports",
    label: { he: "ספורט", en: "Sports", ru: "Спорт" },
    emoji: "⚽"
  },
  {
    id: "festival",
    label: { he: "פסטיבל", en: "Festival", ru: "Фестиваль" },
    emoji: "🎪"
  },
  {
    id: "custom",
    label: { he: "Custom", en: "Custom", ru: "Индивидуально" },
    emoji: "🧩"
  }
];
