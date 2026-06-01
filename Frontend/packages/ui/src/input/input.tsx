import * as React from "react";

import { cn } from "../utils";

// [DS] 역할: 공통 높이, border, focus ring, disabled 상태를 제공하는 native input primitive.
// [DS] 현재 사용처: 신규/수정 폼에서 사주 입력, 마이페이지 사주 관리, 알림 신청 입력 대체 후보.
export type InputStatus = "default" | "error";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  status?: InputStatus;
};

const inputStatusClassNames: Record<InputStatus, string> = {
  default: "border-border-default focus:border-saju-primary",
  error: "border-red-300 focus:border-status-danger",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, status = "default", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-[46px] w-full rounded-xl border bg-white px-3 text-saju-body text-content-primary outline-none transition-colors placeholder:text-content-subtle focus:shadow-saju-sm disabled:cursor-not-allowed disabled:opacity-50",
          inputStatusClassNames[status],
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
