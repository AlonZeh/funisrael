"use client";

import { Check, MessageCircle, Trash2, X } from "lucide-react";
import { useBookingStore } from "@/store/booking-store";
import { useProductStore } from "@/store/product-store";
import { buildWhatsAppLink, formatILS } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { BookingStatus } from "@/lib/types";

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-sun-100 text-sun-800",
  confirmed: "bg-mint-100 text-mint-700",
  cancelled: "bg-ink-100 text-ink-500",
  completed: "bg-sky-100 text-sky-700"
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "ממתין",
  confirmed: "אושר",
  cancelled: "בוטל",
  completed: "הושלם"
};

export default function AdminBookingsPage() {
  const bookings = useBookingStore((s) => s.bookings);
  const updateStatus = useBookingStore((s) => s.updateStatus);
  const removeBooking = useBookingStore((s) => s.removeBooking);
  const products = useProductStore((s) => s.products);

  function whatsappFor(customerPhone: string, message: string) {
    return buildWhatsAppLink(customerPhone, message);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-2">הזמנות</h1>
        <p className="text-ink-500">בקשות שהתקבלו מהאתר. אשרו, בטלו או צרו קשר ישירות עם הלקוח.</p>
      </header>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-100/60 text-ink-500">
              <tr>
                <th className="text-right px-4 py-3 font-medium">לקוח</th>
                <th className="text-right px-4 py-3 font-medium">מתנפח</th>
                <th className="text-right px-4 py-3 font-medium">תאריך</th>
                <th className="text-right px-4 py-3 font-medium">שעות</th>
                <th className="text-right px-4 py-3 font-medium">סכום</th>
                <th className="text-right px-4 py-3 font-medium">סטטוס</th>
                <th className="text-right px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {bookings.map((b) => {
                const product = products.find((p) => p.id === b.productId);
                const message = `היי ${b.customerName}, ההזמנה שלך ב-FUN-ISRAEL ל-${b.productName} בתאריך ${b.date} אושרה ✅ נתראה ב${siteConfig.pickupAddress}!`;
                return (
                  <tr key={b.id} className="hover:bg-cream-50/60 align-top">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-ink-800">{b.customerName}</p>
                      <p className="text-xs text-ink-500 ltr">{b.customerPhone}</p>
                      {b.notes && (
                        <p className="text-xs text-ink-400 mt-1 italic">“{b.notes}”</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink-700">{b.productName}</td>
                    <td className="px-4 py-3 text-ink-700">{b.date}</td>
                    <td className="px-4 py-3 text-ink-600">
                      {b.pickupTime} → {b.returnTime}
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink-800">
                      {product ? formatILS(product.price) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLES[b.status]}`}
                      >
                        {STATUS_LABEL[b.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        {b.status === "pending" && (
                          <button
                            onClick={() => updateStatus(b.id, "confirmed")}
                            className="p-2 rounded-xl hover:bg-mint-50"
                            title="אישור"
                          >
                            <Check className="h-4 w-4 text-mint-600" />
                          </button>
                        )}
                        {b.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(b.id, "cancelled")}
                            className="p-2 rounded-xl hover:bg-ink-100"
                            title="ביטול"
                          >
                            <X className="h-4 w-4 text-ink-600" />
                          </button>
                        )}
                        <a
                          href={whatsappFor(b.customerPhone, message)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl hover:bg-mint-50"
                          title="WhatsApp"
                        >
                          <MessageCircle className="h-4 w-4 text-whatsapp" />
                        </a>
                        <button
                          onClick={() => {
                            if (confirm("למחוק את ההזמנה?")) removeBooking(b.id);
                          }}
                          className="p-2 rounded-xl hover:bg-brand-50"
                          title="מחיקה"
                        >
                          <Trash2 className="h-4 w-4 text-brand-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-ink-400">
                    אין עדיין הזמנות. בקשות מהאתר יופיעו פה.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
