import { formatDateHe, formatILS } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { ReservationState } from "./types";

const METHOD_LABEL = {
  pickup: "איסוף עצמי",
  delivery: "הובלה"
} as const;

const DELIVERY_TYPE_LABEL = {
  outbound: "הלוך בלבד",
  return: "חזור בלבד",
  roundtrip: "הלוך וחזור"
} as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildReservationEmailSubject(state: ReservationState): string {
  const name = state.customer.fullName?.trim() || "לקוח חדש";
  const date = state.date ? formatDateHe(state.date) : "תאריך לא נבחר";
  return `🎈 בקשת שיריון חדשה — ${name} — ${date}`;
}

/**
 * Plain-text version for email clients that don't render HTML or
 * for "preheader" indexing. Mirrors the WhatsApp message.
 */
export function buildReservationEmailText(state: ReservationState): string {
  const { customer, items, date, receivingMethod, deliveryType } = state;
  const lines: string[] = [];
  lines.push("בקשת שיריון חדשה ב-FUN-ISRAEL");
  lines.push("");

  if (date) lines.push(`📅 תאריך: ${formatDateHe(date)}`);
  if (customer.startTime) lines.push(`⏰ שעת התחלה: ${customer.startTime}`);

  if (items.length) {
    lines.push("");
    lines.push("🎈 מוצרים:");
    for (const item of items) {
      const qty = item.quantity > 1 ? ` × ${item.quantity}` : "";
      const price = item.priceLabel ? ` — ${item.priceLabel}` : "";
      lines.push(`• ${item.name}${qty}${price}`);
    }
  }

  if (receivingMethod) {
    lines.push("");
    lines.push(`📦 אופן קבלה: ${METHOD_LABEL[receivingMethod]}`);
    if (receivingMethod === "delivery" && deliveryType) {
      lines.push(`🚚 סוג הובלה: ${DELIVERY_TYPE_LABEL[deliveryType]}`);
    }
  }

  lines.push("");
  lines.push(`👤 שם: ${customer.fullName}`);
  lines.push(`📞 טלפון: ${customer.phone}`);
  lines.push(`🏠 עיר: ${customer.city}`);
  if (customer.address) lines.push(`🗺️ כתובת/אזור: ${customer.address}`);
  if (customer.email) lines.push(`✉️ דוא"ל: ${customer.email}`);

  const total = items.reduce(
    (s, i) => s + (i.unitPrice > 0 ? i.unitPrice * i.quantity : 0),
    0
  );
  if (total > 0) {
    lines.push("");
    lines.push(`💰 הערכת עלות: ${formatILS(total)} (לא סופי)`);
  }

  if (customer.notes) {
    lines.push("");
    lines.push(`📝 הערות: ${customer.notes}`);
  }

  lines.push("");
  lines.push(
    customer.marketingConsent
      ? "📨 אישר/ה קבלת חומר שיווקי"
      : "📭 לא אישר/ה קבלת חומר שיווקי"
  );
  lines.push(
    customer.whatsappConsent
      ? "✅ אישר/ה ליצור קשר בוואטסאפ"
      : "⚠️ לא אישר/ה ליצור קשר בוואטסאפ"
  );

  lines.push("");
  lines.push("--");
  lines.push(`נשלח אוטומטית מ-${siteConfig.url}`);
  lines.push("ההזמנה אינה סופית — צריך לחזור ללקוח עם זמינות.");

  return lines.join("\n");
}

/**
 * HTML version — responsive, RTL, table-based (works in Gmail).
 */
