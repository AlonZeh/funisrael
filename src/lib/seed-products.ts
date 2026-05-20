import type { Product } from "./types";

/**
 * Seed inventory for FUN-ISRAEL.
 * Inspired by leading premium inflatable models on the Israeli market.
 * Images use Unsplash placeholders — replace with real product photography in admin.
 */
export const seedProducts: Product[] = [
  {
    id: "atlantis-water-park",
    slug: "atlantis-water-park",
    name: "אטלנטיס - פארק מים ענק",
    shortDescription: "פארק המים הגדול ביותר — מגלשות תאומות, בריכה מרכזית וקשתות מים.",
    longDescription:
      "מתנפח הדגל של FUN-ISRAEL. אטלנטיס משלב 3 מגלשות מים, בריכה רחבה במיוחד וקשתות מים — חוויית פארק מים מקצועית בחצר שלכם. בנוי מבד PVC כפול בעובי 0.55 מ\"מ, תפרים מחוזקים ותפים ניקיון מקיף בין השכרות. אידיאלי לאירועי קיץ, ימי הולדת ומפגשי משפחה גדולים.",
    category: "water",
    secondaryCategories: ["birthday"],
    price: 850,
    compareAtPrice: 1100,
    images: [
      "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=1600&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1600&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80"
    ],
    ageRange: "3-14",
    dimensions: { length: 580, width: 480, height: 280 },
    setupArea: { length: 7, width: 6 },
    indoorFriendly: false,
    outdoorFriendly: true,
    needsWater: true,
    setupTime: 35,
    pickupVehicle: "טנדר",
    stock: 2,
    badges: ["popular", "summer", "instagram"],
    perfectFor: ["ימי הולדת בקיץ", "אירועי משפחה", "פעילויות גן"],
    active: true
  },
  {
    id: "white-dream-castle",
    slug: "white-dream-castle",
    name: "ארמון החלומות הלבן",
    shortDescription: "מתנפח לבן מעוצב, פרימיום, מושלם לצילומי אינסטגרם.",
    longDescription:
      "ארמון החלומות הוא המתנפח החדש שלנו בקטגוריית הפרימיום. גוונים ניטרליים, צורת ארמון אלגנטית וגימור איכותי שהופכים אותו ללהיט באירועי בנות, מסיבות פרידה והפקות צילום. מתאים לאינדור עם תקרות גבוהות ולאאוטדור.",
    category: "premium",
    secondaryCategories: ["birthday", "indoor"],
    price: 750,
    images: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1600&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80"
    ],
    ageRange: "2-12",
    dimensions: { length: 420, width: 380, height: 320 },
    setupArea: { length: 5.5, width: 5 },
    indoorFriendly: true,
    outdoorFriendly: true,
    needsWater: false,
    setupTime: 25,
    pickupVehicle: "טנדר",
    stock: 1,
    badges: ["premium", "instagram", "new"],
    perfectFor: ["אירועי בנות", "ימי הולדת מעוצבים", "צילומי הפקה"],
    active: true
  },
  {
    id: "ice-cream-combo",
    slug: "ice-cream-combo",
    name: "קומבו גלידה",
    shortDescription: "מתנפח קומבו בעיצוב גלידה — מגלשה, בריכת כדורים ואזור קפיצה.",
    longDescription:
      "מתנפח קומבו מתוק במיוחד בעיצוב גלידה צבעוני. כולל אזור קפיצה רחב, מגלשה רכה ובריכת כדורים מובנית. בחירה מצוינת לאירועי גילאי 3-10.",
    category: "birthday",
    secondaryCategories: ["indoor"],
    price: 650,
    images: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1600&q=80",
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1600&q=80",
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1600&q=80"
    ],
    ageRange: "3-10",
    dimensions: { length: 450, width: 380, height: 280 },
    setupArea: { length: 5.5, width: 5 },
    indoorFriendly: true,
    outdoorFriendly: true,
    needsWater: false,
    setupTime: 25,
    pickupVehicle: "טנדר",
    stock: 2,
    badges: ["popular", "indoor-friendly"],
    perfectFor: ["ימי הולדת מתוקים", "אירועי גן", "מסיבות חורף"],
    active: true
  },
  {
    id: "gorilla-combo-slide",
    slug: "gorilla-combo-slide",
    name: "קומבו גורילה",
    shortDescription: "מגלשה דו-מסלולית עם בריכת מים — אדרנלין לקיץ.",
    longDescription:
      "קומבו גורילה הוא המתנפח האקסטרים שלנו לגיל בית ספר. מגלשה דו-מסלולית עם בריכת מים גדולה בתחתית, אזור טיפוס וקירות בולמי הולם. חוויה מקצועית של פארק מים בחצר.",
    category: "water",
    secondaryCategories: ["birthday"],
    price: 720,
    images: [
      "https://images.unsplash.com/photo-1571999292598-9a8e95a2c9cf?w=1600&q=80",
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1600&q=80",
      "https://images.unsplash.com/photo-1530878869293-44c79c5f04a8?w=1600&q=80"
    ],
    ageRange: "5-14",
    dimensions: { length: 520, width: 380, height: 290 },
    setupArea: { length: 6, width: 5 },
    indoorFriendly: false,
    outdoorFriendly: true,
    needsWater: true,
    setupTime: 30,
    pickupVehicle: "טנדר",
    stock: 1,
    badges: ["summer", "popular"],
    perfectFor: ["ימי הולדת בקיץ", "ילדי בית ספר", "אירועי שכונה"],
    active: true
  },
  {
    id: "toddler-clouds",
    slug: "toddler-clouds",
    name: "ענני פעוטות",
    shortDescription: "מתנפח רך ונמוך, בטוח במיוחד לגילאי 1-5.",
    longDescription:
      "מתנפח ייחודי שעוצב מחדש לפעוטות. גובה נמוך, רכיבים רכים, ללא מגלשה תלולה — מאפשר חוויה בטוחה לגילאים הצעירים. מוצר חובה בגן ובאירועי שנה ראשונה.",
    category: "toddler",
    secondaryCategories: ["indoor", "premium"],
    price: 480,
    images: [
      "https://images.unsplash.com/photo-1545048702-79362596cdc9?w=1600&q=80",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1600&q=80"
    ],
    ageRange: "1-5",
    dimensions: { length: 350, width: 300, height: 180 },
    setupArea: { length: 4.5, width: 4 },
    indoorFriendly: true,
    outdoorFriendly: true,
    needsWater: false,
    setupTime: 15,
    pickupVehicle: "רכב משפחתי גדול",
    stock: 2,
    badges: ["perfect-for-toddlers", "indoor-friendly", "premium"],
    perfectFor: ["יום הולדת שנה", "גני ילדים", "אירועי פעוטות"],
    active: true
  },
  {
    id: "soft-play-package-deluxe",
    slug: "soft-play-package-deluxe",
    name: "סופט-פליי חבילה דלוקס",
    shortDescription: "סט רכיבי משחק רכים — מדרגות, גשרים, גלילים וקוביות.",
    longDescription:
      "חבילת סופט-פליי מקצועית הכוללת מעל 15 רכיבים בגוונים פסטליים. אידיאלית לאירועי פעוטות, ימי הולדת שנה ופעילויות בוטיק. כולל גם שטיח רך מתחת לכל הסט.",
    category: "soft-play",
    secondaryCategories: ["toddler", "premium"],
    price: 550,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1600&q=80",
      "https://images.unsplash.com/photo-1558877385-8c1b8fc55e4d?w=1600&q=80",
      "https://images.unsplash.com/photo-1607582544224-7eea60d9c4d3?w=1600&q=80"
    ],
    ageRange: "1-4",
    dimensions: { length: 400, width: 400, height: 80 },
    setupArea: { length: 5, width: 5 },
    indoorFriendly: true,
    outdoorFriendly: false,
    needsWater: false,
    setupTime: 20,
    pickupVehicle: "רכב משפחתי גדול",
    stock: 2,
    badges: ["premium", "perfect-for-toddlers", "indoor-friendly"],
    perfectFor: ["מסיבת שנה", "אירועי בוטיק", "צילומי תינוקות"],
    active: true
  },
  {
    id: "ball-pit-premium",
    slug: "ball-pit-premium",
    name: "בריכת כדורים פרימיום",
    shortDescription: "בריכה גדולה עם 1,500 כדורים בגוונים פסטליים.",
    longDescription:
      "בריכת כדורים בגוונים ניטרליים שמעלה כל מתנפח לרמה הבאה. דפנות רכות, רצפה מרופדת ו-1,500 כדורים נקיים שעוברים סטריליזציה בין השכרות. ניתן להזמין גם כתוספת למתנפחים אחרים.",
    category: "ball-pit",
    secondaryCategories: ["toddler", "indoor", "premium"],
    price: 320,
    images: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1600&q=80",
      "https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?w=1600&q=80",
      "https://images.unsplash.com/photo-1596463059283-da257325bab8?w=1600&q=80"
    ],
    ageRange: "1-8",
    dimensions: { length: 250, width: 250, height: 60 },
    setupArea: { length: 3, width: 3 },
    indoorFriendly: true,
    outdoorFriendly: true,
    needsWater: false,
    setupTime: 10,
    pickupVehicle: "רכב פרטי",
    stock: 3,
    badges: ["premium", "instagram", "indoor-friendly"],
    perfectFor: ["תוספת לכל מתנפח", "מסיבות פעוטות", "צילומי אירוע"],
    active: true
  },
  {
    id: "indoor-mini-bouncer",
    slug: "indoor-mini-bouncer",
    name: "מיני קפיץ אינדור",
    shortDescription: "מתנפח קומפקטי לסלון או חדר משחקים.",
    longDescription:
      "המתנפח הקומפקטי שלנו, מתאים לחדרים עם תקרה סטנדרטית (2.4 מ׳). אזור קפיצה איכותי במידות שמתאימות לדירה ממוצעת. החלום של החורף הישראלי.",
    category: "indoor",
    secondaryCategories: ["toddler"],
    price: 380,
    images: [
      "https://images.unsplash.com/photo-1602536052359-ef94c21c5948?w=1600&q=80",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1600&q=80",
      "https://images.unsplash.com/photo-1601758174357-95e87f0e8e91?w=1600&q=80"
    ],
    ageRange: "2-8",
    dimensions: { length: 280, width: 250, height: 220 },
    setupArea: { length: 3.5, width: 3 },
    indoorFriendly: true,
    outdoorFriendly: true,
    needsWater: false,
    setupTime: 12,
    pickupVehicle: "רכב משפחתי גדול",
    stock: 2,
    badges: ["indoor-friendly", "popular"],
    perfectFor: ["מסיבות חורף", "סלון/חדר משחקים", "אירועים קטנים"],
    active: true
  }
];
