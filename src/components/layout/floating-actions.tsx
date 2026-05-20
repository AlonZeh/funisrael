"use client";

import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { usePathname } from "next/navigation";

export function FloatingActions() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-24 md:bottom-6 left-4 z-40 flex flex-col gap-3">
      <motion.a
        href={buildWhatsAppLink(
          siteConfig.whatsapp,
          "היי, אשמח לפרטים על השכרת מתנפח 🎈"
        )}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 18 }}
        aria-label="שלחו לנו בוואטסאפ"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-card hover:shadow-hover"
      >
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-30" />
        <MessageCircle className="h-6 w-6 relative" />
      </motion.a>
      <motion.a
        href={`tel:${siteConfig.phone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
        aria-label="התקשרו אלינו"
        className="hidden sm:grid h-14 w-14 place-items-center rounded-full bg-ink-800 text-white shadow-card hover:bg-ink-700"
      >
        <Phone className="h-6 w-6" />
      </motion.a>
    </div>
  );
}
