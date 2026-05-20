import type { Metadata } from "next";
import { PackagesPageContent } from "@/components/packages/packages-page-content";

export const metadata: Metadata = {
  title: "Наши пакеты — аренда батутов",
  description:
    "Пакеты аренды FUN-ISRAEL — дни рождения, водные, для малышей, премиум, домашние, семейный комбо. Аренда 12 часов, самовывоз с Дерех Явне 52.",
  alternates: {
    canonical: "/ru/packages",
    languages: { he: "/packages", en: "/en/packages", ru: "/ru/packages" }
  }
};

export default function PackagesPageRu() {
  return <PackagesPageContent />;
}
