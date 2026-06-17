import type { ReactNode } from "react";
import { AdminLayoutShell } from "@/features/admin-layout/ui/admin-layout-shell";
import { QueryProvider } from "@/shared/app-infra/query-provider";
import { Toaster } from "@saju/ui";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AdminLayoutShell>{children}</AdminLayoutShell>
      <Toaster />
    </QueryProvider>
  );
}
