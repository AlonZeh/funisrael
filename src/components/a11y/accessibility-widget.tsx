"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AArrowDown,
  AArrowUp,
  Accessibility,
  Contrast,
  Link as LinkIcon,
  PauseCircle,
  Palette,
  RefreshCcw,
  X
} from "lucide-react";
import { useLocale, useTranslations } from "@/lib/i18n/hooks";
import { cn } from "@/lib/utils";

interface A11ySettings {
  fontStep: number; // 0..4 (each step = +12.5%)
  highContrast: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
  pauseAnimations: boolean;
}

const DEFAULTS: A11ySettings = {
  fontStep: 0,
  highContrast: false,
  grayscale: false,
  underlineLinks: false,
  pauseAnimations: false
};

const STORAGE_KEY = "fun-israel:a11y";

function applySettings(s: A11ySettings) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;

  const fontScale = 1 + s.fontStep * 0.125;
  html.style.setProperty("font-size", `${100 * fontScale}%`);

  html.classList.toggle("a11y-contrast", s.highContrast);
  html.classList.toggle("a11y-grayscale", s.grayscale);
  html.classList.toggle("a11y-underline-links", s.underlineLinks);
  html.classList.toggle("a11y-no-motion", s.pauseAnimations);
}

export function AccessibilityWidget() {
  const locale = useLocale();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as A11ySettings;
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applySettings(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings, hydrated]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function update<K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function reset() {
    setSettings(DEFAULTS);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.a11y.openMenu}
        className="fixed bottom-[5.5rem] md:bottom-6 right-4 z-40 h-12 w-12 rounded-full bg-ink-800 text-white shadow-card hover:bg-ink-700 grid place-items-center focus:outline-none focus:ring-2 focus:ring-brand-400"
      >
        <Accessibility className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.aside
              ref={panelRef}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.18 }}
              role="dialog"
              aria-modal="true"
              aria-label={t.a11y.title}
              className="fixed bottom-24 md:bottom-20 right-4 z-50 w-[min(360px,calc(100vw-2rem))] rounded-3xl bg-white shadow-hover ring-1 ring-ink-100 overflow-hidden"
              dir={locale === "he" ? "rtl" : "ltr"}
            >
              <header className="flex items-center justify-between px-5 py-4 border-b border-ink-100 bg-cream-50">
                <div className="flex items-center gap-2">
                  <Accessibility className="h-5 w-5 text-brand-500" />
                  <h2 className="font-display font-extrabold text-ink-800">
                    {t.a11y.title}
                  </h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.a11y.closeMenu}
                  className="p-1.5 rounded-full hover:bg-cream-100 text-ink-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="p-4 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <ActionButton
                    label={t.a11y.decreaseText}
                    icon={<AArrowDown className="h-4 w-4" />}
                    onClick={() =>
                      update("fontStep", Math.max(0, settings.fontStep - 1))
                    }
                    disabled={settings.fontStep === 0}
                  />
                  <ActionButton
                    label={t.a11y.increaseText}
                    icon={<AArrowUp className="h-4 w-4" />}
                    onClick={() =>
                      update("fontStep", Math.min(4, settings.fontStep + 1))
                    }
                    disabled={settings.fontStep === 4}
                  />
                </div>

                <ToggleButton
                  label={t.a11y.highContrast}
                  icon={<Contrast className="h-4 w-4" />}
                  active={settings.highContrast}
                  onClick={() => update("highContrast", !settings.highContrast)}
                />
                <ToggleButton
                  label={t.a11y.grayscale}
                  icon={<Palette className="h-4 w-4" />}
                  active={settings.grayscale}
                  onClick={() => update("grayscale", !settings.grayscale)}
                />
                <ToggleButton
                  label={t.a11y.highlightLinks}
                  icon={<LinkIcon className="h-4 w-4" />}
                  active={settings.underlineLinks}
                  onClick={() =>
                    update("underlineLinks", !settings.underlineLinks)
                  }
                />
                <ToggleButton
                  label={t.a11y.pauseAnimations}
                  icon={<PauseCircle className="h-4 w-4" />}
                  active={settings.pauseAnimations}
                  onClick={() =>
                    update("pauseAnimations", !settings.pauseAnimations)
                  }
                />

                <button
                  type="button"
                  onClick={reset}
                  className="w-full mt-2 inline-flex items-center justify-center gap-1.5 rounded-2xl px-3 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50 transition"
                >
                  <RefreshCcw className="h-4 w-4" />
                  {t.a11y.reset}
                </button>
              </div>
              <footer className="px-4 pb-4 text-[11px] text-ink-400 leading-relaxed">
                {locale === "he"
                  ? "לדיווח על בעיית נגישות: 050-933-1313"
                  : locale === "ru"
                    ? "Сообщить о проблеме доступности: 050-933-1313"
                    : "Report an accessibility issue: 050-933-1313"}
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
  disabled
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-cream-100 text-ink-700 px-3 py-2.5 text-sm font-medium hover:bg-cream-200 disabled:opacity-50"
    >
      {icon}
      {label}
    </button>
  );
}

function ToggleButton({
  label,
  icon,
  active,
  onClick
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "w-full flex items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium ring-1 transition",
        active
          ? "bg-ink-800 text-white ring-ink-800"
          : "bg-white text-ink-700 ring-ink-100 hover:bg-cream-50"
      )}
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span
        className={cn(
          "inline-block h-5 w-9 rounded-full p-0.5 transition",
          active ? "bg-brand-500" : "bg-ink-200"
        )}
        aria-hidden
      >
        <span
          className={cn(
            "block h-4 w-4 rounded-full bg-white shadow transition-transform",
            active ? "translate-x-4" : "translate-x-0"
          )}
        />
      </span>
    </button>
  );
}
