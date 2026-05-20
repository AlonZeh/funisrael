import type { Metadata } from "next";
import { AccessibilityStatementContent } from "@/components/a11y/accessibility-statement";

export const metadata: Metadata = {
  title: "Заявление о доступности",
  description:
    "Заявление о доступности FUN-ISRAEL — как мы делаем сайт удобным для каждого посетителя.",
  alternates: {
    canonical: "/ru/accessibility",
    languages: { he: "/accessibility", en: "/en/accessibility", ru: "/ru/accessibility" }
  }
};

export default function Page() {
  return <AccessibilityStatementContent />;
}
