"use client";

import type { PropsWithChildren } from "react";

import { QueryProviders } from "@/shared/app-infra/query-provider/query-providers";

export function QueryProviderLayout({ children }: PropsWithChildren) {
  return <QueryProviders>{children}</QueryProviders>;
}
