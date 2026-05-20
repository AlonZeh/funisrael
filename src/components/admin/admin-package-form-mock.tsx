"use client";

import { Lock } from "lucide-react";

/**
 * Static preview of the future package editor.
 * Demonstrates the data surface owners will be able to edit when the CMS arrives.
 */
export function AdminPackageFormMock() {
  return (
    <div className="card-surface p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-cream-50/70 backdrop-blur-[2px] z-10 grid place-items-center">
        <div className="rounded-2xl bg-white px-5 py-3 shadow-card ring-1 ring-ink-100 flex items-center gap-2">
          <Lock className="h-4 w-4 text-brand-500" />
          <span className="text-sm font-semibold text-ink-700">
            עורך חבילות מלא — בקרוב
          </span>
        </div>
      </div>

      <div className="space-y-4 opacity-90 pointer-events-none select-none">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="שם החבילה (עברית)" placeholder="חבילת פרימיום" />
          <Field label="שם החבילה (אנגלית)" placeholder="Premium Package" />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="מחיר התחלה (₪)" placeholder="1290" />
          <Field label="קטגוריה" placeholder="premium" />
          <Field label="סדר תצוגה" placeholder="30" />
        </div>
        <div>
          <p className="label">תיאור (עברית)</p>
          <textarea
            disabled
            className="input min-h-[100px] bg-cream-50"
            placeholder="..."
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="גילאים" placeholder="3-12" />
          <Field label="מקסימום ילדים" placeholder="20" />
          <Field label="זמן השכרה (שעות)" placeholder="12" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["פעיל", "מומלץ", "פופולרי", "פרימיום", "Indoor", "מים"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream-100 px-3 py-1.5 text-xs text-ink-600 ring-1 ring-ink-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input
        disabled
        className="input bg-cream-50"
        placeholder={placeholder}
      />
    </label>
  );
}
