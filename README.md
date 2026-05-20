# FUN-ISRAEL

> Premium inflatable rentals for modern Israeli families.

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Zustand
Multilingual (Hebrew RTL · English · Russian) · Built-in admin panel · Accessibility widget · Community WhatsApp popup.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

`.env.example` → copy to `.env.local` and fill in values.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (set to live domain after deploy) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | E.g. `972509331313` |
| `NEXT_PUBLIC_PHONE_NUMBER` | Display phone number |
| `NEXT_PUBLIC_PICKUP_ADDRESS` | Pickup address |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin password (default `funisrael2026` — change!) |
| `RESEND_API_KEY` | Server-only. Enables `/api/reservation` to email submissions |
| `RESERVATION_NOTIFICATION_EMAIL` | Where reservation submissions go (default `zehavialon4@gmail.com`) |
| `RESERVATION_FROM_EMAIL` | Sender. Start with Resend sandbox, swap to your verified domain |

> 📘 **Going live?** See [**DEPLOYMENT.md**](./DEPLOYMENT.md) for a step-by-step
> runbook: buying a domain (`.co.il` / `.com`), deploying to Vercel (free),
> connecting DNS, setting up Resend for the reservation email pipeline, and
> verifying your sender domain.

---

## Languages

Built-in support for **Hebrew (default, RTL)**, **English (LTR)**, **Russian (LTR)**.

Routing strategy:
- Hebrew → root paths (`/`, `/packages`, `/accessibility`)
- English → `/en/*`
- Russian → `/ru/*`

A `<LocaleHtmlSync>` client component keeps `<html lang>` and `<html dir>` in sync with the active route. The `<LanguageSwitcher>` lives in the navbar — flag + native label dropdown.

### Where translations live

`src/lib/i18n/dictionaries.ts` — single dictionary for UI strings (nav, CTAs, packages copy, a11y, community popup). Three top-level keys: `he`, `en`, `ru`.

`src/lib/packages/data.ts` — every package field is `{ he, en, ru }`. Same for add-ons (`addons.ts`) and FAQ (`faqs.ts`).

> **Currently fully localized pages**: homepage, `/packages`, `/accessibility`.
> Other pages (catalog, product detail, booking, FAQ, about, etc.) remain Hebrew-only — they fall back to the locale home when switched, so users never hit 404s.
> Roadmap below covers extending coverage.

---

## Packages system

The crown of this build. See `src/lib/packages/`.

### Architecture

```
src/lib/packages/
├── types.ts         RentalPackage, PackageAddon, PackageCategory types
├── categories.ts    Category metadata (id, label.he/en/ru, emoji)
├── data.ts          ⭐ The 10-package catalog — edit prices/copy here
├── addons.ts        ⭐ Add-on catalog
├── faqs.ts          Package FAQ (multilingual)
└── whatsapp.ts      Per-package & custom WhatsApp link builders
```

### Components

```
src/components/packages/
├── package-card.tsx              Reusable card (gradient theme, badges, CTA)
├── packages-section.tsx          Homepage "Our packages" section
├── packages-grid.tsx             /packages grid with category filter
├── package-filters.tsx           Filter chips
├── package-comparison.tsx        Desktop table + mobile stacked cards
├── package-addons-section.tsx    Add-ons grid + "build custom package" CTA
├── package-faq.tsx               Package FAQ accordion
├── package-cta.tsx               Bottom conversion banner
└── packages-page-content.tsx     Composition for /packages page
```

### Pages

- `/packages` — Hebrew dedicated packages page
- `/en/packages` — English
- `/ru/packages` — Russian
- `/admin/packages` — admin mock + onboarding instructions

### Edit a package (today)

1. Open `src/lib/packages/data.ts`
2. Locate the package by `id` (e.g. `birthday-basic`)
3. Update `priceFrom`, `priceLabel.he/en/ru`, `title.*`, etc.
4. Save — Next.js dev hot-reloads
5. To **hide**: set `isActive: false`
6. To **reorder**: change `sortOrder` (smaller = earlier)
7. To **feature on homepage**: set `isFeatured: true` (up to 3)
8. To **mark popular**: set `isPopular: true`

### Add a package

Copy any existing entry in `data.ts`, give it a unique `id` and `slug`, fill all three locales, set `sortOrder`, push to the array. Done.

### Add an add-on

Same approach in `src/lib/packages/addons.ts`. Set `compatibleCategories` to control which packages surface it.

### WhatsApp per package

Each package has a `whatsappTemplate.{he,en,ru}` field. `packageWhatsAppLink(pkg, locale)` builds the encoded URL. The popup, cards, comparison table, and CTA banner all use this helper consistently.

---

## Accessibility

### Built-in toolbar

`src/components/a11y/accessibility-widget.tsx` — a floating button (bottom-right, opposite the WhatsApp/booking buttons) that opens a panel offering:

- Increase / decrease text (5 steps)
- High contrast
- Grayscale
- Highlight links
- Pause animations
- Reset

Preferences are persisted in `localStorage` (`fun-israel:a11y`) and applied via CSS classes on `<html>` (see `globals.css`). The widget respects `prefers-reduced-motion` automatically.

The toolbar is multilingual — labels come from `dictionaries.a11y`.

### Accessibility statement page

- `/accessibility` (Hebrew)
- `/en/accessibility` (English)
- `/ru/accessibility` (Russian)

