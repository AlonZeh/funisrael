"use client";

import { ScrollText } from "lucide-react";
import { TERMS_INTRO_PARAGRAPH, termsSections } from "@/lib/terms-content";

/**
 * Inline scrollable Terms-of-Service box, designed to be embedded
 * inside the reservation contact step right above the mandatory
 * acceptance checkbox.
 *
 * The box renders the full FUN-ISRAEL ToS structurally (paragraphs +
 * bullets) so users can read every chapter without leaving the page.
 */
export function TermsScrollBox() {
  return (
    <section
      aria-labelledby="terms-scroll-title"
      className="rounded-2xl bg-white ring-1 ring-ink-200 overflow-hidden shadow-soft"
    >
      <header className="px-4 py-3 bg-cream-100 border-b border-ink-100 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-brand-600 ring-1 ring-ink-100 shrink-0">
          <ScrollText className="h-4 w-4" />
        </span>
        <div className="flex-1 min-w-0">
          <p
            id="terms-scroll-title"
            className="font-display font-bold text-ink-800 text-sm leading-tight"
          >
            תקנון FUN-ISRAEL — קראו לפני סימון האישור
          </p>
          <p className="text-[11px] text-ink-500 mt-0.5 leading-tight">
            גללו בתוך התיבה כדי לקרוא את המסמך המלא. הסימון נדרש להמשך.
          </p>
        </div>
      </header>

      <div
        className="max-h-[300px] overflow-y-auto px-4 py-4 text-[13px] leading-relaxed text-ink-700 space-y-4 scroll-smooth"
        role="region"
        aria-label="תוכן תקנון FUN-ISRAEL"
        tabIndex={0}
      >
        <p className="text-ink-700">{TERMS_INTRO_PARAGRAPH}</p>

        {termsSections.map((section) => (
          <article key={section.id} className="space-y-2">
            <h3 className="font-display font-bold text-ink-800 text-[13px]">
              {section.title}
            </h3>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-ink-700">
                {p}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-1.5 ps-4">
                {section.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-ink-700"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-brand-500 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}

        <p className="text-[11px] text-ink-500 pt-2 border-t border-ink-100">
          הגעת לסוף המסמך. סמן את תיבת האישור למטה כדי להמשיך.
        </p>
      </div>
    </section>
  );
}
