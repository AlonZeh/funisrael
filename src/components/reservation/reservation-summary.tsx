"use client";

import { Calendar, ChevronDown, MapPin, ShoppingBag, Truck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useReservationStore } from "@/store/reservation-store";
import { formatDateHe, formatILS, cn } from "@/lib/utils";

const METHOD_LABEL = {
  pickup: "איסוף עצמי",
  delivery: "הובלה"
} as const;

const DELIVERY_TYPE_LABEL = {
  outbound: "הלוך בלבד",
  return: "חזור בלבד",
  roundtrip: "הלוך וחזור"
} as const;

export function ReservationSummary() {
  const items = useReservationStore((s) => s.items);
  const date = useReservationStore((s) => s.date);
  const method = useReservationStore((s) => s.receivingMethod);
  const deliveryType = useReservationStore((s) => s.deliveryType);
  const total = useReservationStore((s) => s.estimatedTotal());
  const [mobileOpen, setMobileOpen] = useState(false);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const content = (
    <>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li
            key={i.key}
            className="flex justify-between gap-3 text-ink-700"
          >
            <span className="truncate">
              {i.name}
              {i.quantity > 1 && (
                <span className="text-ink-400 ms-1">× {i.quantity}</span>
              )}
            </span>
            {i.unitPrice > 0 && (
              <span className="font-semibold whitespace-nowrap">
                {formatILS(i.unitPrice * i.quantity)}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 grid gap-2.5">
        {date && (
          <SummaryRow
            icon={<Calendar className="h-4 w-4" />}
            label="תאריך"
            value={formatDateHe(date)}
          />
        )}
        {method && (
          <SummaryRow
            icon={
              method === "pickup" ? (
                <MapPin className="h-4 w-4" />
              ) : (
                <Truck className="h-4 w-4" />
              )
            }
            label="קבלת הציוד"
            value={
              method === "delivery" && deliveryType
                ? `${METHOD_LABEL[method]} · ${DELIVERY_TYPE_LABEL[deliveryType]}`
                : METHOD_LABEL[method]
            }
          />
        )}
        <SummaryRow
          icon={<ShoppingBag className="h-4 w-4" />}
          label="פריטים"
          value={`${itemCount}`}
        />
      </div>

      {total > 0 && (
        <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
          <span className="text-sm text-ink-500">סה"כ מוערך</span>
          <span className="font-display font-extrabold text-xl text-ink-800">
            {formatILS(total)}
          </span>
        </div>
      )}

      <p className="text-[11px] text-ink-400 mt-3 leading-relaxed">
        האתר אינו מבצע סליקה. ההזמנה אינה כוללת חיוב — היא בקשה לשמירת מקום.
        אישור סופי, זמינות ותיאום מתבצעים מולכם בוואטסאפ.
      </p>
    </>
  );

  return (
    <aside className="card-surface p-5 lg:sticky lg:top-24">
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 lg:cursor-default lg:pointer-events-none"
        aria-expanded={mobileOpen}
      >
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
            סיכום השיריון
          </p>
          <h3 className="font-display font-extrabold text-ink-800 mt-1">
            {itemCount} פריטים
          </h3>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-ink-400 transition-transform lg:hidden",
            mobileOpen && "rotate-180"
          )}
        />
      </button>

      {/* Desktop: always shown */}
      <div className="hidden lg:block">{content}</div>

      {/* Mobile: collapsible */}
      <div className="lg:hidden">
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              key="mobile-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

function SummaryRow({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="inline-flex items-center gap-2 text-ink-500">
        {icon}
        {label}
      </span>
      <span className="text-ink-800 font-semibold text-right">{value}</span>
    </div>
  );
}
