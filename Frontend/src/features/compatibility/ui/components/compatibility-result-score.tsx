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
  circumference,
}: Props) {
  const dashOffset = circumference * (1 - overallScore / 100);

  return (
    <div className="border-b-2 border-t-2 border-black bg-[rgb(253,251,240)] px-5 py-5 text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle
            cx="55"
            cy="55"
            r="44"
            fill="none"
            stroke="rgba(13,13,13,.08)"
            strokeWidth="10"
          />
          <circle
            cx="55"
            cy="55"
            r="44"
            fill="none"
            stroke="#0d0d0d"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 55 55)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[32px] leading-none">{overallScore}</span>
          <span className="text-[11px] text-[#7a7570]">/ 100</span>
        </div>
      </div>

      {keyword && (
        <div>
          <span
            className="mt-3 inline-block rounded-full border-2 border-black bg-[#FFE500] px-4 py-1 font-display text-[14px]"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            {keyword}
          </span>
        </div>
      )}

      {description && (
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#7a7570]">{description}</p>
      )}
    </div>
  );
}
