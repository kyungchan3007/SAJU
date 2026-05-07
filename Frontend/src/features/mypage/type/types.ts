export type MypageUser = {
  email: string;
};

export type MypageStats = {
  luckyBag: number;
  coins: number;
};

export type QuickMenuItem = {
  icon: string;
  label: string;
  badge?: number;
  href: string;
};

export type BannerItem = {
  tag: string;
  title: string;
  emoji: string;
};

export type NavTab = "운세";

export type NavMenuItem = {
  icon: string;
  label: string;
  sub: string;
  href: string;
};

export type ManagementItem = {
  icon: string;
  label: string;
  sub?: string;
  href: string;
};

export type InfoItem = {
  icon: string;
  label: string;
  href: string;
};
