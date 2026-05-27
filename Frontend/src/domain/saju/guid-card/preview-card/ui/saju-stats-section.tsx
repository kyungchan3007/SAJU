import type { SajuPreviewSectionProps } from "@/domain/saju/guid-card/preview-card/type/saju-preview-card.types";

export function SajuStatsSection({ dailyResult }: SajuPreviewSectionProps) {
  const score = dailyResult?.todayScore ?? 0;

  return (
    <section className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
      <div
        className="flex min-h-[118px] flex-col rounded-[14px] bg-white px-5 py-[18px]"
        style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}
      >
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[13px] font-bold text-gray-900">
            오늘의 총운
          </span>
        </div>
        <div className="mb-2.5 text-[36px] font-black leading-none text-gray-900">
          {score}
          <span className="ml-0.5 text-[13px] font-semibold text-gray-400">
            점
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-saju-border">
          <div
            className="h-full rounded-full bg-saju-primary transition-[width] duration-700"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div
        className="flex min-h-[118px] items-center justify-center rounded-[14px] bg-white px-5 py-[18px]"
        style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-saju-light">
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              className="text-saju-primary"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-400">
              좋은 시간
            </p>
            <p className="text-[14px] font-bold text-gray-900">
              {dailyResult?.goodTime ?? "-"}
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex min-h-[118px] items-center justify-center rounded-[14px] bg-white px-5 py-[18px]"
        style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{ background: "#FFF1F2" }}
          >
            <svg width="26" height="26" fill="#EF4444" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-400">
              오늘의 무드
            </p>
            <p className="text-[14px] font-bold text-gray-900">
              {dailyResult?.mood ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