Content lives in `src/components/a11y/accessibility-statement.tsx`. The statement is **responsibly worded** — it describes our principles and offers a contact channel (WhatsApp / phone / email), but does NOT claim formal certification.

### Other a11y measures

- Skip-to-content link in the navbar
- `:focus-visible` outlines via globals
- Aria labels on icon buttons & dialogs
- Semantic HTML, heading hierarchy
- Keyboard support: dropdowns close on outside-click, dialogs close on Escape

---

## WhatsApp community popup + inline banners

The community CTA lives in **two complementary surfaces**:

1. **Floating popup** — `src/components/marketing/community-popup.tsx`
2. **Inline `CommunityBanner`** — `src/components/marketing/community-banner.tsx` (three variants)

Config: `src/lib/community-config.ts`
Hook: `src/hooks/use-community-popup.ts`

### Floating popup — current behavior (capped at 2 per session)

The popup is **throttled to max 2 appearances per browser tab session** so it stays prominent without being naggy.

- **1st show**: on site entry — any page, **2.5s after page load** (`delayMs`). The user must click the **X** to continue scrolling.
- **2nd show**: only when the user **enters the reservation flow** (`/cart` or `/reserve`), 2.5s after that page mounts.
- Show counter lives in `sessionStorage` (`funisrael_community_popup_shown_count`) — cleared when the tab closes, so a true new visit gets a fresh quota.
- After 2 shows in a session, the popup never re-opens until the next visit.
- Clicking the **X** closes the popup for the current view. The count only increments when the popup actually opens, so the user always gets up to 2 real chances per session.
- Clicking **"Join"** permanently suppresses the popup for this browser (`funisrael_community_popup_joined` in `localStorage`). That is the only way to stop seeing it across future visits.
- Mobile: full-width bottom sheet. Desktop: centered modal (~540px wide).
- Multilingual (he / en / ru) — copy from `dictionaries.community`.
- Closes on Escape, outside click, or X button.
- Optional launch coupon row (`FUN50`) toggled by `showLaunchCoupon`.

### Floating popup — visual prominence

- Heavier backdrop (`bg-ink-900/55` + `backdrop-blur-md`).
- Halo glow behind the card (brand → mint → sun gradient blur).
- Top accent strip with a continuous shimmer animation.
- Live status dot ("ping") next to the FUN-ISRAEL Community chip.
- Animated WhatsApp icon entrance.
- Larger headline (24–30px), bolder weight, `text-balance`.
- Wider modal on desktop (~540px) for higher impact.

### Inline `CommunityBanner` — three variants

Drop the banner into any page where the popup alone isn't enough. The component is fully static / SSR-safe and pulls all config from `communityPopupConfig`.

```tsx
<CommunityBanner />                       // default: "hero" variant
<CommunityBanner variant="inline" />      // mid-width horizontal banner
<CommunityBanner variant="compact" />     // small card (good for sidebars)
```

| Variant | Where it's placed today |
|---------|-------------------------|
| `hero` | Homepage (between Featured Products and Blog Teaser) · Packages page (between Add-ons and FAQ) · Blog index (below the article list) |
| `inline` | Empty cart state · Reservation success page (under success card) |
| `compact` | Cart page sidebar (below the trust info card) |

Each variant supports `title` / `description` / `ctaLabel` / `href` overrides for one-off placements.

### Owner config (single source of truth)

`src/lib/community-config.ts`:

```ts
export const communityPopupConfig = {
  enabled: true,                                                                  // turn popup off site-wide
  communityWhatsAppLink: "https://chat.whatsapp.com/JhjRrNzPjss6mMmUOnrwkY?mode=gi_t",
  secondaryCommunityLink: "https://chat.whatsapp.com/IcpKfgbliUDAHrVNMNaGSS",
  delayMs: 2500,                                                                  // popup show delay on triggering pages
  maxShowsPerSession: 2,                                                          // cap per browser-tab session
  showLaunchCoupon: true,
  couponCode: "FUN50"
};
```

> The inline `CommunityBanner` honors `communityWhatsAppLink` by default and is **never** suppressed by the "joined" flag — it stays visible to all users as a permanent reminder.

---

## Admin panel

`/admin` (default password `funisrael2026`).

Sections:
- **סקירה** — dashboard stats
- **מוצרים** — product CRUD (full)
- **חבילות** — packages mock + "how to edit" guide
- **הזמנות** — booking approvals
- **הגדרות** — JSON export/import

Packages are currently file-based (`src/lib/packages/data.ts`) — the admin mock at `/admin/packages` shows the live data with future action buttons (edit/duplicate/delete) stubbed and disabled, ready for a future CMS integration.

---

## Project structure

