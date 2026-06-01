import * as React from "react";

import { cn } from "../utils";

// [DS] 역할: 공통 높이, chevron, focus ring, disabled 상태를 제공하는 native select primitive.
// [DS] 현재 사용처: 신규/수정 폼에서 사주 입력, 마이페이지 사주 관리 select 대체 후보.
export type SelectStatus = "default" | "error";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  status?: SelectStatus;
};

const selectStatusClassNames: Record<SelectStatus, string> = {
  default: "border-border-default focus:border-saju-primary",
  error: "border-red-300 focus:border-status-danger",
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, status = "default", children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-[46px] w-full appearance-none rounded-xl border bg-white px-3 pr-8 text-saju-body text-content-primary outline-none transition-colors focus:shadow-saju-sm disabled:cursor-not-allowed disabled:opacity-50",
            selectStatusClassNames[status],
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-saju-badge text-content-subtle">
          ▾
        </span>
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
