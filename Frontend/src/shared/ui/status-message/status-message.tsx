import { cn } from "@/shared/lib/utils";

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
