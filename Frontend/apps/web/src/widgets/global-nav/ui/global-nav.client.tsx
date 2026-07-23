"use client";

import dynamic from "next/dynamic";
import { GlobalNavView } from "@/domain/navigation";
import { useGlobalNavItems } from "@/features/navigation/hooks/useGlobalNavItems";

type GlobalNavClientProps = {
  isLoggedIn: boolean;
};

const NotificationBell = dynamic(
  () =>
    import("@/features/notification/ui/notification-bell-with-providers.client").then((module) => ({
      default: module.NotificationBellWithProviders,
    })),
  {
    ssr: false,
    loading: () => <NotificationBellPlaceholder />,
  },
);

export function GlobalNavClient({ isLoggedIn }: GlobalNavClientProps) {
  const { desktopItems, mobileItems, profileItem } = useGlobalNavItems(isLoggedIn);

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

function NotificationBellPlaceholder() {
  return <div className="h-8 w-8 shrink-0" aria-hidden="true" />;
}
