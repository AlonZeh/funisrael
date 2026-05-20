"use client";

import Link from "next/link";
import { Package, CalendarCheck, TrendingUp, AlertCircle } from "lucide-react";
import { useProductStore } from "@/store/product-store";
import { useBookingStore } from "@/store/booking-store";
import { formatILS } from "@/lib/utils";

export default function AdminHomePage() {
  const products = useProductStore((s) => s.products);
  const bookings = useBookingStore((s) => s.bookings);

  const active = products.filter((p) => p.active).length;
  const lowStock = products.filter((p) => p.stock <= 1).length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const avgPrice = products.length
    ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length)
    : 0;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="heading-2">סקירת ניהול</h1>
        <p className="text-ink-500 mt-1">
          ניהול מהיר של הקטלוג, ההזמנות וההגדרות. כל שינוי מתעדכן בזמן אמת באתר.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={<Package className="h-5 w-5" />}
          label="מוצרים פעילים"
          value={active.toString()}
          accent="brand"
        />
        <Stat
          icon={<CalendarCheck className="h-5 w-5" />}
          label="הזמנות לאישור"
          value={pendingBookings.toString()}
          accent="sun"
        />
        <Stat
          icon={<TrendingUp className="h-5 w-5" />}
          label="מחיר ממוצע"
          value={formatILS(avgPrice)}
          accent="mint"
        />
        <Stat
          icon={<AlertCircle className="h-5 w-5" />}
          label="מלאי נמוך"
          value={lowStock.toString()}
          accent="ink"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-3">מוצרים אחרונים</h2>
            <Link href="/admin/products" className="text-sm text-brand-600 font-semibold">
              הכל ←
            </Link>
          </div>
          <ul className="divide-y divide-ink-100">
            {products.slice(0, 5).map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-semibold text-ink-800">{p.name}</p>
                  <p className="text-xs text-ink-500">
                    מלאי: {p.stock} · {p.active ? "פעיל" : "לא פעיל"}
                  </p>
                </div>
                <span className="text-sm font-semibold text-ink-700">
                  {formatILS(p.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-3">בקשות הזמנה</h2>
            <Link href="/admin/bookings" className="text-sm text-brand-600 font-semibold">
              הכל ←
            </Link>
          </div>
          {bookings.length === 0 ? (
            <p className="text-sm text-ink-500">אין עדיין הזמנות. בקשות יופיעו פה כשלקוחות ימלאו את הטופס באתר.</p>
          ) : (
            <ul className="divide-y divide-ink-100">
              {bookings.slice(0, 5).map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold text-ink-800">{b.customerName}</p>
                    <p className="text-xs text-ink-500">
                      {b.productName} · {b.date} · {b.pickupTime}
                    </p>
                  </div>
                  <span className="text-xs font-bold rounded-full bg-cream-100 px-2 py-1 text-ink-700">
                    {b.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  accent
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: "brand" | "sun" | "mint" | "ink";
}) {
  const accents = {
    brand: "bg-brand-50 text-brand-600",
    sun: "bg-sun-50 text-sun-700",
    mint: "bg-mint-50 text-mint-600",
    ink: "bg-ink-800 text-cream-50"
  };
  return (
    <div className="card-surface p-5">
      <div className={`h-10 w-10 grid place-items-center rounded-2xl ${accents[accent]}`}>
        {icon}
      </div>
      <p className="text-sm text-ink-500 mt-3">{label}</p>
      <p className="font-display font-extrabold text-2xl text-ink-800 mt-0.5">
        {value}
      </p>
    </div>
  );
}
