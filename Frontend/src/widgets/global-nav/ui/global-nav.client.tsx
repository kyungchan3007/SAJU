"use client";

import { GlobalNavView } from "@/domain/navigation";
import { useGlobalNavItems } from "@/features/navigation/hooks/useGlobalNavItems";
import { NotificationBell } from "@/features/notification/ui/notification-bell";

type GlobalNavClientProps = {
  isLoggedIn: boolean;
};

export function GlobalNavClient({ isLoggedIn }: GlobalNavClientProps) {
  const { hidden, desktopItems, mobileItems, profileItem } =
    useGlobalNavItems(isLoggedIn);

  if (hidden) {
    return null;
  }

  return (
    <GlobalNavView
      isLoggedIn={isLoggedIn}
      desktopItems={desktopItems}
      mobileItems={mobileItems}
      profileItem={profileItem}
      notificationSlot={isLoggedIn ? <NotificationBell /> : null}
    />
  );
}
