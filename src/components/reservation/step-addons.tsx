"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { useReservationStore } from "@/store/reservation-store";
import { getRecommendedAddOns } from "@/lib/reservation/recommendations";
import { AddonCard } from "./add-to-reservation-drawer";

export function AddOnsStep() {
  const items = useReservationStore((s) => s.items);
  const recommendations = useMemo(
    () => getRecommendedAddOns(items, 8),
    [items]
  );

  return (
    <div className="space-y-5">
      <header>
        <span className="pill text-xs">
          <Sparkles className="h-3.5 w-3.5 text-brand-500" />
          תוספות מומלצות
        </span>
        <h2 className="heading-3 mt-2">מוצרים נלווים שמושכרים יחד</h2>
        <p className="text-ink-500 mt-2 leading-relaxed">
          רוצים לסגור חבילה נוחה יותר? אלו מוצרים שלקוחות מוסיפים לעיתים קרובות
          לאירועים דומים. אפשר להוסיף בלחיצה אחת — או לדלג בלי לחץ.
        </p>
      </header>

      {recommendations.length === 0 ? (
        <div className="card-surface p-8 text-center text-ink-500">
          אין כרגע מוצרים נלווים שמתאימים לעגלה הנוכחית. אפשר להמשיך.
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendations.map((rec) => (
            <AddonCard key={rec.key} item={rec} />
          ))}
        </div>
      )}
    </div>
  );
}
