import type { HTMLAttributes } from "react";

import { cn } from "../utils";

// [DS] 역할: 폼 내부의 error/warning/info/success 안내 문구를 통일하는 메시지 primitive.
// [DS] 현재 사용처: 신규/수정 폼에서 saju-manage, auth restore, 입력 검증 메시지 대체 후보.
type FormMessageVariant = "error" | "warning" | "info" | "success";

type FormMessageProps = HTMLAttributes<HTMLParagraphElement> & {
  variant?: FormMessageVariant;
};

const formMessageVariantClassNames: Record<FormMessageVariant, string> = {
  error: "border-red-200 bg-red-50 text-status-danger",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  info: "border-saju-border bg-saju-soft text-saju-primary",
  success: "border-emerald-200 bg-emerald-50 text-status-success",
};

export function FormMessage({
  className,
  variant = "info",
  ...props
}: FormMessageProps) {
  return (
    <p
      className={cn(
        "rounded-xl border px-3 py-2.5 text-[12px] font-semibold leading-relaxed",
        formMessageVariantClassNames[variant],
        className,
      )}
      {...props}
    />
  );
}
