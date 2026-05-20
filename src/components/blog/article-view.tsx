"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Info,
  Lightbulb,
  MapPin,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useArticleStore } from "@/store/article-store";
import { getPackageBySlug } from "@/lib/packages/data";
import {
  articleCategories,
  articleCategoryLabel
} from "@/lib/articles/categories";
import type { Article } from "@/lib/articles/types";
import { ArticleCard } from "./article-card";
import {
  ArticleSchema,
  BreadcrumbSchema
} from "@/components/seo/article-schema";
import { FAQSchema } from "@/components/seo/schema";
import { cn, formatILS } from "@/lib/utils";
import { pickLocalized } from "@/lib/i18n/hooks";

export function ArticleView({ initial }: { initial: Article }) {
  const stored = useArticleStore((s) =>
    s.articles.find((a) => a.id === initial.id)
  );
  const hydrated = useArticleStore((s) => s.hydrated);
  const allArticles = useArticleStore((s) => s.articles);
  const [article, setArticle] = useState<Article>(initial);

  useEffect(() => {
    if (hydrated && stored) setArticle(stored);
  }, [hydrated, stored]);

  const related = (article.relatedArticles ?? [])
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter((a): a is Article => !!a && a.isPublished)
    .slice(0, 3);

  const relatedPackages = (article.relatedPackages ?? [])
    .map((slug) => getPackageBySlug(slug))
    .filter((p): p is NonNullable<ReturnType<typeof getPackageBySlug>> => !!p);

  const toc = article.body.map((s) => s.heading);
  const categoryLabel = articleCategoryLabel(article.category);

  return (
    <>
      <ArticleSchema article={article} />
      <FAQSchema faqs={article.faq.map((f) => ({ q: f.q, a: f.a }))} />
      <BreadcrumbSchema
        items={[
          { label: "בית", url: "/" },
          { label: "מדריכים", url: "/blog" },
          { label: article.title, url: `/blog/${article.slug}` }
        ]}
      />

      <article className="bg-cream-50/40">
        <header className="container-page pt-10 md:pt-14">
          <nav
            className="text-sm text-ink-400 mb-5 flex flex-wrap items-center gap-2"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-ink-700">
              בית
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-ink-700">
              מדריכים
            </Link>
            <span>/</span>
            <span className="text-ink-600 truncate max-w-[200px] md:max-w-none">
              {article.title}
            </span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="pill bg-white text-xs">{categoryLabel}</span>
                {article.tags.slice(0, 3).map((t) => (
                  <span key={t} className="pill bg-cream-100 text-xs">
                    #{t}
                  </span>
                ))}
              </div>
              <h1 className="heading-1 text-balance">{article.title}</h1>
              <p className="body-lead mt-4">{article.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readingTimeMinutes} דקות
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  עודכן {article.updatedAt}
                </span>
                {article.city && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {article.city}
                  </span>
                )}
                <span>· {article.author}</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card ring-1 ring-ink-100">
              <Image
                src={article.coverImage}
                alt={article.coverImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <div className="container-page py-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6 max-w-2xl">
            {toc.length > 2 && <TableOfContents toc={toc} />}

            {article.body.map((section, i) => (
              <Section key={section.heading + i} section={section} index={i} />
            ))}

            {article.checklist && (
              <ChecklistBlock checklist={article.checklist} />
            )}

            <CtaBlock article={article} />

            {relatedPackages.length > 0 && (
              <div className="card-surface p-6">
                <h2 className="heading-3 mb-3">חבילות שיכולות להתאים לכם</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {relatedPackages.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/packages`}
                        className="flex items-center justify-between gap-2 rounded-2xl bg-cream-50 ring-1 ring-ink-100 p-3 hover:bg-cream-100"
                      >
                        <div>
                          <p className="font-semibold text-ink-800">
                            {pickLocalized(p.title, "he")}
                          </p>
                          <p className="text-xs text-ink-500">
                            {pickLocalized(p.subtitle, "he")}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-brand-600 whitespace-nowrap">
                          {p.priceFrom > 0
                            ? formatILS(p.priceFrom).replace("‏", "")
                            : "התאמה אישית"}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <FAQBlock items={article.faq} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <SidebarCTA article={article} />
            <SidebarKeywords article={article} />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="container-page pb-20">
            <h2 className="heading-2 mb-6">מדריכים נוספים</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((r, i) => (
                <ArticleCard key={r.id} article={r} index={i} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

function TableOfContents({ toc }: { toc: string[] }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="card-surface p-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-right"
        aria-expanded={open}
      >
        <span className="font-display font-bold text-ink-800">בעמוד הזה</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-ink-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ol
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-3 space-y-1.5 text-sm text-ink-600 list-decimal pe-5"
          >
            {toc.map((h) => (
              <li key={h}>
                <a
                  href={`#${slugifyAnchor(h)}`}
                  className="hover:text-brand-600"
                >
                  {h}
                </a>
              </li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({
  section,
  index
}: {
  section: Article["body"][number];
  index: number;
}) {
  const id = slugifyAnchor(section.heading);
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="heading-3 mb-3">
        <span className="text-brand-500 me-2">{String(index + 1).padStart(2, "0")}</span>
        {section.heading}
      </h2>
      <div className="space-y-3 text-ink-700 leading-relaxed">
        {section.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {section.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-ink-700">
              <Check className="h-4 w-4 text-mint-500 mt-1 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {section.callout && <Callout callout={section.callout} />}
    </section>
  );
}

function Callout({
  callout
}: {
  callout: NonNullable<Article["body"][number]["callout"]>;
}) {
  const styles = {
    tip: {
      bg: "bg-mint-50 ring-mint-100",
      icon: <Lightbulb className="h-4 w-4 text-mint-600" />
    },
    warning: {
      bg: "bg-brand-50 ring-brand-100",
      icon: <AlertTriangle className="h-4 w-4 text-brand-600" />
    },
    info: {
      bg: "bg-sky-50 ring-sky-100",
      icon: <Info className="h-4 w-4 text-sky-600" />
    }
  } as const;
  const s = styles[callout.type];
  return (
    <div className={cn("mt-4 rounded-2xl ring-1 p-4", s.bg)}>
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5">{s.icon}</span>
        <div>
          {callout.title && (
            <p className="font-semibold text-ink-800">{callout.title}</p>
          )}
          <p className="text-sm text-ink-700 mt-0.5">{callout.text}</p>
        </div>
      </div>
    </div>
  );
}

function ChecklistBlock({
  checklist
}: {
  checklist: NonNullable<Article["checklist"]>;
}) {
  return (
    <div className="rounded-3xl bg-ink-800 text-cream-50 p-6 md:p-8">
      <h2 className="font-display font-extrabold text-xl md:text-2xl text-white mb-3">
        ✅ {checklist.title}
      </h2>
      <ul className="space-y-2.5">
        {checklist.items.map((i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-cream-100/90"
          >
            <Check className="h-4 w-4 text-mint-300 mt-1 shrink-0" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CtaBlock({ article }: { article: Article }) {
  const isExternal = article.cta.buttonUrl.startsWith("http");
  return (
    <div className="card-surface bg-gradient-to-br from-brand-50 to-sun-50 p-6 md:p-7">
      <h2 className="font-display font-extrabold text-xl text-ink-800">
        {article.cta.title}
      </h2>
      <p className="text-ink-600 mt-1">{article.cta.description}</p>
      <a
        href={article.cta.buttonUrl}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={cn(
          "mt-4 inline-flex",
          article.cta.variant === "packages" ? "btn-brand" : "btn-whatsapp"
        )}
      >
        {article.cta.variant !== "packages" && (
          <MessageCircle className="h-4 w-4" />
        )}
        {article.cta.buttonLabel}
      </a>
    </div>
  );
}

function SidebarCTA({ article }: { article: Article }) {
  const isExternal = article.cta.buttonUrl.startsWith("http");
  return (
    <div className="card-surface p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
        מוזמנים לדבר איתנו
      </p>
      <h3 className="font-display font-extrabold text-ink-800 mt-2">
        {article.cta.title}
      </h3>
      <p className="text-sm text-ink-500 mt-1">{article.cta.description}</p>
      <a
        href={article.cta.buttonUrl}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={cn(
          "mt-4 w-full",
          article.cta.variant === "packages" ? "btn-brand" : "btn-whatsapp"
        )}
      >
        {article.cta.variant !== "packages" && (
          <MessageCircle className="h-4 w-4" />
        )}
        {article.cta.buttonLabel}
      </a>
    </div>
  );
}

function SidebarKeywords({ article }: { article: Article }) {
  if (article.secondaryKeywords.length === 0) return null;
  return (
    <div className="card-surface p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-ink-400 mb-2">
        מילים שמובילות לכאן
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {[article.targetKeyword, ...article.secondaryKeywords].map((k) => (
          <li key={k}>
            <span className="pill bg-cream-100 text-xs">{k}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQBlock({ items }: { items: Article["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <h2 className="heading-2 mb-4">שאלות שהורים שואלים אותנו</h2>
      <div className="grid gap-3">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={cn(
                "card-surface overflow-hidden",
                isOpen && "ring-brand-200"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-5 text-right"
              >
                <span className="font-semibold text-ink-800">{f.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-ink-400 transition-transform",
                    isOpen && "rotate-180 text-brand-500"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-ink-600 leading-relaxed">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function slugifyAnchor(heading: string) {
  return heading
    .replace(/[^֐-׿\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Allow importing the category list elsewhere */
export const blogCategoriesList = articleCategories;