export function buildReservationEmailHtml(state: ReservationState): string {
  const { customer, items, date, receivingMethod, deliveryType } = state;
  const total = items.reduce(
    (s, i) => s + (i.unitPrice > 0 ? i.unitPrice * i.quantity : 0),
    0
  );

  const itemRows = items
    .map(
      (i) => `
        <tr>
          <td style="padding:10px 8px;border-bottom:1px solid #EAECEF;color:#2E3543;">
            ${escapeHtml(i.name)}${i.quantity > 1 ? ` × ${i.quantity}` : ""}
            <div style="font-size:11px;color:#6E7889;margin-top:2px;">
              ${escapeHtml(
                i.kind === "package"
                  ? "חבילה"
                  : i.kind === "addon"
                    ? "תוספת"
                    : "מתנפח"
              )}
            </div>
          </td>
          <td style="padding:10px 8px;border-bottom:1px solid #EAECEF;color:#1C2230;font-weight:700;text-align:left;white-space:nowrap;">
            ${escapeHtml(i.priceLabel)}
          </td>
        </tr>`
    )
    .join("");

  const totalRow =
    total > 0
      ? `<tr>
          <td style="padding:14px 8px 0;color:#6E7889;">סה"כ מוערך:</td>
          <td style="padding:14px 8px 0;text-align:left;font-weight:800;font-size:18px;color:#1C2230;white-space:nowrap;">${escapeHtml(formatILS(total))}</td>
        </tr>`
      : "";

  function row(label: string, value: string | null | undefined) {
    if (!value) return "";
    return `<tr>
      <td style="padding:8px 0;color:#6E7889;font-size:13px;width:130px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;color:#1C2230;font-weight:600;">${escapeHtml(value)}</td>
    </tr>`;
  }

  const receivingValue = receivingMethod
    ? receivingMethod === "delivery" && deliveryType
      ? `${METHOD_LABEL[receivingMethod]} · ${DELIVERY_TYPE_LABEL[deliveryType]}`
      : METHOD_LABEL[receivingMethod]
    : null;

  const marketingBadge = customer.marketingConsent
    ? `<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#D6F4E2;color:#16633C;font-size:12px;font-weight:700;">📨 אישר/ה חומר שיווקי</span>`
    : `<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#FAF6EC;color:#6E7889;font-size:12px;font-weight:700;">📭 ללא חומר שיווקי</span>`;

  const whatsappBadge = customer.whatsappConsent
    ? `<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#D6F4E2;color:#16633C;font-size:12px;font-weight:700;margin-inline-end:4px;">✅ WhatsApp OK</span>`
    : `<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:#FFE3D9;color:#86230B;font-size:12px;font-weight:700;margin-inline-end:4px;">⚠️ ללא WhatsApp</span>`;

  const headerName = customer.fullName?.trim() || "לקוח חדש";
  const headerDate = date ? formatDateHe(date) : "תאריך לא נבחר";

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>בקשת שיריון חדשה — FUN-ISRAEL</title>
</head>
<body style="margin:0;padding:0;background:#FDFBF6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;direction:rtl;text-align:right;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDFBF6;padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:20px;border:1px solid #EAECEF;overflow:hidden;" cellpadding="0" cellspacing="0">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#FF5E33 0%,#FFBE1F 100%);padding:24px;color:#ffffff;">
              <div style="font-size:13px;font-weight:700;letter-spacing:0.1em;opacity:0.9;">🎈 בקשת שיריון חדשה</div>
              <div style="font-size:22px;font-weight:900;margin-top:6px;line-height:1.2;">${escapeHtml(headerName)}</div>
              <div style="font-size:14px;margin-top:4px;opacity:0.9;">${escapeHtml(headerDate)}</div>
            </td>
          </tr>

          <!-- Items -->
          ${
            items.length
              ? `<tr>
                  <td style="padding:20px 24px 4px;">
                    <div style="font-size:11px;font-weight:800;letter-spacing:0.1em;color:#FF5E33;margin-bottom:6px;">מוצרים בעגלת השיריון</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${itemRows}
                      ${totalRow}
                    </table>
                  </td>
                </tr>`
              : ""
          }

          <!-- Customer details -->
          <tr>
            <td style="padding:20px 24px;">
              <div style="font-size:11px;font-weight:800;letter-spacing:0.1em;color:#FF5E33;margin-bottom:6px;">פרטי הלקוח</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("טלפון", customer.phone)}
                ${row("עיר", customer.city)}
                ${row("כתובת/אזור", customer.address)}
                ${row("דוא״ל", customer.email)}
                ${row("שעת התחלה", customer.startTime)}
                ${row("אופן קבלה", receivingValue)}
              </table>
            </td>
          </tr>

          ${
            customer.notes
              ? `<tr>
                  <td style="padding:0 24px 16px;">
                    <div style="font-size:11px;font-weight:800;letter-spacing:0.1em;color:#FF5E33;margin-bottom:6px;">הערות</div>
                    <div style="background:#FAF6EC;border-radius:12px;padding:12px 14px;color:#2E3543;font-size:14px;line-height:1.5;white-space:pre-wrap;">${escapeHtml(
                      customer.notes
                    )}</div>
                  </td>
                </tr>`
              : ""
          }

          <!-- Consent badges -->
          <tr>
            <td style="padding:0 24px 20px;">
              <div style="font-size:11px;font-weight:800;letter-spacing:0.1em;color:#FF5E33;margin-bottom:8px;">הסכמות</div>
              <div>${whatsappBadge}${marketingBadge}</div>
            </td>
          </tr>

          <!-- Quick actions -->
          <tr>
            <td style="padding:0 24px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-inline-end:8px;">
                    <a href="https://wa.me/${escapeHtml(
                      customer.phone.replace(/\D/g, "")
                    )}" style="display:inline-block;width:100%;text-align:center;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:14px;">פתח וואטסאפ עם הלקוח</a>
                  </td>
                  <td>
                    <a href="tel:${escapeHtml(
                      customer.phone
                    )}" style="display:inline-block;width:100%;text-align:center;background:#1C2230;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:14px;">חיוג ישיר</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAF6EC;padding:14px 24px;color:#6E7889;font-size:12px;line-height:1.6;">
              נשלח אוטומטית מ-<a href="${escapeHtml(siteConfig.url)}" style="color:#FF5E33;text-decoration:none;">${escapeHtml(siteConfig.url)}</a> כאשר הלקוח לחץ "שליחת בקשת שיריון".<br>
              ההזמנה אינה סופית — יש לחזור ללקוח עם בדיקת זמינות.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
