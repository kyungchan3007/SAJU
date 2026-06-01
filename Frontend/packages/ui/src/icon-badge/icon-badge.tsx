import type { HTMLAttributes } from "react";

import { cn } from "../utils";

// [DS] 역할: 아이콘을 담는 작은 라운드/원형 배지의 색상과 크기를 통일하는 primitive.
// [DS] 현재 사용처: 신규/수정 UI에서 섹션 헤더 아이콘, empty state 아이콘, 요약 칩 대체 후보.
type IconBadgeVariant =
  | "primary"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";
type IconBadgeSize = "sm" | "md" | "lg";

type IconBadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: IconBadgeVariant;
  size?: IconBadgeSize;
};

const iconBadgeVariantClassNames: Record<IconBadgeVariant, string> = {
  primary: "bg-saju-light text-saju-primary",
  neutral: "bg-surface-soft text-content-secondary",
  success: "bg-emerald-50 text-status-success",
  warning: "bg-amber-50 text-status-warning",
  danger: "bg-red-50 text-status-danger",
  info: "bg-cyan-50 text-status-info",
};

const iconBadgeSizeClassNames: Record<IconBadgeSize, string> = {
  sm: "h-8 w-8 rounded-xl",
  md: "h-10 w-10 rounded-[14px]",
  lg: "h-14 w-14 rounded-[18px]",
};

export function IconBadge({
  className,
  variant = "primary",
  size = "md",
  ...props
}: IconBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        iconBadgeVariantClassNames[variant],
        iconBadgeSizeClassNames[size],
        className,
      )}
      {...props}
    />
  );
}
