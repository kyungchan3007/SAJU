"use client";

import { create } from "zustand";

type PaymentStore = {
  isPending: boolean;
  selectedProductId: string | null;
  lastVerifiedAt: string | null;
  setPending: (value: boolean) => void;
  setSelectedProductId: (value: string | null) => void;
  markVerified: (timestamp: string) => void;
  reset: () => void;
};

const initialState = {
  isPending: false,
  selectedProductId: null,
  lastVerifiedAt: null,
};

export const usePaymentStore = create<PaymentStore>((set) => ({
  ...initialState,
  setPending: (value) => set({ isPending: value }),
  setSelectedProductId: (value) => set({ selectedProductId: value }),
  markVerified: (timestamp) =>
    set({ isPending: false, lastVerifiedAt: timestamp }),
  reset: () => set(initialState),
}));
