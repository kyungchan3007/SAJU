const CIRCUMFERENCE = 2 * Math.PI * 44;

type Props = {
  overallScore: number;
  keyword: string;
  description: string;
  circumference: number;
};

export function CompatibilityResultScore({
  overallScore,
  keyword,
  description,
}: Props) {
  const dashOffset = CIRCUMFERENCE * (1 - overallScore / 100);

  const scoreColor =
    overallScore >= 80
      ? "#5956E9"
      : overallScore >= 60
        ? "#06B6D4"
        : overallScore >= 40
          ? "#F59E0B"
          : "#EF4444";

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-5 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl"
          style={{ background: "#F0EEFF" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5956E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <span className="text-[15px] font-extrabold text-[#111827]">종합 궁합 점수</span>
      </div>

      {/* 점수 원형 */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative inline-flex items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 110 110">
            {/* 배경 트랙 */}
            <circle
              cx="55" cy="55" r="44"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="10"
            />
            {/* 점수 호 */}
            <circle
              cx="55" cy="55" r="44"
              fill="none"
              stroke={scoreColor}
              strokeWidth="10"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 55 55)"
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[36px] font-black leading-none" style={{ color: scoreColor }}>
              {overallScore}
            </span>
            <span className="text-[12px] text-slate-400">/ 100</span>
          </div>
        </div>

        {/* 키워드 배지 */}
        {keyword && (
          <span
            className="rounded-full px-5 py-1.5 text-[14px] font-extrabold text-white"
            style={{ background: "linear-gradient(to right, #5956E9, #7C3AED)" }}
          >
            {keyword}
          </span>
        )}

        {/* 설명 */}
        {description && (
          <p className="max-w-[320px] text-center text-[13px] leading-[1.85] text-[#6B7280]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
