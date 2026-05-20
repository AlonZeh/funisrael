import { seedProducts } from "@/lib/seed-products";
import { packages } from "@/lib/packages/data";
import { packageAddons } from "@/lib/packages/addons";
import { formatILS } from "@/lib/utils";
import type { ReservationItem } from "./types";

/**
 * Build a unified pool of "addable" items for recommendations.
 * Includes:
 *  - active products (real inventory)
 *  - active packages (curated bundles)
 *  - active package addons (small extras — ball pit, mats, yard games, ...)
 *
 * Returns ReservationItem-shaped objects so they're ready to drop into the cart.
 */
export function buildReservationCatalog(): ReservationItem[] {
  const catalog: ReservationItem[] = [];

  for (const p of seedProducts) {
    if (!p.active) continue;
    catalog.push({
      key: `product:${p.id}`,
      kind: "product",
      id: p.id,
      slug: p.slug,
      name: p.name,
      imageUrl: p.images[0] ?? "",
      unitPrice: p.price,
      priceLabel: formatILS(p.price),
      quantity: 0,
      category: p.category,
      tags: p.badges
    });
  }

  for (const pkg of packages) {
    if (!pkg.isActive) continue;
    catalog.push({
      key: `package:${pkg.id}`,
      kind: "package",
      id: pkg.id,
      slug: pkg.slug,
      name: pkg.title.he,
      imageUrl: pkg.image,
      unitPrice: pkg.priceFrom,
      priceLabel: pkg.priceLabel.he,
      quantity: 0,
      category: pkg.category,
      tags: pkg.tags,
      suggestedAddonIds: pkg.optionalAddons
    });
  }

  for (const a of packageAddons) {
    if (!a.isActive) continue;
    catalog.push({
      key: `addon:${a.id}`,
      kind: "addon",
      id: a.id,
      name: a.name.he,
      imageUrl:
        // Add-ons don't have real images yet — use a neutral pastel placeholder
        "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80",
      unitPrice: 0,
      priceLabel: a.priceLabel.he,
      quantity: 0,
      category: a.compatibleCategories[0],
      tags: a.compatibleCategories
    });
  }

  return catalog;
}

/**
 * Recommend 4-8 items to suggest alongside the cart.
 *
 * Logic:
 *  1. Exclude anything already in the cart.
 *  2. Prefer package add-ons that match the cart's package categories
 *     (via the package's `optionalAddons` ids).
 *  3. Then add products whose category overlaps cart items.
 *  4. Then add tag-matched items (water → water/summer, indoor → indoor, ...).
 *  5. Fill remainder with popular items.
 */
export function getRecommendedAddOns(
  cartItems: ReservationItem[],
  maxItems = 6
): ReservationItem[] {
  const catalog = buildReservationCatalog();
  const cartKeys = new Set(cartItems.map((i) => i.key));
  const available = catalog.filter((c) => !cartKeys.has(c.key));

  const scored = available.map((candidate) => {
    let score = 0;

    // Boost: package add-ons that the cart packages explicitly suggest
    for (const ci of cartItems) {
      if (ci.suggestedAddonIds?.includes(candidate.id) && candidate.kind === "addon") {
        score += 40;
      }
      if (candidate.category && candidate.category === ci.category) {
        score += 8;
      }
      if (candidate.tags && ci.tags) {
        for (const t of candidate.tags) {
          if (ci.tags.includes(t)) score += 3;
        }
      }
    }

    // Soft prior: addons rank higher than full products as "add-ons"
    if (candidate.kind === "addon") score += 6;
    // Slight prior for cheaper items as add-ons
    if (candidate.unitPrice > 0 && candidate.unitPrice < 400) score += 2;

    return { item: candidate, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // If everything tied at 0 (empty cart), fall back to first N from catalog
  if (cartItems.length === 0) {
    return catalog.slice(0, maxItems);
  }

  return scored.slice(0, maxItems).map((s) => s.item);
}
