"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Edit3,
  Eye,
  EyeOff,
  Plus,
  RefreshCcw,
  Search,
  Trash2
} from "lucide-react";
import { useArticleStore } from "@/store/article-store";
import {
  articleCategories,
  articleCategoryLabel
} from "@/lib/articles/categories";
import type { Article } from "@/lib/articles/types";

export default function AdminArticlesPage() {
  const articles = useArticleStore((s) => s.articles);
  const togglePublished = useArticleStore((s) => s.togglePublished);
  const removeArticle = useArticleStore((s) => s.removeArticle);
  const resetToSeed = useArticleStore((s) => s.resetToSeed);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = articles.filter((a) => {
    if (cat !== "all" && a.category !== cat) return false;
    if (query.trim() && !a.title.includes(query.trim())) return false;
    return true;
  });

  function handleDelete(a: Article) {
    if (confirm(`למחוק את "${a.title}"? פעולה זו ניתנת להחזרה רק דרך אתחול לסיד.`)) {
      removeArticle(a.id);
    }
  }

  function handleReset() {
    if (
      confirm("לאתחל את כל המאמרים למצב המקורי? כל השינויים יימחקו.")
    )
      resetToSeed();
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="heading-2">מאמרים</h1>
          <p className="text-ink-500">
            ניהול המדריכים. שינויים נשמרים מיידית ומופיעים ב-
            <Link href="/blog" className="text-brand-600 underline">
              /blog
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="btn-ghost text-sm">
            <RefreshCcw className="h-4 w-4" />
            אתחול למאמרים המקוריים
          </button>
          <Link href="/admin/articles/new" className="btn-brand">
            <Plus className="h-4 w-4" />
            מאמר חדש
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
            placeholder="חיפוש לפי כותרת..."
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="input w-auto"
        >
          <option value="all">כל הקטגוריות</option>
          {articleCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji} {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-100/60 text-ink-500">
              <tr>
                <th className="text-right px-4 py-3 font-medium">מאמר</th>
                <th className="text-right px-4 py-3 font-medium">קטגוריה</th>
                <th className="text-right px-4 py-3 font-medium">עיר</th>
                <th className="text-right px-4 py-3 font-medium">עודכן</th>
                <th className="text-right px-4 py-3 font-medium">סטטוס</th>
                <th className="text-right px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-cream-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                        {a.coverImage && (
                          <Image
                            src={a.coverImage}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-ink-800 line-clamp-1">
                          {a.title}
                        </p>
                        <p className="text-xs text-ink-500 ltr">/{a.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-600 whitespace-nowrap">
                    {articleCategoryLabel(a.category)}
                  </td>
                  <td className="px-4 py-3 text-ink-600 whitespace-nowrap">
                    {a.city ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-ink-500 whitespace-nowrap">
                    {a.updatedAt}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublished(a.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        a.isPublished
                          ? "bg-mint-100 text-mint-700"
                          : "bg-ink-100 text-ink-500"
                      }`}
                    >
                      {a.isPublished ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                      {a.isPublished ? "פורסם" : "טיוטה"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/articles/${a.id}`}
                        className="p-2 rounded-xl hover:bg-cream-100"
                        title="עריכה"
                      >
                        <Edit3 className="h-4 w-4 text-ink-600" />
                      </Link>
                      <Link
                        href={`/blog/${a.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl hover:bg-cream-100"
                        title="תצוגה באתר"
                      >
                        <Eye className="h-4 w-4 text-ink-600" />
                      </Link>
                      <button
                        onClick={() => handleDelete(a)}
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
                    אין מאמרים שתואמים את הסינון.
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
