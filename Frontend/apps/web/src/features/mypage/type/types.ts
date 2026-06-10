import type { Route } from "next";

export type ManagementIconKey = "account" | "saju";

export type MypageUser = {
  email: string;
  summaryZodiac: string;
};

export type SajuSummaryItem = {
  label: string;
  value: string;
};

export type ManagementItem = {
  icon: ManagementIconKey;
  label: string;
  desc?: string;
  href: Route;
};

export type InfoIconKey = "notice" | "help" | "recommend" | "partner";

type InfoItemBase = {
  icon: InfoIconKey;
  label: string;
  desc?: string;
};

type InfoLinkItem = InfoItemBase & {
  href: Route;
  onClick?: never;
};

type InfoActionItem = InfoItemBase & {
  href?: never;
  onClick: () => void;
};

export type InfoItem = InfoLinkItem | InfoActionItem;

export type AllMenuItem = {
  icon: React.ReactNode;
  label: string;
  sub: string;
  href: string;
};
