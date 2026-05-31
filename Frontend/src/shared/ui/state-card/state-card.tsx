import type { ReactNode } from "react";
import { AlertCircle, Inbox, Loader2 } from "lucide-react";

// [DS] 역할: loading/empty/error 상태를 카드 형태로 보여주는 공용 상태 표시 컴포넌트.
// [DS] 현재 사용처: 마이페이지 사주 관리, 띠별 궁합, 정통사주/운세 섹션의 상태 화면.
type StateCardProps = {
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
      className={`rounded-3xl border border-slate-100 bg-white px-6 py-10 text-center shadow-sm ${className}`}
    >
      {title && (
        <p className="mb-2 text-[15px] font-bold text-gray-900">{title}</p>
      )}
      {description && (
        <p className="mb-5 text-[13px] leading-relaxed text-gray-500">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export function LoadingStateCard({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-100 bg-white px-6 py-10 text-center shadow-sm">
      <Loader2 size={28} className="animate-spin text-[#5956E9]" />
      <p className="text-[14px] text-gray-500">{message}</p>
    </div>
  );
}

export function EmptyStateCard({
  title,
  description,
  action,
}: ActionStateCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-100 bg-white px-6 py-10 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-slate-50">
        <Inbox size={26} className="text-slate-400" />
      </div>
      {title && (
        <p className="text-[15px] font-bold text-gray-900">{title}</p>
      )}
      {description && (
        <p className="text-[13px] leading-relaxed text-gray-500">{description}</p>
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
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-100 bg-white px-6 py-10 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-red-50">
        <AlertCircle size={26} className="text-red-400" />
      </div>
      {title && (
        <p className="text-[15px] font-bold text-gray-900">{title}</p>
      )}
      {description && (
        <p className="text-[13px] leading-relaxed text-gray-500">{description}</p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
