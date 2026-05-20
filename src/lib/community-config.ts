/**
 * 🟢 WhatsApp Community popup configuration.
 *
 * Owner notes:
 * 👉 Replace `communityWhatsAppLink` with the real WhatsApp community invite URL.
 * 👉 Toggle `enabled` to disable the popup site-wide.
 * 👉 Adjust `delayMs` for how long after page load/route change the popup appears.
 * 👉 `maxShowsPerSession` caps the popup to N appearances per visit.
 *    Current behavior: 1st show on site entry, 2nd show on entering /cart or /reserve.
 *    The only permanent suppression is clicking "Join".
 * 👉 Toggle `showLaunchCoupon` + change `couponCode` for the launch offer.
 */
export const communityPopupConfig = {
  enabled: true,
  communityWhatsAppLink:
    "https://chat.whatsapp.com/JhjRrNzPjss6mMmUOnrwkY?mode=gi_t",
  /** Secondary community link used by some inline banners. */
  secondaryCommunityLink:
    "https://chat.whatsapp.com/IcpKfgbliUDAHrVNMNaGSS",
  /** Delay (ms) before the popup appears on a triggering page. */
  delayMs: 2500,
  /** Max popup appearances per visit (sessionStorage counter). */
  maxShowsPerSession: 2,
  showLaunchCoupon: true,
  couponCode: "FUN50"
} as const;

export type CommunityPopupConfig = typeof communityPopupConfig;

export const COMMUNITY_STORAGE_KEYS = {
  /** localStorage — permanent suppression once the user clicks Join. */
  joined: "funisrael_community_popup_joined",
  /** sessionStorage — number of times the popup has been shown this visit. */
  shownCount: "funisrael_community_popup_shown_count"
} as const;
