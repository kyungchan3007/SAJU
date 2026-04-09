"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { useState } from "react";

import { getQueryClient } from "@/shared/lib/react-query";

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
