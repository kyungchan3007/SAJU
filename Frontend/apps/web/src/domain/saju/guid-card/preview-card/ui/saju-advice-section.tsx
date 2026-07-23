import type { SajuPreviewSectionProps } from "@/domain/saju/guid-card/preview-card/type/saju-preview-card.types";
import styles from "@/domain/saju/guid-card/preview-card/ui/preview-card.module.css";

export function SajuAdviceSection({ dailyResult }: SajuPreviewSectionProps) {
  const avoidJoined =
    (dailyResult?.avoidActions ?? []).slice(0, 2).join(" · ") || "-";
  const goodJoined =
    (dailyResult?.goodActions ?? []).slice(0, 2).join(" · ") || "-";

  return (
    <div
      className={`bg-white p-5 ${styles.panel} ${styles.adviceCard}`}
    >
      <div className={`mb-5 flex flex-col items-start md:flex-row md:items-center ${styles.adviceHero}`}>
        <div className={`flex shrink-0 items-center justify-center rounded-full bg-saju-tint ${styles.adviceIconWrap}`}>
          <svg
            width="28"
            height="28"
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
          <h3 className="mb-1.5 text-base font-extrabold text-gray-900">
            오늘의 조언
          </h3>
          <p className={`text-gray-500 ${styles.adviceBody}`}>
            오늘은 조화와 균형이 중요한 날이에요. 좋은 흐름을 잘 활용하고,
            무리한 흐름은 피하면 더 편안하고 안정적인 하루를 보낼 수 있어요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          {
            label: "오늘의 무드",
            value: dailyResult?.mood ?? "-",
          },
          {
            label: "피하면 좋은 일",
            value: avoidJoined,
          },
          {
            label: "하면 좋은 일",
            value: goodJoined,
          },
        ].map((box) => (
          <div
            key={box.label}
            className={`border border-saju-border/30 p-4 ${styles.adviceBox}`}
          >
            <div className="mb-2.5 flex items-center gap-1.5">
              <svg
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                className="text-saju-primary"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className={`font-bold text-saju-primary xs:text-xs ${styles.adviceLabel}`}>
                {box.label}
              </span>
            </div>
            <p className={`font-bold text-gray-900 xs:text-xs ${styles.adviceValue}`}>
              {box.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