```
src/
├── app/                                # App Router
│   ├── layout.tsx                       — root layout (Navbar, Footer, Floating, Sticky, A11y, CommunityPopup)
│   ├── page.tsx                         — Hebrew home
│   ├── packages/                        — /packages (Hebrew)
│   ├── accessibility/                   — /accessibility (Hebrew)
│   ├── en/{page,packages,accessibility} — English route group
│   ├── ru/{page,packages,accessibility} — Russian route group
│   ├── admin/                           — admin panel
│   └── (other Hebrew pages: catalog, products, categories, booking, faq, contact, about, pickup, safety, terms, privacy, birthday-packages)
├── components/
│   ├── brand/             Logo
│   ├── layout/            Navbar, Footer, LanguageSwitcher, StickyMobileCTA, FloatingActions, LocaleHtmlSync, PageHeader
│   ├── home/              Hero, TrustStrip, CategoryGrid, FeaturedProducts, HowItWorks, Testimonials, FaqTeaser, CTABanner, LocalizedHome
│   ├── packages/          PackageCard, PackagesSection, PackagesGrid, PackageFilters, PackageComparison, PackageAddonsSection, PackageFAQ, PackageCTA, PackagesPageContent
│   ├── catalog/           CatalogView
│   ├── products/          ProductCard, ProductGrid, ProductGallery, ProductDetail, ProductsProvider
│   ├── booking/           BookingForm
│   ├── contact/           ContactForm
│   ├── faq/               FAQAccordion
│   ├── admin/             AdminShell, AdminLogin, ProductEditor, AdminPackageTable, AdminPackageFormMock
│   ├── a11y/              AccessibilityWidget, AccessibilityStatementContent
│   ├── marketing/         CommunityPopup
│   └── seo/               JSON-LD schemas
├── hooks/
│   └── use-community-popup.ts
├── lib/
│   ├── i18n/
│   │   ├── config.ts          locales, dir, localizePath helpers
│   │   ├── dictionaries.ts    UI strings × 3 locales
│   │   └── hooks.ts           useLocale, useTranslations, pickLocalized
│   ├── packages/
│   │   ├── types.ts           RentalPackage / PackageAddon / PackageCategory
│   │   ├── categories.ts      multilingual category metadata
│   │   ├── data.ts            ⭐ 10-package catalog
│   │   ├── addons.ts          ⭐ add-on catalog
│   │   ├── faqs.ts            FAQ data
│   │   └── whatsapp.ts        WhatsApp link helpers
│   ├── community-config.ts    ⭐ community popup config
│   ├── site.ts                site config (phone, address, social, etc.)
│   ├── types.ts               Product + Booking types
│   ├── seed-products.ts       8-product seed inventory
│   ├── categories.ts          product categories
│   ├── faqs.ts                site FAQs
│   └── utils.ts               cn, formatILS, buildWhatsAppLink, slugify
└── store/
    ├── product-store.ts       Zustand persist
    ├── booking-store.ts       Zustand persist
    └── admin-store.ts         simple auth
```

---

## ✅ Acceptance report

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Homepage includes premium packages section | ✅ — `PackagesSection` placed after CategoryGrid |
| 2 | Dedicated /packages page exists | ✅ Hebrew + /en + /ru |
| 3 | Reusable, data-driven `PackageCard` | ✅ |
| 4 | Packages editable from one file | ✅ — `src/lib/packages/data.ts` |
| 5 | Hide packages with `isActive: false` | ✅ |
| 6 | Sort order controlled by data | ✅ — `sortOrder` field |
| 7 | WhatsApp CTA per package (encoded message) | ✅ — `packageWhatsAppLink` |
| 8 | Fully RTL | ✅ |
| 9 | Mobile UX excellent | ✅ — bottom sheet popup, horizontal swipe cards, sticky CTA |
| 10 | No supplier names exposed | ✅ |
| 11 | No payment system | ✅ |
| 12 | Admin mock UI / scalable arch | ✅ — `/admin/packages` |
| 13 | Multilingual (HE/EN/RU) | ✅ — homepage, packages, accessibility statement, popup, a11y widget, navbar |
| 14 | Language switcher | ✅ — in navbar, mobile-friendly, keyboard accessible |
| 15 | Hebrew RTL, English/Russian LTR | ✅ — `LocaleHtmlSync` |
| 16 | Multilingual package data fields | ✅ — `LocalizedString` / `LocalizedStringArray` |
| 17 | Localized WhatsApp messages | ✅ — `whatsappTemplate.{he,en,ru}` per package |
| 18 | Accessibility widget that actually works | ✅ — 6 controls, persisted, RTL-safe |
| 19 | Accessibility statement page in 3 langs | ✅ |
| 20 | A11y button doesn't block WhatsApp | ✅ — physical right vs physical left |
| 21 | Parent-trust + child-fun balance | ✅ — age badges + childMood labels |
| 22 | Community popup, multilingual | ✅ |
| 23 | Popup delay, dismiss state, no re-spam | ✅ — 8s delay, 7d dismissal, joined-state |
| 24 | Popup doesn't block WhatsApp/a11y | ✅ — modal layer above, dismissable |
| 25 | Owner config object (no JSX edits needed) | ✅ — `src/lib/community-config.ts` |

---

---

## 🔍 Local SEO content engine (Rehovot-first)

The site now ships with a full content layer targeted at parents searching for inflatable rentals in Rehovot and the surrounding Shfela area.

### Blog / articles system

- Public: `/blog` (index with category filter + community CTA), `/blog/[slug]` (article)
- Admin: `/admin/articles`, `/admin/articles/new`, `/admin/articles/[id]`
- Data layer: `src/lib/articles/{types,categories,seed,cta-presets}.ts`
- Store: `src/store/article-store.ts` (Zustand + localStorage, mirrors product store pattern)

Each article supports:
- Title, slug (auto), meta title, meta description, target + secondary keywords
- Cover image + alt text
- Category, tags, city, cities (local SEO)
- Structured body (H2 sections, paragraphs, bullets, callouts — tip / warning / info)
- Parent checklist block
- FAQ repeater
- CTA block (WhatsApp inquiry, community link, or packages page)
- Related packages, related articles
- Published / draft toggle, reading time, author, publish & update dates

