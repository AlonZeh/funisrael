import type { RentalPackage } from "./types";

/**
 * 🎈 FUN-ISRAEL packages catalog.
 *
 * Owner notes:
 * 👉 Edit `priceFrom` and `priceLabel` to change pricing.
 * 👉 Set `isActive: false` to hide a package from the site without deleting it.
 * 👉 Lower `sortOrder` = displayed earlier.
 * 👉 Mark up to 3 packages as `isFeatured: true` for homepage rotation.
 * 👉 `optionalAddons` references add-on ids from src/lib/packages/addons.ts.
 * 👉 Each text field has he/en/ru — keep all three in sync when editing.
 */
export const packages: RentalPackage[] = [
  {
    id: "self-pickup",
    slug: "self-pickup",
    sortOrder: 10,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    category: "self-pickup",
    tags: ["best-value"],
    title: {
      he: "חבילת איסוף עצמי",
      en: "Self-Pickup Package",
      ru: "Пакет самовывоза"
    },
    subtitle: {
      he: "אירוע קטן בבית, חצר או גינה",
      en: "Small event at home, yard or garden",
      ru: "Маленький праздник дома или во дворе"
    },
    description: {
      he: "החבילה הכי משתלמת — מתנפח קומפקטי אחד, איסוף עצמי, וכל מה שצריך כדי שהאירוע יהיה מושלם.",
      en: "Our most affordable option — one compact inflatable, self-pickup, and everything you need to host a great event.",
      ru: "Самый доступный вариант — один компактный батут, самовывоз и всё, что нужно для праздника."
    },
    bestFor: {
      he: "אירוע קטן בבית / חצר / גינה",
      en: "Small event at home, yard or garden",
      ru: "Небольшое мероприятие дома или во дворе"
    },
    includes: {
      he: [
        "מתנפח קומפקטי אחד",
        "השכרה ל-12 שעות",
        "איסוף עצמי מדרך יבנה 52",
        "הוראות הפעלה ובטיחות"
      ],
      en: [
        "One compact inflatable",
        "12-hour rental",
        "Self-pickup from Derech Yavne 52",
        "Setup and safety instructions"
      ],
      ru: [
        "Один компактный батут",
        "Аренда 12 часов",
        "Самовывоз с Дерех Явне 52",
        "Инструкции по установке и безопасности"
      ]
    },
    optionalAddons: ["ext-cord", "yard-games"],
    childMood: {
      he: "לקופצים הקטנים",
      en: "For little bouncers",
      ru: "Для маленьких прыгунов"
    },
    priceFrom: 500,
    priceLabel: { he: "החל מ-₪500", en: "From ₪500", ru: "От ₪500" },
    recommendedAges: "3-10",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "התקנה ביתית פשוטה תוך 10-15 דק׳, על משטח דשא או בטון חלק.",
      en: "Simple home setup in 10-15 min on grass or smooth concrete.",
      ru: "Простая установка дома за 10-15 минут на газоне или ровном бетоне."
    },
    safetyNotes: {
      he: "חובה השגחת מבוגר. עיגון יתדות בכל הפינות.",
      en: "Adult supervision required. Stake all four corners.",
      ru: "Обязателен присмотр взрослого. Закрепить все углы."
    },
    fits: { home: true, yard: true, water: false, indoor: true, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1602536052359-ef94c21c5948?w=1400&q=80",
    colorTheme: "cream",
    seoTitle: {
      he: "חבילת איסוף עצמי — השכרת מתנפח באיסוף עצמי",
      en: "Self-Pickup Inflatable Rental Package",
      ru: "Пакет самовывоза — аренда батута"
    },
    seoDescription: {
      he: "השכרת מתנפח קומפקטי באיסוף עצמי מ-FUN-ISRAEL. החל מ-₪500, 12 שעות.",
      en: "Compact inflatable rental with self-pickup from FUN-ISRAEL. From ₪500, 12 hours.",
      ru: "Аренда компактного батута с самовывозом от FUN-ISRAEL. От ₪500, 12 часов."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות עבור חבילת איסוף עצמי 🎈\nתאריך רצוי:\nשעת איסוף רצויה:\nגילאי הילדים:\nמיקום האירוע:\nאשמח לפרטים נוספים.",
      en: "Hi, I'd like to check availability for the Self-Pickup package 🎈\nPreferred date:\nPickup time:\nKids' ages:\nEvent location:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность пакета самовывоза 🎈\nЖелаемая дата:\nВремя самовывоза:\nВозраст детей:\nМесто проведения:\nСпасибо!"
    }
  },
  {
    id: "birthday-basic",
    slug: "birthday-basic",
    sortOrder: 20,
    isActive: true,
    isFeatured: true,
    isPopular: true,
    category: "birthday",
    tags: ["popular"],
    title: {
      he: "חבילת יום הולדת בסיסית",
      en: "Basic Birthday Package",
      ru: "Базовый пакет на день рождения"
    },
    subtitle: {
      he: "ימי הולדת לילדים עד גיל 8",
      en: "Birthdays for kids up to age 8",
      ru: "Дни рождения для детей до 8 лет"
    },
    description: {
      he: "החבילה הקלאסית והמשפחתית שלנו — מתנפח לבחירה, אזור ישיבה והכל מוכן ליום הולדת בלי כאבי ראש.",
      en: "Our classic family package — your choice of inflatable, a sitting area, and everything ready for a stress-free birthday.",
      ru: "Наш классический семейный пакет — выбор батута, зона для гостей и всё готово к празднику без хлопот."
    },
    bestFor: {
      he: "ימי הולדת לילדים עד גיל 8",
      en: "Birthdays for kids up to age 8",
      ru: "Дни рождения для детей до 8 лет"
    },
    includes: {
      he: [
        "מתנפח אחד לבחירה",
        "מחצלת / אזור ישיבה בסיסי",
        "הוראות התקנה",
        "השכרה ל-12 שעות"
      ],
      en: [
        "One inflatable of your choice",
        "Play mat / basic seating area",
        "Setup instructions",
        "12-hour rental"
      ],
      ru: [
        "Один батут на выбор",
        "Коврик / базовая зона",
        "Инструкции по установке",
        "Аренда 12 часов"
      ]
    },
    optionalAddons: ["ball-pit", "soccer-goal", "yard-games"],
    childMood: {
      he: "ליום הולדת קלאסי",
      en: "For a classic birthday",
      ru: "Для классического дня рождения"
    },
    priceFrom: 790,
    priceLabel: { he: "החל מ-₪790", en: "From ₪790", ru: "От ₪790" },
    recommendedAges: "3-8",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "כל המתנפחים מוכנים לשימוש תוך 15 דק׳.",
      en: "All inflatables are ready to use within 15 minutes.",
      ru: "Все батуты готовы к использованию за 15 минут."
    },
    safetyNotes: {
      he: "כללי בטיחות מסופקים בכתב. השגחת מבוגר חובה.",
      en: "Written safety guidelines provided. Adult supervision required.",
      ru: "Письменные правила безопасности. Обязателен взрослый."
    },
    fits: { home: true, yard: true, water: false, indoor: true, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1530878869293-44c79c5f04a8?w=1400&q=80",
    colorTheme: "coral",
    seoTitle: {
      he: "חבילת יום הולדת בסיסית — מתנפחים להשכרה",
      en: "Basic Birthday Inflatable Package",
      ru: "Базовый пакет на день рождения с батутом"
    },
    seoDescription: {
      he: "חבילת יום הולדת עם מתנפח לבחירה, 12 שעות השכרה. החל מ-₪790.",
      en: "Birthday package with your choice of inflatable, 12-hour rental. From ₪790.",
      ru: "Пакет на день рождения с батутом на выбор, аренда 12 часов. От ₪790."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות עבור חבילת יום הולדת בסיסית 🎂\nתאריך רצוי:\nשעת איסוף רצויה:\nגילאי הילדים:\nמיקום האירוע:\nאשמח להמלצה למתנפח.",
      en: "Hi, I'd like to check availability for the Basic Birthday package 🎂\nPreferred date:\nPickup time:\nKids' ages:\nEvent location:\nWould love a recommendation.",
      ru: "Здравствуйте, хочу проверить доступность базового пакета на день рождения 🎂\nДата:\nВремя самовывоза:\nВозраст детей:\nМесто:\nЖду рекомендации."
    }
  },
  {
    id: "premium",
    slug: "premium",
    sortOrder: 30,
    isActive: true,
    isFeatured: true,
    isPopular: false,
    category: "premium",
    tags: ["premium", "instagram"],
    title: {
      he: "חבילת פרימיום",
      en: "Premium Package",
      ru: "Пакет Премиум"
    },
    subtitle: {
      he: "אירוע מושקע עם נראות גבוהה",
      en: "An elevated event with a styled look",
      ru: "Эффектный, стильный праздник"
    },
    description: {
      he: "החבילה לאמהות שרוצות 'וואו' מצולם. מתנפח פרימיום, תוספת משחק לפי זמינות, אביזרי עיצוב בסיסיים.",
      en: "For parents who want the 'wow' moment. Premium inflatable, optional game add-on, styled basics.",
      ru: "Для родителей, которым важен 'вау'-момент. Премиум-батут, дополнение к игре, базовый стайлинг."
    },
    bestFor: {
      he: "אירוע מושקע עם נראות גבוהה",
      en: "An elevated event with a styled look",
      ru: "Стильное, эффектное мероприятие"
    },
    includes: {
      he: [
        "מתנפח פרימיום לבחירה",
        "בריכת כדורים / תוספת משחק לפי זמינות",
        "אביזרי עיצוב בסיסיים",
        "התאמה לגילאי הילדים"
      ],
      en: [
        "Premium inflatable of your choice",
        "Ball pit / game add-on (subject to availability)",
        "Basic styling accessories",
        "Tailored to your kids' age"
      ],
      ru: [
        "Премиум-батут на выбор",
        "Бассейн с шариками / дополнение (по доступности)",
        "Базовые декоративные элементы",
        "Подбор по возрасту детей"
      ]
    },
    optionalAddons: ["ball-pit", "soft-play", "yard-games"],
    childMood: {
      he: "ליום הולדת מצטלם",
      en: "For an Insta-worthy party",
      ru: "Для фотогеничного праздника"
    },
    priceFrom: 1290,
    priceLabel: { he: "החל מ-₪1,290", en: "From ₪1,290", ru: "От ₪1,290" },
    recommendedAges: "3-12",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "הקמה מקצועית מקסימום 25 דק׳.",
      en: "Pro-grade setup in up to 25 minutes.",
      ru: "Профессиональная установка до 25 минут."
    },
    safetyNotes: {
      he: "השגחה צמודה, ניקיון מקיף לפני האירוע.",
      en: "Close supervision, deep-clean before the event.",
      ru: "Постоянный присмотр, глубокая уборка перед праздником."
    },
    fits: { home: true, yard: true, water: false, indoor: true, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&q=80",
    colorTheme: "ink",
    seoTitle: {
      he: "חבילת פרימיום — מתנפחים יוקרתיים להשכרה",
      en: "Premium Inflatable Rental Package",
      ru: "Премиум-пакет аренды батута"
    },
    seoDescription: {
      he: "חבילת פרימיום למתנפחים יוקרתיים, מתאימה לאירועים מצולמים. החל מ-₪1,290.",
      en: "Premium inflatable rental package for styled events. From ₪1,290.",
      ru: "Премиум-пакет аренды батутов для стильных праздников. От ₪1,290."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות עבור חבילת פרימיום ✨\nתאריך רצוי:\nשעת איסוף רצויה:\nגילאי הילדים:\nמיקום האירוע:\nאשמח להמלצה מותאמת.",
      en: "Hi, I'd like to check availability for the Premium package ✨\nPreferred date:\nPickup time:\nKids' ages:\nEvent location:\nWould love a tailored recommendation.",
      ru: "Здравствуйте, хочу проверить доступность Премиум-пакета ✨\nДата:\nВремя:\nВозраст детей:\nМесто:\nБуду рад(а) индивидуальной рекомендации."
    }
  },
  {
    id: "summer-water",
    slug: "summer-water",
    sortOrder: 40,
    isActive: true,
    isFeatured: true,
    isPopular: true,
    category: "water",
    tags: ["summer", "popular"],
    title: {
      he: "חבילת מים לקיץ",
      en: "Summer Water Package",
      ru: "Летний водный пакет"
    },
    subtitle: {
      he: "אירועי קיץ, חצרות וגינות",
      en: "Summer events, yards and gardens",
      ru: "Летние праздники во дворе и саду"
    },
    description: {
      he: "פארק מים בחצר. מתנפח מים, חיבור צינור, בטיחות מים — ויש לכם אטרקציית הקיץ.",
      en: "A water park in your backyard. Water inflatable, hose connection, water safety — instant summer hit.",
      ru: "Водный парк во дворе. Водный батут, подключение шланга, безопасность — летний хит готов."
    },
    bestFor: {
      he: "אירועי קיץ, חצרות וגינות",
      en: "Summer events, yards and gardens",
      ru: "Летние мероприятия, дворы и сады"
    },
    includes: {
      he: [
        "מתנפח מים / מגלשה רטובה",
        "חיבור מים לפי הנחיות",
        "הוראות בטיחות לשימוש במים",
        "השכרה ל-12 שעות"
      ],
      en: [
        "Water inflatable / wet slide",
        "Hose connection per guidelines",
        "Water safety instructions",
        "12-hour rental"
      ],
      ru: [
        "Водный батут / мокрая горка",
        "Подключение шланга по правилам",
        "Инструкция по водной безопасности",
        "Аренда 12 часов"
      ]
    },
    optionalAddons: ["ball-pit", "water-slide-mini", "ext-cord"],
    childMood: {
      he: "לחובבי מים",
      en: "For water lovers",
      ru: "Для любителей воды"
    },
    priceFrom: 1490,
    priceLabel: { he: "החל מ-₪1,490", en: "From ₪1,490", ru: "От ₪1,490" },
    recommendedAges: "4-14",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "דורש שטח דשא 6×5 מ׳ ולחץ מים סטנדרטי.",
      en: "Needs a 6×5 m grass area and standard water pressure.",
      ru: "Нужна газонная площадка 6×5 м и стандартный напор воды."
    },
    safetyNotes: {
      he: "מומלץ להגביל מספר ילדים בו-זמנית. השגחת מבוגר חובה.",
      en: "Limit simultaneous users. Adult supervision required.",
      ru: "Ограничьте число одновременных пользователей. Обязателен взрослый."
    },
    fits: { home: false, yard: true, water: true, indoor: false, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1400&q=80",
    colorTheme: "sky",
    seoTitle: {
      he: "חבילת מים לקיץ — מתנפחי מים להשכרה",
      en: "Summer Water Inflatable Package",
      ru: "Летний пакет — водные батуты"
    },
    seoDescription: {
      he: "מתנפחי מים להשכרה — חבילת קיץ פרימיום, השכרה ל-12 שעות. החל מ-₪1,490.",
      en: "Water inflatables for rent — premium summer bundle, 12-hour rental. From ₪1,490.",
      ru: "Водные батуты в аренду — летний пакет, 12 часов. От ₪1,490."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות עבור חבילת מים לקיץ 💦\nתאריך רצוי:\nשעת איסוף רצויה:\nגילאי הילדים:\nגודל החצר:\nתודה!",
      en: "Hi, I'd like to check availability for the Summer Water package 💦\nPreferred date:\nPickup time:\nKids' ages:\nYard size:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность Летнего водного пакета 💦\nДата:\nВремя:\nВозраст детей:\nРазмер двора:\nСпасибо!"
    }
  },
  {
    id: "toddler",
    slug: "toddler",
    sortOrder: 50,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    category: "toddler",
    tags: ["toddler-safe"],
    title: {
      he: "חבילת פעוטות",
      en: "Toddler Package",
      ru: "Пакет для малышей"
    },
    subtitle: {
      he: "גילאי 2-5, חוויה רכה ובטוחה",
      en: "Ages 2-5, soft and safe experience",
      ru: "Возраст 2-5, мягкий и безопасный опыт"
    },
    description: {
      he: "מתנפח קטן ובטוח, בריכת כדורים או Soft Play לפי זמינות, התאמה מלאה לחללים פנימיים או חיצוניים קטנים.",
      en: "A small, safe inflatable with a ball pit or soft-play (subject to availability), perfect for small indoor or outdoor spaces.",
      ru: "Маленький безопасный батут, бассейн с шариками или soft-play, отлично подходит для дома или небольшого двора."
    },
    bestFor: { he: "גילאי 2-5", en: "Ages 2-5", ru: "Возраст 2-5" },
    includes: {
      he: [
        "מתנפח קטן ובטוח",
        "בריכת כדורים או Soft Play לפי זמינות",
        "התאמה לחלל פנימי או חיצוני",
        "השכרה ל-12 שעות"
      ],
      en: [
        "Small, safe inflatable",
        "Ball pit or soft-play (subject to availability)",
        "Fits indoor or outdoor spaces",
        "12-hour rental"
      ],
      ru: [
        "Маленький безопасный батут",
        "Бассейн с шариками или soft-play",
        "Подходит для дома или улицы",
        "Аренда 12 часов"
      ]
    },
    optionalAddons: ["ball-pit", "soft-play", "play-mat"],
    childMood: {
      he: "לקטנטנים שצוחקים",
      en: "For little smilers",
      ru: "Для маленьких хохотушек"
    },
    priceFrom: 690,
    priceLabel: { he: "החל מ-₪690", en: "From ₪690", ru: "От ₪690" },
    recommendedAges: "2-5",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "התקנה תוך 12 דק׳. גובה תקרה מומלץ 2.4 מ׳ ומעלה.",
      en: "Setup in 12 minutes. Ceiling height of 2.4 m or more recommended.",
      ru: "Установка за 12 минут. Высота потолка от 2,4 м."
    },
    safetyNotes: {
      he: "התאמה מלאה לגילאי 2-5. השגחת מבוגר חובה.",
      en: "Designed for ages 2-5. Adult supervision required.",
      ru: "Создано для возраста 2-5. Обязателен взрослый."
    },
    fits: { home: true, yard: true, water: false, indoor: true, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1545048702-79362596cdc9?w=1400&q=80",
    colorTheme: "mint",
    seoTitle: {
      he: "חבילת פעוטות — מתנפחים לגילאי 2-5",
      en: "Toddler Package — Inflatables for ages 2-5",
      ru: "Пакет для малышей — батуты 2-5"
    },
    seoDescription: {
      he: "חבילת פעוטות בטוחה ורכה לגילאי 2-5. השכרה ל-12 שעות. החל מ-₪690.",
      en: "Safe, soft toddler package for ages 2-5. 12-hour rental. From ₪690.",
      ru: "Безопасный мягкий пакет для малышей 2-5. Аренда 12 часов. От ₪690."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות עבור חבילת פעוטות 🧸\nתאריך רצוי:\nשעת איסוף רצויה:\nגיל הפעוטות:\nמיקום (בית/חצר/גן):\nתודה!",
      en: "Hi, I'd like to check availability for the Toddler package 🧸\nPreferred date:\nPickup time:\nToddler ages:\nLocation (home / yard / daycare):\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность пакета для малышей 🧸\nДата:\nВремя:\nВозраст малышей:\nМесто:\nСпасибо!"
    }
  },
  {
    id: "luxury-white",
    slug: "luxury-white",
    sortOrder: 60,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    category: "luxury-white",
    tags: ["luxury", "instagram", "premium"],
    title: {
      he: "חבילת לבן יוקרתית",
      en: "Luxury White Package",
      ru: "Люксовый белый пакет"
    },
    subtitle: {
      he: "אירועים מצולמים, בנות מצווה, ימי הולדת יוקרתיים",
      en: "Styled events, bat-mitzvahs, upscale birthdays",
      ru: "Стильные мероприятия, бат-мицвы, элитные дни рождения"
    },
    description: {
      he: "המתנפח הלבן שלנו. נראות ניטרלית, אסתטיקה מצולמת, בחירה ראשונה לאירועי בוטיק.",
      en: "Our white inflatable. Neutral palette, photogenic styling, the boutique-event favorite.",
      ru: "Наш белый батут. Нейтральная палитра, фотогеничный стиль, фаворит бутик-мероприятий."
    },
    bestFor: {
      he: "אירועים מצולמים, בנות מצווה, ימי הולדת יוקרתיים",
      en: "Photographed events, bat-mitzvahs, upscale birthdays",
      ru: "Фото-мероприятия, бат-мицвы, премиум дни рождения"
    },
    includes: {
      he: [
        "מתנפח לבן / אסתטי",
        "עיצוב נקי",
        "התאמה לצילומים",
        "אפשרות לשילוב בלונים (בקרוב)"
      ],
      en: [
        "White / styled inflatable",
        "Clean design",
        "Photo-friendly setup",
        "Balloon pairing (coming soon)"
      ],
      ru: [
        "Белый / стильный батут",
        "Чистый дизайн",
        "Подготовка под фото",
        "Шары (скоро)"
      ]
    },
    optionalAddons: ["soft-play", "play-mat", "decor-balloons-soon"],
    childMood: {
      he: "ליום הולדת מהאינסטגרם",
      en: "For an Instagram-style party",
      ru: "Для Instagram-стиля"
    },
    priceFrom: 1690,
    priceLabel: { he: "החל מ-₪1,690", en: "From ₪1,690", ru: "От ₪1,690" },
    recommendedAges: "2-14",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "מומלץ למשטח דשא נקי או רצפת בית בהירה.",
      en: "Best on clean grass or a light indoor floor.",
      ru: "Идеально на чистом газоне или светлом полу."
    },
    safetyNotes: {
      he: "השגחת מבוגר. בלי נעליים, בלי אוכל, בלי חפצים חדים.",
      en: "Adult supervision. No shoes, no food, no sharp objects.",
      ru: "Присмотр взрослого. Без обуви, еды и острых предметов."
    },
    fits: { home: true, yard: true, water: false, indoor: true, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80",
    colorTheme: "cream",
    seoTitle: {
      he: "חבילת לבן יוקרתית — מתנפח לבן להשכרה",
      en: "Luxury White Inflatable Rental Package",
      ru: "Люксовый белый пакет аренды"
    },
    seoDescription: {
      he: "מתנפח לבן יוקרתי לאירועים מצולמים. החל מ-₪1,690.",
      en: "Luxury white inflatable for styled, photogenic events. From ₪1,690.",
      ru: "Люксовый белый батут для эффектных мероприятий. От ₪1,690."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות עבור חבילת לבן יוקרתית 🤍\nתאריך רצוי:\nשעת איסוף רצויה:\nגילאי הילדים:\nסוג האירוע:\nתודה!",
      en: "Hi, I'd like to check availability for the Luxury White package 🤍\nPreferred date:\nPickup time:\nKids' ages:\nEvent type:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность Люксового белого пакета 🤍\nДата:\nВремя:\nВозраст детей:\nТип праздника:\nСпасибо!"
    }
  },
  {
    id: "indoor-winter",
    slug: "indoor-winter",
    sortOrder: 70,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    category: "indoor",
    tags: ["indoor", "winter"],
    title: {
      he: "חבילת Indoor לחורף",
      en: "Indoor Winter Package",
      ru: "Зимний пакет для дома"
    },
    subtitle: {
      he: "בתים, גני ילדים, חללים סגורים",
      en: "Homes, daycares, indoor spaces",
      ru: "Дома, детские сады, закрытые помещения"
    },
    description: {
      he: "מתנפח קומפקטי שמתאים לסלון, חדר משחקים או גן. בלי תלות במזג אוויר.",
      en: "Compact inflatable that fits a living room, playroom or daycare. Weather-proof.",
      ru: "Компактный батут для гостиной, игровой комнаты или детсада. Не зависит от погоды."
    },
    bestFor: {
      he: "בתים, גני ילדים, חללים סגורים",
      en: "Homes, daycares, indoor spaces",
      ru: "Дома, детские сады, закрытые помещения"
    },
    includes: {
      he: [
        "מתנפח קומפקטי Indoor",
        "מתאים לחללים סגורים",
        "ללא תלות במזג אוויר",
        "השכרה ל-12 שעות"
      ],
      en: [
        "Compact indoor inflatable",
        "Fits enclosed spaces",
        "Weather-proof",
        "12-hour rental"
      ],
      ru: [
        "Компактный домашний батут",
        "Помещается в закрытых пространствах",
        "Независим от погоды",
        "Аренда 12 часов"
      ]
    },
    optionalAddons: ["soft-play", "play-mat", "ext-cord"],
    childMood: {
      he: "לבית חמים בחורף",
      en: "For a cozy winter day",
      ru: "Для уютного зимнего дня"
    },
    priceFrom: 890,
    priceLabel: { he: "החל מ-₪890", en: "From ₪890", ru: "От ₪890" },
    recommendedAges: "2-8",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "דורש תקרה 2.4 מ׳ ומעלה, פתח מעבר 90 ס״מ.",
      en: "Needs a 2.4 m+ ceiling and a 90 cm doorway.",
      ru: "Нужен потолок от 2,4 м и дверной проём 90 см."
    },
    safetyNotes: {
      he: "השגחת מבוגר חובה. הסרת חפצים שבירים מסביב.",
      en: "Adult supervision required. Clear fragile items nearby.",
      ru: "Обязателен присмотр. Уберите хрупкие предметы."
    },
    fits: { home: true, yard: false, water: false, indoor: true, outdoor: false },
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1400&q=80",
    colorTheme: "mint",
    seoTitle: {
      he: "חבילת Indoor — מתנפחים לבית בחורף",
      en: "Indoor Winter Inflatable Package",
      ru: "Зимний пакет для дома"
    },
    seoDescription: {
      he: "מתנפח קומפקטי לבית, אירועי חורף וגני ילדים. החל מ-₪890.",
      en: "Compact indoor inflatable for homes, daycares, and winter events. From ₪890.",
      ru: "Компактный батут для дома, детсадов и зимних праздников. От ₪890."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות עבור חבילת Indoor 🏠\nתאריך רצוי:\nשעת איסוף רצויה:\nגילאי הילדים:\nגודל החלל (אורך×רוחב):\nתודה!",
      en: "Hi, I'd like to check availability for the Indoor package 🏠\nPreferred date:\nPickup time:\nKids' ages:\nRoom size (L×W):\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность пакета Indoor 🏠\nДата:\nВремя:\nВозраст детей:\nРазмер помещения:\nСпасибо!"
    }
  },
  {
    id: "family-combo",
    slug: "family-combo",
    sortOrder: 80,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    category: "combo",
    tags: ["family"],
    title: {
      he: "חבילת Combo משפחתית",
      en: "Family Combo Package",
      ru: "Семейный комбо-пакет"
    },
    subtitle: {
      he: "אירועים עם כמה גילאים",
      en: "Events with several age groups",
      ru: "Праздники с разными возрастами"
    },
    description: {
      he: "מתנפח גדול + תוספת משחק. גם הקטנים נהנים, גם הגדולים — בלי לבחור.",
      en: "Big inflatable + game add-on. Younger and older kids enjoy together.",
      ru: "Большой батут + дополнение. И малыши, и постарше — все вместе."
    },
    bestFor: {
      he: "אירועים עם כמה גילאים",
      en: "Events with several age groups",
      ru: "Мероприятия с разными возрастами"
    },
    includes: {
      he: [
        "מתנפח גדול",
        "תוספת משחק / קליעה / כדורים",
        "פתרון גם לקטנים וגם לגדולים",
        "השכרה ל-12 שעות"
      ],
      en: [
        "Large inflatable",
        "Game / archery / ball add-on",
        "Fits both younger and older kids",
        "12-hour rental"
      ],
      ru: [
        "Большой батут",
        "Игровое дополнение",
        "Подходит и младшим, и старшим",
        "Аренда 12 часов"
      ]
    },
    optionalAddons: ["ball-pit", "archery", "soccer-goal", "extra-blower"],
    childMood: {
      he: "לחגיגה משפחתית",
      en: "For a family celebration",
      ru: "Для семейного праздника"
    },
    priceFrom: 1890,
    priceLabel: { he: "החל מ-₪1,890", en: "From ₪1,890", ru: "От ₪1,890" },
    recommendedAges: "3-14",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "דורש טנדר/רכב משפחתי גדול. שטח הקמה 7×6 מ׳.",
      en: "Needs a van/large family car. 7×6 m setup area.",
      ru: "Нужен фургон/большой авто. Площадка 7×6 м."
    },
    safetyNotes: {
      he: "להפריד שימוש לפי גילאים. השגחת מבוגר חובה.",
      en: "Separate usage by age. Adult supervision required.",
      ru: "Разделять по возрасту. Обязателен взрослый."
    },
    fits: { home: false, yard: true, water: false, indoor: false, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1571999292598-9a8e95a2c9cf?w=1400&q=80",
    colorTheme: "sun",
    seoTitle: {
      he: "חבילת Combo משפחתית — מתנפח גדול ותוספת משחק",
      en: "Family Combo Inflatable Package",
      ru: "Семейный комбо-пакет"
    },
    seoDescription: {
      he: "חבילת Combo משפחתית עם מתנפח גדול ותוספת משחק. החל מ-₪1,890.",
      en: "Family combo with a large inflatable + game add-on. From ₪1,890.",
      ru: "Семейный комбо с большим батутом и дополнением. От ₪1,890."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות עבור חבילת Combo משפחתית 👨‍👩‍👧‍👦\nתאריך רצוי:\nשעת איסוף רצויה:\nגילאי הילדים (טווחים):\nגודל החצר:\nתודה!",
      en: "Hi, I'd like to check availability for the Family Combo package 👨‍👩‍👧‍👦\nPreferred date:\nPickup time:\nKids' age range:\nYard size:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность Семейного комбо 👨‍👩‍👧‍👦\nДата:\nВремя:\nВозраст детей:\nРазмер двора:\nСпасибо!"
    }
  },
  {
    id: "extra-fun",
    slug: "extra-fun",
    sortOrder: 90,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    category: "extra",
    tags: ["best-value", "family"],
    title: {
      he: "חבילת אקסטרה Fun",
      en: "Extra Fun Package",
      ru: "Пакет Extra Fun"
    },
    subtitle: {
      he: "אירוע גדול יותר, חוויה מלאה",
      en: "Bigger event, full experience",
      ru: "Большое мероприятие, полный опыт"
    },
    description: {
      he: "שני מתנפחים, תוספת משחק חצר, התאמה לגילאים — וגם עדיפות בתיאום זמינות.",
      en: "Two inflatables, yard-game add-on, age-tailored, and availability priority.",
      ru: "Два батута, дворовые игры, подбор по возрасту и приоритет в бронировании."
    },
    bestFor: {
      he: "אירועים גדולים, יום הולדת בכיתה, אירוע שכונה",
      en: "Big events, classroom birthdays, neighborhood parties",
      ru: "Большие праздники, классные дни рождения"
    },
    includes: {
      he: [
        "שני מתנפחים",
        "תוספת משחק חצר",
        "התאמת חבילה לפי גילאים",
        "עדיפות בתיאום זמינות"
      ],
      en: [
        "Two inflatables",
        "Yard-game add-on",
        "Age-tailored package",
        "Priority availability"
      ],
      ru: [
        "Два батута",
        "Дворовые игры",
        "Подбор по возрасту",
        "Приоритет в бронировании"
      ]
    },
    optionalAddons: ["ball-pit", "soccer-goal", "yard-games", "extra-blower"],
    childMood: {
      he: "לילדים שאוהבים אקשן",
      en: "For action-loving kids",
      ru: "Для активных детей"
    },
    priceFrom: 2400,
    priceLabel: { he: "החל מ-₪2,400", en: "From ₪2,400", ru: "От ₪2,400" },
    recommendedAges: "4-14",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "דורש 2 איסופים בו-זמנית או טנדר גדול.",
      en: "Two pickups simultaneously or a large van.",
      ru: "Два самовывоза одновременно или большой фургон."
    },
    safetyNotes: {
      he: "השגחה צמודה לכל מתנפח. כללי בטיחות נפרדים לכל מתקן.",
      en: "Dedicated supervision per inflatable. Separate safety rules.",
      ru: "Отдельный присмотр для каждого батута."
    },
    fits: { home: false, yard: true, water: true, indoor: false, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=80",
    colorTheme: "coral",
    seoTitle: {
      he: "חבילת אקסטרה Fun — מתנפחים לאירועים גדולים",
      en: "Extra Fun Inflatable Package",
      ru: "Пакет Extra Fun — большие праздники"
    },
    seoDescription: {
      he: "שני מתנפחים + תוספת לאירוע גדול. החל מ-₪2,400.",
      en: "Two inflatables + add-on for big events. From ₪2,400.",
      ru: "Два батута + дополнения для больших праздников. От ₪2,400."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות עבור חבילת אקסטרה Fun 🚀\nתאריך רצוי:\nשעת איסוף רצויה:\nגילאי הילדים:\nמיקום וגודל המקום:\nכמות ילדים מוערכת:\nתודה!",
      en: "Hi, I'd like to check availability for the Extra Fun package 🚀\nPreferred date:\nPickup time:\nKids' ages:\nLocation & size:\nEstimated number of kids:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность пакета Extra Fun 🚀\nДата:\nВремя:\nВозраст детей:\nМесто и размер:\nКоличество детей:\nСпасибо!"
    }
  },
  {
    id: "custom",
    slug: "custom",
    sortOrder: 100,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    category: "custom",
    tags: ["custom"],
    title: {
      he: "חבילה בהתאמה אישית",
      en: "Custom Package",
      ru: "Индивидуальный пакет"
    },
    subtitle: {
      he: "מי שלא יודע מה לבחור",
      en: "When you don't know which package fits",
      ru: "Когда не знаете, что выбрать"
    },
    description: {
      he: "ספרו לנו על הילדים והאירוע — נחזיר המלצה מותאמת אישית והצעת מחיר בוואטסאפ.",
      en: "Tell us about the kids and the event — we'll send a tailored recommendation and quote on WhatsApp.",
      ru: "Расскажите о детях и празднике — пришлём индивидуальную рекомендацию и цену в WhatsApp."
    },
    bestFor: {
      he: "מי שלא יודע מה לבחור או מתכנן אירוע ייחודי",
      en: "Anyone unsure which package to pick, or planning a unique event",
      ru: "Тем, кто сомневается, или планирует уникальное событие"
    },
    includes: {
      he: [
        "התאמה לפי גילאי הילדים",
        "התאמה לפי גודל החצר / הבית",
        "התאמה לפי עונה",
        "המלצה אישית בוואטסאפ"
      ],
      en: [
        "Tailored to kids' ages",
        "Tailored to yard / home size",
        "Tailored to the season",
        "Personal recommendation on WhatsApp"
      ],
      ru: [
        "Подбор по возрасту",
        "Подбор по размеру",
        "Подбор по сезону",
        "Личная рекомендация в WhatsApp"
      ]
    },
    optionalAddons: ["ball-pit", "soft-play", "soccer-goal", "yard-games"],
    childMood: {
      he: "ליום הולדת ייחודי",
      en: "For a one-of-a-kind party",
      ru: "Для уникального праздника"
    },
    priceFrom: 0,
    priceLabel: {
      he: "מחיר לפי התאמה",
      en: "Custom pricing",
      ru: "Цена под заказ"
    },
    recommendedAges: "1-14",
    durationHours: 12,
    pickupOnly: true,
    setupNotes: {
      he: "ההתקנה משתנה לפי המתנפח שנבחר.",
      en: "Setup varies by chosen inflatable.",
      ru: "Установка зависит от выбора."
    },
    safetyNotes: {
      he: "כל המתנפחים שלנו עומדים בתקני בטיחות אירופאיים.",
      en: "All our inflatables meet European safety standards.",
      ru: "Все батуты соответствуют европейским стандартам."
    },
    fits: { home: true, yard: true, water: true, indoor: true, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1400&q=80",
    colorTheme: "ink",
    seoTitle: {
      he: "חבילה בהתאמה אישית — ייעוץ מותאם",
      en: "Custom Inflatable Package — personalized consult",
      ru: "Индивидуальный пакет батутов — консультация"
    },
    seoDescription: {
      he: "לא בטוחים? בנו איתנו חבילה בהתאמה אישית בוואטסאפ.",
      en: "Not sure? Build a custom package with us on WhatsApp.",
      ru: "Не уверены? Соберём пакет вместе в WhatsApp."
    },
    whatsappTemplate: {
      he: "שלום, אשמח לייעוץ לחבילה בהתאמה אישית 🧩\nגילאי הילדים:\nכמות ילדים מוערכת:\nתאריך רצוי:\nמיקום (בית/חצר/חוץ):\nתקציב כללי:\nתודה!",
      en: "Hi, I'd like a custom package consult 🧩\nKids' ages:\nEstimated kids:\nPreferred date:\nLocation (home / yard / outdoor):\nRough budget:\nThanks!",
      ru: "Здравствуйте, нужен индивидуальный подбор 🧩\nВозраст детей:\nКол-во:\nДата:\nМесто:\nБюджет:\nСпасибо!"
    }
  }
];

export const getPackageBySlug = (slug: string) =>
  packages.find((p) => p.slug === slug);

export const getActivePackages = () =>
  packages.filter((p) => p.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
