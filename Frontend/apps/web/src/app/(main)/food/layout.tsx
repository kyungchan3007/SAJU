import type { ReactNode } from "react";

import { QueryProviderLayout } from "@/shared/app-infra/query-provider/query-provider-layout";

export default function FoodLayout({ children }: { children: ReactNode }) {
  return <QueryProviderLayout>{children}</QueryProviderLayout>;
}
