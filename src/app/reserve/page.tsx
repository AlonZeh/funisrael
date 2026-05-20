import type { Metadata } from "next";
import { ReservationFlow } from "@/components/reservation/reservation-flow";

export const metadata: Metadata = {
  title: "שיריון ציוד | FUN-ISRAEL",
  description:
    "בקשת שיריון לציוד מ-FUN-ISRAEL — בחירת איסוף/הובלה, תאריך, מוצרים נלווים ושליחת בקשה לבדיקת זמינות. ללא תשלום באתר.",
  robots: { index: false, follow: true }
};

export default function ReservePage() {
  return <ReservationFlow />;
}
