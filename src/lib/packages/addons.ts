import type { PackageAddon } from "./types";

/**
 * Add-on catalog.
 *
 * 👉 Edit prices/names here.
 * 👉 Set isActive = false to hide an add-on without deleting it.
 * 👉 compatibleCategories controls which packages may surface this add-on.
 */
export const packageAddons: PackageAddon[] = [
  {
    id: "ball-pit",
    icon: "🎈",
    name: {
      he: "בריכת כדורים פרימיום",
      en: "Premium ball pit",
      ru: "Бассейн с шариками"
    },
    description: {
      he: "בריכה עם 1,500 כדורים פסטליים, ניקוי בין השכרות.",
      en: "1,500 pastel balls, cleaned between rentals.",
      ru: "1500 пастельных шаров, чистка между арендами."
    },
    priceLabel: { he: "+₪150", en: "+₪150", ru: "+₪150" },
    compatibleCategories: [
      "birthday",
      "premium",
      "toddler",
      "luxury-white",
      "indoor",
      "combo",
      "extra"
    ],
    isActive: true
  },
  {
    id: "play-mat",
    icon: "🟦",
    name: { he: "מחצלת פעילות", en: "Play mat", ru: "Игровой коврик" },
    description: {
      he: "אזור רך מתחת ומסביב למתנפח.",
      en: "Soft surface around the inflatable.",
      ru: "Мягкое покрытие вокруг батута."
    },
    priceLabel: { he: "+₪80", en: "+₪80", ru: "+₪80" },
    compatibleCategories: ["toddler", "indoor", "luxury-white"],
    isActive: true
  },
  {
    id: "soccer-goal",
    icon: "⚽",
    name: {
      he: "שער כדורגל מתנפח",
      en: "Inflatable soccer goal",
      ru: "Надувные футбольные ворота"
    },
    description: {
      he: "פעילות מצוינת לילדים גדולים יותר.",
      en: "A hit with older kids.",
      ru: "Отличное развлечение для детей постарше."
    },
    priceLabel: { he: "+₪120", en: "+₪120", ru: "+₪120" },
    compatibleCategories: ["birthday", "combo", "extra", "premium"],
    isActive: true
  },
  {
    id: "archery",
    icon: "🎯",
    name: {
      he: "עמדת קליעה",
      en: "Archery target station",
      ru: "Тир / стрельба из лука"
    },
    description: {
      he: "סטים בטוחים מבד עם חצים בטוחים.",
      en: "Safe foam-tip archery set.",
      ru: "Безопасные стрелы с мягким наконечником."
    },
    priceLabel: { he: "+₪140", en: "+₪140", ru: "+₪140" },
    compatibleCategories: ["birthday", "combo", "extra"],
    isActive: true
  },
  {
    id: "ext-cord",
    icon: "🔌",
    name: {
      he: "מאריך חשמל ארוך",
      en: "Long extension cord",
      ru: "Длинный удлинитель"
    },
    description: {
      he: "כבל 25 מטר תקני, בלם בטיחות.",
      en: "Certified 25 m cable with breaker.",
      ru: "Сертифицированный кабель 25 м."
    },
    priceLabel: { he: "+₪40", en: "+₪40", ru: "+₪40" },
    compatibleCategories: [
      "self-pickup",
      "birthday",
      "water",
      "indoor",
      "combo",
      "premium",
      "extra",
      "luxury-white"
    ],
    isActive: true
  },
  {
    id: "extra-blower",
    icon: "💨",
    name: {
      he: "מפוח נוסף",
      en: "Extra blower",
      ru: "Дополнительный вентилятор"
    },
    description: {
      he: "למתנפחים גדולים או לעמידות יתר.",
      en: "Helps large inflatables stay rigid.",
      ru: "Помогает большим батутам держать форму."
    },
    priceLabel: { he: "+₪100", en: "+₪100", ru: "+₪100" },
    compatibleCategories: ["combo", "extra", "premium"],
    isActive: true
  },
  {
    id: "decor-balloons-soon",
    icon: "🎀",
    name: {
      he: "אביזרי עיצוב (בקרוב)",
      en: "Styling kit (coming soon)",
      ru: "Декор (скоро)"
    },
    description: {
      he: "סט קישוטים תואם למתנפח. נשמח לעדכן ברגע שהקולקציה משיקה.",
      en: "Decor kit matching the inflatable. We'll notify when it launches.",
      ru: "Набор декора в стиле батута. Сообщим при запуске."
    },
    priceLabel: { he: "בקרוב", en: "Coming soon", ru: "Скоро" },
    compatibleCategories: ["luxury-white", "premium", "birthday"],
    isActive: false
  },
  {
    id: "soft-play",
    icon: "🌈",
    name: { he: "סט סופט-פליי", en: "Soft-play set", ru: "Софт-плей" },
    description: {
      he: "רכיבי משחק רכים פסטליים, מומלץ לפעוטות.",
      en: "Pastel soft-play modules, perfect for toddlers.",
      ru: "Мягкие модули пастельных цветов для малышей."
    },
    priceLabel: { he: "+₪220", en: "+₪220", ru: "+₪220" },
    compatibleCategories: ["toddler", "indoor", "luxury-white"],
    isActive: true
  },
  {
    id: "water-slide-mini",
    icon: "🌊",
    name: {
      he: "מגלשת מים מיני",
      en: "Mini water slide",
      ru: "Мини водная горка"
    },
    description: {
      he: "תוספת קלה לאירוע קיץ.",
      en: "An easy summer upgrade.",
      ru: "Простое летнее дополнение."
    },
    priceLabel: { he: "+₪180", en: "+₪180", ru: "+₪180" },
    compatibleCategories: ["water", "combo", "extra"],
    isActive: true
  },
  {
    id: "yard-games",
    icon: "🎲",
    name: {
      he: "משחקי חצר",
      en: "Yard games bundle",
      ru: "Дворовые игры"
    },
    description: {
      he: "כדורת, באולינג, קלאס וכדומה.",
      en: "Bocce, mini bowling, hopscotch, and more.",
      ru: "Боче, боулинг, классики и др."
    },
    priceLabel: { he: "+₪100", en: "+₪100", ru: "+₪100" },
    compatibleCategories: ["birthday", "combo", "extra", "custom"],
    isActive: true
  }
];

export const getAddon = (id: string) =>
  packageAddons.find((a) => a.id === id);
