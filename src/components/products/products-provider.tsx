"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/product-store";
import { ProductGrid } from "./product-grid";
import type { Product, ProductCategory } from "@/lib/types";

interface Props {
  category?: ProductCategory;
  limit?: number;
  filter?: (p: Product) => boolean;
}

/**
 * Client-side product list source. Reads from the persisted store so admin
 * edits propagate instantly across the site.
 */
export function ProductsProvider({ category, limit, filter }: Props) {
  const products = useProductStore((s) => s.products);
  const hydrated = useProductStore((s) => s.hydrated);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (hydrated) setReady(true);
  }, [hydrated]);

  // Avoid SSR/CSR mismatch — render skeleton briefly on first paint.
  if (!ready) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: limit ?? 6 }).map((_, i) => (
          <div
            key={i}
            className="card-surface aspect-[4/3] animate-pulse bg-cream-100"
          />
        ))}
      </div>
    );
  }

  let list = products.filter((p) => p.active);
  if (category) {
    list = list.filter(
      (p) =>
        p.category === category ||
        (p.secondaryCategories ?? []).includes(category)
    );
  }
  if (filter) list = list.filter(filter);
  if (limit) list = list.slice(0, limit);

  return <ProductGrid products={list} />;
}
