"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  DeliveryType,
  ReceivingMethod,
  ReservationCustomerDetails,
  ReservationItem,
  ReservationState
} from "@/lib/reservation/types";
import { DEFAULT_CUSTOMER } from "@/lib/reservation/types";

interface ReservationStore extends ReservationState {
  hydrated: boolean;
  setHydrated: (h: boolean) => void;
  /** Add an item to the cart. If the same key exists, quantity is incremented. */
  addItem: (item: Omit<ReservationItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, qty: number) => void;
  clearCart: () => void;
  setDate: (date: string | null) => void;
  setReceivingMethod: (m: ReceivingMethod | null) => void;
  setDeliveryType: (t: DeliveryType | null) => void;
  setCustomer: (patch: Partial<ReservationCustomerDetails>) => void;
  markSubmitted: () => void;
  resetAfterSubmit: () => void;
  /** Quick selector used by the navbar badge */
  itemCount: () => number;
  /** Estimated total — sums `unitPrice * quantity`, ignores 0 (price-on-request). */
  estimatedTotal: () => number;
}

const initialState: ReservationState = {
  items: [],
  date: null,
  receivingMethod: null,
  deliveryType: null,
  customer: { ...DEFAULT_CUSTOMER },
  submitted: false
};

export const useReservationStore = create<ReservationStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      hydrated: false,
      setHydrated: (h) => set({ hydrated: h }),
      addItem: (input) => {
        const quantity = input.quantity ?? 1;
        set((state) => {
          const existing = state.items.find((i) => i.key === input.key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === input.key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              )
            };
          }
          const next: ReservationItem = { ...input, quantity };
          return { items: [...state.items, next] };
        });
      },
      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      setQuantity: (key, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.key === key ? { ...i, quantity: qty } : i))
            .filter((i) => i.quantity > 0)
        })),
      clearCart: () =>
        set({
          items: [],
          date: null,
          receivingMethod: null,
          deliveryType: null
        }),
      setDate: (date) => set({ date }),
      setReceivingMethod: (m) =>
        set({
          receivingMethod: m,
          // reset delivery type when switching back to pickup
          deliveryType: m === "delivery" ? get().deliveryType ?? "roundtrip" : null
        }),
      setDeliveryType: (t) => set({ deliveryType: t }),
      setCustomer: (patch) =>
        set((state) => ({ customer: { ...state.customer, ...patch } })),
      markSubmitted: () => set({ submitted: true }),
      resetAfterSubmit: () => set({ ...initialState }),
      itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
      estimatedTotal: () =>
        get().items.reduce(
          (s, i) => s + (i.unitPrice > 0 ? i.unitPrice * i.quantity : 0),
          0
        )
    }),
    {
      name: "fun-israel:reservation",
      version: 1,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      }
    }
  )
);
