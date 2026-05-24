"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { seedProducts } from "@/lib/seed-products";
import { packageAddons } from "@/lib/packages/addons";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { PageHeader } from "@/components/layout/page-header";
import { TermsReminder } from "@/components/terms/terms-reminder";

type EventType =
  | "birthday"
  | "water-event"
  | "sports-event"
  | "family-event"
  | "other";

type KidsRange = "u10" | "10-20" | "20-35" | "35plus";

interface SelectedAddon {
  id: string;
  qty: number;
}

const EVENT_TYPES: { id: EventType; label: string; emoji: string }[] = [
  { id: "birthday", label: "יום הולדת", emoji: "🎂" },
  { id: "water-event", label: "אירוע מים", emoji: "💦" },
  { id: "sports-event", label: "אירוע ספורט", emoji: "⚽" },
  { id: "family-event", label: "אירוע משפחתי", emoji: "👨‍👩‍👧‍👦" },
  { id: "other", label: "אחר", emoji: "✨" }
];

const KIDS_RANGES: { id: KidsRange; label: string }[] = [
  { id: "u10", label: "עד 10" },
  { id: "10-20", label: "10-20" },
  { id: "20-35", label: "20-35" },
  { id: "35plus", label: "35+" }
];

const PRODUCT_FILTERS: {
  id: "water" | "dry" | "sports" | "activity" | "all";
  label: string;
  emoji: string;
}[] = [
  { id: "all", label: "הכל", emoji: "✨" },
  { id: "water", label: "מתנפחי מים", emoji: "💦" },
  { id: "dry", label: "מתנפחים יבשים", emoji: "🎉" },
  { id: "sports", label: "מתנפחי ספורט", emoji: "⚽" },
  { id: "activity", label: "מתנפחי פעילות", emoji: "🎯" }
];

function matchesFilter(p: Product, f: (typeof PRODUCT_FILTERS)[number]["id"]) {
  if (f === "all") return true;
  if (f === "water") return p.category === "water";
  if (f === "sports") return p.category === "sports";
  if (f === "activity") return p.category === "activity";
  if (f === "dry")
    return (
      p.category === "birthday" ||
      p.category === "indoor" ||
      p.category === "toddler"
    );
  return true;
}

