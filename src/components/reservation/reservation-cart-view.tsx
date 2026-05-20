"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Info, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useReservationStore } from "@/store/reservation-store";
import { getRecommendedAddOns } from "@/lib/reservation/recommendations";
import { PageHeader } from "@/components/layout/page-header";
import { AddonCard } from "./add-to-reservation-drawer";
import { CommunityBanner } from "@/components/marketing/community-banner";
import { formatILS } from "@/lib/utils";

export function ReservationCartView() {
  const items = useReservationStore((s) => s.items);
  const hydrated = useReservationStore((s) => s.hydrated);
  const setQty = useReservationStore((s) => s.setQuantity);
  const removeItem = useReservationStore((s) => s.removeItem);
  const total = useReservationStore((s) => s.estimatedTotal());

  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (hydrated) setReady(true);
  }, [hydrated]);

  const recommendations = useMemo(
    () => getRecommendedAddOns(items, 6),
    [items]
  );

  if (!ready) {
    return (
      <>
        <PageHeader
          eyebrow="עגלת שיריון"
          title="עגלת שיריון"
          description="כאן תוכלו לבדוק את הציוד שבחרתם, להוסיף מוצרים משלימים ולהמשיך לבדיקת זמינות ושיריון."
        />
        <section className="container-page pb-20">
          <div className="card-surface p-12 animate-pulse h-64" />
        </section>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <PageHeader
          eyebrow="עגלת שיריון"
          title="עגלת השיריון ריקה"
          description="בחרו מתנפח או ציוד לאירוע והתחילו לבנות את החבילה שלכם."
        />
        <section className="container-page pb-20">
          <div className="card-surface p-8 md:p-12 text-center space-y-5 max-w-2xl mx-auto">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-cream-100 text-ink-500">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <div>
              <h2 className="heading-3">בחרו ציוד והתחילו לבנות שיריון</h2>
              <p className="text-ink-500 mt-2">
                עברו לקטלוג המתנפחים או לחבילות שלנו. כל מוצר וכל חבילה מתווספים
                לעגלת שיריון אחת — בדיוק כמו באתרי השכרה מובילים.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/catalog" className="btn-brand">
                לקטלוג המתנפחים <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/packages" className="btn-ghost">
                לחבילות
              </Link>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto">
            <CommunityBanner variant="inline" />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="עגלת שיריון"
        title="עגלת השיריון שלכם"
        description="כאן תוכלו לבדוק את הציוד שבחרתם, לעדכן כמות, להוסיף מוצרים משלימים ולהמשיך לבדיקת זמינות ושיריון."
      />

      <section className="container-page pb-20 grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
        {/* Items list */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.article
              key={item.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.2) }}
              className="card-surface p-4 flex items-start gap-4"
            >
              <div className="relative h-20 w-24 sm:h-24 sm:w-32 rounded-2xl overflow-hidden bg-cream-100 shrink-0">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] text-ink-400 uppercase tracking-widest">
                      {item.kind === "package"
                        ? "חבילה"
                        : item.kind === "addon"
                          ? "תוספת"
                          : "מתנפח"}
                    </p>
                    <p className="font-display font-extrabold text-ink-800 leading-tight line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-sm text-brand-600 font-bold mt-1">
                      {item.priceLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="p-2 rounded-xl hover:bg-brand-50 text-brand-600 shrink-0"
                    aria-label={`הסרת ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(v) => setQty(item.key, v)}
                  />
                  {item.unitPrice > 0 && (
                    <span className="text-sm text-ink-700 font-semibold">
                      {formatILS(item.unitPrice * item.quantity)}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}

          {recommendations.length > 0 && (
            <div className="pt-6">
              <h2 className="heading-3 mb-2">מוצרים נלווים שמושכרים יחד</h2>
              <p className="text-ink-500 mb-4 max-w-xl text-sm">
                רוצים לסגור חבילה נוחה יותר? אלו מוצרים שלקוחות מוסיפים לעיתים
                קרובות לאירועים דומים.
              </p>
              <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
                {recommendations.slice(0, 6).map((rec) => (
                  <AddonCard key={rec.key} item={rec} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <div className="card-surface p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
              סיכום הזמנה
            </p>
            <h3 className="font-display font-extrabold text-ink-800 mt-1">
              {items.reduce((s, i) => s + i.quantity, 0)} פריטים
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {items.map((i) => (
                <li
                  key={i.key}
                  className="flex justify-between gap-3 text-ink-600"
                >
                  <span className="truncate">
                    {i.name}
                    {i.quantity > 1 && (
                      <span className="text-ink-400 ms-1">× {i.quantity}</span>
                    )}
                  </span>
                  {i.unitPrice > 0 && (
                    <span className="font-semibold text-ink-700 whitespace-nowrap">
                      {formatILS(i.unitPrice * i.quantity)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {total > 0 && (
              <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
                <span className="text-sm text-ink-500">סה"כ מוערך</span>
                <span className="font-display font-extrabold text-xl text-ink-800">
                  {formatILS(total)}
                </span>
              </div>
            )}
            <p className="text-[11px] text-ink-400 mt-3 leading-relaxed">
              הסכום המוצג הוא הערכה לפי המוצרים שנבחרו. אישור סופי, זמינות
              ותיאום יתבצעו מול FUN-ISRAEL.
            </p>
            <Link href="/reserve" className="btn-brand w-full mt-5 py-3">
              המשך לשיריון הציוד
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/catalog"
              className="btn-ghost w-full mt-2 text-sm"
            >
              המשך לבחור מוצרים
            </Link>
          </div>

          <div className="rounded-3xl bg-mint-50 ring-1 ring-mint-100 p-4 flex items-start gap-2.5 text-sm text-ink-700">
            <Info className="h-4 w-4 text-mint-600 mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              האתר אינו מבצע רכישה מלאה אונליין. לאחר בחירת הציוד והתאריך נבדוק
              זמינות ונחזור אליכם לאישור סופי.
            </p>
          </div>

          <CommunityBanner variant="compact" />
        </aside>
      </section>
    </>
  );
}

function QuantityStepper({
  value,
  onChange
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full bg-cream-100 ring-1 ring-ink-100">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="h-9 w-9 grid place-items-center rounded-full hover:bg-white text-ink-600"
        aria-label="הורדת כמות"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center font-semibold text-ink-800">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="h-9 w-9 grid place-items-center rounded-full hover:bg-white text-ink-600"
        aria-label="הוספת כמות"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
