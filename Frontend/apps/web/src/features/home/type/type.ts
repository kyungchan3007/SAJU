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

export interface HomeMarketingFeatureCard {
  icon: string;
  title: string;
  desc: string;
}

export interface HomeBigLuckStep {
  age: string;
  hanja: string;
  kor: string;
  year: string;
  active?: boolean;
  opacity?: number;
}

export interface HomeTimelineDot {
  active: boolean;
}

export interface HomeTarotCard {
  label: string;
  bg: string;
}

export interface HomeFiveElementOrderItem {
  key: string;
  label: string;
}

export interface HomeFiveElementBalanceRow {
  key: string;
  label: string;
  percentage: number;
  percentageLabel: string;
  color: string;
}
