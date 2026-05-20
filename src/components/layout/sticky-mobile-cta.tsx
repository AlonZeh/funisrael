"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function StickyMobileCTA() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/reserve") ||
    pathname === "/cart"
  ) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-3 pt-2 pointer-events-none">
      <div className="pointer-events-auto rounded-3xl bg-white shadow-card ring-1 ring-ink-100 grid grid-cols-2 gap-2 p-2">
        <a
          href={buildWhatsAppLink(
            siteConfig.whatsapp,
            "היי, אשמח לפרטים על השכרת מתנפח 🎈"
          )}
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp w-full"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link href="/cart" className="btn-brand w-full">
          <ShoppingBag className="h-4 w-4" />
          עגלת שיריון
        </Link>
      </div>
    </div>
  );
}
