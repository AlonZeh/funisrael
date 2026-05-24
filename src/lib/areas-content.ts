/**
 * Per-area landing content. Add an entry per city as you expand.
 * Each entry should be UNIQUE — avoid copy/pasting between cities (Google penalises near-duplicate local pages).
 */
export interface AreaSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface AreaContent {
  intro: string;
  sections: AreaSection[];
  recommendedPackages: string[];
  relatedArticles: string[];
}

export const areaContent: Record<string, AreaContent> = {
  rehovot: {
    intro:
      "רחובות היא בית של FUN-ISRAEL. אנחנו מכירים את האזור, את החצרות, את גני הילדים הקטנים בלב השכונות, ואת התנועה בשעות אחר הצהריים. הדף הזה ירכז עבורכם בדיוק מה כדאי לבחור באירוע ברחובות.",
    sections: [
      {
        heading: "למה דווקא FUN-ISRAEL ברחובות",
        paragraphs: [
          "אנחנו פועלים מנקודת איסוף בדרך יבנה 52 — בלב רחובות. רוב המשפחות בעיר מגיעות אלינו תוך 5-10 דקות, ולוקחות מתנפח שמתאים בדיוק לחצר שלהן. כל המתנפחים שלנו עוברים ניקיון מקיף בין השכרות, וכל לקוח מקבל הסבר אישי על ההפעלה."
        ]
      },
      {
        heading: "אילו חבילות עובדות הכי טוב ברחובות",
        paragraphs: [
          "ברוב הבתים ברחובות יש חצר בגודל קטן-בינוני. הניסיון שלנו אומר שהחבילות הבאות מתאימות הכי טוב:"
        ],
        bullets: [
          "חבילת יום הולדת בסיסית — לגילאי 3-8, חצר בגודל ממוצע.",
          "חבילת פרימיום — לאירועים מעוצבים ומצולמים.",
          "חבילת מים לקיץ — לחצרות עם דשא בקיץ הישראלי.",
          "חבילת פעוטות — לימי הולדת שנה-שנתיים.",
          "Combo משפחתי — כשמגיעים גם אחים קטנים וגם גדולים."
        ]
      },
      {
        heading: "מה כדאי להורים ברחובות לבדוק לפני האירוע",
        paragraphs: [
          "אנחנו ממליצים תמיד לעבור על שלוש הבדיקות: שטח חצר פנוי, קרבת שקע חשמל יציב, וצל מינימלי לשעות הצהריים. אם בחרתם חבילת מים — הוסיפו בדיקה של ברז גינה במצב טוב."
        ]
      },
      {
        heading: "איסוף עצמי — תהליך פשוט",
        paragraphs: [
          "הגעה לנקודת האיסוף, חתימה על טופס שימוש, הסבר קצר, טעינה לרכב. בסיום האירוע — החזרה לאותה נקודה תוך 12 שעות. אנחנו זמינים בוואטסאפ לכל שאלה במהלך הדרך."
        ]
      }
    ],
    recommendedPackages: [
      "mini-party",
      "water-splash",
      "double-splash",
      "mega-party",
      "sports-arena"
    ],
    relatedArticles: [
      "hashkarat-mitnapchim-rehovot-birthday-guide",
      "kids-birthday-package-rehovot",
      "water-inflatables-summer-rehovot",
      "yard-birthday-inflatable-checklist"
    ]
  }
};
