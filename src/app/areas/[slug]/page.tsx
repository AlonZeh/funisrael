import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Truck
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { OrganizationSchema } from "@/components/seo/schema";
import { BreadcrumbSchema } from "@/components/seo/article-schema";
import { getArea, serviceAreas } from "@/lib/areas";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/utils";
import { areaContent } from "@/lib/areas-content";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return serviceAreas
    .filter((a) => a.pageReady)
    .map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const area = getArea(params.slug);
  if (!area) return { title: "אזור שירות" };
  return {
    title: `${area.keyword} | FUN-ISRAEL`,
    description: `${area.keyword} — חבילות יום הולדת, מתנפחי מים, פרימיום ופעוטות. השכרה ל-12 שעות, איסוף עצמי קרוב.`,
    keywords: [area.keyword, `מתנפחים ב${area.name}`, `יום הולדת ${area.name}`],
    alternates: { canonical: `/areas/${area.slug}` }
  };
}

export default function AreaPage({ params }: Params) {
  const area = getArea(params.slug);
  if (!area || !area.pageReady) return notFound();

  const content = areaContent[area.slug];
  if (!content) return notFound();

  const waMessage = `היי, אשמח להמלצה למתנפח באזור ${area.name} 🎈`;

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { label: "בית", url: "/" },
          { label: "אזורי שירות", url: "/areas" },
          { label: area.name, url: `/areas/${area.slug}` }
        ]}
      />
      <PageHeader
        eyebrow={`אזור שירות · ${area.name}`}
        title={`השכרת מתנפחים ב${area.name} — חבילות פרימיום של FUN-ISRAEL`}
        description={content.intro}
      />

      <section className="container-page pb-6">
        <div className="card-surface p-5 grid sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 grid place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-ink-400">נקודת איסוף</p>
              <p className="font-display font-bold text-ink-800">
                {siteConfig.pickupAddress}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 grid place-items-center rounded-2xl bg-mint-50 text-mint-600">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-ink-400">זמן נסיעה משוער</p>
              <p className="font-display font-bold text-ink-800">
                {area.driveMinutes === 0
                  ? "מקומי"
                  : `כ-${area.driveMinutes} דק׳`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 grid place-items-center rounded-2xl bg-sun-50 text-sun-700">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-ink-400">מודל השכרה</p>
              <p className="font-display font-bold text-ink-800">
                12 שעות · איסוף עצמי
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 max-w-2xl">
          {content.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="heading-3 mb-2">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-ink-700 leading-relaxed mb-2 last:mb-0"
                >
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-ink-700"
                    >
                      <Check className="h-4 w-4 text-mint-500 mt-1 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="card-surface bg-gradient-to-br from-brand-50 to-sun-50 p-6">
            <h2 className="font-display font-extrabold text-xl text-ink-800">
              רוצים המלצת חבילה ל-{area.name}?
            </h2>
            <p className="text-ink-600 mt-1">
              שלחו לנו גילאי ילדים, גודל מקום ותאריך — נחזיר המלצה תוך דקות.
            </p>
            <a
              href={buildWhatsAppLink(siteConfig.whatsapp, waMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp mt-4"
            >
              <MessageCircle className="h-4 w-4" />
              {waMessage}
            </a>
          </div>

          <div>
            <h2 className="heading-3 mb-3">מדריכים שיכולים לעזור</h2>
            <ul className="grid gap-2">
              {content.relatedArticles.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/blog/${slug}`}
                    className="flex items-center justify-between gap-2 rounded-2xl bg-white ring-1 ring-ink-100 p-4 hover:bg-cream-50"
                  >
                    <span className="font-medium text-ink-700">
                      {humanizeSlug(slug)}
                    </span>
                    <ArrowLeft className="h-4 w-4 text-brand-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <div className="card-surface p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">
              חבילות שמתאימות לאזור
            </p>
            <ul className="space-y-2">
              {content.recommendedPackages.map((slug) => (
                <li key={slug}>
                  <Link
                    href="/packages"
                    className="flex items-center justify-between gap-2 rounded-2xl bg-cream-50 ring-1 ring-ink-100 p-3 hover:bg-cream-100"
                  >
                    <span className="font-semibold text-ink-800">
                      {humanizePackageSlug(slug)}
                    </span>
                    <ArrowLeft className="h-4 w-4 text-ink-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-ink-800 text-cream-50 p-5">
            <p className="font-display font-bold text-white">{area.name}</p>
            <p className="text-sm text-cream-200/85 mt-1">
              נקודת איסוף בדרך יבנה 52, רחובות. אנחנו זמינים בוואטסאפ ב-
              {siteConfig.phone}.
            </p>
            <a
              href={buildWhatsAppLink(siteConfig.whatsapp, waMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp w-full mt-3"
            >
              <MessageCircle className="h-4 w-4" />
              בדיקת זמינות
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}

function humanizeSlug(slug: string) {
  const titles: Record<string, string> = {
    "hashkarat-mitnapchim-rehovot-birthday-guide":
      "השכרת מתנפחים ברחובות — מדריך מלא",
    "choose-inflatable-by-age": "איך לבחור מתנפח לפי גיל הילדים",
    "water-inflatables-summer-rehovot": "מתנפחי מים לקיץ ברחובות",
    "kids-birthday-package-rehovot": "חבילת יום הולדת לילדים ברחובות",
    "yard-birthday-inflatable-checklist": "צ׳קליסט מתנפח בחצר",
    "inflatable-rental-prices-birthday": "כמה עולה להשכיר מתנפח",
    "home-birthday-ideas-kids": "רעיונות ליום הולדת בבית"
  };
  return titles[slug] ?? slug;
}

function humanizePackageSlug(slug: string) {
  const titles: Record<string, string> = {
    "mini-party": "חבילת Mini Party",
    "water-splash": "חבילת Water Splash",
    "double-splash": "חבילת Double Splash",
    "sports-arena": "חבילת Sports Arena",
    "mega-party": "חבילת Mega Party",
    "instagram-wow": "חבילת Instagram WOW",
    festival: "חבילת Festival"
  };
  return titles[slug] ?? slug;
}
