"use client";

import { packageCategories } from "@/lib/packages/categories";
import type { PackageCategoryId } from "@/lib/packages/types";
import { pickLocalized, useLocale } from "@/lib/i18n/hooks";
import { cn } from "@/lib/utils";

interface Props {
  active: PackageCategoryId;
  onChange: (id: PackageCategoryId) => void;
}

export function PackageFilters({ active, onChange }: Props) {
  const locale = useLocale();
  return (
    <div className="-mx-4 px-4 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max pb-1">
        {packageCategories.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onChange(c.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
                isActive
                  ? "bg-ink-800 text-white ring-ink-800"
                  : "bg-white text-ink-600 ring-ink-100 hover:bg-cream-100"
              )}
            >
              <span className="me-1">{c.emoji}</span>
              {pickLocalized(c.label, locale)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
