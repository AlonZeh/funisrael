"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Plus, Save, Trash2 } from "lucide-react";
import { useProductStore } from "@/store/product-store";
import type { Product, ProductBadge, ProductCategory } from "@/lib/types";
import { categories } from "@/lib/categories";
import { slugify } from "@/lib/utils";

const BADGES: { id: ProductBadge; label: string }[] = [
  { id: "popular", label: "פופולרי" },
  { id: "premium", label: "פרימיום" },
  { id: "summer", label: "להיט קיץ" },
  { id: "indoor-friendly", label: "אינדור-פרנדלי" },
  { id: "instagram", label: "Instagram" },
  { id: "new", label: "חדש" },
  { id: "perfect-for-toddlers", label: "מתאים לפעוטות" }
];

const VEHICLES: Product["pickupVehicle"][] = [
  "רכב פרטי",
  "רכב משפחתי גדול",
  "טנדר"
];

interface Props {
  initial?: Product;
  mode: "create" | "edit";
}

export function ProductEditor({ initial, mode }: Props) {
  const router = useRouter();
  const addProduct = useProductStore((s) => s.addProduct);
  const updateProduct = useProductStore((s) => s.updateProduct);

  const [draft, setDraft] = useState<Product>(
    initial ?? {
      id: `prod-${Date.now()}`,
      slug: "",
      name: "",
      shortDescription: "",
      longDescription: "",
      category: "birthday",
      secondaryCategories: [],
      price: 500,
      images: [""],
      ageRange: "3-12",
      dimensions: { length: 400, width: 300, height: 250 },
      setupArea: { length: 5, width: 4 },
      indoorFriendly: false,
      outdoorFriendly: true,
      needsWater: false,
      setupTime: 20,
      pickupVehicle: "טנדר",
      stock: 1,
      badges: [],
      perfectFor: [],
      active: true
    }
  );

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.name.trim()) return alert("נדרש שם מוצר");
    const finalDraft: Product = {
      ...draft,
      slug: draft.slug.trim() || slugify(draft.name),
      images: draft.images.filter((i) => i.trim())
    };
    if (mode === "create") addProduct(finalDraft);
    else updateProduct(finalDraft.id, finalDraft);
    router.push("/admin/products");
  }

  function updateImage(i: number, val: string) {
    const next = [...draft.images];
    next[i] = val;
    update("images", next);
  }

  function addImage() {
    update("images", [...draft.images, ""]);
  }

  function removeImage(i: number) {
    update(
      "images",
      draft.images.filter((_, idx) => idx !== i)
    );
  }

  function toggleBadge(b: ProductBadge) {
    update(
      "badges",
      draft.badges.includes(b)
        ? draft.badges.filter((x) => x !== b)
        : [...draft.badges, b]
    );
  }

  function toggleSecondary(c: ProductCategory) {
    const list = draft.secondaryCategories ?? [];
    update(
      "secondaryCategories",
      list.includes(c) ? list.filter((x) => x !== c) : [...list, c]
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <header className="flex items-end justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="text-sm text-ink-500 hover:text-ink-800 inline-flex items-center gap-1 mb-2"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            חזרה לרשימה
          </button>
          <h1 className="heading-2">
            {mode === "create" ? "הוספת מוצר חדש" : `עריכת מוצר`}
          </h1>
        </div>
        <button type="submit" className="btn-brand">
          <Save className="h-4 w-4" />
          שמירה
        </button>
      </header>

      <Section title="פרטים בסיסיים">
        <Field label="שם המוצר" required>
          <input
            value={draft.name}
            onChange={(e) => update("name", e.target.value)}
            className="input"
            required
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Slug (כתובת URL)" hint="ריק = יבנה אוטומטית מהשם">
            <input
              value={draft.slug}
              onChange={(e) => update("slug", e.target.value)}
              className="input ltr"
              placeholder="atlantis-water-park"
            />
          </Field>
          <Field label="קטגוריה ראשית">
            <select
              value={draft.category}
              onChange={(e) => update("category", e.target.value as ProductCategory)}
              className="input"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="תיאור קצר (יוצג בכרטיסיה)">
          <input
            value={draft.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            className="input"
            maxLength={140}
          />
        </Field>
        <Field label="תיאור מורחב">
          <textarea
            value={draft.longDescription}
            onChange={(e) => update("longDescription", e.target.value)}
            className="input min-h-[140px]"
          />
        </Field>
      </Section>

      <Section title="מחיר ומלאי">
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="מחיר השכרה (₪)">
            <input
              type="number"
              value={draft.price}
              onChange={(e) => update("price", Number(e.target.value))}
              className="input"
              min={0}
            />
          </Field>
          <Field label="מחיר בסיס (לחיתוך)" hint="אופציונלי">
            <input
              type="number"
              value={draft.compareAtPrice ?? ""}
              onChange={(e) =>
                update(
                  "compareAtPrice",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="input"
              min={0}
            />
          </Field>
          <Field label="מלאי זמין">
            <input
              type="number"
              value={draft.stock}
              onChange={(e) => update("stock", Number(e.target.value))}
              className="input"
              min={0}
            />
          </Field>
        </div>
        <Field label="פעיל באתר">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={draft.active}
              onChange={(e) => update("active", e.target.checked)}
              className="h-4 w-4 accent-brand-500"
            />
            <span className="text-sm text-ink-700">
              הצגה ללקוחות באתר
            </span>
          </label>
        </Field>
      </Section>

      <Section title="תמונות">
        <p className="text-sm text-ink-500 mb-2">
          הדביקו כתובת URL לכל תמונה (ניתן להעלות לשירותי תמונות חינמיים כמו Imgur או Cloudinary).
        </p>
        <div className="space-y-3">
          {draft.images.map((img, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="relative h-16 w-20 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                {img && (
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                )}
              </div>
              <input
                value={img}
                onChange={(e) => updateImage(i, e.target.value)}
                className="input ltr"
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="p-2 rounded-xl hover:bg-brand-50"
                aria-label="הסרה"
              >
                <Trash2 className="h-4 w-4 text-brand-600" />
              </button>
            </div>
          ))}
          <button type="button" onClick={addImage} className="btn-ghost text-sm">
            <Plus className="h-4 w-4" />
            הוספת תמונה
          </button>
        </div>
      </Section>

      <Section title="מפרט טכני">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="טווח גילאים" hint="לדוגמה: 3-12">
            <input
              value={draft.ageRange}
              onChange={(e) => update("ageRange", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="זמן הקמה (דקות)">
            <input
              type="number"
              value={draft.setupTime}
              onChange={(e) => update("setupTime", Number(e.target.value))}
              className="input"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="אורך (ס״מ)">
            <input
              type="number"
              value={draft.dimensions.length}
              onChange={(e) =>
                update("dimensions", { ...draft.dimensions, length: Number(e.target.value) })
              }
              className="input"
            />
          </Field>
          <Field label="רוחב (ס״מ)">
            <input
              type="number"
              value={draft.dimensions.width}
              onChange={(e) =>
                update("dimensions", { ...draft.dimensions, width: Number(e.target.value) })
              }
              className="input"
            />
          </Field>
          <Field label="גובה (ס״מ)">
            <input
              type="number"
              value={draft.dimensions.height}
              onChange={(e) =>
                update("dimensions", { ...draft.dimensions, height: Number(e.target.value) })
              }
              className="input"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="שטח התקנה - אורך (מטר)">
            <input
              type="number"
              step="0.5"
              value={draft.setupArea.length}
              onChange={(e) =>
                update("setupArea", { ...draft.setupArea, length: Number(e.target.value) })
              }
              className="input"
            />
          </Field>
          <Field label="שטח התקנה - רוחב (מטר)">
            <input
              type="number"
              step="0.5"
              value={draft.setupArea.width}
              onChange={(e) =>
                update("setupArea", { ...draft.setupArea, width: Number(e.target.value) })
              }
              className="input"
            />
          </Field>
        </div>

        <Field label="רכב לאיסוף">
          <select
            value={draft.pickupVehicle}
            onChange={(e) =>
              update("pickupVehicle", e.target.value as Product["pickupVehicle"])
            }
            className="input"
          >
            {VEHICLES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </Field>

        <div className="grid sm:grid-cols-3 gap-3">
          <Checkbox
            checked={draft.indoorFriendly}
            onChange={(v) => update("indoorFriendly", v)}
            label="מתאים לאינדור"
          />
          <Checkbox
            checked={draft.outdoorFriendly}
            onChange={(v) => update("outdoorFriendly", v)}
            label="מתאים לאאוטדור"
          />
          <Checkbox
            checked={draft.needsWater}
            onChange={(v) => update("needsWater", v)}
            label="נדרש חיבור מים"
          />
        </div>
      </Section>

      <Section title="תיוג ושיווק">
        <Field label="קטגוריות משניות">
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => c.id !== draft.category)
              .map((c) => {
                const checked = (draft.secondaryCategories ?? []).includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleSecondary(c.id)}
                    className={`rounded-full px-3 py-1.5 text-xs ring-1 transition ${
                      checked
                        ? "bg-ink-800 text-white ring-ink-800"
                        : "bg-white text-ink-600 ring-ink-100 hover:bg-cream-100"
                    }`}
                  >
                    {c.emoji} {c.name}
                  </button>
                );
              })}
          </div>
        </Field>

        <Field label="תגיות שיווקיות">
          <div className="flex flex-wrap gap-2">
            {BADGES.map((b) => {
              const checked = draft.badges.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => toggleBadge(b.id)}
                  className={`rounded-full px-3 py-1.5 text-xs ring-1 transition ${
                    checked
                      ? "bg-brand-500 text-white ring-brand-500"
                      : "bg-white text-ink-600 ring-ink-100 hover:bg-cream-100"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="מושלם עבור" hint="פריט אחד בכל שורה">
          <textarea
            value={draft.perfectFor.join("\n")}
            onChange={(e) =>
              update("perfectFor", e.target.value.split("\n").filter(Boolean))
            }
            className="input min-h-[100px]"
            placeholder="ימי הולדת בקיץ&#10;אירועי משפחה&#10;פעילויות גן"
          />
        </Field>

        <Field
          label="כתובת וידאו (אופציונלי)"
          hint="YouTube / Vimeo / MP4 URL"
        >
          <input
            value={draft.videoUrl ?? ""}
            onChange={(e) =>
              update("videoUrl", e.target.value || undefined)
            }
            className="input ltr"
            placeholder="https://youtube.com/..."
          />
        </Field>
      </Section>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="btn-ghost"
        >
          ביטול
        </button>
        <button type="submit" className="btn-brand">
          <Save className="h-4 w-4" />
          שמירת מוצר
        </button>
      </div>
    </form>
  );
}

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="card-surface p-6 space-y-4">
      <legend className="font-display font-extrabold text-lg text-ink-800">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  hint,
  required,
  children
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label flex items-center gap-1">
        {label}
        {required && <span className="text-brand-500">*</span>}
        {hint && <span className="text-xs text-ink-400 font-normal">({hint})</span>}
      </span>
      {children}
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  label
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 rounded-2xl bg-cream-50 px-3 py-2.5 ring-1 ring-ink-100 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-brand-500"
      />
      <span className="text-sm text-ink-700">{label}</span>
    </label>
  );
}
