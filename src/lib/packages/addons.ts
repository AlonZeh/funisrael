import type { PackageAddon } from "./types";

/**
 * Event extras catalog.
 *
 * 👉 Edit prices/names here.
 * 👉 Set isActive = false to hide an extra without deleting it.
 * 👉 compatibleCategories controls which packages surface this extra.
 */
export const packageAddons: PackageAddon[] = [
  {
    id: "popcorn-machine",
    icon: "🍿",
    name: {
      he: "מכונת פופקורן + שערות סבתא",
      en: "Popcorn machine + cotton candy",
      ru: "Попкорн-машина + сахарная вата"
    },
    description: {
      he: "תוספת מתוקה וכיפית שמשדרגת כל יום הולדת ויוצרת תחושת אירוע אמיתי.",
      en: "A sweet, festive upgrade that turns any birthday into a real event.",
      ru: "Сладкое и весёлое дополнение, которое превращает праздник в настоящее событие."
    },
    priceLabel: { he: "+₪250", en: "+₪250", ru: "+₪250" },
    compatibleCategories: [
      "birthday",
      "premium",
      "water",
      "combo",
      "extra",
      "sports",
      "festival",
      "luxury-white"
    ],
    isActive: true
  },
  {
    id: "generator",
    icon: "⚡",
    name: {
      he: "גנרטור",
      en: "Generator",
      ru: "Генератор"
    },
    description: {
      he: "פתרון חשמל לאירועים שאין בהם נקודת חשמל נוחה. מומלץ לבדוק איתנו לפי מיקום האירוע.",
      en: "Power solution for events without a nearby outlet. Check with us based on your venue.",
      ru: "Решение для мест без розетки. Уточняйте у нас в зависимости от площадки."
    },
    priceLabel: { he: "+₪400", en: "+₪400", ru: "+₪400" },
    compatibleCategories: [
      "water",
      "birthday",
      "premium",
      "combo",
      "extra",
      "sports",
      "festival",
      "luxury-white"
    ],
    isActive: true
  },
  {
    id: "cooler",
    icon: "🧊",
    name: {
      he: "צידנית גדולה",
      en: "Large cooler",
      ru: "Большой кулер"
    },
    description: {
      he: "צידנית גדולה לאירועי חוץ, מים וימי הולדת בגינה.",
      en: "A large cooler for outdoor events, water parties and garden birthdays.",
      ru: "Большой кулер для уличных мероприятий и водных праздников."
    },
    priceLabel: { he: "+₪200", en: "+₪200", ru: "+₪200" },
    compatibleCategories: [
      "water",
      "birthday",
      "combo",
      "extra",
      "sports",
      "festival",
      "premium",
      "luxury-white"
    ],
    isActive: true
  },
  {
    id: "mascots-pair",
    icon: "🐻",
    name: {
      he: "בובות ענק לאירוע",
      en: "Giant mascots set",
      ru: "Гигантские маскоты"
    },
    description: {
      he: "זוג דובי ענק בגובה 3.2 מטר + בובת בייבי בוס בגובה 3 מטר. WOW לתמונות וקבלת פנים.",
      en: "Pair of 3.2 m teddy bears + a 3 m Baby Boss mascot. WOW for photos and welcomes.",
      ru: "Пара 3,2 м медведей + 3 м Бэйби Босс. WOW для фото и встречи гостей."
    },
    priceLabel: { he: "+₪300", en: "+₪300", ru: "+₪300" },
    compatibleCategories: [
      "birthday",
      "premium",
      "combo",
      "extra",
      "festival",
      "luxury-white"
    ],
    isActive: true
  },
  {
    id: "mascot-single",
    icon: "🎭",
    name: {
      he: "בובת ענק / תחפושת",
      en: "Single mascot / costume",
      ru: "Один маскот / костюм"
    },
    description: {
      he: "בובת ענק להפתעה, קבלת פנים, צילום עם הילדים ושדרוג האווירה.",
      en: "A single giant mascot for surprises, welcomes, and photo moments.",
      ru: "Один большой маскот для встречи гостей и фото."
    },
    priceLabel: { he: "+₪200", en: "+₪200", ru: "+₪200" },
    compatibleCategories: [
      "birthday",
      "premium",
      "combo",
      "extra",
      "sports",
      "festival",
      "luxury-white"
    ],
    isActive: true
  },
  {
    id: "bambi-backdrop",
    icon: "🦌",
    name: {
      he: "רקע קאפה במבי",
      en: "Bambi photo backdrop",
      ru: "Фотофон Бэмби"
    },
    description: {
      he: "רקע צילום מעוצב בגודל 1.8×1 מטר עם במבי חיתוך צורני — מושלם לעיצובי בלונים וצילומים.",
      en: "A 1.8×1 m styled photo backdrop with a die-cut Bambi — perfect for balloon styling and photos.",
      ru: "Стилизованный фотофон 1,8×1 м с фигурным Бэмби — для шарового декора и фото."
    },
    priceLabel: { he: "+₪280", en: "+₪280", ru: "+₪280" },
    compatibleCategories: [
      "birthday",
      "premium",
      "luxury-white",
      "extra",
      "festival"
    ],
    isActive: true
  }
];

export const getAddon = (id: string) =>
  packageAddons.find((a) => a.id === id);
