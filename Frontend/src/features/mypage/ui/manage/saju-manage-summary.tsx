type Props = {
  summaryZodiac?: string | null;
  summaryStrength?: string | null;
  geokguk?: string | null;
  yongshinPrimary?: string | null;
  yongshinSecondary?: string | null;
};

const ELEMENT_BG: Record<string, string> = {
  수: "#DBEAFE",
  목: "#DCFCE7",
  화: "#FEE2E2",
  토: "#FEF9C3",
  금: "#F1F5F9",
};
const ELEMENT_EMOJI: Record<string, string> = {
  수: "💧",
  목: "🌿",
  화: "🔥",
  토: "🪨",
  금: "⚙️",
};

export function SajuManageSummary({
  summaryZodiac,
  summaryStrength,
  geokguk,
  yongshinPrimary,
  yongshinSecondary,
}: Props) {
  const hasSummary =
    summaryZodiac ?? summaryStrength ?? geokguk ?? yongshinPrimary;

  if (!hasSummary) return null;

  return (
    <div
      className="rounded-sm border-2 border-black bg-[#FDFCF8]"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <div className="border-b-2 border-black bg-[#F0EDE6] px-5 py-3 font-['Jua',sans-serif] text-[15px]">
        나의 사주 요약
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {summaryZodiac && (
            <span
              className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-yellow-300 px-3.5 py-1 text-xs font-bold"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {summaryZodiac}
            </span>
          )}
          {summaryStrength && (
            <span
              className="inline-flex items-center rounded-full border-2 border-black bg-[#FDFCF8] px-3.5 py-1 text-xs font-bold"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {summaryStrength}
            </span>
          )}
          {geokguk && (
            <span
              className="inline-flex items-center rounded-full border-2 border-black bg-[#FDFCF8] px-3.5 py-1 text-xs font-bold"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {geokguk}
            </span>
          )}
          {[yongshinPrimary, yongshinSecondary].map((key) => {
            if (!key) return null;
            const bg = ELEMENT_BG[key] ?? "#F0EDE6";
            const emoji = ELEMENT_EMOJI[key] ?? "✨";
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-full border-2 border-black px-3.5 py-1 text-xs font-bold"
                style={{ background: bg, boxShadow: "2px 2px 0 #0d0d0d" }}
              >
                {emoji} {key}(
                {key === "수"
                  ? "水"
                  : key === "목"
                    ? "木"
                    : key === "화"
                      ? "火"
                      : key === "토"
                        ? "土"
                        : "金"}
                )
              </span>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-[#7a7570]">
          ※ 정보를 수정하면 사주 요약이 새로 계산됩니다.
        </p>
      </div>
    </div>
  );
}
