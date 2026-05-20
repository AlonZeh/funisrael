"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "./language-switcher";
import { CartNavIcon } from "./cart-nav-icon";
import { useLocale, useTranslations } from "@/lib/i18n/hooks";
import { localizePath } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();
  const t = useTranslations();

  const nav = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.catalog, href: "/catalog" },
    { label: t.nav.packages, href: "/packages" },
    { label: t.nav.water, href: "/categories/water" },
    { label: t.nav.toddler, href: "/categories/toddler" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.faq, href: "/faq" },
    { label: t.nav.terms, href: "/terms" },
    { label: t.nav.contact, href: "/contact" }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all",
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:bg-ink-800 focus:text-white focus:rounded-xl focus:px-3 focus:py-2"
      >
        {locale === "he"
          ? "דלג לתוכן"
          : locale === "ru"
            ? "Перейти к содержимому"
            : "Skip to content"}
      </a>

      <div className="container-page flex h-16 md:h-20 items-center justify-between gap-3">
        <Link href={localizePath("/", locale)} aria-label="FUN-ISRAEL" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={localizePath(link.href, locale)}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink-600 hover:text-ink-800 hover:bg-cream-100 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden xl:inline-flex btn-ghost"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{siteConfig.phone}</span>
          </a>
          <LanguageSwitcher compact />
          <CartNavIcon />
          <Link
            href={localizePath("/cart", locale)}
            className="hidden xl:inline-flex btn-brand"
          >
            {t.cta.bookNow}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-ink-100"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute inset-x-0 top-full bg-white shadow-card border-t border-ink-100"
          >
            <div className="container-page py-4 grid gap-1">
              {nav.map((link) => (
                <Link
                  key={link.href}
                  href={localizePath(link.href, locale)}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-ink-700 hover:bg-cream-100"
                >
                  {link.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-3">
                <a href={`tel:${siteConfig.phone}`} className="btn-ghost">
                  <Phone className="h-4 w-4" />
                  {t.cta.callUs}
                </a>
                <Link
                  href={localizePath("/cart", locale)}
                  className="btn-brand"
                  onClick={() => setOpen(false)}
                >
                  עגלת שיריון
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
