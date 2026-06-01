import type { ReactNode } from "react";
import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import { cn } from "../utils";

// [DS] 역할: loading/empty/error 상태를 카드 형태로 보여주는 공용 상태 표시 컴포넌트.
// [DS] 현재 사용처: 마이페이지 사주 관리, 띠별 궁합, 정통사주/운세 섹션의 상태 화면.
export type StateCardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

type ActionStateCardProps = StateCardProps & {
  action?: ReactNode;
};

export function StateCard({
  title,
  description,
  children,
  className = "",
}: StateCardProps) {
  return (
    <div
      className={cn(
        "rounded-saju-panel border border-surface-border bg-surface-card px-6 py-10 text-center shadow-saju-sm",
        className,
      )}
    >
      {title && (
        <p className="mb-2 text-saju-section font-bold text-content-primary">
          {title}
        </p>
      )}
      {description && (
        <p className="mb-5 text-saju-body leading-relaxed text-content-muted">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export function LoadingStateCard({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-saju-panel border border-surface-border bg-surface-card px-6 py-10 text-center shadow-saju-sm">
      <Loader2 size={28} className="animate-spin text-saju-primary" />
      <p className="text-saju-section text-content-muted">{message}</p>
    </div>
  );
}

export function EmptyStateCard({
  title,
  description,
  action,
}: ActionStateCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-saju-panel border border-surface-border bg-surface-card px-6 py-10 text-center shadow-saju-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-saju-card bg-surface-soft">
        <Inbox size={26} className="text-content-subtle" />
      </div>
      {title && (
        <p className="text-saju-section font-bold text-content-primary">{title}</p>
      )}
      {description && (
        <p className="text-saju-body leading-relaxed text-content-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

export function ErrorStateCard({
  title,
  description,
  action,
}: ActionStateCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-saju-panel border border-surface-border bg-surface-card px-6 py-10 text-center shadow-saju-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-saju-card bg-red-50">
        <AlertCircle size={26} className="text-status-danger" />
      </div>
      {title && (
        <p className="text-saju-section font-bold text-content-primary">{title}</p>
      )}
      {description && (
        <p className="text-saju-body leading-relaxed text-content-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
