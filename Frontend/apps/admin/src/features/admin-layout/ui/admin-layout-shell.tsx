import type { ReactNode } from "react";
import { AdminSidebar } from "./admin-sidebar";

export function AdminLayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-page">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
