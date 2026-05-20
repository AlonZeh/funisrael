"use client";

import { CalendarCheck, Info } from "lucide-react";
import { useReservationStore } from "@/store/reservation-store";
import { formatDateHe } from "@/lib/utils";
import { ReservationCalendar } from "./reservation-calendar";

export function DateSelectionStep() {
  const date = useReservationStore((s) => s.date);
  const setDate = useReservationStore((s) => s.setDate);

  return (
    <div className="space-y-5">
      <header>
        <h2 className="heading-3">בחירת תאריך לשיריון</h2>
        <p className="text-ink-500 mt-2">
          תקופת השכירות היא ליום בודד, בין השעות 10:00 ל-22:00. אפשר לסגור שעת
          התחלה מדויקת בשלב פרטי הקשר.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px] items-start">
        <ReservationCalendar value={date} onChange={setDate} />
        <aside className="space-y-3">
          <div className="card-surface p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
              התאריך הנבחר
            </p>
            {date ? (
              <>
                <div className="flex items-center gap-2 mt-2">
                  <CalendarCheck className="h-5 w-5 text-mint-600" />
                  <p className="font-display font-extrabold text-ink-800 text-base">
                    {formatDateHe(date)}
                  </p>
                </div>
                <p className="text-xs text-ink-500 mt-2">
                  בכפוף לבדיקת זמינות סופית מולכם בוואטסאפ.
                </p>
              </>
            ) : (
              <p className="text-ink-500 text-sm mt-2">
                לחצו על תאריך בלוח השנה.
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-sun-50 ring-1 ring-sun-100 p-4 flex items-start gap-2.5 text-sm text-ink-700">
            <Info className="h-4 w-4 text-sun-700 mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              בשלב זה כל התאריכים מוצגים כזמינים. לאחר שליחת הבקשה נבדוק זמינות
              סופית ונאשר מולכם בוואטסאפ.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
