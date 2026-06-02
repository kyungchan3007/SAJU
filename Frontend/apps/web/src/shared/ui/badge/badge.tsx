import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

// [DS] 역할: 상태, 태그, 짧은 라벨을 표시하는 공용 pill 배지.
// [DS] 현재 사용처: 신규/수정 UI에서 궁합 태그, 점수 라벨, 상태 라벨을 대체할 기본 배지 후보.
type BadgeVariant = "primary" | "neutral" | "success" | "warning" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const badgeVariantClassNames: Record<BadgeVariant, string> = {
  primary: "bg-saju-light text-saju-primary",
  neutral: "bg-surface-soft text-content-secondary",
  success: "bg-emerald-50 text-status-success",
  warning: "bg-amber-50 text-status-warning",
  danger: "bg-red-50 text-status-danger",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-saju-badge font-bold",
        badgeVariantClassNames[variant],
        className,
      )}
      {...props}
    />
  );
}
