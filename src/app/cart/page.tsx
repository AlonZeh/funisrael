import type { Metadata } from "next";
import { ReservationCartView } from "@/components/reservation/reservation-cart-view";

export const metadata: Metadata = {
  title: "עגלת שיריון | FUN-ISRAEL",
  description:
    "עגלת השיריון שלכם — בחירת ציוד לאירוע, מוצרים נלווים והמשך לבדיקת זמינות.",
  robots: { index: false, follow: true }
};

export default function CartPage() {
  return <ReservationCartView />;
}
