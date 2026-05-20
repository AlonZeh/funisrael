export type ProductCategory =
  | "water"
  | "birthday"
  | "indoor"
  | "toddler"
  | "premium"
  | "soft-play"
  | "ball-pit";

export type ProductBadge =
  | "popular"
  | "premium"
  | "summer"
  | "indoor-friendly"
  | "instagram"
  | "new"
  | "perfect-for-toddlers";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ProductCategory;
  secondaryCategories?: ProductCategory[];
  /** Daily 12-hour pickup price in ILS */
  price: number;
  /** Optional original price for "from" pricing */
  compareAtPrice?: number;
  images: string[];
  /** Recommended ages, e.g. "3-12" */
  ageRange: string;
  /** Inflated dimensions, length x width x height (cm) */
  dimensions: { length: number; width: number; height: number };
  /** Required clear setup area in meters */
  setupArea: { length: number; width: number };
  indoorFriendly: boolean;
  outdoorFriendly: boolean;
  needsWater: boolean;
  /** Setup time in minutes */
  setupTime: number;
  /** Vehicle needed for pickup */
  pickupVehicle: "טנדר" | "רכב משפחתי גדול" | "רכב פרטי";
  /** Inventory count */
  stock: number;
  /** Marketing badges */
  badges: ProductBadge[];
  /** Short selling points shown on PDP */
  perfectFor: string[];
  /** Optional youtube/vimeo ID */
  videoUrl?: string;
  /** Active = shown on site */
  active: boolean;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  date: string; // ISO date
  pickupTime: string; // "10:00"
  returnTime: string; // "22:00"
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}
