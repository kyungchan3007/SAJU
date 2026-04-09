"use client";

import { create } from "zustand";

type AuthStore = {
  isLoginPending: boolean;
  redirectPath: string | null;
  setLoginPending: (value: boolean) => void;
  setRedirectPath: (value: string | null) => void;
  reset: () => void;
};

const initialState = {
  isLoginPending: false,
  redirectPath: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setLoginPending: (value) => set({ isLoginPending: value }),
  setRedirectPath: (value) => set({ redirectPath: value }),
  reset: () => set(initialState),
}));
