/** Reservation domain types. Used by the store + UI + WhatsApp handoff. */

export type ReservationItemKind = "product" | "package" | "addon";

export interface ReservationItem {
  /** Unique key inside the cart. We compose `${kind}:${id}` to avoid clashes. */
  key: string;
  kind: ReservationItemKind;
  /** Source-system id (product id / package id / addon id). */
  id: string;
  /** Slug for linking back to the source page if relevant. */
  slug?: string;
  /** Hebrew name to display. */
  name: string;
  imageUrl: string;
  /** Numeric base price for total estimates. 0 = price-on-request. */
  unitPrice: number;
  /** Display price string ("החל מ-₪500" / "מחיר לפי התאמה" / "+₪150"). */
  priceLabel: string;
  quantity: number;
  /** Optional category id for matching add-on recommendations. */
  category?: string;
  /** Optional tag list — water, indoor, toddler-safe, etc. */
  tags?: string[];
  /** For packages: their `optionalAddons` ids so we surface compatible add-ons. */
  suggestedAddonIds?: string[];
}

export type ReceivingMethod = "pickup" | "delivery";
export type DeliveryType = "outbound" | "return" | "roundtrip";

export interface ReservationCustomerDetails {
  fullName: string;
  phone: string;
  city: string;
  /** Required only when receivingMethod === "delivery" */
  address?: string;
  email?: string;
  /** Optional event start time, HH:MM */
  startTime?: string;
  notes?: string;
  /** Operational consent — contact me about this reservation via WhatsApp. */
  whatsappConsent: boolean;
  /** Marketing opt-in. Must be explicit/opt-in per IL law (§30A); never bundled. */
  marketingConsent: boolean;
  /** Required legal acceptance: terms + privacy policy together. */
  termsAccepted: boolean;
}

export interface ReservationState {
  items: ReservationItem[];
  /** Selected event date, ISO yyyy-mm-dd. */
  date: string | null;
  receivingMethod: ReceivingMethod | null;
  /** Only meaningful when receivingMethod === "delivery" */
  deliveryType: DeliveryType | null;
  customer: ReservationCustomerDetails;
  /** True once the request has been submitted/handed to WhatsApp. */
  submitted: boolean;
}

export const DEFAULT_CUSTOMER: ReservationCustomerDetails = {
  fullName: "",
  phone: "",
  city: "",
  address: "",
  email: "",
  startTime: "",
  notes: "",
  whatsappConsent: true,
  marketingConsent: false,
  termsAccepted: false
};
