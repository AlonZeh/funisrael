"use client";

import { MessageCircle } from "lucide-react";
import { packageAddons } from "@/lib/packages/addons";
import { pickLocalized, useLocale, useTranslations } from "@/lib/i18n/hooks";
import { customPackageWhatsAppLink } from "@/lib/packages/whatsapp";

export function PackageAddonsSection() {
  const locale = useLocale();
  const t = useTranslations();
  const list = packageAddons.filter((a) => a.isActive);

  return (
    <section className="py-16 md:py-20 bg-white border-y border-ink-100">
      <div className="container-page">
        <div className="max-w-2xl space-y-3 mb-8">
          <h2 className="heading-2">{t.packagesPage.addonsTitle}</h2>
          <p className="body-lead">{t.packagesPage.addonsSubtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <div
              key={a.id}
              className="card-surface overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[5/3] bg-cream-100">
                {a.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.image}
                    alt={pickLocalized(a.name, locale)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span
                    className="absolute inset-0 grid place-items-center text-5xl"
                    aria-hidden
                  >
                    {a.icon ?? "✨"}
                  </span>
                )}
              </div>
              <div className="p-5 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display font-bold text-ink-800">
                    {pickLocalized(a.name, locale)}
                  </h3>
                  <span className="text-sm font-bold text-brand-600 whitespace-nowrap">
                    {pickLocalized(a.priceLabel, locale)}
                  </span>
                </div>
                <p className="text-sm text-ink-500 mt-1.5">
                  {pickLocalized(a.description, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-ink-800 text-cream-50 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-display font-bold text-lg md:text-xl text-white max-w-xl">
            {t.packagesPage.addonsCta}
          </p>
          <a
            href={customPackageWhatsAppLink(locale)}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
