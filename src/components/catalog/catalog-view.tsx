"use client";

import { useMemo, useState, useEffect } from "react";
import { Filter, Search, X } from "lucide-react";
import { useProductStore } from "@/store/product-store";
import { categories } from "@/lib/categories";
import { ProductGrid } from "@/components/products/product-grid";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/lib/types";

type Sort = "featured" | "price-low" | "price-high" | "new";

export function CatalogView({
  initialCategory
}: {
  initialCategory?: ProductCategory;
}) {
  const products = useProductStore((s) => s.products);
  const hydrated = useProductStore((s) => s.hydrated);

  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ProductCategory | "all">(
    initialCategory ?? "all"
  );
  const [sort, setSort] = useState<Sort>("featured");
  const [indoor, setIndoor] = useState(false);
  const [water, setWater] = useState(false);

  useEffect(() => {
    if (initialCategory) setActive(initialCategory);
  }, [initialCategory]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.active);
    if (active !== "all") {
      list = list.filter(
        (p) =>
          p.category === active ||
          (p.secondaryCategories ?? []).includes(active)
      );
    }
    if (indoor) list = list.filter((p) => p.indoorFriendly);
    if (water) list = list.filter((p) => p.needsWater);
    if (query.trim()) {
      const q = query.trim();
      list = list.filter(
        (p) =>
          p.name.includes(q) ||
          p.shortDescription.includes(q) ||
          p.longDescription.includes(q)
      );
    }
    switch (sort) {
      case "price-low":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "new":
        list = [...list].sort((a, b) =>
          a.badges.includes("new") ? -1 : b.badges.includes("new") ? 1 : 0
        );
        break;
      default:
        list = [...list].sort((a, b) =>
          a.badges.includes("popular") ? -1 : b.badges.includes("popular") ? 1 : 0
        );
    }
    return list;
  }, [products, active, indoor, water, query, sort]);

  if (!hydrated) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-surface aspect-[4/3] animate-pulse bg-cream-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="card-surface p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-brand-500" />
            <h3 className="font-display font-bold text-ink-800">סינון</h3>
          </div>

          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש..."
              className="input pr-9"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-ink-400 hover:text-ink-700"
                aria-label="ניקוי"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div>
            <p className="label">קטגוריה</p>
            <div className="flex flex-wrap gap-1.5">
              <FilterChip
                active={active === "all"}
                onClick={() => setActive("all")}
              >
                הכל
              </FilterChip>
              {categories.map((c) => (
                <FilterChip
                  key={c.id}
                  active={active === c.id}
                  onClick={() => setActive(c.id)}
                >
                  {c.emoji} {c.name}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="label">העדפות</p>
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={indoor}
                onChange={(e) => setIndoor(e.target.checked)}
                className="h-4 w-4 rounded accent-brand-500"
              />
              מתאים לאינדור
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={water}
                onChange={(e) => setWater(e.target.checked)}
                className="h-4 w-4 rounded accent-brand-500"
              />
              מתנפחי מים
            </label>
          </div>

          <div>
            <p className="label">מיון</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="input"
            >
              <option value="featured">מומלצים</option>
              <option value="new">חדשים</option>
              <option value="price-low">מחיר: מהנמוך לגבוה</option>
              <option value="price-high">מחיר: מהגבוה לנמוך</option>
            </select>
          </div>
        </div>
      </aside>

      <div>
        <div className="flex items-center justify-between mb-4 text-sm text-ink-500">
          <span>{filtered.length} מתנפחים</span>
        </div>
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition",
        active
          ? "bg-ink-800 text-white ring-ink-800"
          : "bg-white text-ink-600 ring-ink-100 hover:bg-cream-100"
      )}
    >
      {children}
    </button>
  );
}
