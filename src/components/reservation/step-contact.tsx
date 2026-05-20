"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useReservationStore } from "@/store/reservation-store";

const TIME_OPTIONS = [
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00"
];

export interface ContactErrors {
  fullName?: string;
  phone?: string;
  city?: string;
  address?: string;
  termsAccepted?: string;
}

export function ContactDetailsStep({ errors }: { errors?: ContactErrors }) {
  const customer = useReservationStore((s) => s.customer);
  const setCustomer = useReservationStore((s) => s.setCustomer);
  const receivingMethod = useReservationStore((s) => s.receivingMethod);
  const requireAddress = receivingMethod === "delivery";

  return (
    <div className="space-y-5">
      <header>
        <h2 className="heading-3">פרטי קשר ובקשת שיריון</h2>
        <p className="text-ink-500 mt-2">
          את הפרטים נשתמש רק כדי לחזור אליכם עם זמינות ואישור — בלי תשלום באתר
          ובלי שמירת אמצעי תשלום.
        </p>
      </header>

      <div className="card-surface p-5 md:p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="שם מלא" required error={errors?.fullName}>
            <input
              value={customer.fullName}
              onChange={(e) => setCustomer({ fullName: e.target.value })}
              className="input"
              placeholder="דנה לוי"
              autoComplete="name"
            />
          </Field>
          <Field label="טלפון" required error={errors?.phone}>
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) => setCustomer({ phone: e.target.value })}
              className="input"
              placeholder="050-1234567"
              autoComplete="tel"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="עיר" required error={errors?.city}>
            <input
              value={customer.city}
              onChange={(e) => setCustomer({ city: e.target.value })}
              className="input"
              placeholder="רחובות"
              autoComplete="address-level2"
            />
          </Field>
          <Field
            label={requireAddress ? "כתובת או אזור (להובלה)" : "כתובת או אזור (אופציונלי)"}
            required={requireAddress}
            error={errors?.address}
          >
            <input
              value={customer.address ?? ""}
              onChange={(e) => setCustomer({ address: e.target.value })}
              className="input"
              placeholder="הרצל 12 / שכונת קרית משה"
              autoComplete="street-address"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="דוא״ל (אופציונלי)">
            <input
              type="email"
              value={customer.email ?? ""}
              onChange={(e) => setCustomer({ email: e.target.value })}
              className="input ltr"
              placeholder="dana@email.com"
              autoComplete="email"
            />
          </Field>
          <Field label="שעת התחלה (אופציונלי)">
            <select
              value={customer.startTime ?? ""}
              onChange={(e) => setCustomer({ startTime: e.target.value })}
              className="input"
            >
              <option value="">בחרו שעה</option>
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="הערות (אופציונלי)">
          <textarea
            value={customer.notes ?? ""}
            onChange={(e) => setCustomer({ notes: e.target.value })}
            className="input min-h-[88px] resize-none"
            placeholder="לדוגמה: יום הולדת לבן 5, חצר עם דשא, צריך לתאם איסוף בערב..."
          />
        </Field>

        <label className="flex items-start gap-2 text-sm text-ink-700">
          <input
            type="checkbox"
            checked={customer.whatsappConsent}
            onChange={(e) => setCustomer({ whatsappConsent: e.target.checked })}
            className="h-4 w-4 mt-1 accent-brand-500"
          />
          <span>אפשר ליצור איתי קשר בוואטסאפ לגבי זמינות ואישור הזמנה.</span>
        </label>

        <div className="border-t border-ink-100 pt-4 mt-1 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
            אישורים לפני שליחה
          </p>

          <label className="flex items-start gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={customer.termsAccepted}
              onChange={(e) => setCustomer({ termsAccepted: e.target.checked })}
              className="h-4 w-4 mt-1 accent-brand-500"
            />
            <span>
              קראתי ואישרתי את{" "}
              <Link
                href="/terms"
                target="_blank"
                className="text-brand-600 font-semibold underline underline-offset-2 hover:text-brand-700"
              >
                תקנון ותנאי השכרת הציוד
              </Link>{" "}
              ואת{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="text-brand-600 font-semibold underline underline-offset-2 hover:text-brand-700"
              >
                מדיניות הפרטיות
              </Link>
              .<span className="text-brand-500 ms-1">*</span>
            </span>
          </label>
          {errors?.termsAccepted && (
            <p className="text-sm text-brand-600">{errors.termsAccepted}</p>
          )}

          <label className="flex items-start gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={customer.marketingConsent}
              onChange={(e) =>
                setCustomer({ marketingConsent: e.target.checked })
              }
              className="h-4 w-4 mt-1 accent-brand-500"
            />
            <span>
              אני מסכים/ה לקבל מ-FUN-ISRAEL הודעות וחומר שיווקי על חבילות,
              זמינות והטבות (אופציונלי — ניתן לבטל בכל עת).
            </span>
          </label>
        </div>
      </div>

      <div className="rounded-3xl bg-mint-50 ring-1 ring-mint-100 p-4 flex items-start gap-2.5 text-sm text-ink-700">
        <ShieldCheck className="h-4 w-4 text-mint-600 mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          האתר אינו מבצע סליקה ולא שומר פרטי אשראי. עצם שליחת הבקשה אינה כוללת
          חיוב — היא רק שמירת מקום. ניתן לבטל ללא עלות לפני איסוף הציוד או לפני
          תחילת ההשכרה, בהתאם לתקנון.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {required && <span className="text-brand-500 ms-1">*</span>}
      </span>
      {children}
      {error && <p className="text-xs text-brand-600 mt-1.5">{error}</p>}
    </label>
  );
}
