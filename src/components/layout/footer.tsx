import Link from "next/link";
import { Instagram, MessageCircle, MapPin, Phone, Shield } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { footerLinks, siteConfig } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink-800 text-cream-100">
      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-cream-200/80 max-w-sm leading-relaxed">
              FUN-ISRAEL — מתנפחים יוקרתיים למשפחות המודרניות של ישראל.
              השכרה ל-12 שעות, איסוף עצמי, סטנדרט בטיחות וניקיון ללא פשרות.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={buildWhatsAppLink(siteConfig.whatsapp, "היי, אשמח לפרטים על השכרת מתנפח 🎈")}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-ink-800"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>

          <FooterCol title="קטלוג" links={footerLinks.shop} />
          <FooterCol title="מידע" links={footerLinks.info} />
          <FooterCol title="משפטי" links={footerLinks.legal} />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 text-sm text-cream-200/80">
          <InfoItem icon={<MapPin className="h-4 w-4" />}>
            איסוף: {siteConfig.pickupAddress}
          </InfoItem>
          <InfoItem icon={<Phone className="h-4 w-4" />}>
            <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
              {siteConfig.phone}
            </a>
          </InfoItem>
          <InfoItem icon={<Shield className="h-4 w-4" />}>
            סטנדרט בטיחות אירופאי · ניקיון מקיף בין השכרות
          </InfoItem>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs text-cream-200/60">
          <p>© {new Date().getFullYear()} FUN-ISRAEL. כל הזכויות שמורות.</p>
          <p>אתר זה לא משמש לרכישה — להזמנת מתנפח השאירו פרטים או לחצו על וואטסאפ.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-display font-bold text-white mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-cream-200/80 hover:text-white transition"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoItem({
  icon,
  children
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/5">
      <span className="text-brand-300 mt-0.5">{icon}</span>
      <span>{children}</span>
    </div>
  );
}
