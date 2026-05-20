"use client";

import { useMemo, useState } from "react";
import { PackageCard } from "./package-card";
import { PackageFilters } from "./package-filters";
import { getActivePackages } from "@/lib/packages/data";
import type { PackageCategoryId } from "@/lib/packages/types";

export function PackagesGrid() {
  const [active, setActive] = useState<PackageCategoryId>("all");
  const list = useMemo(() => {
    const all = getActivePackages();
    if (active === "all") return all;
    return all.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="space-y-6">
      <PackageFilters active={active} onChange={setActive} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((pkg, i) => (
          <PackageCard key={pkg.id} pkg={pkg} index={i} />
        ))}
      </div>
    </div>
  );
}
