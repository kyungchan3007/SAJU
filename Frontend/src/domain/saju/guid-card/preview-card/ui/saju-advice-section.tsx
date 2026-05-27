import type { SajuPreviewSectionProps } from "@/domain/saju/guid-card/preview-card/type/saju-preview-card.types";

export function SajuAdviceSection({ dailyResult }: SajuPreviewSectionProps) {
  const avoidJoined =
    (dailyResult?.avoidActions ?? []).slice(0, 2).join(" · ") || "-";
  const goodJoined =
    (dailyResult?.goodActions ?? []).slice(0, 2).join(" · ") || "-";

  return (
    <div
      className="rounded-[14px] bg-white p-5"
      style={{
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        border: "1px solid #F3F4F6",
      }}
    >
      <div className="mb-5 flex flex-col items-start gap-[18px] md:flex-row md:items-center">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-saju-tint">
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
          <p className="text-[13px] leading-[1.75] text-gray-500">
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
            className="rounded-[12px] border border-saju-border/30 p-4"
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
              <span className="text-[10px] font-bold tracking-[0.04em] text-saju-primary">
                {box.label}
              </span>
            </div>
            <p className="text-[14px] font-bold leading-[1.5] text-gray-900">
              {box.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
