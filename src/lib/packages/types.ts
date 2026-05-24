import type { LocalizedString, LocalizedStringArray } from "@/lib/i18n/config";

export type PackageCategoryId =
  | "all"
  | "self-pickup"
  | "birthday"
  | "premium"
  | "water"
  | "toddler"
  | "luxury-white"
  | "indoor"
  | "combo"
  | "extra"
  | "sports"
  | "festival"
  | "custom";

export type PackageTagId =
  | "best-value"
  | "popular"
  | "premium"
  | "summer"
  | "indoor"
  | "toddler-safe"
  | "luxury"
  | "instagram"
  | "family"
  | "custom"
  | "winter";

export interface PackageCategory {
  id: PackageCategoryId;
  label: LocalizedString;
  emoji?: string;
}

export interface PackageAddon {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  priceLabel: LocalizedString;
  compatibleCategories: PackageCategoryId[];
  isActive: boolean;
  icon?: string; // emoji or lucide icon name
}

export interface RentalPackage {
  id: string;
  slug: string;
  /** Sort smaller = earlier */
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  category: PackageCategoryId;
  tags: PackageTagId[];

  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  bestFor: LocalizedString;
  includes: LocalizedStringArray;
  optionalAddons: string[]; // PackageAddon ids
  childMood: LocalizedString; // playful one-line vibe label

  priceFrom: number;
  priceLabel: LocalizedString; // e.g. "החל מ-₪500"
  oldPriceLabel?: LocalizedString;

  recommendedAges: string; // e.g. "2-12"
  maxChildren?: number;
  durationHours: number;
  pickupOnly: boolean;
  setupNotes: LocalizedString;
  safetyNotes: LocalizedString;
  /** Where it can run */
  fits: {
    home: boolean;
    yard: boolean;
    water: boolean;
    indoor: boolean;
    outdoor: boolean;
  };

  image: string;
  gallery?: string[];
  colorTheme: "coral" | "mint" | "sun" | "sky" | "ink" | "cream";

  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  /** Per-package message template; supports {package} {duration} placeholders */
  whatsappTemplate: LocalizedString;
}
