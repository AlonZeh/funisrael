import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone, Instagram, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "צרו קשר עם FUN-ISRAEL — בוואטסאפ, בטלפון או דרך הטופס.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="צור קשר"
        title="כאן בשבילכם — לפני, במהלך ואחרי האירוע."
        description="הדרך הכי מהירה לאישור: וואטסאפ. בכל אופן — בחרו מה הכי נוח."
      />
      <section className="container-page pb-20 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <ContactForm />
        <aside className="space-y-4">
          <ContactItem
            icon={<MessageCircle className="h-5 w-5" />}
            title="WhatsApp"
            description="זמן תגובה ממוצע: 7 דקות"
            href={buildWhatsAppLink(
              siteConfig.whatsapp,
              "היי FUN-ISRAEL, שאלה קצרה 🎈"
            )}
            cta="לשליחת הודעה"
            tone="brand"
          />
          <ContactItem
            icon={<Phone className="h-5 w-5" />}
            title="טלפון"
            description={siteConfig.phone}
            href={`tel:${siteConfig.phone}`}
            cta="חיוג"
          />
          <ContactItem
            icon={<MapPin className="h-5 w-5" />}
            title="כתובת לאיסוף"
            description={siteConfig.pickupAddress}
          />
          <ContactItem
            icon={<Clock className="h-5 w-5" />}
            title="שעות פעילות"
            description="ראשון–חמישי 09:00–20:00 · שישי עד הצהריים"
          />
          <ContactItem
            icon={<Instagram className="h-5 w-5" />}
            title="Instagram"
            description="להצצה במתנפחים והשראה"
            href={siteConfig.social.instagram}
            cta="לעקוב"
          />
        </aside>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  title,
  description,
  href,
  cta,
  tone = "ink"
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  cta?: string;
  tone?: "ink" | "brand";
}) {
  return (
    <div className="card-surface p-5 flex items-start gap-4">
      <span
        className={`h-11 w-11 grid place-items-center rounded-2xl ${
          tone === "brand" ? "bg-whatsapp/10 text-whatsapp" : "bg-cream-100 text-ink-700"
        }`}
      >
        {icon}
      </span>
      <div className="flex-1">
        <p className="font-display font-bold text-ink-800">{title}</p>
        <p className="text-sm text-ink-500 mt-0.5">{description}</p>
      </div>
      {href && cta && (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="text-sm font-semibold text-brand-600 hover:text-brand-700 shrink-0"
        >
          {cta}
        </a>
      )}
    </div>
  );
}
