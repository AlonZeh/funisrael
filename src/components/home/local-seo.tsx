import Link from "next/link";
import { MapPin } from "lucide-react";
import { serviceAreas } from "@/lib/areas";

export function LocalSEOBlock() {
  return (
    <section className="py-14 md:py-20 bg-cream-50/60 border-y border-ink-100">
      <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
        <div className="space-y-4 max-w-2xl">
          <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
            FUN-ISRAEL · רחובות
          </span>
          <h2 className="heading-2 text-balance">
            השכרת מתנפחים ברחובות והשפלה — מהבית, באיסוף עצמי, בלי כאב ראש.
          </h2>
          <p className="body-lead">
            אנחנו ב-FUN-ISRAEL מספקים מתנפחים פרימיום למשפחות ברחובות, נס ציונה,
            יבנה, גדרה, מזכרת בתיה, קריית עקרון, באר יעקב, ראשון לציון, אשדוד,
            מודיעין וכל איזור שיכול להגיע לאסוף מנקודת האיסוף שלנו בשפלה.
          </p>
          <p className="text-ink-600 leading-relaxed">
            המודל פשוט: אתם בוחרים חבילה, אנחנו מאשרים זמינות בוואטסאפ, ואתם
            אוספים בדרך יבנה 52 ביום האירוע. ההשכרה תמיד ל-12 שעות, מה שמספיק
            ליום הולדת רגוע, אירוע ערב ואפילו שילוב של השניים.
          </p>
        </div>

        <div className="card-surface p-5">
          <p className="text-sm font-bold uppercase tracking-widest text-ink-400 mb-3">
            אזורים שאנחנו משרתים
          </p>
          <ul className="grid grid-cols-2 gap-1.5 text-sm">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                {area.pageReady ? (
                  <Link
                    href={`/areas/${area.slug}`}
                    className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 hover:bg-cream-100 text-ink-700 font-medium"
                  >
                    <MapPin className="h-3.5 w-3.5 text-brand-500" />
                    {area.name}
                  </Link>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-ink-600">
                    <MapPin className="h-3.5 w-3.5 text-ink-300" />
                    {area.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-ink-400 mt-3">
            נקודת איסוף: דרך יבנה 52, רחובות.
          </p>
        </div>
      </div>
    </section>
  );
}
