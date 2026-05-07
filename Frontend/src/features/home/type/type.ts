import type { Route } from "next";

export interface HomeLinkItem {
  href: Route;
  label: string;
}

export interface HomeIconLinkItem extends HomeLinkItem {
  emoji: string;
  isNew: boolean;
}

export interface HomeServiceCategory {
  category: string;
  items: HomeLinkItem[];
}
