"use client";

import { Download, Upload } from "lucide-react";
import { useProductStore } from "@/store/product-store";
import { useBookingStore } from "@/store/booking-store";

export default function AdminSettingsPage() {
  const products = useProductStore((s) => s.products);
  const importProducts = useProductStore((s) => s.importProducts);
  const bookings = useBookingStore((s) => s.bookings);
  const clearBookings = useBookingStore((s) => s.clearAll);

  function downloadJSON(filename: string, data: unknown) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (Array.isArray(parsed)) {
          if (confirm(`לייבא ${parsed.length} מוצרים? פעולה זו תחליף את הקטלוג הקיים.`)) {
            importProducts(parsed);
            alert("הקטלוג עודכן.");
          }
        } else {
          alert("קובץ לא תקין");
        }
      } catch {
        alert("שגיאת קריאה");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-2">הגדרות</h1>
        <p className="text-ink-500">גיבוי, שחזור ופעולות ניהול גלובליות.</p>
      </header>

      <section className="card-surface p-6 space-y-4">
        <h2 className="heading-3">גיבוי וייבוא קטלוג</h2>
        <p className="text-sm text-ink-500">
          הקטלוג נשמר אצלכם בדפדפן. מומלץ לגבות לקובץ JSON מדי פעם, או לאחר שינויים גדולים.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => downloadJSON("fun-israel-products.json", products)}
            className="btn-ghost"
          >
            <Download className="h-4 w-4" />
            הורדת קטלוג ({products.length} מוצרים)
          </button>
          <label className="btn-brand cursor-pointer">
            <Upload className="h-4 w-4" />
            ייבוא קטלוג
            <input
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </section>

      <section className="card-surface p-6 space-y-4">
        <h2 className="heading-3">גיבוי הזמנות</h2>
        <p className="text-sm text-ink-500">
          סה"כ הזמנות במערכת: {bookings.length}.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => downloadJSON("fun-israel-bookings.json", bookings)}
            className="btn-ghost"
            disabled={bookings.length === 0}
          >
            <Download className="h-4 w-4" />
            הורדת הזמנות
          </button>
          <button
            onClick={() => {
              if (
                confirm(
                  "למחוק את כל ההזמנות מהמערכת? יש לגבות קודם. פעולה לא הפיכה."
                )
              )
                clearBookings();
            }}
            className="btn-ghost text-brand-600 hover:bg-brand-50"
          >
            ניקוי כל ההזמנות
          </button>
        </div>
      </section>

      <section className="card-surface p-6 space-y-3">
        <h2 className="heading-3">מודל נתונים — מוכן לסקיילינג</h2>
        <p className="text-sm text-ink-500">
          המערכת בנויה כך שניתן לחבר בעתיד את הקטלוג וההזמנות ל-API/CMS חיצוני
          ללא שינויים בקוד הצרכני. הוסיפו רובד <code>fetch</code> ב-store, או החליפו את
          ה-Zustand persist ב-React Query מול REST/Sanity/Strapi.
        </p>
        <ul className="text-sm text-ink-600 space-y-1">
          <li>· <code>src/store/product-store.ts</code> — מקור האמת של הקטלוג.</li>
          <li>· <code>src/store/booking-store.ts</code> — מקור האמת של ההזמנות.</li>
          <li>· <code>src/lib/types.ts</code> — סכמת ה-Product וה-Booking.</li>
        </ul>
      </section>
    </div>
  );
}