JSON-LD: `Article`, `FAQPage`, `BreadcrumbList` on every article page.

### How to add / edit articles

**Via admin UI** (recommended for content owners):
1. `/admin` → log in → side nav → **מאמרים**
2. Click "מאמר חדש" or edit an existing row
3. The editor has structured sections for SEO, body, FAQ, CTA, related links, publish status
4. Saves to localStorage — visible immediately on `/blog`

**Via code** (recommended for bulk authoring):
1. Edit `src/lib/articles/seed.ts`
2. Add a new entry following the existing shape
3. Save — Next.js dev hot-reloads

### The 20 published Hebrew articles (Rehovot-optimised SEO cluster)

**Wave 1 — original launch set**

| # | Slug | Target keyword | Category |
|---|------|----------------|----------|
| 1 | `hashkarat-mitnapchim-rehovot-birthday-guide` | השכרת מתנפחים ברחובות | רחובות והסביבה |
| 2 | `choose-inflatable-by-age` | מתנפח ליום הולדת | ימי הולדת |
| 3 | `water-inflatables-summer-rehovot` | מתנפחי מים להשכרה ברחובות | מתנפחי מים |
| 4 | `kids-birthday-package-rehovot` | חבילת יום הולדת לילדים ברחובות | חבילות |
| 5 | `toddler-inflatables-safe-birthday` | מתנפחים לפעוטות | בטיחות |
| 6 | `white-vs-colorful-inflatables` | מתנפח לבן ליום הולדת | ימי הולדת |
| 7 | `yard-birthday-inflatable-checklist` | השכרת מתנפחים ליום הולדת בחצר | בטיחות |
| 8 | `inflatable-rental-prices-birthday` | כמה עולה להשכיר מתנפח | חבילות |
| 9 | `inflatables-ness-ziona-yavne-gedera` | השכרת מתנפחים בנס ציונה | רחובות והסביבה |
| 10 | `home-birthday-ideas-kids` | רעיונות ליום הולדת לילדים בבית | ימי הולדת |

**Wave 2 — topical authority expansion**

| # | Slug | Target keyword | Category |
|---|------|----------------|----------|
| 11 | `small-yard-inflatables-birthday` | מתנפחים לחצר קטנה | ימי הולדת |
| 12 | `winter-inflatable-rentals-birthday` | השכרת מתנפחים בחורף | ימי מפתח ועונות |
| 13 | `water-vs-dry-inflatables` | מתנפחי מים או מתנפחים יבשים | מתנפחי מים |
| 14 | `kids-birthday-schedule-guide` | איך לתכנן יום הולדת לילדים | מדריכים להורים |
| 15 | `inflatable-safety-parent-checklist` | בטיחות במתנפחים לילדים | בטיחות |
| 16 | `premium-birthday-package-photos` | חבילת יום הולדת פרימיום | חבילות |
| 17 | `inflatable-rentals-family-events` | השכרת מתנפחים לאירוע משפחתי | אירועים |
| 18 | `inflatables-ages-3-6-guide` | מתנפחים לגילאי 3-6 | גילאים |
| 19 | `inflatable-rentals-shfela-area` | השכרת מתנפחים בשפלה | רחובות והסביבה |
| 20 | `inflatables-vs-birthday-operator` | מתנפח או מפעיל ליום הולדת | מדריכים להורים |

**Wave 3 — ages, key dates, AI-answer-friendly planning content**

| # | Slug | Target keyword | Category |
|---|------|----------------|----------|
| 21 | `birthday-age-4-inflatable-guide` | יום הולדת גיל 4 | ימי הולדת לפי גיל |
| 22 | `birthday-age-5-inflatable-guide` | יום הולדת גיל 5 | ימי הולדת לפי גיל |
| 23 | `birthday-age-6-before-first-grade` | יום הולדת גיל 6 | ימי הולדת לפי גיל |
| 24 | `summer-birthday-kids-planning` | יום הולדת קיץ לילדים | ימי מפתח ועונות |
| 25 | `end-of-year-kids-party-inflatables` | יום הולדת סוף שנה לילדים | ימי מפתח ועונות |
| 26 | `passover-vacation-kids-birthday` | יום הולדת בחופשת פסח | ימי מפתח ועונות |
| 27 | `summer-vacation-birthday-inflatables` | יום הולדת בחופש הגדול | ימי מפתח ועונות |
| 28 | `joint-birthday-two-kids` | יום הולדת משותף לשני ילדים | מדריכים להורים |
| 29 | `birthday-without-operator-inflatable` | יום הולדת בלי מפעיל | מדריכים להורים |
| 30 | `kids-birthday-equipment-checklist` | רשימת ציוד ליום הולדת ילדים | מדריכים להורים |

**Wave 4 — parent stress, event equipment, supplier selection**

