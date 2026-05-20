"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "@/lib/i18n/hooks";
import { communityPopupConfig } from "@/lib/community-config";
import { useCommunityPopup } from "@/hooks/use-community-popup";

export function CommunityPopup() {
  const locale = useLocale();
  const t = useTranslations();
  const { open, dismiss, markJoined } = useCommunityPopup();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  function handleJoin() {
    if (typeof window !== "undefined") {
      window.open(
        communityPopupConfig.communityWhatsAppLink,
        "_blank",
        "noopener,noreferrer"
      );
    }
    markJoined();
  }

  if (!communityPopupConfig.enabled) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Heavier backdrop draws attention */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink-900/55 backdrop-blur-md"
            onClick={dismiss}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-popup-title"
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            dir={locale === "he" ? "rtl" : "ltr"}
            className="fixed z-[61] bottom-0 inset-x-0 md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[540px] md:max-w-[calc(100vw-2rem)]"
          >
            {/* Halo glow behind the card for prominence */}
            <div
              className="absolute -inset-2 rounded-t-[2.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-brand-300/40 via-mint-300/30 to-sun-300/40 blur-2xl -z-10"
              aria-hidden
            />

            <div className="relative rounded-t-4xl md:rounded-4xl overflow-hidden shadow-hover ring-2 ring-brand-200">
              {/* Top accent bar with pulse */}
              <div className="relative h-2 bg-gradient-to-r from-brand-500 via-sun-400 to-mint-500">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-y-0 w-1/3 bg-white/40 blur-sm"
                  aria-hidden
                />
              </div>

              <div className="relative bg-gradient-to-br from-brand-50 via-cream-50 to-mint-50 p-6 md:p-8">
                {/* Sparkle accents */}
                <div className="absolute top-4 start-4 opacity-60" aria-hidden>
                  <Sparkles className="h-5 w-5 text-brand-500" />
                </div>
                <div className="absolute bottom-6 end-12 opacity-50" aria-hidden>
                  <Sparkles className="h-4 w-4 text-sun-500" />
                </div>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={dismiss}
                  aria-label={t.community.close}
                  className="absolute top-3 end-3 grid h-10 w-10 place-items-center rounded-full bg-white text-ink-600 hover:bg-cream-100 focus:outline-none focus:ring-2 focus:ring-brand-400 shadow-soft"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Brand chip */}
                <div className="flex items-center gap-2 mb-3">
                  <motion.span
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 280 }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-whatsapp text-white shadow-glow"
                  >
                    <MessageCircle className="h-6 w-6" />
                  </motion.span>
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-bold tracking-wide text-ink-700 ring-1 ring-ink-100">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                      </span>
                      FUN-ISRAEL Community
                    </span>
                  </div>
                </div>

                <h2
                  id="community-popup-title"
                  className="font-display font-black text-2xl md:text-3xl text-ink-800 leading-tight text-balance"
                >
                  {t.community.headline}
                </h2>
                <p className="mt-3 text-sm md:text-base text-ink-600 leading-relaxed">
                  {t.community.subheadline}
                </p>

                <ul className="mt-4 grid gap-1.5 text-sm md:text-[15px]">
                  {[
                    t.community.benefit1,
                    t.community.benefit2,
                    t.community.benefit3,
                    t.community.benefit4
                  ].map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-ink-700"
                    >
                      <Check className="h-4 w-4 text-mint-600 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {communityPopupConfig.showLaunchCoupon && (
                  <div className="mt-5 rounded-2xl bg-white/90 ring-2 ring-brand-200 p-3.5 text-sm shadow-soft">
                    <p className="text-ink-700 leading-relaxed">
                      {t.community.couponText}
                    </p>
                    <p className="mt-1.5 inline-flex items-center gap-2">
                      <span className="text-xs text-ink-500">
                        {t.community.couponLabel}
                      </span>
                      <span className="font-display font-black text-brand-600 tracking-[0.2em] text-lg ltr">
                        {communityPopupConfig.couponCode}
                      </span>
                    </p>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2.5">
                  <button
                    type="button"
                    onClick={handleJoin}
                    className="btn-whatsapp w-full py-3.5 text-base font-bold shadow-glow"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {t.community.cta}
                  </button>
                  <button
                    type="button"
                    onClick={dismiss}
                    className="btn-ghost w-full"
                  >
                    {t.community.close}
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-ink-500 text-center">
                  {t.community.noSpam}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
