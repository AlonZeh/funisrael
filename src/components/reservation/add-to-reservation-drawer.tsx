"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Plus, ShoppingBag, X } from "lucide-react";
import { useReservationStore } from "@/store/reservation-store";
import type { ReservationItem } from "@/lib/reservation/types";
import { getRecommendedAddOns } from "@/lib/reservation/recommendations";
import { formatILS, cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  addedItem: Omit<ReservationItem, "quantity">;
}

export function AddToReservationDrawer({ open, onClose, addedItem }: Props) {
  const items = useReservationStore((s) => s.items);
  const addItem = useReservationStore((s) => s.addItem);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const total = useReservationStore((s) => s.estimatedTotal());

  const recommendations = useMemo(
    () => getRecommendedAddOns(items, 6),
    [items]
  );

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink-900/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="נוסף לשיריון"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 left-0 z-[61] w-full sm:max-w-md bg-cream-50 shadow-hover ring-1 ring-ink-100 flex flex-col"
            dir="rtl"
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 px-5 py-4 bg-white border-b border-ink-100">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint-100 text-mint-600">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-extrabold text-ink-800 leading-tight">
                    נוסף לשיריון!
                  </p>
                  <p className="text-xs text-ink-500 leading-tight">
                    {itemCount} פריטים בעגלת השיריון
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="סגירה"
                className="p-2 rounded-full hover:bg-cream-100 text-ink-500"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
              {/* Just-added card */}
              <div className="card-surface p-4 flex items-center gap-3">
                <div className="relative h-16 w-20 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                  {addedItem.imageUrl && (
                    <Image
                      src={addedItem.imageUrl}
                      alt={addedItem.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-ink-800 leading-tight">
                    {addedItem.name}
                  </p>
                  <p className="text-sm text-brand-600 font-bold mt-0.5">
                    {addedItem.priceLabel}
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-extrabold text-ink-800">
                      מוצרים שמושכרים יחד לעיתים קרובות
                    </h3>
                  </div>
                  <p className="text-xs text-ink-500 mb-3 leading-relaxed">
                    תוספות שלקוחות מוסיפים בדרך כלל לאירועים דומים. אפשר להוסיף
                    בלחיצה אחת או לדלג.
                  </p>
                  <ul className="grid gap-2.5">
                    {recommendations.slice(0, 4).map((rec) => (
                      <li
                        key={rec.key}
                        className="card-surface p-3 flex items-center gap-3"
                      >
                        <div className="relative h-14 w-16 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                          {rec.imageUrl && (
                            <Image
                              src={rec.imageUrl}
                              alt={rec.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-ink-800 line-clamp-1">
                            {rec.name}
                          </p>
                          <p className="text-xs text-brand-600 font-bold mt-0.5">
                            {rec.priceLabel}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addItem({ ...rec, quantity: 1 })}
                          aria-label={`הוספת ${rec.name}`}
                          className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-white hover:bg-brand-600 shadow-soft shrink-0"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="rounded-2xl bg-cream-100 p-3.5 text-xs text-ink-600 leading-relaxed">
                האתר אינו מבצע סליקה. ההזמנה אינה כוללת חיוב — היא בקשה לשמירת
                מקום. נחזור אליכם בוואטסאפ לאישור זמינות סופית.
              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-ink-100 bg-white px-5 py-4 space-y-2">
              {total > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">סה"כ מוערך</span>
                  <span className="font-display font-extrabold text-ink-800">
                    {formatILS(total)}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-ghost w-full text-sm"
                >
                  המשך לבחור
                </button>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="btn-brand w-full text-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>עגלת שיריון</span>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/** A reusable inline addon card used by the dedicated addons step. */
export function AddonCard({ item }: { item: ReservationItem }) {
  const addItem = useReservationStore((s) => s.addItem);
  const items = useReservationStore((s) => s.items);
  const isInCart = items.some((i) => i.key === item.key);

  return (
    <article className="card-surface p-4 flex flex-col h-full">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-100">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 50vw, 200px"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex-1 mt-3">
        <p className="font-display font-bold text-ink-800 leading-tight line-clamp-2">
          {item.name}
        </p>
        <p className="text-sm text-brand-600 font-bold mt-1">{item.priceLabel}</p>
      </div>
      <button
        type="button"
        onClick={() => addItem({ ...item, quantity: 1 })}
        disabled={isInCart}
        className={cn(
          "mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-2xl px-3 py-2.5 text-sm font-semibold transition",
          isInCart
            ? "bg-mint-100 text-mint-700"
            : "bg-brand-500 text-white hover:bg-brand-600"
        )}
      >
        {isInCart ? (
          <>
            <CheckCircle2 className="h-4 w-4" />
            נוסף לעגלה
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            הוספה לשיריון
          </>
        )}
      </button>
    </article>
  );
}
