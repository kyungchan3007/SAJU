import type {
  MyApplicationBadgeTone,
  MyApplicationView,
} from "@/features/mypage/model/communityApplication";

type Props = {
  view: MyApplicationView;
  canCancel: boolean;
  isCancelling: boolean;
  onRequestCancel: () => void;
};

const BADGE_CLASS: Record<MyApplicationBadgeTone, string> = {
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  gray: "border-slate-200 bg-slate-100 text-slate-500",
};

export function MyApplicationCard({
  view,
  canCancel,
  isCancelling,
  onRequestCancel,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-100 p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="text-base font-bold text-slate-800">{view.title}</div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
            BADGE_CLASS[view.statusTone]
          }`}
        >
          {view.statusLabel}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
          📅 {view.dateLabel}
        </span>
        <span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
          📍 {view.placeLabel}
        </span>
        <span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
          💳 {view.feeLabel}
          {view.depositConfirmed ? " 입금 확인" : ""}
        </span>
      </div>

      <p className="rounded-xl border border-[#E0DAFF] bg-[#F5F4FF] px-4 py-3 text-[12.5px] leading-relaxed text-[#5B4FD6]">
        📌 {view.remindMessage}
      </p>

      {canCancel ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={onRequestCancel}
            disabled={isCancelling}
            className="h-11 w-full rounded-xl border border-[#E0DAFF] bg-white text-[13px] font-bold text-[#5956E9] transition-colors hover:bg-[#F9F8FF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCancelling ? "취소 요청 중..." : "참가 취소 요청"}
          </button>
          <ul className="mt-3 space-y-1 text-[11px] leading-relaxed text-slate-500">
            <li>
              · 입금 후 취소는 여기서 요청 → 운영자 확인 후{" "}
              <b className="text-slate-500">수기 환불</b>됩니다.
            </li>
            <li>· 환불은 신청 시 받은 계좌로 진행돼요.</li>
            <li>· 취소 마감 이후에는 환불이 어려울 수 있어요.</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
