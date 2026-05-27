export type MypageUser = {
  email: string;
  summaryZodiac: string;
};

export type SajuSummaryItem = {
  label: string;
  value: string;
};

export type ManagementItem = {
  label: string;
  desc?: string;
  href: string;
};

export type InfoItem = {
  label: string;
  desc?: string;
  href: string;
};

export type AllMenuItem = {
  icon: React.ReactNode;
  label: string;
  sub: string;
  href: string;
};