| # | Slug | Target keyword | Category |
|---|------|----------------|----------|
| 31 | `stress-free-kids-birthday-guide` | איך לארגן יום הולדת לילדים בלי לחץ | מדריכים להורים |
| 32 | `last-minute-kids-birthday` | יום הולדת ברגע האחרון | מדריכים להורים |
| 33 | `kids-birthday-equipment-rental-rehovot` | השכרת ציוד ליום הולדת ילדים ברחובות | ציוד לאירועים |
| 34 | `kids-attractions-rehovot-guide` | אטרקציות לילדים ברחובות | רחובות והסביבה |
| 35 | `questions-before-renting-inflatable` | מה לשאול לפני שמזמינים מתנפח | מדריכים להורים |
| 36 | `inflatable-equipment-small-event-package` | חבילת מתנפח וציוד לאירוע קטן | חבילות |
| 37 | `shared-building-yard-birthday` | יום הולדת בבניין משותף | מדריכים להורים |
| 38 | `smart-budget-kids-birthday` | יום הולדת לילדים בתקציב | מדריכים להורים |
| 39 | `kindergarten-party-inflatables-guide` | מסיבת גן עם מתנפחים | אירועים וקהילה |
| 40 | `choose-inflatable-supplier-rehovot` | איך לבחור ספק מתנפחים ברחובות | רחובות והסביבה |

