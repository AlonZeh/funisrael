import type { Metadata } from "next";
import { MapPin, Truck, PackageCheck, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "הוראות איסוף",
  description: "כל מה שצריך לדעת לפני האיסוף — רכבים מתאימים, זמני פעילות והכנה לאירוע.",
  alternates: { canonical: "/pickup" }
};

export default function PickupPage() {
  return (
    <>
      <PageHeader
        eyebrow="איסוף"
        title="הגעתם לנקודת האיסוף — מה עכשיו?"
        description="התהליך אורך 10-15 דקות בסה״כ. הסבר מלא על ההקמה, פירוק, חיבור חשמל ואחסון."
      />
      <section className="container-page pb-20 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card
            icon={<MapPin className="h-5 w-5" />}
            title="הכתובת"
            description={`${siteConfig.pickupAddress} · חניה זמינה ליד נקודת האיסוף.`}
          />
          <Card
            icon={<Clock className="h-5 w-5" />}
            title="זמני פעילות"
            description="ראשון-חמישי: 09:00–20:00 · שישי: 09:00–13:00. ניתן לתאם גם איסוף מוקדם בתיאום מראש."
          />
          <Card
            icon={<Truck className="h-5 w-5" />}
            title="הרכב הנדרש"
            description="כל מתנפח מציין את סוג הרכב המומלץ. הקפידו על כך — לטעינה בטוחה ולמניעת פגיעות בבד."
          />
          <Card
            icon={<PackageCheck className="h-5 w-5" />}
            title="מה נקבל באיסוף"
            description="מתנפח מקופל ונקי, מפוח חשמלי, יתדות עיגון, כבל מאריך 25 מ׳, צינור מים (אם רלוונטי), הסבר מקצועי."
          />
        </div>

        <aside className="card-surface p-6 space-y-3 bg-cream-100">
          <h3 className="font-display font-extrabold text-ink-800">לפני שיוצאים</h3>
          <ul className="space-y-2 text-sm text-ink-700">
            <li>· בדקו שהשטח באירוע יציב, ללא חצץ או אבנים חדות.</li>
            <li>· וודאו שיש שקע חשמל זמין במרחק עד 25 מטר.</li>
            <li>· מתנפחי מים — וודאו ברז מים סטנדרטי באתר.</li>
            <li>· התארגנו עם 2 מבוגרים לטעינה ופריקה.</li>
          </ul>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.pickupAddress)}`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost w-full"
          >
            <MapPin className="h-4 w-4" />
            פתיחה ב-Google Maps
          </a>
        </aside>
      </section>
    </>
  );
}

function Card({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="card-surface p-6 flex items-start gap-4">
      <span className="h-11 w-11 grid place-items-center rounded-2xl bg-brand-50 text-brand-600 shrink-0">
        {icon}
      </span>
      <div>
        <h3 className="font-display font-bold text-ink-800">{title}</h3>
        <p className="text-ink-500 mt-1 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
