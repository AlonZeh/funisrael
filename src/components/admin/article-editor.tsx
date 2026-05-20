"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Plus, Save } from "lucide-react";
import { useArticleStore } from "@/store/article-store";
import type {
  Article,
  ArticleCategory,
  ArticleSection
} from "@/lib/articles/types";
import { articleCategories } from "@/lib/articles/categories";
import { slugify } from "@/lib/utils";

interface Props {
  initial?: Article;
  mode: "create" | "edit";
}

export function ArticleEditor({ initial, mode }: Props) {
  const router = useRouter();
  const addArticle = useArticleStore((s) => s.addArticle);
  const updateArticle = useArticleStore((s) => s.updateArticle);

  const defaultArticle: Article = useMemo(
    () =>
      initial ?? {
        id: `art-${Date.now()}`,
        slug: "",
        title: "",
        metaTitle: "",
        metaDescription: "",
        excerpt: "",
        coverImage: "",
        coverImageAlt: "",
        category: "birthdays" as ArticleCategory,
        tags: [],
        city: "",
        cities: [],
        targetKeyword: "",
        secondaryKeywords: [],
        readingTimeMinutes: 5,
        author: "צוות FUN-ISRAEL",
        body: [
          {
            heading: "",
            paragraphs: [""]
          }
        ],
        faq: [{ q: "", a: "" }],
        cta: {
          title: "",
          description: "",
          buttonLabel: "בדיקת זמינות בוואטסאפ",
          buttonUrl: "https://wa.me/972509331313",
          variant: "whatsapp"
        },
        relatedPackages: [],
        relatedArticles: [],
        publishedAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
        isPublished: false
      },
    [initial]
  );

  const [draft, setDraft] = useState<Article>(defaultArticle);

  function update<K extends keyof Article>(key: K, value: Article[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function updateSection(index: number, patch: Partial<ArticleSection>) {
    setDraft((d) => {
      const body = [...d.body];
      body[index] = { ...body[index], ...patch };
      return { ...d, body };
    });
  }

  function addSection() {
    update("body", [...draft.body, { heading: "", paragraphs: [""] }]);
  }

  function removeSection(index: number) {
    update(
      "body",
      draft.body.filter((_, i) => i !== index)
    );
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.title.trim()) return alert("חובה כותרת");
    const final: Article = {
      ...draft,
      slug: draft.slug.trim() || slugify(draft.title),
      metaTitle: draft.metaTitle.trim() || draft.title.slice(0, 60),
      metaDescription:
        draft.metaDescription.trim() || draft.excerpt.slice(0, 160),
      tags: draft.tags.filter(Boolean),
      secondaryKeywords: draft.secondaryKeywords.filter(Boolean),
      cities: (draft.cities ?? []).filter(Boolean),
      relatedPackages: (draft.relatedPackages ?? []).filter(Boolean),
      relatedArticles: (draft.relatedArticles ?? []).filter(Boolean)
    };
    if (mode === "create") addArticle(final);
    else updateArticle(final.id, final);
    router.push("/admin/articles");
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/articles")}
            className="text-sm text-ink-500 hover:text-ink-800 inline-flex items-center gap-1 mb-2"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            חזרה לרשימה
          </button>
          <h1 className="heading-2">
            {mode === "create" ? "מאמר חדש" : "עריכת מאמר"}
          </h1>
        </div>
        <button type="submit" className="btn-brand">
          <Save className="h-4 w-4" />
          שמירה
        </button>
      </header>

      <Section title="מטא־מידע ו-SEO">
        <Field label="כותרת המאמר (H1)" required>
          <input
            value={draft.title}
            onChange={(e) => update("title", e.target.value)}
            className="input"
            required
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Slug (כתובת URL)" hint="ריק = יבנה אוטומטית">
            <input
              value={draft.slug}
              onChange={(e) => update("slug", e.target.value)}
              className="input ltr"
              placeholder="rehovot-birthday-guide"
            />
          </Field>
          <Field label="קטגוריה">
            <select
              value={draft.category}
              onChange={(e) =>
                update("category", e.target.value as ArticleCategory)
              }
              className="input"
            >
              {articleCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Meta title" hint="עד 60 תווים">
            <input
              value={draft.metaTitle}
              onChange={(e) => update("metaTitle", e.target.value)}
              className="input"
              maxLength={80}
            />
          </Field>
          <Field label="Meta description" hint="140-160 תווים">
            <input
              value={draft.metaDescription}
              onChange={(e) => update("metaDescription", e.target.value)}
              className="input"
              maxLength={180}
            />
          </Field>
        </div>
        <Field label="מילת מפתח עיקרית">
          <input
            value={draft.targetKeyword}
            onChange={(e) => update("targetKeyword", e.target.value)}
            className="input"
            placeholder="השכרת מתנפחים ברחובות"
          />
        </Field>
        <Field
          label="מילות מפתח משניות (מופרדות בפסיק)"
        >
          <input
            value={draft.secondaryKeywords.join(", ")}
            onChange={(e) =>
              update(
                "secondaryKeywords",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            className="input"
            placeholder="מתנפחים ברחובות, מתנפח חצר, ימי הולדת רחובות"
          />
        </Field>
      </Section>

      <Section title="מיקום ותגיות">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="עיר ראשית">
            <input
              value={draft.city ?? ""}
              onChange={(e) => update("city", e.target.value)}
              className="input"
              placeholder="רחובות"
            />
          </Field>
          <Field label="ערים נוספות (פסיקים)">
            <input
              value={(draft.cities ?? []).join(", ")}
              onChange={(e) =>
                update(
                  "cities",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
              className="input"
              placeholder="נס ציונה, יבנה"
            />
          </Field>
        </div>
        <Field label="תגיות (פסיקים)">
          <input
            value={draft.tags.join(", ")}
            onChange={(e) =>
              update(
                "tags",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            className="input"
            placeholder="ימי הולדת, רחובות, צ׳קליסט"
          />
        </Field>
      </Section>

      <Section title="תמונת קאבר ותקציר">
        <div className="grid sm:grid-cols-[120px_1fr] gap-3 items-start">
          <div className="relative h-24 w-32 rounded-2xl overflow-hidden bg-cream-100">
            {draft.coverImage && (
              <Image
                src={draft.coverImage}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
              />
            )}
          </div>
          <div className="space-y-3">
            <Field label="Cover image URL">
              <input
                value={draft.coverImage}
                onChange={(e) => update("coverImage", e.target.value)}
                className="input ltr"
                placeholder="https://..."
              />
            </Field>
            <Field label="Alt text (תיאור לתמונה)">
              <input
                value={draft.coverImageAlt}
                onChange={(e) => update("coverImageAlt", e.target.value)}
                className="input"
              />
            </Field>
          </div>
        </div>
        <Field label="תקציר (Excerpt)" hint="מופיע בכרטיסיה ובחיפוש">
          <textarea
            value={draft.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            className="input min-h-[80px]"
            maxLength={220}
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="זמן קריאה (דקות)">
            <input
              type="number"
              value={draft.readingTimeMinutes}
              onChange={(e) =>
                update("readingTimeMinutes", Number(e.target.value))
              }
              className="input"
              min={1}
              max={30}
            />
          </Field>
          <Field label="מחבר">
            <input
              value={draft.author}
              onChange={(e) => update("author", e.target.value)}
              className="input"
            />
          </Field>
        </div>
      </Section>

      <Section title="גוף המאמר">
        <p className="text-sm text-ink-500 -mt-2 mb-1">
          כל סקציה היא כותרת (H2) + פסקאות. פסקה ריקה תיגרע. ניתן להפריד פסקאות
          בקובץ הגוף עם שורות חדשות בתוך תיבת הטקסט.
        </p>
        {draft.body.map((section, i) => (
          <div key={i} className="rounded-2xl ring-1 ring-ink-100 p-4 space-y-3 bg-cream-50/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-600">
                סקציה #{i + 1}
              </span>
              {draft.body.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(i)}
                  className="text-xs text-brand-600 hover:underline"
                >
                  הסרת סקציה
                </button>
              )}
            </div>
            <Field label="כותרת (H2)">
              <input
                value={section.heading}
                onChange={(e) =>
                  updateSection(i, { heading: e.target.value })
                }
                className="input"
              />
            </Field>
            <Field label="פסקאות" hint="שורה ריקה = פסקה חדשה">
              <textarea
                value={section.paragraphs.join("\n\n")}
                onChange={(e) =>
                  updateSection(i, {
                    paragraphs: e.target.value
                      .split(/\n{2,}/)
                      .map((p) => p.trim())
                      .filter(Boolean)
                  })
                }
                className="input min-h-[140px]"
              />
            </Field>
            <Field label="פריטי בולטים (אופציונלי, פריט בכל שורה)">
              <textarea
                value={(section.bullets ?? []).join("\n")}
                onChange={(e) =>
                  updateSection(i, {
                    bullets: e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  })
                }
                className="input min-h-[80px]"
              />
            </Field>
          </div>
        ))}
        <button
          type="button"
          onClick={addSection}
          className="btn-ghost text-sm"
        >
          <Plus className="h-4 w-4" />
          הוספת סקציה
        </button>
      </Section>

      <Section title="צ׳קליסט (אופציונלי)">
        <Field label="כותרת הצ׳קליסט">
          <input
            value={draft.checklist?.title ?? ""}
            onChange={(e) =>
              update("checklist", {
                title: e.target.value,
                items: draft.checklist?.items ?? []
              })
            }
            className="input"
            placeholder="צ׳קליסט הורים — לפני סגירת מתנפח"
          />
        </Field>
        <Field label="פריטי הצ׳קליסט (פריט בכל שורה)">
          <textarea
            value={(draft.checklist?.items ?? []).join("\n")}
            onChange={(e) =>
              update("checklist", {
                title: draft.checklist?.title ?? "",
                items: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean)
              })
            }
            className="input min-h-[120px]"
          />
        </Field>
      </Section>

      <Section title="שאלות נפוצות (FAQ)">
        {draft.faq.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl ring-1 ring-ink-100 p-4 space-y-2 bg-cream-50/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-600">שאלה #{i + 1}</span>
              {draft.faq.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "faq",
                      draft.faq.filter((_, idx) => idx !== i)
                    )
                  }
                  className="text-xs text-brand-600 hover:underline"
                >
                  הסרה
                </button>
              )}
            </div>
            <input
              value={item.q}
              onChange={(e) => {
                const faq = [...draft.faq];
                faq[i] = { ...faq[i], q: e.target.value };
                update("faq", faq);
              }}
              className="input"
              placeholder="שאלה"
            />
            <textarea
              value={item.a}
              onChange={(e) => {
                const faq = [...draft.faq];
                faq[i] = { ...faq[i], a: e.target.value };
                update("faq", faq);
              }}
              className="input min-h-[80px]"
              placeholder="תשובה"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => update("faq", [...draft.faq, { q: "", a: "" }])}
          className="btn-ghost text-sm"
        >
          <Plus className="h-4 w-4" />
          הוספת שאלה
        </button>
      </Section>

      <Section title="CTA — קריאה לפעולה">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="כותרת">
            <input
              value={draft.cta.title}
              onChange={(e) =>
                update("cta", { ...draft.cta, title: e.target.value })
              }
              className="input"
            />
          </Field>
          <Field label="טקסט הכפתור">
            <input
              value={draft.cta.buttonLabel}
              onChange={(e) =>
                update("cta", { ...draft.cta, buttonLabel: e.target.value })
              }
              className="input"
            />
          </Field>
        </div>
        <Field label="תיאור (משפט אחד)">
          <input
            value={draft.cta.description}
            onChange={(e) =>
              update("cta", { ...draft.cta, description: e.target.value })
            }
            className="input"
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="קישור (URL)">
            <input
              value={draft.cta.buttonUrl}
              onChange={(e) =>
                update("cta", { ...draft.cta, buttonUrl: e.target.value })
              }
              className="input ltr"
            />
          </Field>
          <Field label="סוג">
            <select
              value={draft.cta.variant}
              onChange={(e) =>
                update("cta", {
                  ...draft.cta,
                  variant: e.target.value as Article["cta"]["variant"]
                })
              }
              className="input"
            >
              <option value="whatsapp">WhatsApp inquiry</option>
              <option value="community">WhatsApp community</option>
              <option value="packages">Packages page</option>
            </select>
          </Field>
        </div>
      </Section>

      <Section title="קישורים פנימיים">
        <Field label="חבילות קשורות (slugs, פסיקים)">
          <input
            value={(draft.relatedPackages ?? []).join(", ")}
            onChange={(e) =>
              update(
                "relatedPackages",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            className="input ltr"
            placeholder="birthday-basic, premium, summer-water"
          />
        </Field>
        <Field label="מאמרים קשורים (slugs, פסיקים)">
          <input
            value={(draft.relatedArticles ?? []).join(", ")}
            onChange={(e) =>
              update(
                "relatedArticles",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            className="input ltr"
            placeholder="choose-inflatable-by-age, yard-birthday-inflatable-checklist"
          />
        </Field>
      </Section>

      <Section title="פרסום">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={draft.isPublished}
            onChange={(e) => update("isPublished", e.target.checked)}
            className="h-4 w-4 accent-brand-500"
          />
          <span className="text-sm text-ink-700">
            פרסום באתר (אחרת — שמירה כטיוטה)
          </span>
        </label>
      </Section>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/articles")}
          className="btn-ghost"
        >
          ביטול
        </button>
        <button type="submit" className="btn-brand">
          <Save className="h-4 w-4" />
          שמירת מאמר
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
        {hint && (
          <span className="text-xs text-ink-400 font-normal">({hint})</span>
        )}
      </span>
      {children}
    </label>
  );
}

