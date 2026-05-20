"use client";

import { Check, MapPin, Truck } from "lucide-react";
import { useReservationStore } from "@/store/reservation-store";
import type { DeliveryType, ReceivingMethod } from "@/lib/reservation/types";
import { cn } from "@/lib/utils";

const DELIVERY_OPTIONS: { id: DeliveryType; label: string; hint: string }[] = [
  {
    id: "roundtrip",
    label: "הלוך וחזור",
    hint: "אנחנו מביאים, אוספים בסוף האירוע."
  },
  { id: "outbound", label: "הלוך בלבד", hint: "הבאה — והחזרה עצמית מצדכם." },
  { id: "return", label: "חזור בלבד", hint: "הציוד אצלכם — נאסוף בסיום." }
];

export function ReceivingMethodStep() {
  const method = useReservationStore((s) => s.receivingMethod);
  const deliveryType = useReservationStore((s) => s.deliveryType);
  const setMethod = useReservationStore((s) => s.setReceivingMethod);
  const setDeliveryType = useReservationStore((s) => s.setDeliveryType);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="heading-3">איך תרצו לקבל את הציוד?</h2>
        <p className="text-ink-500 mt-2">
          שתי האפשרויות בתיאום מראש. ההובלה כפופה לזמינות ולמרחק.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <OptionCard
          active={method === "pickup"}
          onClick={() => setMethod("pickup")}
          icon={<MapPin className="h-5 w-5" />}
          title="איסוף עצמי"
          subtitle="חינם · בתיאום מראש"
          highlight="חינם"
        >
          <ul className="text-sm text-ink-600 space-y-1.5 mt-2">
            <li>• מהמחסן ברחוב ההתיישבות 5, ראשון לציון.</li>
            <li>• יש להגיע עם רכב מתאים לגודל הציוד.</li>
            <li>• שעת איסוף והחזרה יתואמו לאחר בדיקת זמינות.</li>
          </ul>
        </OptionCard>

        <OptionCard
          active={method === "delivery"}
          onClick={() => setMethod("delivery")}
          icon={<Truck className="h-5 w-5" />}
          title="הובלה"
          subtitle="בתיאום ובכפוף לזמינות"
        >
          <ul className="text-sm text-ink-600 space-y-1.5 mt-2">
            <li>• שירות הובלה לאזורים שאנחנו פועלים בהם.</li>
            <li>• מחיר ההובלה תלוי בכתובת, מרחק, גודל הציוד ותיאום.</li>
            <li>• מסוכם בוואטסאפ לאחר אישור הזמינות.</li>
          </ul>
        </OptionCard>
      </div>

      {method === "delivery" && (
        <div className="card-surface p-5 space-y-4">
          <div>
            <h3 className="font-display font-bold text-ink-800">סוג הובלה</h3>
            <p className="text-sm text-ink-500 mt-1">
              בחירה אחת. רוב הלקוחות בוחרים הלוך וחזור.
            </p>
          </div>
          <div className="grid gap-2">
            {DELIVERY_OPTIONS.map((opt) => {
              const selected = deliveryType === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDeliveryType(opt.id)}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ring-1 transition text-right",
                    selected
                      ? "bg-ink-800 text-white ring-ink-800"
                      : "bg-white ring-ink-100 hover:bg-cream-50"
                  )}
                  role="radio"
                  aria-checked={selected}
                >
                  <div>
                    <p
                      className={cn(
                        "font-semibold",
                        selected ? "text-white" : "text-ink-800"
                      )}
                    >
                      {opt.label}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-0.5",
                        selected ? "text-cream-200/80" : "text-ink-500"
                      )}
                    >
                      {opt.hint}
                    </p>
                  </div>
                  {selected && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function OptionCard({
  active,
  onClick,
  icon,
  title,
  subtitle,
  highlight,
  children
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  highlight?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-right p-5 rounded-3xl ring-1 transition relative",
        active
          ? "bg-ink-800 text-cream-50 ring-ink-800 shadow-card"
          : "bg-white ring-ink-100 hover:shadow-soft"
      )}
    >
      {highlight && (
        <span className="absolute top-3 start-3 inline-flex items-center rounded-full bg-mint-500 text-white text-[11px] font-bold px-2 py-0.5">
          {highlight}
        </span>
      )}
      <div
        className={cn(
          "h-11 w-11 grid place-items-center rounded-2xl shrink-0",
          active ? "bg-white/15 text-white" : "bg-brand-50 text-brand-600"
        )}
      >
        {icon}
      </div>
      <p
        className={cn(
          "font-display font-extrabold text-lg mt-3",
          active ? "text-white" : "text-ink-800"
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "text-xs",
          active ? "text-cream-200/80" : "text-ink-500"
        )}
      >
        {subtitle}
      </p>
      <div className={active ? "text-cream-100/90" : ""}>{children}</div>
    </button>
  );
}
