import { GlobalNavClient } from "@/widgets/global-nav/ui/global-nav.client";

type GlobalNavProps = {
  isLoggedIn: boolean;
};

export function GlobalNav({ isLoggedIn }: GlobalNavProps) {
  return <GlobalNavClient isLoggedIn={isLoggedIn} />;
}
