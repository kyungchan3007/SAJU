"use client";

import { GlobalNavView } from "@/domain/navigation";
import { useGlobalNavItems } from "@/features/navigation/hooks/useGlobalNavItems";

type GlobalNavProps = {
  isLoggedIn: boolean;
};

export function GlobalNav({ isLoggedIn }: GlobalNavProps) {
  const { hidden, mainItems, mobileItems, profileItem } =
    useGlobalNavItems(isLoggedIn);

  if (hidden) {
    return null;
  }

  return (
    <GlobalNavView
      isLoggedIn={isLoggedIn}
      mainItems={mainItems}
      mobileItems={mobileItems}
      profileItem={profileItem}
    />
  );
}
