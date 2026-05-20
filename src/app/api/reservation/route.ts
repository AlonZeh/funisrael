import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildReservationEmailHtml,
  buildReservationEmailSubject,
  buildReservationEmailText
} from "@/lib/reservation/email";
import type { ReservationState } from "@/lib/reservation/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_TO = "zehavialon4@gmail.com";
const DEFAULT_FROM = "FUN-ISRAEL <onboarding@resend.dev>";

/**
 * POST /api/reservation
 *
 * Receives the full reservation state from the client, validates the
 * minimum required fields, and emails the business using Resend.
 *
 * Behavior:
 *  - Always returns 200 with `{ ok: true, notified: boolean }` on success.
 *  - Returns 400 on invalid payload.
 *  - Returns 502 if Resend itself rejected the send (e.g. invalid sender domain).
 *  - If `RESEND_API_KEY` is missing, returns 200 + notified:false so the form
 *    still works (graceful degradation — WhatsApp handoff remains the safety net).
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const state = payload as Partial<ReservationState>;
  const c = state?.customer;

  // Minimum required for a meaningful notification
  if (
    !c ||
    typeof c.fullName !== "string" ||
    typeof c.phone !== "string" ||
    !c.fullName.trim() ||
    !/^[0-9\-+\s]{8,}$/.test(c.phone.trim())
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid customer details" },
      { status: 400 }
    );
  }

  if (!c.termsAccepted) {
    return NextResponse.json(
      { ok: false, error: "Terms not accepted" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATION_NOTIFICATION_EMAIL || DEFAULT_TO;
  const from = process.env.RESERVATION_FROM_EMAIL || DEFAULT_FROM;

  // Graceful no-op when not configured — keeps the form usable in dev/preview
  if (!apiKey) {
    console.warn(
      "[reservation] RESEND_API_KEY not set — reservation accepted but email not sent."
    );
    return NextResponse.json({ ok: true, notified: false });
  }

  try {
    const resend = new Resend(apiKey);

    // ReservationState is partial here for type-safety on the wire,
    // but validation above + the email helpers tolerate missing optional fields.
    const fullState = state as ReservationState;

    const result = await resend.emails.send({
      from,
      to: [to],
      subject: buildReservationEmailSubject(fullState),
      html: buildReservationEmailHtml(fullState),
      text: buildReservationEmailText(fullState),
      replyTo: c.email && c.email.trim() ? c.email.trim() : undefined
    });

    if (result.error) {
      console.error("[reservation] resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Email send failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, notified: true, id: result.data?.id });
  } catch (err) {
    console.error("[reservation] route error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}
