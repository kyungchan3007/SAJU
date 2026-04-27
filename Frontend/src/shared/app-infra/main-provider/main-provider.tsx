"use client";

import { PropsWithChildren, ReactNode } from "react";
import { AppSessionProvider } from "@/shared/app-infra/session-provider/session-provider";

function QueryProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function MainProvider({ children }: PropsWithChildren) {
  return (
    <AppSessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </AppSessionProvider>
  );
}
