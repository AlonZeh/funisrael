"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ChevronDown,
  Droplet,
  Eye,
  Gavel,
  Home,
  MessageCircle,
  PackageCheck,
  Phone,
  Scroll,
  Truck,
  Users,
  Zap
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import {
  beforePickupChecklist,
  beforeReturnChecklist,
  termsContact,
  termsFaqs,
  termsSections,
  type TermsSection
} from "@/lib/terms-content";
import { cn } from "@/lib/utils";

const COMMUNITY_PRIMARY =
  "https://chat.whatsapp.com/JhjRrNzPjss6mMmUOnrwkY?mode=gi_t";
const COMMUNITY_SECONDARY =
  "https://chat.whatsapp.com/IcpKfgbliUDAHrVNMNaGSS";

const summaryCards = [
  {
    icon: Home,
    title: "פרטי-ביתי בלבד",
    description: 'הציוד מסווג ת"י 562 ומיועד לחצרות פרטיות בלבד. אסור בפארקים, גני ילדים, מתנ"סים ואירועים מסחריים.',
    anchor: "scope-private"
  },
  {
    icon: Eye,
    title: "השגחה רציפה 100%",
    description: "השוכר הוא המשגיח האחראי. מבוגר מעל גיל 18 חייב להיות צמוד למתקן לאורך כל הפעלתו.",
    anchor: "safety-declaration"
  },
  {
    icon: Zap,
    title: "הקמה וחשמל",
    description: "צ׳ק-ליסט חובה: עיגון יתדות, מרווח 1.5 מ׳ סביב, מפוח מבודד מילדים, ממסר פחת (RCD).",
    anchor: "setup-electricity"
  },
  {
    icon: Droplet,
    title: "מתנפחי מים",
    description: 'הפרדה מלאה של חשמל ממים, גובה בריכה עד 30 ס"מ, ייבוש 30 דק׳ לפני קיפול.',
    anchor: "water-inflatables"
  },
  {
    icon: AlertTriangle,
    title: "נהלי חירום",
    description: 'פינוי מיידי בצניחת המתקן. איסור הפעלה ברוח מעל 38 קמ"ש או בגשם/סערה.',
    anchor: "emergency"
  },
  {
    icon: Truck,
    title: "מסירה והחזרה",
    description: 'בדיקה עם הקבלה (דיווח מיידי על קרע), החזרה בזמן, ניקיון. ניקוי מיוחד החל מ-150 ש"ח.',
    anchor: "delivery-returns"
  }
];

/** Lucide icon mapped per section id for visual context */
const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "scope-private": Home,
  "safety-declaration": Eye,
  "setup-electricity": Zap,
  "water-inflatables": Droplet,
  "emergency": AlertTriangle,
  "conduct": Users,
  "delivery-returns": Truck,
  "jurisdiction": Gavel
};

export function TermsPageContent() {
  return (
    <>
      <PageHeader
        eyebrow="תקנון"
        title="תקנון ותנאי השכרת ציוד"
        description="חשוב לנו שתכירו את תנאי ההשכרה לפני ההזמנה, כדי שהאירוע יעבור בצורה בטוחה, מסודרת ונעימה. עצם ההזמנה, קבלת הציוד או השימוש בו מהווים אישור לקריאת התקנון והסכמה לתנאיו."
      />

      <section className="container-page pb-6">
        <div className="flex flex-wrap gap-3">
          <a
            href={COMMUNITY_PRIMARY}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle className="h-4 w-4" />
            יש לי שאלה לגבי התקנון
          </a>
          <a
            href={COMMUNITY_SECONDARY}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            הצטרפות לקהילת FUN-ISRAEL
          </a>
        </div>
      </section>

      <ImportantNotice />

      <SummaryCardsSection />

      <ChecklistsSection />

      <TermsAccordion sections={termsSections} />

      <ContactSection />

      <TermsFAQSection />

      <FinalCTA />
    </>
  );
}

function ImportantNotice() {
  return (
    <section className="container-page pb-6">
      <div className="rounded-3xl bg-brand-50 ring-1 ring-brand-100 p-5 md:p-6 flex items-start gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand-600 shrink-0 shadow-soft">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display font-extrabold text-ink-800">חשוב לדעת</p>
          <p className="text-ink-700 mt-1 leading-relaxed">
            השימוש בציוד הוא באחריות השוכר בלבד ומחייב השגחת מבוגר בכל זמן
            השימוש. השימוש במתנפחים ובציוד המושכר אינו מבוטח.
          </p>
        </div>
      </div>
    </section>
  );
}

function SummaryCardsSection() {
  return (
    <section className="container-page py-10 md:py-14">
      <div className="max-w-2xl mb-6">
        <h2 className="heading-3">סיכום בנקודות</h2>
        <p className="text-ink-500 mt-2">
          6 כללי הברזל של ההשכרה. לחצו על כל נקודה כדי לקפוץ לסעיף המלא.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.anchor}
              href={`#${card.anchor}`}
              className="card-surface card-hover p-5 flex items-start gap-3 group"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream-100 text-ink-700 shrink-0 group-hover:bg-brand-50 group-hover:text-brand-600 transition">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-extrabold text-ink-800 group-hover:text-brand-600 transition">
                  {card.title}
                </p>
                <p className="text-sm text-ink-500 mt-1 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ChecklistsSection() {
  return (
    <section className="container-page py-10">
      <div className="grid gap-5 md:grid-cols-2">
        <ChecklistCard
          icon={<Truck className="h-5 w-5" />}
          title="לפני האיסוף"
          accent="brand"
          items={beforePickupChecklist}
        />
        <ChecklistCard
          icon={<PackageCheck className="h-5 w-5" />}
          title="לפני ההחזרה"
          accent="mint"
          items={beforeReturnChecklist}
        />
      </div>
    </section>
  );
}

