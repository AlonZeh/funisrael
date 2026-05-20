"use client";

import { Accessibility, Mail, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useLocale, useTranslations } from "@/lib/i18n/hooks";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/utils";

const CONTENT = {
  he: {
    eyebrow: "נגישות",
    title: "הצהרת נגישות",
    intro:
      "אנו ב-FUN-ISRAEL רואים בנגישות חלק בלתי נפרד מהשירות שלנו, ומחויבים לאפשר חוויה נוחה לכל המבקרים באתר.",
    sections: [
      {
        title: "מה כבר עשינו",
        items: [
          "האתר נבנה לפי עקרונות WCAG 2.1 ברמה AA, ככל שניתן.",
          "תפריט נגישות מובנה: שינוי גודל טקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים ועצירת אנימציות.",
          "תמיכה בקורא מסך — תגיות aria, היררכיית כותרות נכונה, טקסטים חלופיים לתמונות.",
          "ניווט מלא במקלדת, כולל מצב פוקוס ברור.",
          "תמיכה ב-RTL מלאה בעברית."
        ]
      },
      {
        title: "מה עוד אנחנו עושים",
        items: [
          "אנו ממשיכים לבדוק את האתר ולעדכן אותו על בסיס משוב משתמשים.",
          "האתר עובר התאמות שוטפות בהתאם לטכנולוגיות סיוע חדשות."
        ]
      }
    ],
    contactTitle: "נתקלתם בבעיית נגישות?",
    contactBody:
      "אנו מזמינים אתכם לפנות אלינו ונשמח לטפל מהר ככל האפשר. אפשר בוואטסאפ, בטלפון, או במייל.",
    note:
      "הצהרה זו ניתנה לאור עקרונות הנגישות שלנו ואינה מהווה אישור פורמלי. אנו פועלים לעדכון ההצהרה לאחר ביקורת נגישות חיצונית."
  },
  en: {
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    intro:
      "At FUN-ISRAEL, accessibility is a core part of our service. We're committed to creating a comfortable experience for every visitor.",
    sections: [
      {
        title: "What we've done",
        items: [
          "The site follows WCAG 2.1 AA principles wherever feasible.",
          "Built-in accessibility menu: text resize, high contrast, grayscale, link highlighting, and motion pausing.",
          "Screen-reader friendly — aria tags, proper heading order, alt text on images.",
          "Full keyboard navigation with visible focus states.",
          "Full RTL support for Hebrew."
        ]
      },
      {
        title: "What we keep doing",
        items: [
          "We continuously audit the site and update it based on user feedback.",
          "We adapt to new assistive technologies as they emerge."
        ]
      }
    ],
    contactTitle: "Spotted an accessibility issue?",
    contactBody:
      "We'd love to hear from you and address it as soon as possible. WhatsApp, phone, or email — whichever works for you.",
    note:
      "This statement reflects our internal accessibility principles. It is not a formal certification — we are working towards an external accessibility audit."
  },
  ru: {
    eyebrow: "Доступность",
    title: "Заявление о доступности",
    intro:
      "В FUN-ISRAEL доступность — часть нашего сервиса. Мы стремимся обеспечить комфортный опыт для каждого посетителя.",
    sections: [
      {
        title: "Что мы уже сделали",
        items: [
          "Сайт построен по принципам WCAG 2.1 уровня AA в максимально возможной мере.",
          "Встроенное меню доступности: изменение размера текста, высокий контраст, чёрно-белый, подчёркивание ссылок и остановка анимаций.",
          "Поддержка скринридеров — aria-теги, правильная иерархия заголовков, alt-тексты.",
          "Полная навигация с клавиатуры с видимым фокусом.",
          "Полная поддержка RTL для иврита."
        ]
      },
      {
        title: "Что мы делаем постоянно",
        items: [
          "Регулярно проверяем сайт и обновляем его по отзывам пользователей.",
          "Адаптируем сайт под новые вспомогательные технологии."
        ]
      }
    ],
    contactTitle: "Заметили проблему доступности?",
    contactBody:
      "Напишите нам, и мы исправим её как можно быстрее. WhatsApp, телефон или email — на ваш выбор.",
    note:
      "Это заявление отражает наши внутренние принципы. Это не формальный сертификат — мы работаем над внешним аудитом доступности."
  }
} as const;

export function AccessibilityStatementContent() {
  const locale = useLocale();
  const t = useTranslations();
  const c = CONTENT[locale];

  const waMessage =
    locale === "he"
      ? "היי, נתקלתי בבעיית נגישות באתר"
      : locale === "ru"
        ? "Здравствуйте, я столкнулся с проблемой доступности на сайте"
        : "Hi, I encountered an accessibility issue on your website";

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.intro} />
      <section className="container-page pb-20">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {c.sections.map((s) => (
              <div key={s.title} className="card-surface p-6">
                <h2 className="heading-3 mb-3 flex items-center gap-2">
                  <Accessibility className="h-5 w-5 text-brand-500" />
                  {s.title}
                </h2>
                <ul className="space-y-2 text-ink-700">
                  {s.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-xs text-ink-400">{c.note}</p>
          </div>

          <aside className="card-surface p-6 space-y-4 h-fit">
            <h3 className="font-display font-extrabold text-ink-800">
              {c.contactTitle}
            </h3>
            <p className="text-sm text-ink-600">{c.contactBody}</p>
            <a
              href={buildWhatsAppLink(siteConfig.whatsapp, waMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp w-full"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a href={`tel:${siteConfig.phone}`} className="btn-ghost w-full">
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
            <a
              href="mailto:hello@fun-israel.com"
              className="btn-ghost w-full"
            >
              <Mail className="h-4 w-4" />
              hello@fun-israel.com
            </a>
            <p className="text-xs text-ink-400">{t.a11y.contactForA11y}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
