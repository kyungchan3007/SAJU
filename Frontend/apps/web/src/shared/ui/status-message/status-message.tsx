import { cn } from "@/shared/lib/utils";

// [DS] 역할: 저장/삭제/수정 같은 액션 결과를 success/error/info/warning 상태로 보여주는 피드백 메시지.
// [DS] 현재 사용처: 마이페이지 사주 관리 성공/에러 메시지, 향후 폼 제출 결과 표시.
type StatusMessageVariant = "success" | "error" | "info" | "warning";

type Props = {
  message: string | null | undefined;
  variant?: StatusMessageVariant;
  className?: string;
};

const variantClassNames: Record<StatusMessageVariant, string> = {
  success: "border-green-200 bg-green-50 text-green-700",
  error: "border-red-200 bg-red-50 text-red-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
};

export function StatusMessage({
  message,
  variant = "success",
  className,
}: Props) {
  if (!message) return null;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "rounded-xl border px-4 py-3 text-[13px] font-semibold",
        variantClassNames[variant],
        className,
      )}
    >
      {message}
    </div>
  );
}
