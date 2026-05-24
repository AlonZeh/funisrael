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
    id: "mini-party",
    slug: "mini-party",
    sortOrder: 10,
    isActive: true,
    isFeatured: true,
    isPopular: true,
    category: "birthday",
    tags: ["best-value", "popular"],
    title: {
      he: "חבילת Mini Party",
      en: "Mini Party Package",
      ru: "Пакет Mini Party"
    },
    subtitle: {
      he: "יום הולדת קטן, צבעוני וקליל",
      en: "A small, colorful, easy birthday",
      ru: "Маленький, яркий и лёгкий день рождения"
    },
    description: {
      he: "החבילה הקלאסית לימי הולדת קטנים: מתנפח אחד לבחירה (הבית הקופצני או מתנפח פעילות עם מגלשה), הוראות התקנה והכל מוכן לאירוע קליל בגינה.",
      en: "The classic small birthday bundle: choose one inflatable (Bouncy House or Activity Slide Bouncer), full setup instructions, ready for an easy garden event.",
      ru: "Классический набор для маленького дня рождения: один батут на выбор, инструкция по установке и всё готово для лёгкого праздника во дворе."
    },
    bestFor: {
      he: "ילדים צעירים, חצרות קטנות, עד 10 ילדים",
      en: "Young kids, small yards, up to 10 children",
      ru: "Маленькие дети, небольшие дворы, до 10 детей"
    },
    includes: {
      he: [
        "מתנפח לבחירה: הבית הקופצני או מתנפח פעילות עם מגלשה",
        "הוראות הפעלה ובטיחות",
        "התאמת המתנפח לגיל הילדים"
      ],
      en: [
        "Choice of inflatable: Bouncy House or Activity Slide Bouncer",
        "Operating and safety instructions",
        "Inflatable matched to the kids' ages"
      ],
      ru: [
        "Батут на выбор: Прыгучий дом или Игровой батут с горкой",
        "Инструкции по эксплуатации и безопасности",
        "Подбор батута под возраст детей"
      ]
    },
    optionalAddons: ["popcorn-machine", "mascot-single", "bambi-backdrop"],
    childMood: {
      he: "לקופצים הקטנים",
      en: "For little bouncers",
      ru: "Для маленьких прыгунов"
    },
    priceFrom: 449,
    priceLabel: {
      he: "₪449-₪499 לאירוע",
      en: "₪449-₪499 per event",
      ru: "₪449-₪499 за мероприятие"
    },
    recommendedAges: "2-8",
    durationHours: 12,
    pickupOnly: false,
    setupNotes: {
      he: "הקמה ביתית פשוטה, מתאים לדשא או רצפה חלקה.",
      en: "Simple home setup on grass or smooth flooring.",
      ru: "Простая установка дома на газоне или ровном полу."
    },
    safetyNotes: {
      he: "השגחת מבוגר חובה. עיגון יתדות בכל הפינות.",
      en: "Adult supervision required. Stake all corners.",
      ru: "Обязателен присмотр взрослого. Закрепить все углы."
    },
    fits: { home: true, yard: true, water: false, indoor: true, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1530878869293-44c79c5f04a8?w=1400&q=80",
    colorTheme: "coral",
    seoTitle: {
      he: "חבילת Mini Party — מתנפח להשכרה ליום הולדת קטן",
      en: "Mini Party Package — small birthday inflatable rental",
      ru: "Пакет Mini Party — батут для маленького дня рождения"
    },
    seoDescription: {
      he: "חבילת יום הולדת קטנה עם מתנפח לבחירה. ₪449-₪499, בלי תשלום באתר — בדיקת זמינות בוואטסאפ.",
      en: "Small birthday package with choice of inflatable. ₪449-₪499, no online payment — availability via WhatsApp.",
      ru: "Маленький пакет дня рождения с выбором батута. ₪449-₪499, без онлайн-оплаты — доступность в WhatsApp."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות לחבילת Mini Party 🎂\nתאריך רצוי:\nגילאי הילדים:\nכמות ילדים משוערת:\nמיקום האירוע:\nתודה!",
      en: "Hi, I'd like to check availability for the Mini Party package 🎂\nPreferred date:\nKids' ages:\nEstimated kids:\nLocation:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность пакета Mini Party 🎂\nДата:\nВозраст детей:\nКол-во:\nМесто:\nСпасибо!"
    }
  },
  {
    id: "water-splash",
    slug: "water-splash",
    sortOrder: 20,
    isActive: true,
    isFeatured: true,
    isPopular: true,
    category: "water",
    tags: ["summer", "popular"],
    title: {
      he: "חבילת Water Splash",
      en: "Water Splash Package",
      ru: "Пакет Water Splash"
    },
    subtitle: {
      he: "פארק מים פרטי בגינה",
      en: "Your own water park in the yard",
      ru: "Личный водный парк во дворе"
    },
    description: {
      he: "חבילת המים הקלאסית — מתנפח מים לבחירה (פארק התמנון הסגול או מגלשת מים כפולה), הכנת חיבור מים והכל מוכן ליום קיץ בגינה.",
      en: "The classic water bundle — choose a water inflatable (Purple Octopus Park or Double Water Slide), hose-up guide, ready for a summer garden day.",
      ru: "Классический водный набор — водный батут на выбор, подключение воды и всё готово для летнего дня."
    },
    bestFor: {
      he: "אירועי קיץ, ימי הולדת מים, ילדים שאוהבים מגלשות",
      en: "Summer events, water birthdays, slide-loving kids",
      ru: "Летние праздники, водные дни рождения"
    },
    includes: {
      he: [
        "מתנפח מים לבחירה: פארק התמנון הסגול או מגלשת מים כפולה",
        "הנחיות חיבור מים ובטיחות",
        "התאמה לגודל החצר ולמספר הילדים"
      ],
      en: [
        "Choice of water inflatable: Purple Octopus Park or Double Water Slide",
        "Water hookup and safety guidelines",
        "Matched to yard size and number of kids"
      ],
      ru: [
        "Водный батут на выбор: Парк Осьминог или Двойная горка",
        "Инструкции по подключению воды и безопасности",
        "Подбор под размер двора и кол-во детей"
      ]
    },
    optionalAddons: ["cooler", "popcorn-machine", "generator"],
    childMood: {
      he: "לחובבי מים",
      en: "For water lovers",
      ru: "Для любителей воды"
    },
    priceFrom: 699,
    priceLabel: {
      he: "₪699-₪799 לאירוע",
      en: "₪699-₪799 per event",
      ru: "₪699-₪799 за мероприятие"
    },
    recommendedAges: "3-12",
    durationHours: 12,
    pickupOnly: false,
    setupNotes: {
      he: "דורש דשא או משטח חלק 6×5 מ׳ ולחץ מים סטנדרטי.",
      en: "Needs grass or smooth surface 6×5 m and standard water pressure.",
      ru: "Газон или ровная площадка 6×5 м, стандартный напор воды."
    },
    safetyNotes: {
      he: "מומלץ להגביל מספר ילדים במתנפח בו-זמנית. השגחת מבוגר חובה.",
      en: "Limit simultaneous users. Adult supervision required.",
      ru: "Ограничьте одновременных пользователей. Обязателен взрослый."
    },
    fits: { home: false, yard: true, water: true, indoor: false, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1400&q=80",
    colorTheme: "sky",
    seoTitle: {
      he: "חבילת Water Splash — מתנפחי מים להשכרה",
      en: "Water Splash Package — water inflatable rental",
      ru: "Пакет Water Splash — водные батуты в аренду"
    },
    seoDescription: {
      he: "מתנפח מים לבחירה לקיץ. ₪699-₪799, בדיקת זמינות בוואטסאפ.",
      en: "Choice of water inflatable for summer. ₪699-₪799, availability via WhatsApp.",
      ru: "Водный батут на выбор для лета. ₪699-₪799, доступность в WhatsApp."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות לחבילת Water Splash 💦\nתאריך רצוי:\nגיל הילדים:\nכמות ילדים משוערת:\nגודל החצר:\nמיקום:\nתודה!",
      en: "Hi, I'd like to check availability for the Water Splash package 💦\nPreferred date:\nKids' ages:\nEstimated kids:\nYard size:\nLocation:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность Water Splash 💦\nДата:\nВозраст детей:\nКол-во:\nРазмер двора:\nМесто:\nСпасибо!"
    }
  },
  {
    id: "double-splash",
    slug: "double-splash",
    sortOrder: 30,
    isActive: true,
    isFeatured: true,
    isPopular: true,
    category: "water",
    tags: ["summer", "popular", "premium"],
    title: {
      he: "חבילת Double Splash",
      en: "Double Splash Package",
      ru: "Пакет Double Splash"
    },
    subtitle: {
      he: "שני מתקני מים, יותר כיף ופחות תורים",
      en: "Two water rigs, more fun and shorter lines",
      ru: "Два водных батута, больше веселья и меньше очередей"
    },
    description: {
      he: "שני מתנפחי מים באירוע אחד: מגלשת מים דו-מסלולית + פארק התמנון הסגול. מתאים לאירועים גדולים יותר שבהם רוצים שהילדים יזרמו במקביל ולא ייתקעו בתורים.",
      en: "Two water inflatables at one event: Twin-Lane Water Slide + Purple Octopus Park. Designed for bigger events where you want flow, not lines.",
      ru: "Два водных батута на одном празднике: Двухполосная горка + Парк Осьминог. Для больших праздников без очередей."
    },
    bestFor: {
      he: "10-25 ילדים, אירועי קיץ, ימי הולדת גדולים",
      en: "10-25 kids, summer events, bigger birthdays",
      ru: "10-25 детей, летние праздники, большие дни рождения"
    },
    includes: {
      he: [
        "מגלשת מים דו-מסלולית",
        "פארק מים התמנון הסגול",
        "צידנית גדולה",
        "הוראות חיבור מים ובטיחות לשני המתקנים"
      ],
      en: [
        "Twin-Lane Water Slide",
        "Purple Octopus Water Park",
        "Large cooler",
        "Hookup + safety instructions for both rigs"
      ],
      ru: [
        "Двухполосная водная горка",
        "Водный парк Осьминог",
        "Большой кулер",
        "Инструкции по подключению и безопасности для обоих"
      ]
    },
    optionalAddons: ["generator", "popcorn-machine", "mascots-pair"],
    childMood: {
      he: "לאירוע מים גדול",
      en: "For a big water event",
      ru: "Для большого водного праздника"
    },
    priceFrom: 1190,
    priceLabel: {
      he: "₪1,190-₪1,390 לאירוע",
      en: "₪1,190-₪1,390 per event",
      ru: "₪1,190-₪1,390 за мероприятие"
    },
    recommendedAges: "4-14",
    durationHours: 12,
    pickupOnly: false,
    setupNotes: {
      he: "דורש שטח 10×6 מ׳ לפחות עם לחץ מים תקין ונקודת חשמל קרובה (או גנרטור).",
      en: "Needs at least 10×6 m, working water pressure, and a nearby outlet (or a generator).",
      ru: "Минимум 10×6 м, рабочий напор воды и розетка рядом (или генератор)."
    },
    safetyNotes: {
      he: "הפרדה ברורה בין שני המתקנים. מומלץ מפעיל/ת השגחה אחד/ת לכל מתקן.",
      en: "Keep the two rigs separate. Recommended: one supervisor per rig.",
      ru: "Разделить два батута. Рекомендуем одного взрослого на каждый."
    },
    fits: { home: false, yard: true, water: true, indoor: false, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=80",
    colorTheme: "sky",
    seoTitle: {
      he: "חבילת Double Splash — שני מתנפחי מים לאירועי קיץ",
      en: "Double Splash Package — two water inflatables for summer",
      ru: "Пакет Double Splash — два водных батута"
    },
    seoDescription: {
      he: "שני מתנפחי מים + צידנית לאירוע גדול. ₪1,190-₪1,390, בדיקת זמינות בוואטסאפ.",
      en: "Two water inflatables + cooler for a bigger event. ₪1,190-₪1,390, availability via WhatsApp.",
      ru: "Два водных батута + кулер для большого праздника. ₪1,190-₪1,390."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות לחבילת Double Splash 🌊\nתאריך רצוי:\nגילאי הילדים:\nכמות ילדים משוערת:\nגודל החצר ונקודת חשמל:\nמיקום:\nתודה!",
      en: "Hi, I'd like to check availability for the Double Splash package 🌊\nPreferred date:\nKids' ages:\nEstimated kids:\nYard size and power outlet:\nLocation:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность Double Splash 🌊\nДата:\nВозраст:\nКол-во:\nДвор и розетка:\nМесто:\nСпасибо!"
    }
  },
  {
    id: "sports-arena",
    slug: "sports-arena",
    sortOrder: 40,
    isActive: true,
    isFeatured: false,
    isPopular: true,
    category: "sports",
    tags: ["popular", "family"],
    title: {
      he: "חבילת Sports Arena",
      en: "Sports Arena Package",
      ru: "Пакет Sports Arena"
    },
    subtitle: {
      he: "מיני טורניר כדורגל, כדורסל וכדורעף",
      en: "Mini soccer, basketball and volleyball tournament",
      ru: "Мини-турнир по футболу, баскетболу и волейболу"
    },
    description: {
      he: "החבילה האנרגטית ביותר שלנו — מגרש ספורט מתנפח שמאפשר טורניר אמיתי בחצר. מומלץ לגילאי 6-12 ולילדים שאוהבים תחרות ומשחקי קבוצה.",
      en: "Our most energetic package — an inflatable sports field that turns the yard into a real tournament. Best for ages 6-12 who love team play.",
      ru: "Наш самый энергичный пакет — надувной спортивный мини-стадион. Идеально для возраста 6-12 и командной игры."
    },
    bestFor: {
      he: "גילאי 6-12, ימי הולדת אנרגטיים, אירועי שכונה",
      en: "Ages 6-12, energetic birthdays, neighborhood events",
      ru: "6-12, энергичные дни рождения, дворовые праздники"
    },
    includes: {
      he: [
        "מגרש ספורט מתנפח (כדורגל / כדורסל / כדורעף)",
        "הנחיות בטיחות והפרדה לפי גילאים",
        "התאמה למספר הילדים והמיקום"
      ],
      en: [
        "Inflatable sports field (soccer / basketball / volleyball)",
        "Safety guidelines and age-based separation",
        "Tailored to kid count and venue"
      ],
      ru: [
        "Надувное спортивное поле",
        "Инструкции по безопасности и разделению по возрастам",
        "Подбор под количество детей и место"
      ]
    },
    optionalAddons: ["popcorn-machine", "mascot-single", "cooler"],
    childMood: {
      he: "לילדים שאוהבים אקשן",
      en: "For action-loving kids",
      ru: "Для активных детей"
    },
    priceFrom: 899,
    priceLabel: {
      he: "₪899-₪1,090 לאירוע",
      en: "₪899-₪1,090 per event",
      ru: "₪899-₪1,090 за мероприятие"
    },
    recommendedAges: "6-12",
    durationHours: 12,
    pickupOnly: false,
    setupNotes: {
      he: "דורש שטח של 9×4.5 מ׳ לפחות. מתאים לדשא או רצפת בטון חלקה.",
      en: "Needs at least 9×4.5 m. Works on grass or smooth concrete.",
      ru: "Минимум 9×4,5 м. Газон или ровный бетон."
    },
    safetyNotes: {
      he: "השגחת מבוגר חובה. הפרדה בין קבוצות גיל וכמות ילדים מותרת בו-זמנית.",
      en: "Adult supervision required. Separate age groups and limit simultaneous players.",
      ru: "Обязателен взрослый. Разделение по возрастам, ограничение одновременных игроков."
    },
    fits: { home: false, yard: true, water: false, indoor: false, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1400&q=80",
    colorTheme: "mint",
    seoTitle: {
      he: "חבילת Sports Arena — מגרש ספורט מתנפח להשכרה",
      en: "Sports Arena Package — inflatable sports field rental",
      ru: "Пакет Sports Arena — надувное спортивное поле"
    },
    seoDescription: {
      he: "מגרש ספורט מתנפח לכדורגל וכדורסל. ₪899-₪1,090, בדיקת זמינות בוואטסאפ.",
      en: "Inflatable sports field for soccer and basketball. ₪899-₪1,090, availability via WhatsApp.",
      ru: "Надувное поле для футбола и баскетбола. ₪899-₪1,090."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות לחבילת Sports Arena ⚽\nתאריך רצוי:\nגילאי הילדים:\nכמות ילדים משוערת:\nמיקום וגודל המגרש:\nתודה!",
      en: "Hi, I'd like to check availability for the Sports Arena package ⚽\nPreferred date:\nKids' ages:\nEstimated kids:\nVenue and field size:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность Sports Arena ⚽\nДата:\nВозраст:\nКол-во:\nМесто и размер площадки:\nСпасибо!"
    }
  },
  {
    id: "mega-party",
    slug: "mega-party",
    sortOrder: 50,
    isActive: true,
    isFeatured: true,
    isPopular: false,
    category: "premium",
    tags: ["premium", "summer", "instagram"],
    title: {
      he: "חבילת Mega Party",
      en: "Mega Party Package",
      ru: "Пакет Mega Party"
    },
    subtitle: {
      he: "אירוע שילדים יזכרו",
      en: "An event the kids will remember",
      ru: "Праздник, который запомнится"
    },
    description: {
      he: "אירוע קיץ פרימיום — שני מתנפחי מים גדולים, מכונת פופקורן ובובות ענק. WOW לאורחים ולתמונות.",
      en: "Premium summer event — two large water inflatables, popcorn machine, and giant mascots. WOW for guests and photos.",
      ru: "Премиум-летний праздник — два больших водных батута, попкорн-машина и гигантские маскоты."
    },
    bestFor: {
      he: "ימי הולדת גדולים, אירועי קיץ, משפחות שרוצות חוויה מלאה",
      en: "Big birthdays, summer events, families who want the full experience",
      ru: "Большие дни рождения, летние мероприятия, полный праздник"
    },
    includes: {
      he: [
        "מתנפח מים ענק עם 2 מגלשות",
        "מגלשת מים דו-מסלולית",
        "מכונת פופקורן + שערות סבתא",
        "בובות ענק לאירוע (זוג דובי 3.2מ + בייבי בוס 3מ)"
      ],
      en: [
        "Mega Water Park with two slides",
        "Twin-Lane Water Slide",
        "Popcorn + cotton candy machine",
        "Giant mascots set (pair of 3.2 m bears + 3 m Baby Boss)"
      ],
      ru: [
        "Огромный водный батут с двумя горками",
        "Двухполосная водная горка",
        "Попкорн-машина + сахарная вата",
        "Гигантские маскоты (медведи 3,2 м + Бэйби Босс 3 м)"
      ]
    },
    optionalAddons: ["generator", "cooler", "bambi-backdrop"],
    childMood: {
      he: "לאירוע שילדים יזכרו",
      en: "For an event they'll remember",
      ru: "Чтобы запомнили"
    },
    priceFrom: 1590,
    priceLabel: {
      he: "₪1,590-₪1,990 לאירוע",
      en: "₪1,590-₪1,990 per event",
      ru: "₪1,590-₪1,990 за мероприятие"
    },
    recommendedAges: "4-14",
    durationHours: 12,
    pickupOnly: false,
    setupNotes: {
      he: "שטח של 12×6 מ׳ לפחות, חיבור מים תקין ונקודת חשמל (או גנרטור).",
      en: "At least 12×6 m, working water connection and power outlet (or generator).",
      ru: "Минимум 12×6 м, рабочая вода и розетка (или генератор)."
    },
    safetyNotes: {
      he: "השגחה צמודה לכל מתקן. הפרדת ילדים לפי גיל ומספר.",
      en: "Dedicated supervision per rig. Separate by age and number.",
      ru: "Постоянный присмотр у каждого батута. Разделение по возрасту и количеству."
    },
    fits: { home: false, yard: true, water: true, indoor: false, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=1400&q=80",
    colorTheme: "coral",
    seoTitle: {
      he: "חבילת Mega Party — שני מתנפחי מים, פופקורן ובובות ענק",
      en: "Mega Party Package — two water inflatables, popcorn, giant mascots",
      ru: "Пакет Mega Party — два водных батута, попкорн, маскоты"
    },
    seoDescription: {
      he: "חבילת אירוע קיץ פרימיום — מים, פופקורן ובובות ענק. ₪1,590-₪1,990, בדיקת זמינות בוואטסאפ.",
      en: "Premium summer event package — water, popcorn, giant mascots. ₪1,590-₪1,990, availability via WhatsApp.",
      ru: "Премиум летний пакет — вода, попкорн, маскоты. ₪1,590-₪1,990."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות לחבילת Mega Party 🎉\nתאריך רצוי:\nגילאי הילדים:\nכמות ילדים משוערת:\nגודל החצר ונקודת חשמל:\nמיקום:\nתודה!",
      en: "Hi, I'd like to check availability for the Mega Party package 🎉\nPreferred date:\nKids' ages:\nEstimated kids:\nYard size and outlet:\nLocation:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность Mega Party 🎉\nДата:\nВозраст:\nКол-во:\nДвор и розетка:\nМесто:\nСпасибо!"
    }
  },
  {
    id: "instagram-wow",
    slug: "instagram-wow",
    sortOrder: 60,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    category: "luxury-white",
    tags: ["luxury", "instagram", "premium"],
    title: {
      he: "חבילת Instagram WOW",
      en: "Instagram WOW Package",
      ru: "Пакет Instagram WOW"
    },
    subtitle: {
      he: "החבילה המצטלמת ביותר",
      en: "The most photogenic package",
      ru: "Самый фотогеничный пакет"
    },
    description: {
      he: "חבילה שמיועדת לאינסטגרם — מתנפח גדול לבחירה, בובות ענק, רקע קאפה במבי לצילומים ומכונת פופקורן. כל פרט בה מתוכנן לתמונה אחת בלתי נשכחת.",
      en: "An Instagram-first package — choice of large inflatable, giant mascots, Bambi photo backdrop, and a popcorn machine. Every detail engineered for a single unforgettable photo.",
      ru: "Пакет для Instagram — большой батут на выбор, маскоты, фотофон Бэмби и попкорн-машина. Каждая деталь для одного незабываемого кадра."
    },
    bestFor: {
      he: "אירועים מצולמים, ימי הולדת מעוצבים",
      en: "Photo-driven events, styled birthdays",
      ru: "Фото-мероприятия, стильные дни рождения"
    },
    includes: {
      he: [
        "מתנפח גדול לבחירה",
        "בובות ענק לאירוע",
        "רקע קאפה במבי",
        "מכונת פופקורן + שערות סבתא"
      ],
      en: [
        "Choice of a large inflatable",
        "Giant mascots set",
        "Bambi photo backdrop",
        "Popcorn + cotton candy machine"
      ],
      ru: [
        "Большой батут на выбор",
        "Гигантские маскоты",
        "Фотофон Бэмби",
        "Попкорн-машина + сахарная вата"
      ]
    },
    optionalAddons: ["generator", "cooler"],
    childMood: {
      he: "ליום הולדת מהאינסטגרם",
      en: "For an Instagram-style party",
      ru: "Для Instagram-стиля"
    },
    priceFrom: 2500,
    priceLabel: {
      he: "₪2,500-₪3,500 לאירוע",
      en: "₪2,500-₪3,500 per event",
      ru: "₪2,500-₪3,500 за мероприятие"
    },
    recommendedAges: "3-14",
    durationHours: 12,
    pickupOnly: false,
    setupNotes: {
      he: "מומלץ דשא נקי או רצפה בהירה. צילום בשעות אור טבעי.",
      en: "Best on clean grass or a light floor. Shoot during natural light.",
      ru: "Идеально на чистом газоне или светлом полу. Снимать при дневном свете."
    },
    safetyNotes: {
      he: "השגחת מבוגר. הפרדת אזורי הצילום מאזורי המשחק.",
      en: "Adult supervision. Separate photo and play zones.",
      ru: "Присмотр взрослого. Разделение фото- и игровой зон."
    },
    fits: { home: true, yard: true, water: false, indoor: true, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80",
    colorTheme: "cream",
    seoTitle: {
      he: "חבילת Instagram WOW — אירוע מצולם עם בובות ענק ורקע צילום",
      en: "Instagram WOW Package — photogenic event with mascots and backdrop",
      ru: "Пакет Instagram WOW — фото-праздник с маскотами и фоном"
    },
    seoDescription: {
      he: "חבילה לאירועים מצולמים — מתנפח גדול, בובות ענק ורקע במבי. ₪2,500-₪3,500.",
      en: "Photo-driven package — large inflatable, mascots, Bambi backdrop. ₪2,500-₪3,500.",
      ru: "Пакет для фото — большой батут, маскоты, фон. ₪2,500-₪3,500."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות לחבילת Instagram WOW ✨\nתאריך רצוי:\nגיל הילדים:\nכמות ילדים משוערת:\nמיקום וסגנון רצוי:\nתודה!",
      en: "Hi, I'd like to check availability for the Instagram WOW package ✨\nPreferred date:\nKids' ages:\nEstimated kids:\nLocation and desired style:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность Instagram WOW ✨\nДата:\nВозраст:\nКол-во:\nМесто и стиль:\nСпасибо!"
    }
  },
  {
    id: "festival",
    slug: "festival",
    sortOrder: 70,
    isActive: true,
    isFeatured: false,
    isPopular: false,
    category: "festival",
    tags: ["family", "premium", "summer"],
    title: {
      he: "חבילת Festival",
      en: "Festival Package",
      ru: "Пакет Festival"
    },
    subtitle: {
      he: "מיני לונה פארק פרטי",
      en: "A private mini amusement park",
      ru: "Личный мини-парк аттракционов"
    },
    description: {
      he: "החבילה האולטימטיבית — שלושה מתנפחים לבחירה, בובות ענק, גנרטור, פופקורן וצידנית. מתאים לאירועים גדולים, קייטנות וועדי עובדים.",
      en: "The ultimate package — three inflatables of your choice, giant mascots, generator, popcorn and cooler. Built for big events, camps and workplace parties.",
      ru: "Главный пакет — три батута на выбор, маскоты, генератор, попкорн и кулер. Для больших праздников и корпоративов."
    },
    bestFor: {
      he: "אירועים גדולים, קייטנות, ועדי עובדים, אירועי שכונה",
      en: "Big events, camps, workplace events, neighborhood parties",
      ru: "Большие мероприятия, лагеря, корпоративы"
    },
    includes: {
      he: [
        "3 מתנפחים לבחירה",
        "בובות ענק לאירוע",
        "גנרטור",
        "מכונת פופקורן + שערות סבתא",
        "צידנית גדולה"
      ],
      en: [
        "Three inflatables of your choice",
        "Giant mascots set",
        "Generator",
        "Popcorn + cotton candy machine",
        "Large cooler"
      ],
      ru: [
        "Три батута на выбор",
        "Гигантские маскоты",
        "Генератор",
        "Попкорн-машина + сахарная вата",
        "Большой кулер"
      ]
    },
    optionalAddons: ["bambi-backdrop"],
    childMood: {
      he: "לאירוע ענק",
      en: "For a huge event",
      ru: "Для большого праздника"
    },
    priceFrom: 3500,
    priceLabel: {
      he: "₪3,500-₪5,500 לאירוע",
      en: "₪3,500-₪5,500 per event",
      ru: "₪3,500-₪5,500 за мероприятие"
    },
    recommendedAges: "3-14",
    durationHours: 12,
    pickupOnly: false,
    setupNotes: {
      he: "דורש שטח גדול (15×10 מ׳ ומעלה), הקמה מאורגנת מראש.",
      en: "Needs a large area (15×10 m or more), pre-planned setup.",
      ru: "Требует большую площадку (15×10 м и больше), плановая установка."
    },
    safetyNotes: {
      he: "מומלץ צוות השגחה של 2-3 מבוגרים. הפרדה ברורה בין המתקנים.",
      en: "Recommended: 2-3 adult supervisors. Keep rigs well separated.",
      ru: "Рекомендуем 2-3 взрослых. Чётко разделить батуты."
    },
    fits: { home: false, yard: true, water: true, indoor: false, outdoor: true },
    image:
      "https://images.unsplash.com/photo-1571999292598-9a8e95a2c9cf?w=1400&q=80",
    colorTheme: "sun",
    seoTitle: {
      he: "חבילת Festival — מיני לונה פארק פרטי לאירועים גדולים",
      en: "Festival Package — private mini amusement park for big events",
      ru: "Пакет Festival — мини-парк аттракционов для больших мероприятий"
    },
    seoDescription: {
      he: "3 מתנפחים, בובות ענק, גנרטור, פופקורן וצידנית. ₪3,500-₪5,500, בדיקת זמינות בוואטסאפ.",
      en: "3 inflatables, mascots, generator, popcorn and cooler. ₪3,500-₪5,500, availability via WhatsApp.",
      ru: "3 батута, маскоты, генератор, попкорн, кулер. ₪3,500-₪5,500."
    },
    whatsappTemplate: {
      he: "שלום, אני רוצה לבדוק זמינות לחבילת Festival 🎪\nתאריך רצוי:\nגילאי הילדים:\nכמות ילדים משוערת:\nגודל המקום ונקודת חשמל:\nמיקום:\nתודה!",
      en: "Hi, I'd like to check availability for the Festival package 🎪\nPreferred date:\nKids' ages:\nEstimated kids:\nVenue size and outlet:\nLocation:\nThanks!",
      ru: "Здравствуйте, хочу проверить доступность Festival 🎪\nДата:\nВозраст:\nКол-во:\nРазмер места и розетка:\nМесто:\nСпасибо!"
    }
  }
];

export const getPackageBySlug = (slug: string) =>
  packages.find((p) => p.slug === slug);

export const getActivePackages = () =>
  packages.filter((p) => p.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
