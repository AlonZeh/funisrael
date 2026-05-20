import type { Metadata } from "next";
import { LocalizedHome } from "@/components/home/localized-home";

export const metadata: Metadata = {
  title: "FUN-ISRAEL — Premium Inflatable Rentals",
  description:
    "Premium inflatable rentals for families across Israel. 12-hour rentals, self-pickup from Derech Yavne 52, WhatsApp booking.",
  alternates: { canonical: "/en", languages: { he: "/", en: "/en", ru: "/ru" } }
};

export default function HomePageEn() {
  return <LocalizedHome />;
}
