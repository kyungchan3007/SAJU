import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

// [DS] 역할: 점수, 분석 진행률, 오행/운세 수치 등을 표시하는 공용 progress primitive.
// [DS] 현재 사용처: 신규/수정 UI에서 궁합 점수 바, 띠별 궁합 점수, 분석 진행률 바 대체 후보.
type ProgressBarTone = "primary" | "success" | "warning" | "danger" | "neutral";

type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  max?: number;
  tone?: ProgressBarTone;
  trackClassName?: string;
  indicatorClassName?: string;
};

const progressBarToneClassNames: Record<ProgressBarTone, string> = {
  primary: "bg-saju-primary",
  success: "bg-status-success",
  warning: "bg-status-warning",
  danger: "bg-status-danger",
  neutral: "bg-content-muted",
};

function getProgressPercent(value: number, max: number) {
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (value / max) * 100));
}

export function ProgressBar({
  value,
  max = 100,
  tone = "primary",
  className,
  trackClassName,
  indicatorClassName,
  ...props
}: ProgressBarProps) {
  const percent = getProgressPercent(value, max);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(max, Math.max(0, value))}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-surface-soft",
        trackClassName,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500",
          progressBarToneClassNames[tone],
          indicatorClassName,
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
