import { Shield, Sparkles, Truck, Clock } from "lucide-react";

const items = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: "בטיחות אירופאית",
    description: "PVC כפול, תפרים מחוזקים, יתדות תקניות."
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "ניקיון מקיף",
    description: "חיטוי ושטיפה לפני כל השכרה."
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "12 שעות מלאות",
    description: "כל הזמן שתצטרכו לאירוע מושלם."
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "איסוף עצמי קל",
    description: "טעינה בתוך 10 דקות, הסבר מלא בהגעה."
  }
];

export function TrustStrip() {
  return (
    <section className="border-y border-ink-100 bg-white/60">
      <div className="container-page py-8 md:py-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="flex items-start gap-3">
            <span className="h-10 w-10 rounded-2xl bg-brand-50 text-brand-600 grid place-items-center shrink-0">
              {i.icon}
            </span>
            <div>
              <p className="font-display font-bold text-ink-800">{i.title}</p>
              <p className="text-sm text-ink-500">{i.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
