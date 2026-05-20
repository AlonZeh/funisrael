import type { Metadata } from "next";
import { Sparkles, Heart, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "אודות",
  description: "הסיפור מאחורי FUN-ISRAEL — מותג מתנפחים פרימיום למשפחות המודרניות של ישראל.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="אודות"
        title="המותג שמשנה את הסטנדרט למתנפחים בישראל."
        description="הקמנו את FUN-ISRAEL מתוך אובססיה אחת: לתת להורים את חוויית ההזמנה הכי נקייה, יפה ובטוחה שאפשר."
      />
      <section className="container-page pb-20">
        <div className="grid lg:grid-cols-3 gap-6">
          <Pillar
            icon={<Sparkles className="h-5 w-5" />}
            title="פרימיום, תמיד"
            text="קולקציה מוקפדת — מתנפחים בעיצוב מודרני, גוונים נעימים, ואיכות שלא מתפשרת."
          />
          <Pillar
            icon={<ShieldCheck className="h-5 w-5" />}
            title="בטיחות מעל הכל"
            text="כל מתנפח נבדק לפני כל השכרה. תקני בטיחות אירופאיים בלבד."
          />
          <Pillar
            icon={<Heart className="h-5 w-5" />}
            title="חוויית הורה"
            text="הזמנה בלי שיחות מיותרות, הסבר ברור באיסוף, ניקיון מקיף ושירות אנושי."
          />
        </div>

        <div className="mt-12 card-surface p-8 md:p-12 prose max-w-none rtl text-right text-ink-600 leading-relaxed">
          <h2 className="heading-3">למה FUN-ISRAEL?</h2>
          <p>
            כשתכננו את האירועים של הילדים שלנו, גילינו שבשוק יש פער: או שמשלמים יקר ומקבלים
            שירות לא יציב, או שמתפשרים על מתנפחים שלא נראים טוב — בטח לא בצילומים.
            החלטנו להקים מותג עם סטנדרט אחר: אסתטיקה, ניקיון, אמינות.
          </p>
          <h2 className="heading-3 mt-8">המודל שלנו</h2>
          <p>
            אנחנו פועלים במודל איסוף עצמי מנקודת איסוף בדרך יבנה 52. זה מאפשר לנו להציע
            מחירים שפויים מאוד ביחס לאיכות, לתחזק את הקולקציה במצב מצוין ולתת זמני
            תגובה מהירים במיוחד. בעתיד נשמח להרחיב גם לשירות משלוחים — נעדכן את הלקוחות
            כשנהיה מוכנים.
          </p>
          <h2 className="heading-3 mt-8">העתיד</h2>
          <p>
            אנחנו רק בתחילת הדרך. בקרוב יצטרפו לקולקציה דגמים בלעדיים, חבילות אירוע
            ושיתופי פעולה עם מותגים מובילים. מוזמנים לעקוב באינסטגרם — שם אנחנו מעלים
            עדכונים ראשונים.
          </p>
        </div>
      </section>
    </>
  );
}

function Pillar({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="card-surface p-6">
      <div className="h-11 w-11 grid place-items-center rounded-2xl bg-brand-50 text-brand-600">
        {icon}
      </div>
      <h3 className="font-display font-extrabold text-lg text-ink-800 mt-4">{title}</h3>
      <p className="text-ink-500 mt-2 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
