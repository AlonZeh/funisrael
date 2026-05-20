"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addDays, format } from "date-fns";
import { he } from "date-fns/locale";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  User
} from "lucide-react";
import { motion } from "framer-motion";
import { useProductStore } from "@/store/product-store";
import { useBookingStore } from "@/store/booking-store";
import { buildWhatsAppLink, formatILS } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { Booking, Product } from "@/lib/types";

const PICKUP_TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00"
];

export function BookingForm() {
  const router = useRouter();
  const params = useSearchParams();
  const productIdFromUrl = params?.get("product") ?? "";

  const products = useProductStore((s) => s.products.filter((p) => p.active));
  const hydrated = useProductStore((s) => s.hydrated);
  const addBooking = useBookingStore((s) => s.addBooking);

  const [productId, setProductId] = useState(productIdFromUrl);
  const [date, setDate] = useState(format(addDays(new Date(), 3), "yyyy-MM-dd"));
  const [pickupTime, setPickupTime] = useState("10:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState<Booking | null>(null);

  useEffect(() => {
    if (productIdFromUrl) setProductId(productIdFromUrl);
    else if (!productId && products.length) setProductId(products[0].id);
  }, [productIdFromUrl, products, productId]);

  const product = useMemo<Product | undefined>(
    () => products.find((p) => p.id === productId),
    [products, productId]
  );

  const returnTime = useMemo(() => {
    const [hour, minute] = pickupTime.split(":").map(Number);
    const ret = (hour + siteConfig.rentalDurationHours) % 24;
    return `${ret.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  }, [pickupTime]);

  const canSubmit =
    !!product && !!date && !!name.trim() && /^[0-9\-+\s]{8,}$/.test(phone);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!product) return;
    const booking: Booking = {
      id: `bk-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      date,
      pickupTime,
      returnTime,
      notes: notes.trim() || undefined,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    addBooking(booking);
    setSubmitted(booking);
  }

  if (!hydrated) {
    return <div className="card-surface p-12 animate-pulse h-80" />;
  }

  if (submitted && product) {
    const message = buildBookingMessage(submitted, product.price);
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface p-8 text-center space-y-5"
      >
        <div className="mx-auto h-16 w-16 rounded-full bg-mint-100 grid place-items-center">
          <CheckCircle2 className="h-8 w-8 text-mint-600" />
        </div>
        <h2 className="heading-3">בקשת ההזמנה נשלחה!</h2>
        <p className="text-ink-600 max-w-md mx-auto">
          הבקשה התקבלה במערכת. כדי להבטיח אישור מהיר — לחצו על הכפתור הירוק ושלחו לנו
          את ההודעה בוואטסאפ. אנחנו מאשרים בדרך כלל תוך דקות.
        </p>
        <div className="card-surface bg-cream-50 p-5 text-right max-w-lg mx-auto">
          <p className="text-sm text-ink-500">סיכום הבקשה:</p>
          <ul className="mt-2 text-sm text-ink-700 space-y-1">
            <li>• מתנפח: <b>{submitted.productName}</b></li>
            <li>• תאריך: <b>{format(new Date(submitted.date), "EEEE, d בMMMM yyyy", { locale: he })}</b></li>
            <li>• איסוף: <b>{submitted.pickupTime}</b> · החזרה: <b>{submitted.returnTime}</b></li>
            <li>• שם: <b>{submitted.customerName}</b></li>
            <li>• טלפון: <b>{submitted.customerPhone}</b></li>
          </ul>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={buildWhatsAppLink(siteConfig.whatsapp, message)}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle className="h-4 w-4" />
            שליחה בוואטסאפ עכשיו
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(null);
              router.push("/catalog");
            }}
            className="btn-ghost"
          >
            חזרה לקטלוג
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 md:p-8 space-y-6">
      <div>
        <p className="label">בחירת מתנפח</p>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="input"
          required
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {formatILS(p.price)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="label">תאריך אירוע</p>
          <input
            type="date"
            value={date}
            min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
            onChange={(e) => setDate(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <p className="label">שעת איסוף</p>
          <select
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="input"
          >
            {PICKUP_TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <p className="text-xs text-ink-400 mt-1.5">
            השכרה ל-12 שעות · החזרה משוערת: {returnTime}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="label">שם מלא</p>
          <div className="relative">
            <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-300" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input pr-9"
              placeholder="לדוגמה: דנה לוי"
              required
            />
          </div>
        </div>
        <div>
          <p className="label">טלפון נייד</p>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            placeholder="050-1234567"
            required
          />
        </div>
      </div>

      <div>
        <p className="label">הערות (אופציונלי)</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input min-h-[100px] resize-none"
          placeholder="לדוגמה: יום הולדת לבן 5, הייתי שמח גם בבריכת כדורים..."
        />
      </div>

      <div className="rounded-2xl bg-cream-100 p-4 text-sm text-ink-600">
        <p>
          <b>איך זה ממשיך?</b> אנחנו מקבלים את הבקשה, בודקים זמינות ומאשרים בוואטסאפ. התשלום מתבצע באיסוף.
        </p>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-brand w-full text-base py-3.5"
      >
        <CalendarCheck className="h-5 w-5" />
        שליחת בקשת הזמנה
        <ArrowLeft className="h-4 w-4" />
      </button>
    </form>
  );
}

function buildBookingMessage(b: Booking, price: number) {
  const dateLabel = format(new Date(b.date), "EEEE, d בMMMM yyyy", {
    locale: he
  });
  return `היי FUN-ISRAEL 🎈
ביצעתי בקשת הזמנה באתר:
• מתנפח: ${b.productName}
• תאריך: ${dateLabel}
• איסוף: ${b.pickupTime} · החזרה: ${b.returnTime}
• שם: ${b.customerName}
• טלפון: ${b.customerPhone}
• עלות מוערכת: ${formatILS(price)}
${b.notes ? `• הערות: ${b.notes}` : ""}

אשמח לאישור 🙏`;
}