export function BuildPackageFlow() {
  const [stepIdx, setStepIdx] = useState(0);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [kidsRange, setKidsRange] = useState<KidsRange | null>(null);
  const [filter, setFilter] = useState<
    (typeof PRODUCT_FILTERS)[number]["id"]
  >("all");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddon[]>([]);
  const [preferredDate, setPreferredDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const products = useMemo(
    () => seedProducts.filter((p) => p.active && matchesFilter(p, filter)),
    [filter]
  );
  const allActiveProducts = useMemo(
    () => seedProducts.filter((p) => p.active),
    []
  );
  const activeAddons = useMemo(
    () => packageAddons.filter((a) => a.isActive),
    []
  );

  const selectedProducts = useMemo(
    () => allActiveProducts.filter((p) => selectedProductIds.includes(p.id)),
    [allActiveProducts, selectedProductIds]
  );

  // Pull numeric prices out of the addon priceLabel (Hebrew: "+₪200")
  const estimate = useMemo(() => {
    const productsTotal = selectedProducts.reduce((s, p) => s + p.price, 0);
    const addonsTotal = selectedAddons.reduce((s, sa) => {
      const addon = activeAddons.find((a) => a.id === sa.id);
      if (!addon) return s;
      const match = addon.priceLabel.he.match(/\d[\d,]*/);
      const price = match ? parseInt(match[0].replace(/,/g, ""), 10) : 0;
      return s + price * sa.qty;
    }, 0);
    return productsTotal + addonsTotal;
  }, [selectedProducts, selectedAddons, activeAddons]);

  function toggleProduct(id: string) {
    setSelectedProductIds((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]
    );
  }

  function toggleAddon(id: string) {
    setSelectedAddons((curr) =>
      curr.some((a) => a.id === id)
        ? curr.filter((a) => a.id !== id)
        : [...curr, { id, qty: 1 }]
    );
  }

  function setAddonQty(id: string, qty: number) {
    setSelectedAddons((curr) =>
      curr.map((a) => (a.id === id ? { ...a, qty: Math.max(1, qty) } : a))
    );
  }

  function whatsappMessage() {
    const lines: string[] = [
      "שלום, אני רוצה לבדוק זמינות לחבילה אישית 🧩",
      ""
    ];
    if (eventType) {
      const label = EVENT_TYPES.find((e) => e.id === eventType)?.label;
      lines.push(`סוג אירוע: ${label}`);
    }
    if (kidsRange) {
      const label = KIDS_RANGES.find((k) => k.id === kidsRange)?.label;
      lines.push(`כמות ילדים משוערת: ${label}`);
    }
    if (selectedProducts.length) {
      lines.push("");
      lines.push("מתנפחים:");
      selectedProducts.forEach((p) => {
        lines.push(`• ${p.name} — ₪${p.price} ליום`);
      });
    }
    const expandedAddons = selectedAddons
      .map((sa) => {
        const addon = activeAddons.find((a) => a.id === sa.id);
        if (!addon) return null;
        return { addon, qty: sa.qty };
      })
      .filter((x): x is { addon: (typeof activeAddons)[number]; qty: number } => !!x);
    if (expandedAddons.length) {
      lines.push("");
      lines.push("תוספות:");
      expandedAddons.forEach(({ addon, qty }) => {
        const qtyLabel = qty > 1 ? ` ×${qty}` : "";
        lines.push(`• ${addon.name.he}${qtyLabel} — ${addon.priceLabel.he}`);
      });
    }
    lines.push("");
    if (preferredDate) lines.push(`תאריך רצוי: ${preferredDate}`);
    if (location) lines.push(`מיקום האירוע: ${location}`);
    if (notes) lines.push(`הערות: ${notes}`);
    lines.push("");
    lines.push(
      `אומדן ראשוני לפי המחירון: ₪${estimate.toLocaleString("he-IL")}`
    );
    lines.push(
      "המחיר הסופי וזמינות המוצרים יאושרו מולכם בוואטסאפ."
    );
    return lines.join("\n");
  }

  const canNext = (() => {
    switch (stepIdx) {
      case 0:
        return !!eventType;
      case 1:
        return !!kidsRange;
      case 2:
        return selectedProducts.length > 0;
      default:
        return true;
    }
  })();

  const STEP_TITLES = [
    "סוג האירוע",
    "כמות ילדים",
    "בחירת מתנפחים",
    "תוספות לאירוע",
    "סיכום ושליחה"
  ];

  function goNext() {
    if (!canNext) return;
    setStepIdx((i) => Math.min(STEP_TITLES.length - 1, i + 1));
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function goBack() {
    setStepIdx((i) => Math.max(0, i - 1));
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const whatsappHref = buildWhatsAppLink(siteConfig.whatsapp, whatsappMessage());

  return (
    <>
      <PageHeader
        eyebrow="בונה חבילה אישית"
        title="בנו את החבילה המושלמת לאירוע שלכם"
        description="בוחרים סוג אירוע, מתנפחים ותוספות — ושולחים לבדיקת זמינות בוואטסאפ. בלי תשלום באתר, בלי התחייבות."
      />

      <section className="container-page pb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {STEP_TITLES.map((title, idx) => {
            const isCurrent = idx === stepIdx;
            const isDone = idx < stepIdx;
            return (
              <li
                key={title}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 transition ${
                  isCurrent
                    ? "bg-brand-50 ring-brand-200 text-brand-700 font-semibold"
                    : isDone
                      ? "bg-mint-50 ring-mint-200 text-mint-700"
                      : "bg-white ring-ink-100 text-ink-500"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold ${
                    isCurrent
                      ? "bg-brand-500 text-white"
                      : isDone
                        ? "bg-mint-500 text-white"
                        : "bg-cream-100 text-ink-500"
                  }`}
                >
                  {isDone ? <Check className="h-3 w-3" /> : idx + 1}
                </span>
                <span className="hidden sm:inline">{title}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="container-page pb-20 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">
        <div className="space-y-6">
          {stepIdx === 0 && (
            <Card title="סוג האירוע">
              <p className="text-ink-500 mb-4">
                בחרו את סוג האירוע — נמליץ בהמשך על המתנפחים והתוספות שמתאימים.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {EVENT_TYPES.map((et) => (
                  <SelectableButton
                    key={et.id}
                    label={`${et.emoji}  ${et.label}`}
                    selected={eventType === et.id}
                    onClick={() => setEventType(et.id)}
                  />
                ))}
              </div>
            </Card>
          )}

          {stepIdx === 1 && (
            <Card title="כמות ילדים משוערת">
              <p className="text-ink-500 mb-4">
                כמה ילדים בערך באירוע? זה עוזר לנו להמליץ על מספר המתקנים
                המתאים.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {KIDS_RANGES.map((k) => (
                  <SelectableButton
                    key={k.id}
                    label={k.label}
                    selected={kidsRange === k.id}
                    onClick={() => setKidsRange(k.id)}
                  />
                ))}
              </div>
              {(kidsRange === "20-35" || kidsRange === "35plus") && (
                <p className="mt-4 text-sm text-ink-600 rounded-2xl bg-cream-50 ring-1 ring-ink-100 p-3">
                  💡 לאירועים גדולים מומלץ לבחור לפחות שני מתנפחים — פחות תורים
                  ויותר פעילות לילדים.
                </p>
              )}
            </Card>
          )}

          {stepIdx === 2 && (
            <Card title="בחירת מתנפחים">
              <div className="flex flex-wrap gap-2 mb-4">
                {PRODUCT_FILTERS.map((pf) => (
                  <button
                    key={pf.id}
                    type="button"
                    onClick={() => setFilter(pf.id)}
                    className={`rounded-full px-3 py-1.5 text-sm ring-1 transition ${
                      filter === pf.id
                        ? "bg-brand-500 text-white ring-brand-500"
                        : "bg-white text-ink-700 ring-ink-100 hover:bg-cream-50"
                    }`}
                  >
                    {pf.emoji} {pf.label}
                  </button>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {products.map((p) => {
                  const selected = selectedProductIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => toggleProduct(p.id)}
                      className={`text-start rounded-3xl p-4 ring-1 transition flex gap-3 ${
                        selected
                          ? "bg-brand-50 ring-brand-300"
                          : "bg-white ring-ink-100 hover:bg-cream-50"
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-display font-extrabold text-ink-800">
                          {p.name}
                        </p>
                        <p className="text-xs text-ink-500 mt-1 line-clamp-2">
                          {p.shortDescription}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-brand-600">
                          ₪{p.price} ליום
                        </p>
                      </div>
                      <div
                        className={`grid h-6 w-6 place-items-center rounded-full shrink-0 ${
                          selected
                            ? "bg-brand-500 text-white"
                            : "bg-cream-100 text-ink-400"
                        }`}
                      >
                        {selected ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <span className="text-xs">+</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {products.length === 0 && (
                <p className="text-ink-500 text-center py-8">
                  אין מתנפחים תחת הסינון הזה — נסו "הכל".
                </p>
              )}
            </Card>
          )}

          {stepIdx === 3 && (
            <Card title="תוספות לאירוע (אופציונלי)">
              <p className="text-ink-500 mb-4">
                שדרוגים שהופכים את האירוע לחוויה — בחרו את מה שמתאים, או דלגו
                לסיכום.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {activeAddons.map((a) => {
                  const sel = selectedAddons.find((s) => s.id === a.id);
                  return (
                    <div
                      key={a.id}
                      className={`rounded-3xl p-4 ring-1 transition ${
                        sel
                          ? "bg-mint-50 ring-mint-200"
                          : "bg-white ring-ink-100 hover:bg-cream-50"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleAddon(a.id)}
                        className="text-start w-full flex gap-3"
                      >
                        {a.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={a.image}
                            alt={a.name.he}
                            className="h-16 w-16 rounded-2xl object-cover shrink-0"
                          />
                        ) : (
                          <span className="text-2xl shrink-0">{a.icon}</span>
                        )}
                        <div className="flex-1">
                          <p className="font-display font-extrabold text-ink-800">
                            {a.name.he}
                          </p>
                          <p className="text-xs text-ink-500 mt-1">
                            {a.description.he}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-mint-700">
                            {a.priceLabel.he}
                          </p>
                        </div>
                        <div
                          className={`grid h-6 w-6 place-items-center rounded-full shrink-0 ${
                            sel
                              ? "bg-mint-500 text-white"
                              : "bg-cream-100 text-ink-400"
                          }`}
                        >
                          {sel ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <span className="text-xs">+</span>
                          )}
                        </div>
                      </button>
                      {sel && a.id === "mascot-single" && (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          <span className="text-ink-600">כמות:</span>
                          <button
                            type="button"
                            onClick={() =>
                              setAddonQty(a.id, Math.max(1, sel.qty - 1))
                            }
                            className="h-7 w-7 rounded-full bg-cream-100 hover:bg-cream-200"
                          >
                            −
                          </button>
                          <span className="font-semibold w-6 text-center">
                            {sel.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setAddonQty(a.id, sel.qty + 1)}
                            className="h-7 w-7 rounded-full bg-cream-100 hover:bg-cream-200"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {stepIdx === 4 && (
            <Card title="סיכום ושליחה">
              <p className="text-ink-500 mb-4">
                בדקו את הסיכום, השלימו תאריך ומיקום (אופציונלי), ושלחו לוואטסאפ
                לבדיקת זמינות.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Field label="תאריך רצוי">
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="input ltr"
                  />
                </Field>
                <Field label="מיקום האירוע (עיר/שכונה)">
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="לדוגמה: רחובות, שכונת קרית משה"
                    className="input"
                  />
                </Field>
              </div>
              <Field label="הערות (אופציונלי)">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input min-h-[88px] resize-none"
                  placeholder="לדוגמה: יום הולדת לבן 6, חצר עם דשא, צריך לתאם איסוף..."
                />
              </Field>

              <div className="mt-6 rounded-3xl bg-cream-50 ring-1 ring-ink-100 p-4 space-y-3">
                <p className="font-display font-extrabold text-ink-800">
                  החבילה שלכם:
                </p>
                {selectedProducts.length > 0 ? (
                  <ul className="text-sm text-ink-700 space-y-1">
                    {selectedProducts.map((p) => (
                      <li key={p.id} className="flex justify-between">
                        <span>• {p.name}</span>
                        <span className="font-semibold">₪{p.price}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-ink-500">
                    עדיין לא נבחרו מתנפחים — חזרו לשלב 3 כדי להוסיף.
                  </p>
                )}
                {selectedAddons.length > 0 && (
                  <>
                    <hr className="border-ink-100" />
                    <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
                      תוספות
                    </p>
                    <ul className="text-sm text-ink-700 space-y-1">
                      {selectedAddons.map((sa) => {
                        const a = activeAddons.find((x) => x.id === sa.id);
                        if (!a) return null;
                        return (
                          <li key={sa.id} className="flex justify-between">
                            <span>
                              • {a.name.he}
                              {sa.qty > 1 ? ` ×${sa.qty}` : ""}
                            </span>
                            <span className="font-semibold">
                              {a.priceLabel.he}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                <hr className="border-ink-100" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-500">
                    אומדן ראשוני לפי המחירון
                  </span>
                  <span className="font-display font-extrabold text-xl text-ink-800">
                    ₪{estimate.toLocaleString("he-IL")}
                  </span>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">
                  המחיר הסופי וזמינות המוצרים יאושרו מולכם בוואטסאפ. האתר אינו
                  מבצע סליקה ולא שומר פרטי אשראי.
                </p>
              </div>
            </Card>
          )}

          <nav className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIdx === 0}
              className="btn-ghost text-sm disabled:opacity-40"
            >
              <ArrowRight className="h-4 w-4" />
              שלב קודם
            </button>

            {stepIdx < STEP_TITLES.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canNext}
                className="btn-brand disabled:opacity-50"
              >
                {stepIdx === 3 ? "לסיכום" : "המשך"}
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-disabled={selectedProducts.length === 0}
                className={`btn-whatsapp ${
                  selectedProducts.length === 0
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                שליחת החבילה לבדיקה בוואטסאפ
              </a>
            )}
          </nav>
        </div>

        <aside className="space-y-4">
          <div className="card-surface p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <ShoppingBag className="h-4 w-4 text-brand-500" />
              <span className="font-semibold text-ink-800">
                סיכום החבילה שלך
              </span>
            </div>
            <p className="text-xs text-ink-500">
              {selectedProducts.length} מתנפחים · {selectedAddons.length}{" "}
              תוספות
            </p>
            <div className="flex items-center justify-between border-t border-ink-100 pt-3">
              <span className="text-sm text-ink-500">אומדן ראשוני</span>
              <span className="font-display font-extrabold text-lg text-ink-800">
                ₪{estimate.toLocaleString("he-IL")}
              </span>
            </div>
            <p className="text-[11px] text-ink-400 leading-relaxed">
              האתר משמש לבדיקת זמינות ושיריון בלבד. תיאום ותשלום ייעשו בוואטסאפ
              לאחר אישור הזמינות.
            </p>
          </div>
          <div className="card-surface p-5 space-y-3 bg-mint-50/40">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-mint-600" />
              <span className="font-semibold text-ink-800">טיפים מהירים</span>
            </div>
            <ul className="text-sm text-ink-700 space-y-1.5">
              <li>• אירוע קיץ — שווה לשלב מתנפח מים עם צידנית.</li>
              <li>• יותר מ-20 ילדים — שני מתנפחים מפחיתים תורים משמעותית.</li>
              <li>• אין נקודת חשמל קרובה — הוסיפו גנרטור.</li>
              <li>• רוצים אפקט WOW — בובות ענק ורקע במבי.</li>
            </ul>
          </div>
          <TermsReminder variant="card" />
          <Link
            href="/packages"
            className="block text-center text-sm text-ink-500 hover:text-brand-600"
          >
            או בחרו חבילה מוכנה מהאוסף שלנו ←
          </Link>
        </aside>
      </section>
    </>
  );
}

function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-surface p-5 md:p-6">
      <h2 className="heading-3 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function SelectableButton({
  label,
  selected,
  onClick
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-start rounded-3xl px-4 py-3 ring-1 transition font-semibold ${
        selected
          ? "bg-brand-50 ring-brand-300 text-brand-700"
          : "bg-white ring-ink-100 text-ink-700 hover:bg-cream-50"
      }`}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
