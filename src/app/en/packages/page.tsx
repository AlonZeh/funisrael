import type { Metadata } from "next";
import { PackagesPageContent } from "@/components/packages/packages-page-content";

export const metadata: Metadata = {
  title: "Our Packages — Inflatable Rentals",
  description:
    "FUN-ISRAEL rental packages — birthdays, water, toddlers, premium, indoor, family combo and more. 12-hour rental, self-pickup from Derech Yavne 52.",
  alternates: {
    canonical: "/en/packages",
    languages: { he: "/packages", en: "/en/packages", ru: "/ru/packages" }
  }
};

export default function PackagesPageEn() {
  return <PackagesPageContent />;
}
