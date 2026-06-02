"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
} from "react";

const AuthScopeContext = createContext("guest");

type AuthScopeProviderProps = PropsWithChildren<{
  value: string;
}>;

export function AuthScopeProvider({
  value,
  children,
}: AuthScopeProviderProps) {
  return (
    <AuthScopeContext.Provider value={value}>
      {children}
    </AuthScopeContext.Provider>
  );
}

export function useAuthScope() {
  return useContext(AuthScopeContext);
}
