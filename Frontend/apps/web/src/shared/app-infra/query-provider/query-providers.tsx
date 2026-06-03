"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { useState } from "react";

import { getQueryClient } from "@/shared/lib/react-query";
import { AuthScopeProvider } from "@/shared/app-infra/query-provider/auth-scope-context";

type ProvidersProps = PropsWithChildren<{
  authScope: string;
}>;

export function Providers({ children, authScope }: ProvidersProps) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <AuthScopeProvider value={authScope}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthScopeProvider>
  );
}
