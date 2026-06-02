import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

// [DS] 역할: border/surface/shadow 조합을 통일하는 공용 카드 primitive.
// [DS] 현재 사용처: 신규/수정 UI에서 반복되는 흰색 카드, soft 카드, elevated 카드 대체 후보.
export type CardVariant = "default" | "soft" | "elevated" | "selected";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  interactive?: boolean;
};

const cardVariantClassNames: Record<CardVariant, string> = {
  default: "border border-surface-border bg-surface-card shadow-saju-sm",
  soft: "border border-surface-border bg-surface-soft shadow-none",
  elevated: "border border-surface-border bg-surface-card shadow-saju-card",
  selected: "border border-saju-border bg-saju-light shadow-saju-sm",
};

export function Card({
  className,
  variant = "default",
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-saju-card",
        cardVariantClassNames[variant],
        interactive &&
          "transition-colors hover:border-saju-border hover:bg-saju-soft",
        className,
      )}
      {...props}
    />
  );
}
