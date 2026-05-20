"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Booking, BookingStatus } from "@/lib/types";

interface BookingStore {
  bookings: Booking[];
  hydrated: boolean;
  setHydrated: (h: boolean) => void;
  addBooking: (booking: Booking) => void;
  updateStatus: (id: string, status: BookingStatus) => void;
  removeBooking: (id: string) => void;
  clearAll: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookings: [],
      hydrated: false,
      setHydrated: (h) => set({ hydrated: h }),
      addBooking: (booking) =>
        set((state) => ({ bookings: [booking, ...state.bookings] })),
      updateStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          )
        })),
      removeBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id)
        })),
      clearAll: () => set({ bookings: [] })
    }),
    {
      name: "fun-israel:bookings",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      }
    }
  )
);
