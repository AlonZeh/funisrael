import type { Metadata } from "next";
import Link from "next/link";
import {
  Cookie,
  Database,
  Eye,
  Lock,
  Mail,
  MailCheck,
  Phone,
  Pencil,
  Share2,
  Shield,
  ShieldCheck,
  Trash2,
  UserCheck
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { BreadcrumbSchema } from "@/components/seo/article-schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | FUN-ISRAEL",
  description:
    "מדיניות פרטיות של FUN-ISRAEL — איזה מידע אנחנו אוספים, מטרות השימוש, זכויות המשתמש לפי חוק הגנת הפרטיות, התשמ\"א-1981 ועדכונים בהמשך לתיקון 13.",
  keywords: [
    "מדיניות פרטיות",
    "חוק הגנת הפרטיות",
    "FUN-ISRAEL פרטיות",
    "זכויות גולש",
    "דיוור ישיר"
  ],
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    title: "מדיניות פרטיות | FUN-ISRAEL",
    description:
      "המידע שאנחנו אוספים, מטרות השימוש, וזכויות הגולש בהתאם לחוק הגנת הפרטיות הישראלי."
  }
};

const LAST_UPDATED = "2026-05-20";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  paragraphs: string[];
  bullets?: string[];
}

const SECTIONS: Section[] = [
  {
    id: "intro",
    title: "1. כללי",
    icon: Shield,
    paragraphs: [
      'FUN-ISRAEL (להלן: "החברה", "אנחנו", "אנו") מכבדת את פרטיות המשתמשים והגולשים באתר ובוואטסאפ. מסמך זה מסביר אילו פרטים נאספים, מהן המטרות לשימוש בהם, עם מי הם משותפים, וכיצד ניתן לעיין במידע, לתקנו או לבקש את מחיקתו.',
      'המדיניות נכתבה בהתאם לעקרונות חוק הגנת הפרטיות, התשמ"א-1981 ולתיקוניו, חוק התקשורת (בזק ושידורים), התשמ"ב-1982 (סעיף 30א — דיוור ישיר ופרסומות), ולעקרונות פרטיות מקובלים. ההתייחסות במסמך זה למשתמש/ת היא בכל הצורות הדקדוקיות, וכוללת גברים ונשים כאחד.',
      "השימוש באתר ובוואטסאפ של FUN-ISRAEL מעיד על הסכמה למסמך זה. אם אינך מסכים/ה לתנאי המדיניות, אנא הימנע/י משימוש בשירותים שלנו ומשליחת פרטים."
    ]
  },
  {
    id: "data-we-collect",
    title: "2. איזה מידע אנחנו אוספים",
    icon: Database,
    paragraphs: [
      "אנחנו אוספים אך ורק את המידע הנדרש כדי לטפל בבקשת השיריון של הציוד, לוודא זמינות, ולתאם איסוף או הובלה. אנחנו לא אוספים פרטי אשראי ולא מבצעים סליקה באתר."
    ],
    bullets: [
      "פרטי קשר: שם מלא, מספר טלפון, עיר, כתובת או אזור (רק כאשר מבוקשת הובלה), כתובת דוא\"ל (אופציונלי).",
      "פרטי האירוע: תאריך, שעת התחלה מבוקשת, מספר משתתפים, הערות שמסרת.",
      "פרטי השיריון: רשימת המוצרים, החבילות והתוספות שנבחרו, אופן קבלת הציוד (איסוף/הובלה), סוג הובלה.",
      "מידע טכני מינימלי: שפת דפדפן ושעת השליחה, ככל שצריך כדי להפעיל את האתר ולמנוע ניצול לרעה.",
      "מידע על השימוש בקהילת הוואטסאפ (במקרה של הצטרפות): שם תצוגה ומספר טלפון כפי שמופיעים אצלכם בוואטסאפ."
    ]
  },
  {
    id: "purposes",
    title: "3. למה אנחנו משתמשים במידע",
    icon: UserCheck,
    paragraphs: [
      "השימוש במידע מוגבל למטרות לגיטימיות ומידתיות, ובהיקף הדרוש לטיפול בבקשה ולמתן שירות איכותי:"
    ],
    bullets: [
      "טיפול בבקשת השיריון, בדיקת זמינות הציוד ותיאום מול הלקוח.",
      "יצירת קשר לצורך אישור ההזמנה, מועד האיסוף או ההובלה, ועדכונים תפעוליים על האירוע.",
      "מענה לשאלות, בירורים ופניות שירות שמתקבלות בוואטסאפ או בטלפון.",
      "ניהול פנימי של תיאומי איסוף, החזרה ותחזוקת הציוד.",
      "שמירה על אבטחת המידע ועל זכויות החברה והלקוחות (לרבות מניעת שימוש לרעה).",
      "במידה והמשתמש הסכים מראש (אופציונלי בלבד): שליחת חומר שיווקי, חבילות עונתיות והטבות לחברי הקהילה. ההסכמה נדרשת בנפרד מההסכמה הכללית למדיניות, ניתן לסרב לקבל פניות כאלה בכל עת."
    ]
  },
  {
    id: "marketing",
    title: "4. דיוור ישיר ושיווק",
    icon: MailCheck,
    paragraphs: [
      "אם בחרת לסמן את תיבת ההסכמה לקבלת תכנים שיווקיים, אנחנו רשאים לשלוח אליך באמצעות וואטסאפ, דוא\"ל או מסרון: עדכוני זמינות, חבילות חדשות, מבצעי השקה, רעיונות לאירועים והטבות לחברי קהילת הוואטסאפ.",
      "ניתן להסיר את ההסכמה לדיוור בכל עת באחת מהדרכים הבאות: לחיצה על קישור ההסרה בהודעה, שליחת הודעת \"הסר\" בוואטסאפ למספר שלנו, יציאה מקבוצת הוואטסאפ של FUN-ISRAEL, או פנייה ישירה אלינו דרך פרטי הקשר בתחתית מסמך זה.",
      "המידע שנאסף לצורך דיוור ישיר משמש את FUN-ISRAEL בלבד. אנחנו לא מוכרים ולא מעבירים אותו לצדדים שלישיים לצורך שיווק."
    ]
  },
  {
    id: "sharing",
    title: "5. שיתוף מידע עם צדדים שלישיים",
    icon: Share2,
    paragraphs: [
      "ככלל, איננו משתפים מידע אישי עם צדדים שלישיים, למעט במקרים הבאים ובהיקף המינימלי הנדרש:"
    ],
    bullets: [
      "ספקי טכנולוגיה חיוניים: שירותי וואטסאפ (Meta) לצורך תקשורת איתך, ספק האחסון של האתר.",
      "ספקי משנה לצורך מתן שירות (למשל ספק הובלה חיצוני, רק לאחר תיאום מולך וביחס לאותו אירוע).",
      "במקרה של חובה חוקית, צו שיפוטי או דרישה מרשות מוסמכת בהתאם לדין.",
      "במקרה של מחלוקת או טענה משפטית — בהיקף הנדרש להגנה על זכויות החברה והלקוחות.",
      "במקרה של מיזוג או רכישה של פעילות החברה — בהתאם להוראות הדין."
    ]
  },
  {
    id: "storage",
    title: "6. אופן ומשך שמירת המידע",
    icon: Lock,
    paragraphs: [
      "אנחנו פועלים במודל שמירת מידע מצומצם: בקשת השיריון מתבצעת בעיקר בצד הלקוח (בדפדפן) ומוגשת אלינו דרך וואטסאפ. בקשות שמתקבלות בוואטסאפ מאוחסנות בהיסטוריית השיחות שלנו לטובת ניהול ההזמנה והשירות.",
      "פרטי לקוחות שנמסרו לצורך הזמנה ייגנזו בתום השימוש העסקי הסביר בהם, ולא יישמרו לתקופה ארוכה מהנדרש. אנחנו לא מקיימים מאגר ממוחשב חיצוני שאוסף נתונים מהאתר באופן אוטומטי.",
      "במקרה של פנייה למחיקה מצד הלקוח, נטפל בה בהקדם ובהתאם להוראות הדין."
    ]
  },
  {
    id: "cookies",
    title: "7. עוגיות (Cookies) ואחסון מקומי",
    icon: Cookie,
    paragraphs: [
      "האתר משתמש באחסון מקומי בדפדפן (localStorage/sessionStorage) למטרות חיוניות בלבד, כדי לשפר את חוויית השימוש. השימוש הוא בצד הלקוח ואינו כולל איסוף מרכזי של נתונים."
    ],
    bullets: [
      "עגלת השיריון — שמירת המוצרים שהוספת, תאריך נבחר, אופן קבלה, ופרטי טופס, כדי שלא תאבד את הבחירות אם נסגר הדפדפן בטעות.",
      "הגדרות נגישות — שמירת התאמות הנגישות שבחרת (גודל גופן, ניגודיות וכו').",
      "מצב פופאפ הקהילה — סימון כמה פעמים הצגנו את ההצעה בקבוצת הוואטסאפ ובחירת המשתמש להצטרף או לדחות.",
      "אפשר למחוק את האחסון בכל עת דרך הגדרות הדפדפן."
    ]
  },
  {
    id: "rights",
    title: "8. זכויות המשתמש",
    icon: Eye,
    paragraphs: [
      "בהתאם לחוק הגנת הפרטיות ותיקוניו, עומדות לרשותך הזכויות הבאות לגבי המידע האישי שמסרת לנו:"
    ],
    bullets: [
      "זכות עיון: לבקש לעיין במידע שמוחזק עליך אצלנו.",
      "זכות תיקון: לבקש לתקן מידע שגוי, לא מעודכן או לא מדויק.",
      "זכות מחיקה: לבקש את מחיקת המידע, אלא אם מוטלת עלינו חובה חוקית לשמרו.",
      "זכות התנגדות לדיוור: לבטל הסכמה לדיוור ישיר בכל עת, ללא תנאי וללא עלות.",
      "זכות לפנות לרשם מאגרי המידע ברשות להגנת הפרטיות במשרד המשפטים, אם פנייתך אלינו לא נענתה בזמן סביר או לא לשביעות רצונך."
    ]
  },
  {
    id: "security",
    title: "9. אבטחת מידע",
    icon: ShieldCheck,
    paragraphs: [
      "אנחנו נוקטים באמצעי אבטחה סבירים ומקובלים כדי להגן על המידע שאנחנו מקבלים, ובהם: מגבלות גישה לפרטי לקוחות, שימוש בערוצי תקשורת מוצפנים (HTTPS, וואטסאפ), והקפדה על שמירה מינימלית של פרטים.",
      "יחד עם זאת, אין באפשרותנו להתחייב לאבטחה מוחלטת או למניעת חדירות בלתי חוקיות. בכל מקרה של חשד לאירוע אבטחה — נטפל בו ונודיע לרשויות ולנפגעים בהתאם להוראות הדין.",
      "מומלץ לא לשלוח אלינו פרטים רגישים שאינם נחוצים לבקשה (כגון מספרי תעודת זהות מלאים או פרטי כרטיס אשראי). איננו זקוקים למידע מסוג זה כדי לטפל בשיריון."
    ]
  },
  {
    id: "no-payment",
    title: "10. אין סליקה ואין שמירת אמצעי תשלום",
    icon: ShieldCheck,
    paragraphs: [
      "האתר אינו מבצע סליקת אשראי ואינו אוסף או שומר מספרי כרטיסי אשראי, פרטי חשבונות בנק או אמצעי תשלום אחרים.",
      "סיכום התשלום הסופי וביצועו מתבצעים מחוץ לאתר, מול נציגי FUN-ISRAEL, ובאמצעי תשלום שמתואמים מולך אישית (מזומן או העברה בנקאית בעת איסוף הציוד, בהתאם לתקנון)."
    ]
  },
  {
    id: "minors",
    title: "11. שימוש על ידי קטינים",
    icon: UserCheck,
    paragraphs: [
      "השירות פונה להורים ולמבוגרים אחראיים. שליחת בקשת שיריון או הצטרפות לקבוצת הוואטסאפ דורשים גיל 18 ומעלה.",
      "אם נודע לנו שאספנו פרטים אישיים של קטין/ה שלא בידיעת ההורה או האפוטרופוס, נמחק את הפרטים בהקדם. ניתן ליצור עמנו קשר ישירות לעניין זה דרך פרטי הקשר בתחתית מסמך זה."
    ]
  },
  {
    id: "changes",
    title: "12. שינויים במדיניות",
    icon: Pencil,
    paragraphs: [
      "FUN-ISRAEL רשאית לעדכן את מדיניות הפרטיות מעת לעת, בהתאם לדרישות הדין, לשינויים בשירותים או לטובת שיפור החוויה.",
      "הגרסה העדכנית של המסמך תפורסם תמיד בעמוד זה, כשבראש העמוד יופיע תאריך העדכון האחרון. שימוש בשירותים לאחר עדכון המדיניות מהווה הסכמה לגרסה החדשה."
    ]
  },
  {
    id: "contact-privacy",
    title: "13. יצירת קשר בנושאי פרטיות",
    icon: Mail,
    paragraphs: [
      "לכל פנייה בנושא המידע שמוחזק אצלנו, מימוש זכויות עיון/תיקון/מחיקה, הסרה מדיוור או שאלות אחרות בנושאי פרטיות — אפשר לפנות אלינו דרך אחת מהדרכים הבאות:"
    ]
  }
];

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: "בית", url: "/" },
          { label: "מדיניות פרטיות", url: "/privacy" }
        ]}
      />

      <PageHeader
        eyebrow="פרטיות"
        title="מדיניות פרטיות"
        description="המדיניות מסבירה אילו פרטים אנחנו אוספים, למה, ואיך אפשר לעיין במידע, לתקן או לבקש מחיקה. נכתב בהתאם לעקרונות חוק הגנת הפרטיות הישראלי."
      />

      <section className="container-page pb-6">
        <div className="card-surface p-5 md:p-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint-50 text-mint-600">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-ink-400">
                עודכן לאחרונה
              </p>
              <p className="font-display font-extrabold text-ink-800">
                {LAST_UPDATED}
              </p>
            </div>
          </div>
          <div className="text-sm text-ink-600 max-w-md">
            המסמך עוסק במידע שנמסר באתר, בטופס השיריון, ובהתכתבות עם FUN-ISRAEL
            בוואטסאפ. הוא לא תחליף לייעוץ משפטי.
          </div>
        </div>
      </section>

      {/* Quick TOC */}
      <section className="container-page pb-6">
        <nav
          aria-label="תוכן עניינים"
          className="card-surface p-5 md:p-6"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">
            תוכן עניינים
          </p>
          <ol className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-1.5 text-ink-700 hover:text-brand-600 hover:gap-2 transition-all"
                >
                  <span className="text-ink-400">·</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <section className="container-page pb-20">
        <article className="grid gap-5 max-w-4xl mx-auto">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <section
                key={s.id}
                id={s.id}
                className="card-surface p-6 md:p-8 scroll-mt-24"
              >
                <header className="flex items-center gap-3 mb-4">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="heading-3">{s.title}</h2>
                </header>
                <div className="space-y-3 text-ink-700 leading-relaxed">
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-ink-700"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Contact card embedded in section 13 */}
                {s.id === "contact-privacy" && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="flex items-center gap-3 rounded-2xl bg-cream-50 ring-1 ring-ink-100 p-4 hover:bg-cream-100"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft">
                        <Phone className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs text-ink-500">טלפון</p>
                        <p className="font-display font-bold text-ink-800 ltr">
                          {siteConfig.phone}
                        </p>
                      </div>
                    </a>
                    <a
                      href="mailto:privacy@fun-israel.com"
                      className="flex items-center gap-3 rounded-2xl bg-cream-50 ring-1 ring-ink-100 p-4 hover:bg-cream-100"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs text-ink-500">דוא״ל פרטיות</p>
                        <p className="font-display font-bold text-ink-800 ltr">
                          privacy@fun-israel.com
                        </p>
                      </div>
                    </a>
                  </div>
                )}
              </section>
            );
          })}

          {/* Closing CTA-style block */}
          <div className="rounded-3xl bg-ink-800 text-cream-50 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Trash2 className="h-5 w-5 text-brand-300" />
              <h2 className="font-display font-extrabold text-xl text-white">
                רוצים שנמחק את הפרטים?
              </h2>
            </div>
            <p className="text-cream-200/85 leading-relaxed">
              שלחו לנו הודעה בוואטסאפ או דוא״ל עם הבקשה. נמחק את הפרטים בהקדם
              ונשלח אישור חוזר. אם בקשת המחיקה מתייחסת רק להסרה מדיוור — אפשר
              גם פשוט לצאת מקבוצת הוואטסאפ של FUN-ISRAEL.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/terms" className="text-sm text-cream-200 underline">
                לתקנון
              </Link>
              <span className="text-cream-300/40">·</span>
              <Link
                href="/accessibility"
                className="text-sm text-cream-200 underline"
              >
                להצהרת הנגישות
              </Link>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
