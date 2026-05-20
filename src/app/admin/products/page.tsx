"use client";

import Link from "next/link";
import { useState } from "react";
import { Copy, Edit3, Eye, EyeOff, Plus, RefreshCcw, Search, Trash2 } from "lucide-react";
import { useProductStore } from "@/store/product-store";
import { formatILS } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { categories } from "@/lib/categories";
import Image from "next/image";

export default function AdminProductsPage() {
  const products = useProductStore((s) => s.products);
  const updateProduct = useProductStore((s) => s.updateProduct);
  const removeProduct = useProductStore((s) => s.removeProduct);
  const duplicateProduct = useProductStore((s) => s.duplicateProduct);
  const resetToSeed = useProductStore((s) => s.resetToSeed);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = products.filter((p) => {
    if (cat !== "all" && p.category !== cat) return false;
    if (query.trim() && !p.name.includes(query.trim())) return false;
    return true;
  });

  function toggleActive(p: Product) {
    updateProduct(p.id, { active: !p.active });
  }

  function handleDelete(p: Product) {
    if (
      confirm(
        `למחוק לצמיתות את "${p.name}"? פעולה זו לא ניתנת לשחזור (אבל אפשר לאתחל לסיד).`
      )
    ) {
      removeProduct(p.id);
    }
  }

  function handleReset() {
    if (confirm("לאתחל את כל הקטלוג למוצרים המקוריים? כל השינויים יימחקו.")) {
      resetToSeed();
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="heading-2">מוצרים</h1>
          <p className="text-ink-500">ניהול הקטלוג. שינויים נשמרים מיידית ומופיעים באתר.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="btn-ghost text-sm">
            <RefreshCcw className="h-4 w-4" />
            אתחול לקטלוג ברירת מחדל
          </button>
          <Link href="/admin/products/new" className="btn-brand">
            <Plus className="h-4 w-4" />
            הוספת מוצר
          </Link>
        </div>
      </header>

      <div className="card-surface p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input pr-9"
            placeholder="חיפוש לפי שם..."
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="input w-auto"
        >
          <option value="all">כל הקטגוריות</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-100/60 text-ink-500">
              <tr>
                <th className="text-right px-4 py-3 font-medium">מוצר</th>
                <th className="text-right px-4 py-3 font-medium">קטגוריה</th>
                <th className="text-right px-4 py-3 font-medium">מחיר</th>
                <th className="text-right px-4 py-3 font-medium">מלאי</th>
                <th className="text-right px-4 py-3 font-medium">סטטוס</th>
                <th className="text-right px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-cream-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                        {p.images[0] && (
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-ink-800">{p.name}</p>
                        <p className="text-xs text-ink-500">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-600">
                    {categories.find((c) => c.id === p.category)?.name ?? p.category}
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink-800">
                    {formatILS(p.price)}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{p.stock}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        p.active
                          ? "bg-mint-100 text-mint-700"
                          : "bg-ink-100 text-ink-500"
                      }`}
                    >
                      {p.active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {p.active ? "פעיל" : "מוסתר"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="p-2 rounded-xl hover:bg-cream-100"
                        title="עריכה"
                      >
                        <Edit3 className="h-4 w-4 text-ink-600" />
                      </Link>
                      <button
                        onClick={() => duplicateProduct(p.id)}
                        className="p-2 rounded-xl hover:bg-cream-100"
                        title="שכפול"
                      >
                        <Copy className="h-4 w-4 text-ink-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="p-2 rounded-xl hover:bg-brand-50"
                        title="מחיקה"
                      >
                        <Trash2 className="h-4 w-4 text-brand-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-ink-400">
                    לא נמצאו מוצרים.
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
