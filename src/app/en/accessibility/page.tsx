import type { Metadata } from "next";
import { AccessibilityStatementContent } from "@/components/a11y/accessibility-statement";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "FUN-ISRAEL accessibility statement — how we keep the site usable for every visitor.",
  alternates: {
    canonical: "/en/accessibility",
    languages: { he: "/accessibility", en: "/en/accessibility", ru: "/ru/accessibility" }
  }
};

export default function Page() {
  return <AccessibilityStatementContent />;
}
