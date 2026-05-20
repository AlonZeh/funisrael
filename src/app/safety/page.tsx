import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "בטיחות",
  description: "כל מה שצריך לדעת כדי שהאירוע יהיה בטוח. הנחיות שימוש במתנפחים של FUN-ISRAEL.",
  alternates: { canonical: "/safety" }
};

const dos = [
  "השגחת מבוגר אחראי בכל זמן השימוש",
  "התקנה על משטח דשא/שטיח מותקן/בטון חלק בלבד",
  "עיגון יתדות תקני בכל פינות המתנפח",
  "ילדים בגילאים דומים בלבד באותו מתנפח",
  "הסרת נעליים, חפצים חדים, משקפיים ותכשיטים",
  "הגבלת מספר משתמשים בהתאם להנחיות המתנפח"
];

const donts = [
  "אסור להפעיל ברוחות מעל 30 קמ\"ש",
  "אסור אוכל, שתייה או מסטיק בתוך המתנפח",
  "אין לקפוץ ראש או לבצע סלטות אחורה",
  "אין להכניס בעלי חיים",
  "אסור להוסיף מים לאזור שלא מיועד לכך",
  "אין להפעיל בלי החיבור החשמלי הייעודי"
];

export default function SafetyPage() {
  return (
    <>
      <PageHeader
        eyebrow="בטיחות"
        title="כללים פשוטים. אירוע בטוח."
        description="הקפדה על מספר כללים בסיסיים מבטיחה אירוע מהנה לכל המשתתפים. כתבנו כל מה שחשוב לדעת."
      />
      <section className="container-page pb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-mint-600" />
              <h2 className="heading-3">לעשות תמיד</h2>
            </div>
            <ul className="space-y-3">
              {dos.map((d) => (
                <li key={d} className="flex items-start gap-2 text-ink-700">
                  <CheckCircle2 className="h-4 w-4 text-mint-500 mt-1 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-brand-600" />
              <h2 className="heading-3">להימנע תמיד</h2>
            </div>
            <ul className="space-y-3">
              {donts.map((d) => (
                <li key={d} className="flex items-start gap-2 text-ink-700">
                  <AlertTriangle className="h-4 w-4 text-brand-500 mt-1 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 card-surface p-8 bg-ink-800 text-cream-50">
          <h3 className="heading-3 text-white">הסטנדרט שלנו</h3>
          <p className="text-cream-200/90 mt-2 max-w-3xl">
            כל המתנפחים בקטלוג עומדים בתקני בטיחות אירופאיים, מיוצרים מ-PVC כפול בעובי
            0.55 מ"מ עם תפרים מחוזקים. אנחנו מבצעים בדיקת ראייה ומישוש לפני כל השכרה,
            ושירותי תחזוקה כל 30 השכרות.
          </p>
        </div>
      </section>
    </>
  );
}