**Wave-3 additions:**
- New category **ימי הולדת לפי גיל** (`birthday-by-age`) for the per-age cluster (articles 21-23).
- The existing `seasons` category was relabelled from "עונות ואירועים" to "ימי מפתח ועונות" (the brief's exact wording) to better cover the new key-date content. Category ID unchanged — no admin migration needed.
- New CTA preset **`ctaPlanningConsult`** in `src/lib/articles/cta-presets.ts` — the recommended planning-consult block used across most wave-3 articles ("רוצים להתאים חבילה ליום ההולדת שלכם?" → "דברו עם FUN-ISRAEL בוואטסאפ").
- Every wave-3 article includes the required structural sections: H1, intro, 5-8 H2 sections, **"למי זה מתאים?"**, **"מתי זה פחות מתאים?"**, **"איך FUN-ISRAEL יכולה לעזור?"**, parent checklist, 4-6 FAQs, CTA, related packages, related articles. The FAQ answers are written **answer-first** for AI-search extraction.

**Wave-4 additions:**
- New category **ציוד לאירועים** (`event-equipment`) for the equipment-rental cluster (article 33).
- The existing `events` category was relabelled from "אירועים" to "אירועים וקהילה" to cover community events like kindergarten parties (article 39). Category ID unchanged.
- Every wave-4 article uses a **varied, inline CTA** (no shared preset) — different title/description/button label per article — so the CTAs feel natural to each topic and avoid feeling templated across the cluster.
- Required sections per wave-4 article: H1, direct-answer intro, 5-8 H2 sections, parent checklist, **"למי זה מתאים?"**, **"מתי זה פחות מתאים?"**, **"מה כדאי לשלוח ל-FUN-ISRAEL לפני שמקבלים המלצה?"**, 4-6 FAQ, CTA, related links. AI-answer-friendly format with direct-answer intros throughout.
- The blog index (`/blog`) was upgraded to a **4-section layout** for 40 articles with the new wave-4 cluster title **"מדריכים מהירים להורים שצריכים פתרון עכשיו"** and intro paragraph covering parent stress / equipment / suppliers.
- The blog page title and lead paragraph were rewritten as a proper landing intro: **"ברוכים הבאים למרכז המדריכים של FUN-ISRAEL"**.

**Total cluster: 40 published Hebrew articles across 11 categories.**

Existing localStorage installs are auto-migrated to receive new wave articles on first load. Zustand persist `version: 4` + idempotent `mergeNewSeeds` migration adds any seed article missing from the persisted state by ID — no duplicates, no overwrites of admin edits, runs on every version bump.

### Areas served (local SEO cluster)

- Data: `src/lib/areas.ts` — 10 cities (Rehovot, Ness Ziona, Yavne, Gedera, Mazkeret Batya, Kiryat Ekron, Beer Yaakov, Rishon LeZion, Ashdod, Modiin)
- Content: `src/lib/areas-content.ts` — per-city unique copy. Rehovot is the only `pageReady: true` for now (live at `/areas/rehovot`)
- To activate another city: write a unique `AreaContent` entry in `areas-content.ts`, set `pageReady: true` in `areas.ts`. Sitemap and footer pick it up automatically

### Homepage SEO upgrades

- New H1: **"השכרת מתנפחים פרימיום ברחובות — בלי כאב ראש להורים."**
- New `LocalSEOBlock` listing 10 service areas + pickup address
- New `BlogTeaser` section linking to the 3 newest articles
- Refreshed metadata with the Rehovot keyword cluster

### Reservation email pipeline (`/api/reservation`)

When a customer submits the reservation flow:

1. **Local state** — `useReservationStore.markSubmitted()` flips the UI to the success screen instantly (no waiting on the network).
2. **WhatsApp handoff** — the success screen surfaces a pre-filled WhatsApp message link the user can send themselves (existing behavior, unchanged).
3. **Email notification (new)** — in parallel, the page POSTs the reservation state to `/api/reservation`. The Node-runtime route validates the payload and sends a formatted HTML email via Resend to your inbox. The `keepalive: true` fetch flag ensures the request completes even if the user closes the tab.

**The email itself** (`src/lib/reservation/email.ts`) is mobile-friendly RTL HTML with:
- Brand gradient header + subject `🎈 בקשת שיריון חדשה — [שם] — [תאריך]`
- Items table with price + quantity columns
- Customer details, address (if delivery), notes
- Consent badges (📨 marketing OK / 📭 marketing not OK · ✅ WhatsApp OK / ⚠️ no WhatsApp)
- Quick-action buttons: "פתח וואטסאפ עם הלקוח" + "חיוג ישיר"
- `reply-to` set to the customer's email when provided — so you can reply directly from Gmail

**Graceful degradation:** if `RESEND_API_KEY` is missing or Resend rejects the send, the API returns `{ ok: true, notified: false }`. The form still works because the WhatsApp message is the canonical handoff — email is the bonus / paper trail.

**Files:**
- [`src/app/api/reservation/route.ts`](src/app/api/reservation/route.ts) — Node runtime POST endpoint with validation
- [`src/lib/reservation/email.ts`](src/lib/reservation/email.ts) — Subject + HTML + plain-text builders
- [`src/components/reservation/reservation-flow.tsx`](src/components/reservation/reservation-flow.tsx) — fire-and-forget fetch on submit
- [`.env.example`](.env.example) — `RESEND_API_KEY`, `RESERVATION_NOTIFICATION_EMAIL`, `RESERVATION_FROM_EMAIL`

See [DEPLOYMENT.md §6](./DEPLOYMENT.md#6-שלב-5--חיבור-טופס-השיריון-למייל-הפרטי) for the full setup walk-through (Resend account, API key, domain verification).

### Privacy Policy (`/privacy`)

A comprehensive Hebrew privacy policy aligned with the Israeli **חוק הגנת הפרטיות, התשמ"א-1981** + **חוק התקשורת (בזק ושידורים) — סעיף 30א** (direct-marketing rules).

**Discoverability (per business decision)**: the page is **NOT** in the top navbar. It's only reachable from:
- The footer "משפטי" column ("מדיניות פרטיות" → `/privacy`).
- The legal acceptance checkbox in the reservation flow contact step (clickable inline link).
- The accessibility statement and terms pages (cross-links).

**Page structure** ([src/app/privacy/page.tsx](src/app/privacy/page.tsx)):
- "עודכן לאחרונה" card with the policy date.
- Auto-generated table of contents with anchor links.
- 13 sectioned cards, each with a lucide icon: כללי · איזה מידע אנחנו אוספים · למה אנחנו משתמשים במידע · דיוור ישיר ושיווק · שיתוף מידע עם צדדים שלישיים · אופן ומשך שמירת המידע · עוגיות ואחסון מקומי · זכויות המשתמש · אבטחת מידע · אין סליקה ואין שמירת אמצעי תשלום · שימוש על ידי קטינים · שינויים במדיניות · יצירת קשר בנושאי פרטיות.
- Embedded contact card (phone + `privacy@fun-israel.com`) inside section 13.
- Closing dark-card with "רוצים שנמחק את הפרטים?" + cross-links to terms + accessibility.
- `BreadcrumbList` JSON-LD.

**Honest by design** — the policy reflects what the site actually does today:
- No payment processing / no credit-card storage.
- localStorage in the user's browser for the reservation cart + accessibility settings.
- WhatsApp handoff for the reservation request.
- No third-party marketing data sharing.

### Reservation consent model (per Israeli law)

The contact step ([`step-contact.tsx`](src/components/reservation/step-contact.tsx)) now has a clear three-tier consent block, separated to comply with Israeli marketing-law requirements (§30A — marketing opt-in must be explicit, opt-in only, and not bundled with mandatory acceptance):

1. **Operational consent** (default checked):
   _"אפשר ליצור איתי קשר בוואטסאפ לגבי זמינות ואישור הזמנה."_
2. **Legal acceptance** (required, hard-validated):
   _"קראתי ואישרתי את [תקנון ותנאי השכרת הציוד](/terms) ואת [מדיניות הפרטיות](/privacy)."_
3. **Marketing opt-in** (optional, default unchecked, never bundled with #2):
   _"אני מסכים/ה לקבל מ-FUN-ISRAEL הודעות וחומר שיווקי על חבילות, זמינות והטבות (אופציונלי — ניתן לבטל בכל עת)."_

Validation blocks submission until #2 is checked. The WhatsApp handoff message now includes whether marketing was accepted (`📨` / `📭` line) so the business knows whether they're allowed to add this customer to promotional broadcasts.

State additions:
- `ReservationCustomerDetails.marketingConsent: boolean` ([types.ts](src/lib/reservation/types.ts))
- `DEFAULT_CUSTOMER.marketingConsent: false` — must be explicitly opted-in by the user

### Terms & Conditions page (`/terms`)

The `/terms` route has been rebuilt as a polished, mobile-first, RTL Hebrew page that replaces the simpler legal article from the first build.

**Structure** (top to bottom):
- Hero with title "תקנון ותנאי השכרת ציוד" + two WhatsApp CTAs (question / community)
- "חשוב לדעת" callout block — renter responsibility + uninsured-equipment disclosure
- 6 summary cards (אחריות / בטיחות / תשלום / איסוף / מים-ולבן / ביטולים-ושימוש מסחרי), each linked to its anchor in the full sections
- Two side-by-side checklists: **לפני האיסוף** + **לפני ההחזרה**
- Full accordion with 14 sections — each with an icon, anchor (`#responsibility`, `#safety`, …), and structured paragraphs + bullets:
  אחריות על הציוד · תקופת השכירות · תשלום · תנאי שימוש · ביטולים · שימוש מסחרי · בטיחות · גנרטור · איסוף עצמי · מתנפחים רטובים · מתנפח לבן · אישור הזמנה · הצהרת שוכר/ת ציוד · פרטי יצירת קשר
- Contact card with the two business phones (אלון 050-933-1313 / יובל 054-591-6249) as `tel:` links + pickup address (רחוב ההתיישבות 5, ראשון לציון)
- FAQ accordion (10 Q&A) + JSON-LD `FAQPage` schema
- `BreadcrumbList` schema (בית → תקנון)
- Dark gradient final CTA ("יש לכם שאלה לפני ההזמנה?") with both community links

**Editable content** lives in [`src/lib/terms-content.ts`](src/lib/terms-content.ts) — 14 sections, 10 FAQ items, 2 checklists, and contact details, all editable from a single file.

**Navigation surfaces:**
- Desktop & mobile navbar now includes **תקנון** between שאלות נפוצות and צור קשר
- Footer "משפטי" column already linked to `/terms`
- Summary cards on the page itself link to anchors in the full sections

> Note: the terms text references **רחוב ההתיישבות 5, ראשון לציון** as the pickup address (verbatim from the legal source). The rest of the site still uses **דרך יבנה 52** (the placeholder from initial scaffolding via `siteConfig.pickupAddress`). When the live business decides on the canonical pickup address, update both `src/lib/site.ts` and `src/lib/terms-content.ts` for consistency.

### Reservation flow (`/cart` + `/reserve`)

The product/package experience is built around a **reservation request** — never an online purchase. The site **does not process payments and does not store credit card data**. Customers add items to a cart, pick a date and receiving method, see related add-ons, fill basic contact details, and the request is handed off to WhatsApp for FUN-ISRAEL to confirm availability and arrange terms.

**Routes (both `noindex`):**
- `/cart` — reservation cart with quantity controls, summary, and "המשך לשיריון הציוד" CTA
- `/reserve` — 4-step flow: receiving method → date → add-ons → contact details + terms → WhatsApp success

**State:**
- `src/store/reservation-store.ts` — Zustand store with localStorage persist. Holds items (products + packages + add-ons), date, receiving method, delivery type, customer details, and submitted flag. Hydration-guarded.
- `src/lib/reservation/types.ts` — `ReservationItem`, `ReservationCustomerDetails`, `ReceivingMethod`, `DeliveryType`.

**Helpers:**
- `src/lib/reservation/recommendations.ts` — `getRecommendedAddOns(cartItems)` ranks the unified catalog (products + packages + package add-ons) by category/tag overlap, package-suggested add-ons, and price; falls back to popular items for an empty cart.
- `src/lib/reservation/whatsapp.ts` — `buildReservationWhatsAppLink(state)` builds the formatted message with date, items, receiving method, customer info, and estimated total.
- `src/lib/reservation/faqs.ts` — 8 FAQs surfaced inside the reservation flow (no payment, what's "שיריון", date holds, cancellation, pickup, delivery, insurance).

**Components (`src/components/reservation/`):**
- `add-to-reservation-button.tsx` — universal button for products / packages / addons, opens drawer on click
- `add-to-reservation-drawer.tsx` — right-side sheet (RTL): confirmation + recommended add-ons + "המשך לבחור" / "עגלת שיריון"
- `reservation-cart-view.tsx` — full cart page with quantity steppers, remove, sticky desktop summary
- `reservation-stepper.tsx` — top stepper, clickable on completed steps
- `step-receiving-method.tsx` — pickup vs delivery + delivery type radios (הלוך וחזור default)
- `step-date.tsx` + `reservation-calendar.tsx` — lightweight RTL calendar (Hebrew weekday labels, past dates disabled, "all dates currently available" notice)
- `step-addons.tsx` — recommended add-ons grid with "דלגו לשלב הבא"
- `step-contact.tsx` — full form, WhatsApp consent + **terms checkbox with link to `/terms`**
- `reservation-summary.tsx` — sticky desktop sidebar / collapsible mobile card with items, date, method, estimated total
- `reservation-success.tsx` — green success with one-click WhatsApp handoff
- `reservation-faq.tsx` — payment / cancellation / availability FAQ in the flow

**Navbar additions:**
- `src/components/layout/cart-nav-icon.tsx` — bag icon with animated badge showing live item count, links to `/cart`
- Primary "הזמינו עכשיו" CTA on navbar now points to `/cart` (was `/booking`)
- Mobile sticky bottom CTA changed: "WhatsApp" + "עגלת שיריון" (hides on `/cart`, `/reserve`, `/admin`)

**Product / package CTAs:**
- `ProductCard` — "לפרטים" link + **"לשיריון" button** (opens drawer with recommendations)
- `ProductDetail` — primary CTA replaced: "הוספה לשיריון" (was "בדיקת זמינות" → `/booking`). WhatsApp question link kept as secondary.
- `PackageCard` — primary **"הוספה לשיריון" button** + small WhatsApp ask link as tertiary

**Where add-ons come from (unified catalog):**
1. Active products (real inventory from `seed-products.ts`)
2. Active packages (from `packages/data.ts`) — packages can themselves be added to the cart and recommend their own configured add-ons
3. Active package add-ons (from `packages/addons.ts`) — small extras: bריכת כדורים, מחצלת פעילות, שער כדורגל, מאריך חשמל, etc.

**Validation:**
- Step 1 requires receiving method (+ delivery type if delivery)
- Step 2 requires a date
- Step 3 is optional (skip-able)
- Step 4 requires: שם מלא, טלפון (lenient IL format), עיר, address (only if delivery), terms checkbox

**Terms integration (per the brief):**
The contact step includes a required checkbox: **"קראתי ואישרתי את תקנון ותנאי השכרת הציוד"** — with a `target="_blank"` hyperlink to `/terms`. Submission is blocked until the box is checked.

**SEO:**
- `/cart` and `/reserve` are excluded from the sitemap and added to `robots.ts` `disallow` to keep personal flow pages out of Google.
- Product, package, and guide pages remain indexable.

**Mobile UX:**
- Drawer slides in from end, full-screen height; ESC closes; body scroll locked.
- Stepper scrolls horizontally on small screens.
- Each step page has its own bottom-sticky action bar (back + primary CTA).
- Summary sidebar collapses on mobile (tap header to expand).

### Schema map

| Schema | Component | Where |
|--------|-----------|-------|
| `LocalBusiness` | `OrganizationSchema` | Homepage, area pages |
| `Product` | `ProductSchema` | Product detail pages |
| `FAQPage` | `FAQSchema` | FAQ page + every article |
| `Article` | `ArticleSchema` | Every blog article |
| `BreadcrumbList` | `BreadcrumbSchema` | Articles, area pages |

---

## 🚀 Suggested next SEO phase

1. **City landing pages** for Rehovot, Ness Ziona, Yavne, Gedera, Mazkeret Batya, Kiryat Ekron — flip `pageReady: true` in `src/lib/areas.ts` and write unique `AreaContent` entries per city (no copy-paste). Each city should mention 2-3 wave-3/4 articles that fit its profile.
2. **"FAQ Hub" page optimised for AI search** — `/faq-hub` that aggregates every FAQ from every article (40 articles × 4-6 questions ≈ 200+ answer-first Q&A pairs) into one searchable page with broad `FAQPage` JSON-LD. AI tools (Perplexity, ChatGPT search, Gemini) will treat this as authoritative.
3. **Google Business Profile weekly post plan** — claim GBP at דרך יבנה 52 with categories ("Party equipment rental", "Children's party service"), business hours, photos. Set up a 12-week post calendar that surfaces one wave-3/4 article per week, rotating seasonal topics (Passover, summer, end of year, winter, etc.).
4. **Product image SEO + alt-text optimization** — replace Unsplash placeholders in `src/lib/seed-products.ts`, `src/lib/packages/data.ts`, and `src/lib/articles/seed.ts` with real photography. Hebrew-transliterated filenames (`mitnapeach-mayim-kayitz.jpg`), unique alt per locale, `next/image` sizes optimised for mobile.
5. **Review collection flow after each rental** — automate a WhatsApp follow-up 24h after return with a one-click Google review link. Once 20+ reviews collected, enrich `ProductSchema` with `aggregateRating` (never fabricate).
6. **Seasonal landing pages** — time-bound campaign pages that aggregate the relevant article cluster:
   - `/summer-water-rehovot-2026` (articles 3, 13, 24, 27)
   - `/passover-events-shfela-2026` (articles 17, 26)
   - `/end-of-year-parties-2026` (articles 25, 39)
   - `/winter-birthdays-indoor` (articles 12, 18, 37)
   Sunset and rebuild per season.
7. **Internal linking audit** — now that there are 40 articles, run a once-over: every article should link to 3-4 others, every product should link to its 2-3 most relevant articles, every package should link to its 3-4 most relevant guides. Today this is implemented manually via `relatedArticles` / `relatedPackages` fields; a periodic audit keeps coverage healthy.
8. **Search Console tracking** — wire the site to Google Search Console + GA4 once a real domain is live. Track impressions and CTR by query, identify query cannibalization across the 40 articles (especially in the parent-guides cluster which has overlapping themes), and use the data to refine future content.
9. **Backlink building** — Rehovot mom groups on Facebook, local birthday-planning blogs, daycare and gan partnerships, kindergarten union (`ועד הורים`) channels.

---

## 🟡 Remaining TODOs / risks

1. **Replace `[PASTE_WHATSAPP_COMMUNITY_JOIN_LINK_HERE]`** in `src/lib/community-config.ts` with the real community invite URL.
2. **Replace placeholder Unsplash images** in `src/lib/packages/data.ts`, `src/lib/seed-products.ts`, and `src/lib/articles/seed.ts` with real photography.
3. **Localize remaining Hebrew-only pages** (catalog, product detail, booking, FAQ, about, terms, safety, pickup, contact, blog).
4. **Connect a real backend** for products / bookings / articles (currently `localStorage` via Zustand). Suggested: Supabase / Sanity / Strapi. Type definitions are CMS-ready.
5. **Set the real WhatsApp number** in `.env.local` (default `NEXT_PUBLIC_WHATSAPP_NUMBER=972509331313`).
6. **External accessibility audit** before claiming WCAG compliance in marketing.

---

## Build / lint

Both Hebrew, English, and Russian pages compose the same components — the layout's `LocaleHtmlSync` and dictionary-based UI strings keep one bundle per language. No middleware. No `next-intl` runtime — just typed JSON-like dictionaries.

```bash
npm run lint       # ESLint via next/core-web-vitals
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

> Verification was performed via local code review and structural checks. The user is expected to run `npm install && npm run build` once before deploying.

---

© FUN-ISRAEL — Premium inflatable rentals. No supplier disclosure. No payment surface. WhatsApp-first conversion.
