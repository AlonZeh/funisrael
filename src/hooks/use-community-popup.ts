"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  communityPopupConfig,
  COMMUNITY_STORAGE_KEYS
} from "@/lib/community-config";

interface UseCommunityPopupOptions {
  /** Delay (ms) before the popup appears after a triggering page mount. */
  delayMs?: number;
  /** Max appearances per browser session. */
  maxShowsPerSession?: number;
}

/** Paths that count as "entering the reservation flow" — trigger the 2nd show. */
const RESERVATION_TRIGGERS = ["/cart", "/reserve"];

function isReservationTrigger(pathname: string): boolean {
  return RESERVATION_TRIGGERS.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

function getSessionInt(key: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? Number(raw) || 0 : 0;
  } catch {
    return 0;
  }
}

function setSessionInt(key: string, value: number) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, String(value));
  } catch {
    /* ignore */
  }
}

function hasJoined(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(COMMUNITY_STORAGE_KEYS.joined) === "true";
  } catch {
    return false;
  }
}

/**
 * Controls the community popup visibility.
 *
 * Behavior (capped, parent-friendly):
 *  - Shows at most `maxShowsPerSession` times per browser tab session (default: 2).
 *  - 1st show: on site entry — any page, after `delayMs`.
 *  - 2nd show: only when the user enters the reservation flow (`/cart` or `/reserve`).
 *  - Clicking the X closes for the current view. The count only increments when
 *    the popup actually opens.
 *  - Clicking "Join" permanently suppresses for this browser (localStorage flag).
 *  - sessionStorage is cleared when the tab closes — a true new visit gets a fresh
 *    quota.
 */
export function useCommunityPopup({
  delayMs = communityPopupConfig.delayMs,
  maxShowsPerSession = communityPopupConfig.maxShowsPerSession
}: UseCommunityPopupOptions = {}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (!communityPopupConfig.enabled) return;
    if (typeof window === "undefined") return;

    if (hasJoined()) return;

    const shownCount = getSessionInt(COMMUNITY_STORAGE_KEYS.shownCount);
    if (shownCount >= maxShowsPerSession) return;

    let shouldTrigger = false;
    if (shownCount === 0) {
      // First show — fires on site entry, any page.
      shouldTrigger = true;
    } else if (shownCount === 1 && isReservationTrigger(pathname)) {
      // Second show — only when entering the reservation flow.
      shouldTrigger = true;
    }

    if (!shouldTrigger) return;

    const timer = setTimeout(() => {
      if (hasJoined()) return;
      const current = getSessionInt(COMMUNITY_STORAGE_KEYS.shownCount);
      if (current >= maxShowsPerSession) return;
      setOpen(true);
      setSessionInt(COMMUNITY_STORAGE_KEYS.shownCount, current + 1);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [pathname, delayMs, maxShowsPerSession]);

  /** Close for now. Doesn't reset the counter. */
  function dismiss() {
    setOpen(false);
  }

  /** Permanent suppression: never show again on this browser. */
  function markJoined() {
    setOpen(false);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(COMMUNITY_STORAGE_KEYS.joined, "true");
    } catch {
      /* ignore */
    }
  }

  return { open, dismiss, markJoined };
}
