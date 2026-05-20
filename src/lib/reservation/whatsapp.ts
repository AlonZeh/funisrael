import { formatDateHe, buildWhatsAppLink, formatILS } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { ReservationState } from "./types";

const RECEIVING_LABEL = {
  pickup: "איסוף עצמי",
  delivery: "הובלה"
} as const;

const DELIVERY_TYPE_LABEL = {
  outbound: "הלוך בלבד",
  return: "חזור בלבד",
  roundtrip: "הלוך וחזור"
} as const;

/**
 * Build the WhatsApp handoff message after a reservation request is submitted.
 *
 * Uses the canonical business number from `siteConfig.whatsapp`.
 */
export function buildReservationWhatsAppLink(state: ReservationState) {
  const lines: string[] = [];
  lines.push("שלום FUN-ISRAEL,");
  lines.push("אני רוצה לבדוק זמינות לשיריון ציוד.");
  lines.push("");

  if (state.date) {
    lines.push(`📅 תאריך: ${formatDateHe(state.date)}`);
  }
  if (state.customer.startTime) {
    lines.push(`⏰ שעת התחלה: ${state.customer.startTime}`);
  }

  if (state.items.length) {
    lines.push("");
    lines.push("🎈 מוצרים:");
    for (const item of state.items) {
      const qtyPart = item.quantity > 1 ? ` × ${item.quantity}` : "";
      const pricePart = item.priceLabel ? ` — ${item.priceLabel}` : "";
      lines.push(`• ${item.name}${qtyPart}${pricePart}`);
    }
  }

  if (state.receivingMethod) {
    lines.push("");
    lines.push(`📦 אופן קבלה: ${RECEIVING_LABEL[state.receivingMethod]}`);
    if (state.receivingMethod === "delivery" && state.deliveryType) {
      lines.push(`🚚 סוג הובלה: ${DELIVERY_TYPE_LABEL[state.deliveryType]}`);
    }
  }

  lines.push("");
  lines.push(`👤 שם: ${state.customer.fullName}`);
  lines.push(`📞 טלפון: ${state.customer.phone}`);
  lines.push(`🏠 עיר: ${state.customer.city}`);
  if (state.customer.address) {
    lines.push(`🗺️ כתובת/אזור: ${state.customer.address}`);
  }
  if (state.customer.email) {
    lines.push(`✉️ דוא"ל: ${state.customer.email}`);
  }

  const total = state.items.reduce(
    (s, i) => s + (i.unitPrice > 0 ? i.unitPrice * i.quantity : 0),
    0
  );
  if (total > 0) {
    lines.push("");
    lines.push(`💰 הערכת עלות: ${formatILS(total)} (אינדיקטיבי, לא סופי)`);
  }

  if (state.customer.notes) {
    lines.push("");
    lines.push(`📝 הערות: ${state.customer.notes}`);
  }

  lines.push("");
  lines.push(
    state.customer.marketingConsent
      ? "📨 אישרתי קבלת חומר שיווקי מ-FUN-ISRAEL."
      : "📭 לא אישרתי קבלת חומר שיווקי בשלב זה."
  );

  lines.push("");
  lines.push("ההזמנה אינה סופית — אשמח לאישור זמינות מולכם.");

  return buildWhatsAppLink(siteConfig.whatsapp, lines.join("\n"));
}
