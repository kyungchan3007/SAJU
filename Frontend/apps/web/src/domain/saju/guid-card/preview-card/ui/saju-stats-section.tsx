import type { SajuPreviewSectionProps } from "@/domain/saju/guid-card/preview-card/type/saju-preview-card.types";
import styles from "@/domain/saju/guid-card/preview-card/ui/preview-card.module.css";

export function SajuStatsSection({ dailyResult }: SajuPreviewSectionProps) {
  const score = dailyResult?.todayScore ?? 0;

  return (
    <section className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
      <div
        className={`flex min-h-[118px] flex-col bg-white px-5 py-[18px] ${styles.statsCard}`}
      >
        <div className="mb-2.5 flex items-center justify-between">
          <span className={`font-bold text-gray-900 ${styles.metricLabel}`}>
            오늘의 총운
          </span>
        </div>
        <div className={`mb-2.5 font-black text-gray-900 ${styles.metricScore}`}>
          {score}
          <span className={`font-semibold text-gray-500 ${styles.metricUnit}`}>
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
        className={`flex min-h-[118px] items-center justify-center bg-white px-5 py-[18px] ${styles.statsCard}`}
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
            <p className={`mb-1 font-semibold uppercase text-gray-500 ${styles.metaLabel}`}>
              좋은 시간
            </p>
            <p className={`font-bold text-gray-900 ${styles.metaValue}`}>
              {dailyResult?.goodTime ?? "-"}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`flex min-h-[118px] items-center justify-center bg-white px-5 py-[18px] ${styles.statsCard}`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${styles.dangerBadge}`}
          >
            <svg width="26" height="26" fill="#EF4444" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div>
            <p className={`mb-1 font-semibold uppercase text-gray-500 ${styles.metaLabel}`}>
              오늘의 무드
            </p>
            <p className={`font-bold text-gray-900 ${styles.metaValue}`}>
              {dailyResult?.mood ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
