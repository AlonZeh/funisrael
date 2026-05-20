import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "חבילות יום הולדת",
  description: "חבילות יום הולדת מוכנות עם מתנפח, תוספות ועיצוב — חיסכון משמעותי.",
  alternates: { canonical: "/birthday-packages" }
};

const packages = [
  {
    name: "חבילת בסיס",
    price: 690,
    description: "מתנפח 1 + מפוח + הסבר",
    perks: [
      "מתנפח לבחירה מקטגוריית 'ימי הולדת'",
      "מפוח חשמלי, כבל מאריך וצינור מים",
      "ניקיון מקיף לפני האירוע",
      "הסבר מלא באיסוף"
    ],
    cta: "הזמינו בסיס",
    featured: false
  },
  {
    name: "חבילת פלוס",
    price: 990,
    description: "מתנפח 1 + בריכת כדורים + סופט-פליי קטן",
    perks: [
      "מתנפח לבחירה (כולל פרימיום)",
      "בריכת כדורים פרימיום",
      "סט סופט-פליי קטן",
      "מפוח, כבלים, צינור מים",
      "ניקיון וחיטוי מורחב"
    ],
    cta: "הכי פופולרי",
    featured: true
  },
  {
    name: "חבילת VIP",
    price: 1490,
    description: "ארמון לבן + ball pit + סופט-פליי דלוקס",
    perks: [
      "ארמון לבן / מתנפח פרימיום",
      "בריכת כדורים פרימיום",
      "סט סופט-פליי דלוקס מלא",
      "מפוחים כפולים לעמידות",
      "תיאום צילום סטילס בתשלום נוסף"
    ],
    cta: "הזמינו VIP",
    featured: false
  }
];

export default function BirthdayPackagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="חבילות"
        title="חבילות יום הולדת — בלי הפתעות, רק חיוכים."
        description="חבילות מוכנות בשלוש רמות — חוסכות זמן, חוסכות כסף, ומוודאות שהאירוע יהיה מושלם."
      />
      <section className="container-page pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={cn(
                "rounded-3xl p-6 ring-1 shadow-soft flex flex-col",
                pkg.featured
                  ? "bg-ink-800 text-cream-50 ring-ink-800 shadow-card relative"
                  : "bg-white text-ink-700 ring-ink-100"
              )}
            >
              {pkg.featured && (
                <span className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                  פופולרי
                </span>
              )}
              <h3 className="font-display font-extrabold text-2xl">{pkg.name}</h3>
              <p className={cn("text-sm mt-1", pkg.featured ? "text-cream-200/80" : "text-ink-500")}>
                {pkg.description}
              </p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display font-extrabold text-4xl">
                  ₪{pkg.price}
                </span>
                <span className={pkg.featured ? "text-cream-200/70" : "text-ink-400"}>
                  / אירוע
                </span>
              </div>
              <ul className="mt-6 space-y-2 flex-1">
                {pkg.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <Check
                      className={cn(
                        "h-4 w-4 mt-1 shrink-0",
                        pkg.featured ? "text-brand-300" : "text-mint-500"
                      )}
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/booking"
                className={cn(
                  "btn w-full mt-6 py-3",
                  pkg.featured
                    ? "bg-brand-500 text-white hover:bg-brand-600"
                    : "bg-ink-800 text-white hover:bg-ink-700"
                )}
              >
                {pkg.cta}
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-500">
          המחירים מעידים — ההצעה הסופית מותאמת לכל אירוע. כתבו לנו את הפרטים והשגת המחיר שווה גם 5 דקות.
        </p>
      </section>
    </>
  );
}