function ChecklistCard({
  icon,
  title,
  items,
  accent
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  accent: "brand" | "mint";
}) {
  const accents = {
    brand: "bg-brand-50 text-brand-600",
    mint: "bg-mint-50 text-mint-600"
  };
  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <span
          className={cn(
            "h-10 w-10 grid place-items-center rounded-2xl",
            accents[accent]
          )}
        >
          {icon}
        </span>
        <h3 className="font-display font-extrabold text-lg text-ink-800">
          {title}
        </h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-ink-700">
            <CheckCircle2 className="h-4 w-4 text-mint-500 mt-1 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TermsAccordion({ sections }: { sections: TermsSection[] }) {
  // First section open by default for discoverability
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id ?? null);

  return (
    <section className="container-page py-10 md:py-14">
      <div className="max-w-2xl mb-6">
        <h2 className="heading-3">סעיפי התקנון המלא</h2>
        <p className="text-ink-500 mt-2">
          לחיצה על כל סעיף תפתח את הפירוט המלא. אפשר להגיע ישירות גם דרך הקישורים
          מהסיכום למעלה.
        </p>
      </div>
      <div className="grid gap-3">
        {sections.map((section) => {
          const Icon = sectionIcons[section.id] ?? Scroll;
          const isOpen = openId === section.id;
          return (
            <div
              key={section.id}
              id={section.id}
              className={cn(
                "card-surface overflow-hidden scroll-mt-24 transition",
                isOpen && "ring-brand-200"
              )}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between gap-3 p-5 text-right"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-10 w-10 grid place-items-center rounded-2xl shrink-0 transition",
                      isOpen
                        ? "bg-brand-100 text-brand-600"
                        : "bg-cream-100 text-ink-600"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display font-extrabold text-ink-800 text-base md:text-lg">
                    {section.title}
                  </span>
                </span>
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
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-ink-700 leading-relaxed space-y-3">
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {section.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-ink-700"
                            >
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="container-page py-10 scroll-mt-24">
      <div className="card-surface p-6 md:p-8 grid gap-6 md:grid-cols-[1fr_1fr] items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
            יצירת קשר
          </span>
          <h2 className="heading-3 mt-2">דברו איתנו לפני ההזמנה</h2>
          <p className="text-ink-600 mt-2">
            לשאלות לגבי התקנון, התאמת ציוד, בטיחות, זמינות או תנאי השכרה — אנחנו
            פה לפני שאתם סוגרים. עדיף לוודא מראש.
          </p>
          <p className="text-sm text-ink-500 mt-3">
            כתובת איסוף: {termsContact.pickupAddress} (בתיאום מראש בלבד).
          </p>
        </div>
        <ul className="space-y-3">
          {termsContact.people.map((p) => (
            <li key={p.phone}>
              <a
                href={`tel:${p.phone}`}
                className="flex items-center justify-between gap-3 rounded-2xl bg-cream-50 ring-1 ring-ink-100 p-4 hover:bg-cream-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 grid place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-800">{p.name}</p>
                    <p className="text-xs text-ink-500">חיוג ישיר</p>
                  </div>
                </div>
                <span className="font-display font-extrabold text-ink-800 ltr">
                  {formatPhone(p.phone)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function formatPhone(raw: string) {
  // 0509331313 → 050-933-1313
  if (raw.length === 10) {
    return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
  }
  return raw;
}

function TermsFAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-page py-10 md:py-14">
      <div className="max-w-2xl mb-6">
        <h2 className="heading-3">שאלות נפוצות על התקנון</h2>
        <p className="text-ink-500 mt-2">
          התשובות הקצרות לשאלות שאנחנו מקבלים הכי הרבה. לכל שאר השאלות — כתבו
          לנו בוואטסאפ.
        </p>
      </div>
      <div className="grid gap-3 max-w-3xl">
        {termsFaqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={cn(
                "card-surface overflow-hidden transition",
                isOpen && "ring-brand-200"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-right"
                aria-expanded={isOpen}
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
                    transition={{ duration: 0.25 }}
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
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="container-page py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-4xl bg-ink-800 text-cream-50 p-8 md:p-12"
      >
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-sun-400/20 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.5fr_1fr] items-center">
          <div className="space-y-3">
            <h2 className="heading-3 text-white">
              יש לכם שאלה לפני ההזמנה?
            </h2>
            <p className="text-cream-200/85 max-w-xl leading-relaxed">
              אם משהו בתקנון לא ברור, או אם אתם רוצים לוודא שהציוד מתאים לגיל
              הילדים, לשטח האירוע ולתנאי המקום — דברו איתנו לפני ההזמנה. עדיף
              לבדוק מראש מאשר לגלות ביום האירוע שחסר חשמל, מים, מקום או ציוד
              מתאים.
            </p>
          </div>
          <div className="grid gap-2">
            <a
              href={COMMUNITY_PRIMARY}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp justify-center"
            >
              <MessageCircle className="h-4 w-4" />
              שאלה לגבי התקנון
            </a>
            <a
              href={COMMUNITY_SECONDARY}
              target="_blank"
              rel="noreferrer"
              className="btn justify-center bg-white text-ink-800 hover:bg-cream-100 px-5 py-3"
            >
              הצטרפות לקהילת FUN-ISRAEL
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
