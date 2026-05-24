import type { Product } from "./types";

/**
 * Real FUN-ISRAEL rental inventory.
 * Customer-facing pricing only — never display internal procurement cost.
 * Images use Unsplash placeholders — replace with real product photos in admin.
 */
export const seedProducts: Product[] = [
  {
    id: "purple-octopus-water-park",
    slug: "purple-octopus-water-park",
    name: "פארק מים התמנון הסגול",
    shortDescription:
      "מתנפח מים גדול וצבעוני: 2 מגלשות, שכשוכית, קיר טיפוס ומזרקות מים.",
    longDescription:
      "פארק מים שלם בגינה שלכם. מתנפח גדול ומרשים בעיצוב התמנון הסגול, כולל שתי מגלשות מים, שכשוכית רחבה, קיר טיפוס, מזרקות מים וצנרת ייעודית. מתאים במיוחד לימי הולדת בקיץ ולאירועי משפחה גדולים. מסופק עם מפוח עוצמתי, ערכת תיקון, יתדות עיגון ותיק נשיאה.",
    category: "water",
    secondaryCategories: ["birthday", "premium"],
    price: 350,
    images: [
      "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=1600&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1600&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80"
    ],
    ageRange: "3-12",
    dimensions: { length: 454, width: 431, height: 290 },
    setupArea: { length: 6, width: 5.5 },
    indoorFriendly: false,
    outdoorFriendly: true,
    needsWater: true,
    setupTime: 25,
    pickupVehicle: "טנדר",
    stock: 1,
    badges: ["popular", "summer", "instagram"],
    perfectFor: [
      "ימי הולדת קיץ",
      "אירועי משפחה בגינה",
      "ילדים שאוהבים מים"
    ],
    active: true
  },
  {
    id: "sports-arena-inflatable",
    slug: "sports-arena-inflatable",
    name: "מגרש ספורט מתנפח",
    shortDescription:
      "מגרש מתנפח גדול לכדורגל, כדורסל וכדורעף — אנרגיה ותחרות לילדים.",
    longDescription:
      "מתקן ספורט מתנפח גדול במיוחד שמתאים למשחקי כדורגל, כדורסל וכדורעף. אידיאלי לאירועים אנרגטיים ולימי הולדת של בנים ובנות גילאי 6-12. מאפשר משחק קבוצתי תחרותי במרחב בטוח ותחום, ומשתלב יפה בחבילות שכוללות מתקני מים או פעילות.",
    category: "sports",
    secondaryCategories: ["birthday"],
    price: 400,
    images: [
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1600&q=80",
      "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=1600&q=80",
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1600&q=80"
    ],
    ageRange: "6-12",
    dimensions: { length: 800, width: 335, height: 180 },
    setupArea: { length: 9, width: 4.5 },
    indoorFriendly: false,
    outdoorFriendly: true,
    needsWater: false,
    setupTime: 25,
    pickupVehicle: "טנדר",
    stock: 1,
    badges: ["popular", "new"],
    perfectFor: [
      "ימי הולדת אנרגטיים",
      "אירועי ספורט קבוצתיים",
      "ילדים שאוהבים תחרות"
    ],
    active: true
  },
  {
    id: "bouncy-house",
    slug: "bouncy-house",
    name: "הבית הקופצני",
    shortDescription:
      "מתנפח קלאסי וצבעוני לגילאים צעירים — מושלם לחצרות וימי הולדת קטנים.",
    longDescription:
      "מתנפח קפיצה קלאסי בעיצוב צבעוני ושמח. גודלו הקומפקטי מתאים מצוין לגינות, חצרות ואירועים משפחתיים קטנים, והוא הבחירה המנצחת לילדים צעירים יותר. נקי, בטוח ומוכן לשעות של כיף.",
    category: "birthday",
    secondaryCategories: ["indoor", "toddler"],
    price: 300,
    images: [
      "https://images.unsplash.com/photo-1530878869293-44c79c5f04a8?w=1600&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1600&q=80",
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1600&q=80"
    ],
    ageRange: "2-8",
    dimensions: { length: 280, width: 250, height: 220 },
    setupArea: { length: 3.5, width: 3.2 },
    indoorFriendly: true,
    outdoorFriendly: true,
    needsWater: false,
    setupTime: 15,
    pickupVehicle: "רכב משפחתי גדול",
    stock: 1,
    badges: ["popular", "indoor-friendly"],
    perfectFor: [
      "ימי הולדת קטנים",
      "אירועים משפחתיים",
      "ילדים גילאי גן"
    ],
    active: true
  },
  {
    id: "activity-slide-bouncer",
    slug: "activity-slide-bouncer",
    name: "מתנפח פעילות עם מגלשה",
    shortDescription:
      "מתנפח משולב: קיר טיפוס, בריכת כדורים, מגלשה, אזור קפיצה וחישוק כדורסל.",
    longDescription:
      "מתנפח פעילות מגוון שמעלה כל אירוע לרמה הבאה. כולל קיר טיפוס, בריכת כדורים, מגלשה, אזור קפיצה, חישוק כדורסל וקונוסים. מתאים לימי הולדת ביתיים, אירועים משפחתיים וילדים שאוהבים גיוון של פעילויות במתנפח אחד.",
    category: "activity",
    secondaryCategories: ["birthday"],
    price: 300,
    images: [
      "https://images.unsplash.com/photo-1571999292598-9a8e95a2c9cf?w=1600&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1600&q=80",
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1600&q=80"
    ],
    ageRange: "3-10",
    dimensions: { length: 400, width: 353, height: 196 },
    setupArea: { length: 5, width: 4.5 },
    indoorFriendly: false,
    outdoorFriendly: true,
    needsWater: false,
    setupTime: 20,
    pickupVehicle: "טנדר",
    stock: 1,
    badges: ["popular"],
    perfectFor: [
      "ימי הולדת ביתיים",
      "ילדים שאוהבים גיוון",
      "אירועי גן"
    ],
    active: true
  },
  {
    id: "double-water-slide",
    slug: "double-water-slide",
    name: "מגלשת מים כפולה",
    shortDescription:
      "מתנפח מים עם שכשוכית, 2 מגלשות, אזור קפיצה ושני תותחי מים.",
    longDescription:
      "מתנפח מים שמשלב שכשוכית רחבה, שתי מגלשות מים, אזור קפיצה ושני תותחי מים. מתאים מצוין לאירועי קיץ, ימי הולדת בגינה וכל אירוע שבו רוצים פעילות מים מרשימה לכל גיל.",
    category: "water",
    secondaryCategories: ["birthday"],
    price: 350,
    images: [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1600&q=80",
      "https://images.unsplash.com/photo-1530878869293-44c79c5f04a8?w=1600&q=80",
      "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=1600&q=80"
    ],
    ageRange: "3-12",
    dimensions: { length: 439, width: 300, height: 198 },
    setupArea: { length: 5.5, width: 4.5 },
    indoorFriendly: false,
    outdoorFriendly: true,
    needsWater: true,
    setupTime: 20,
    pickupVehicle: "טנדר",
    stock: 1,
    badges: ["popular", "summer"],
    perfectFor: [
      "ימי הולדת מים",
      "אירועי קיץ בגינה",
      "ילדים שאוהבים מגלשות"
    ],
    active: true
  },
  {
    id: "twin-lane-water-slide",
    slug: "twin-lane-water-slide",
    name: "מגלשת מים דו-מסלולית",
    shortDescription:
      "מגלשת מים דו-מסלולית — יותר זרימה, פחות תורים, יותר פעילות.",
    longDescription:
      "מתנפח מים דו-מסלולי שמאפשר שני ילדים להחליק במקביל — מתאים במיוחד לאירועים גדולים שרוצים פחות תורים ויותר פעילות. משתלב יפה בחבילות מים כפולות לימי הולדת קיץ.",
    category: "water",
    secondaryCategories: ["birthday"],
    price: 400,
    images: [
      "https://images.unsplash.com/photo-1571999292598-9a8e95a2c9cf?w=1600&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1600&q=80"
    ],
    ageRange: "4-14",
    dimensions: { length: 500, width: 320, height: 220 },
    setupArea: { length: 6, width: 4.5 },
    indoorFriendly: false,
    outdoorFriendly: true,
    needsWater: true,
    setupTime: 25,
    pickupVehicle: "טנדר",
    stock: 1,
    badges: ["summer", "premium"],
    perfectFor: [
      "חבילות מים גדולות",
      "ימי הולדת קיץ",
      "אירועים עם הרבה ילדים"
    ],
    active: true
  },
  {
    id: "seven-stations-house",
    slug: "seven-stations-house",
    name: "בית 7 התחנות",
    shortDescription:
      "מתנפח פעילות עם 7 תחנות משחק — גיוון מקסימלי, תנועה רציפה.",
    longDescription:
      "מתנפח פעילות מגוון במיוחד עם שבע תחנות משחק שונות בתוך מתקן אחד. שומר על הילדים בתנועה ובעניין במשך שעות, מתאים לחצרות, גינות, ימי הולדת ואירועים משפחתיים שבהם רוצים יותר מסתם מתנפח קפיצה.",
    category: "activity",
    secondaryCategories: ["birthday", "indoor"],
    price: 350,
    images: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1600&q=80",
      "https://images.unsplash.com/photo-1571999292598-9a8e95a2c9cf?w=1600&q=80",
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1600&q=80"
    ],
    ageRange: "3-12",
    dimensions: { length: 420, width: 360, height: 220 },
    setupArea: { length: 5, width: 4.5 },
    indoorFriendly: true,
    outdoorFriendly: true,
    needsWater: false,
    setupTime: 25,
    pickupVehicle: "טנדר",
    stock: 1,
    badges: ["popular", "new"],
    perfectFor: [
      "ימי הולדת מורכבים",
      "אירועים משפחתיים",
      "ילדים שאוהבים מגוון"
    ],
    active: true
  },
  {
    id: "mega-water-double-slide",
    slug: "mega-water-double-slide",
    name: "מתנפח מים ענק עם 2 מגלשות",
    shortDescription:
      "מתנפח מים גדול ומרשים עם שתי מגלשות — אפקט WOW לאירועי הקיץ.",
    longDescription:
      "המתנפח הגדול והמרשים ביותר באוסף המים שלנו — שתי מגלשות, נראות חזקה ואפקט WOW מובטח לאירועים גדולים. מתאים במיוחד לחבילות פרימיום, לאירועי קיץ ולימי הולדת שאתם רוצים שהילדים יזכרו.",
    category: "water",
    secondaryCategories: ["premium", "birthday"],
    price: 400,
    images: [
      "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=1600&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",
      "https://images.unsplash.com/photo-1571999292598-9a8e95a2c9cf?w=1600&q=80"
    ],
    ageRange: "4-14",
    dimensions: { length: 475, width: 335, height: 205 },
    setupArea: { length: 6, width: 4.5 },
    indoorFriendly: false,
    outdoorFriendly: true,
    needsWater: true,
    setupTime: 25,
    pickupVehicle: "טנדר",
    stock: 1,
    badges: ["premium", "summer", "instagram"],
    perfectFor: [
      "אירועי קיץ פרימיום",
      "ימי הולדת גדולים",
      "חבילות Mega Party"
    ],
    active: true
  }
];
