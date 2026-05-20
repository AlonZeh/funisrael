"use client";

import Image from "next/image";
import { Copy, Edit3, Eye, EyeOff, Star, Trash2 } from "lucide-react";
import { packages } from "@/lib/packages/data";
import { packageCategories } from "@/lib/packages/categories";
import { pickLocalized } from "@/lib/i18n/hooks";
import type { Locale } from "@/lib/i18n/config";

const LOCALE: Locale = "he";

/**
 * Mock admin table.
 *
 * Data is read directly from `src/lib/packages/data.ts`. To actually edit:
 *  - For now: change the file and redeploy. The structure is identical for any
 *    future CMS/database.
 *  - Future: wire these buttons to mutate persisted state (e.g., Supabase).
 *
 * The action buttons are intentionally inert in this mock — they exist to
 * communicate the future UX surface.
 */
export function AdminPackageTable() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-100/60 text-ink-500">
            <tr>
              <th className="text-right px-4 py-3 font-medium">חבילה</th>
              <th className="text-right px-4 py-3 font-medium">קטגוריה</th>
              <th className="text-right px-4 py-3 font-medium">מחיר</th>
              <th className="text-right px-4 py-3 font-medium">סדר</th>
              <th className="text-right px-4 py-3 font-medium">סטטוס</th>
              <th className="text-right px-4 py-3 font-medium">מומלץ</th>
              <th className="text-right px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {packages
              .slice()
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((p) => (
                <tr key={p.id} className="hover:bg-cream-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-ink-800">
                          {pickLocalized(p.title, LOCALE)}
                        </p>
                        <p className="text-xs text-ink-500">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-600">
                    {pickLocalized(
                      packageCategories.find((c) => c.id === p.category)
                        ?.label ?? { he: p.category, en: p.category, ru: p.category },
                      LOCALE
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink-800 whitespace-nowrap">
                    {pickLocalized(p.priceLabel, LOCALE)}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{p.sortOrder}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        p.isActive
                          ? "bg-mint-100 text-mint-700"
                          : "bg-ink-100 text-ink-500"
                      }`}
                    >
                      {p.isActive ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                      {p.isActive ? "פעיל" : "מוסתר"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {p.isFeatured ? (
                      <span className="inline-flex items-center gap-1 text-brand-600 text-xs font-semibold">
                        <Star className="h-3 w-3 fill-brand-500 text-brand-500" />
                        מומלץ
                      </span>
                    ) : (
                      <span className="text-xs text-ink-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        title="עריכה (בקרוב)"
                        disabled
                        className="p-2 rounded-xl hover:bg-cream-100 disabled:opacity-50"
                      >
                        <Edit3 className="h-4 w-4 text-ink-600" />
                      </button>
                      <button
                        type="button"
                        title="שכפול (בקרוב)"
                        disabled
                        className="p-2 rounded-xl hover:bg-cream-100 disabled:opacity-50"
                      >
                        <Copy className="h-4 w-4 text-ink-600" />
                      </button>
                      <button
                        type="button"
                        title="מחיקה (בקרוב)"
                        disabled
                        className="p-2 rounded-xl hover:bg-brand-50 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4 text-brand-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
