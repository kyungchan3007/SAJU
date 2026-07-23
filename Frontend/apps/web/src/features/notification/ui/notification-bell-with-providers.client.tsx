"use client";

import { QueryProviders } from "@/shared/app-infra/query-provider/query-providers";

import { NotificationBell } from "@/features/notification/ui/notification-bell";

export function NotificationBellWithProviders() {
  return (
    <QueryProviders>
      <NotificationBell />
    </QueryProviders>
  );
}
