"use client";

import { Check, Home, MessageCircle, X } from "lucide-react";
import { pickLocalized, useLocale, useTranslations } from "@/lib/i18n/hooks";
import { getActivePackages } from "@/lib/packages/data";
import { packageWhatsAppLink } from "@/lib/packages/whatsapp";

export function PackageComparison() {
  const locale = useLocale();
  const t = useTranslations();
  const list = getActivePackages();

  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <div className="max-w-2xl mb-8">
          <h2 className="heading-2">{t.packagesPage.comparisonTitle}</h2>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block card-surface overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream-100/60 text-ink-500">
              <tr>
                <th className="text-right px-4 py-3 font-medium">
                  {t.packagesPage.comparisonName}
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  {t.packagesPage.comparisonBestFor}
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  {t.packagesPage.comparisonIncludes}
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  {t.packagesPage.comparisonHome}
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  {t.packagesPage.comparisonPrice}
                </th>
                <th className="text-right px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {list.map((p) => (
                <tr key={p.id} className="align-top hover:bg-cream-50/60">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-ink-800">
                      {pickLocalized(p.title, locale)}
                    </p>
                    <p className="text-xs text-ink-500">
                      {t.packagesPage.ageBadge} {p.recommendedAges}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-ink-700 max-w-[220px]">
                    {pickLocalized(p.bestFor, locale)}
                  </td>
                  <td className="px-4 py-4 text-ink-600 max-w-[280px]">
                    <ul className="space-y-1">
                      {pickLocalized(p.includes, locale)
                        .slice(0, 3)
                        .map((i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="h-3.5 w-3.5 text-mint-500 mt-0.5 shrink-0" />
                            <span>{i}</span>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td className="px-4 py-4">
                    <FitsCell home={p.fits.home} yard={p.fits.yard} water={p.fits.water} />
                  </td>
                  <td className="px-4 py-4 font-semibold text-ink-800 whitespace-nowrap">
                    {pickLocalized(p.priceLabel, locale)}
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={packageWhatsAppLink(p, locale)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-whatsapp text-xs whitespace-nowrap"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / tablet: stacked cards */}
        <div className="lg:hidden grid gap-3">
          {list.map((p) => (
            <article
              key={p.id}
              className="card-surface p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display font-bold text-ink-800">
                    {pickLocalized(p.title, locale)}
                  </p>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {pickLocalized(p.bestFor, locale)}
                  </p>
                </div>
                <p className="font-display font-extrabold text-ink-800 text-sm whitespace-nowrap">
                  {pickLocalized(p.priceLabel, locale)}
                </p>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-ink-600">
                {pickLocalized(p.includes, locale)
                  .slice(0, 3)
                  .map((i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-mint-500 mt-0.5 shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between">
                <FitsCell home={p.fits.home} yard={p.fits.yard} water={p.fits.water} />
                <a
                  href={packageWhatsAppLink(p, locale)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp text-xs"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FitsCell({
  home,
  yard,
  water
}: {
  home: boolean;
  yard: boolean;
  water: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={home ? "text-mint-600" : "text-ink-300"} title="בית">
        🏠 {home ? <Check className="inline h-3 w-3" /> : <X className="inline h-3 w-3" />}
      </span>
      <span className={yard ? "text-mint-600" : "text-ink-300"} title="חצר">
        🌳 {yard ? <Check className="inline h-3 w-3" /> : <X className="inline h-3 w-3" />}
      </span>
      <span className={water ? "text-mint-600" : "text-ink-300"} title="מים">
        💦 {water ? <Check className="inline h-3 w-3" /> : <X className="inline h-3 w-3" />}
      </span>
    </div>
  );
}
