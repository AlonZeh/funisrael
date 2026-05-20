import type { Metadata } from "next";
import { LocalizedHome } from "@/components/home/localized-home";

export const metadata: Metadata = {
  title: "FUN-ISRAEL — Премиум аренда батутов",
  description:
    "Премиум аренда батутов для семей по всему Израилю. Аренда 12 часов, самовывоз с Дерех Явне 52, бронирование в WhatsApp.",
  alternates: { canonical: "/ru", languages: { he: "/", en: "/en", ru: "/ru" } }
};

export default function HomePageRu() {
  return <LocalizedHome />;
}
