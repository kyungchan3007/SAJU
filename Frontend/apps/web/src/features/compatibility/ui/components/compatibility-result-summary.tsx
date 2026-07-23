type Props = {
  description: string;
  tags: string[];
};

export function CompatibilityResultSummary({ description, tags }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-4 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl"
          style={{ background: "#F0EEFF" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5956E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <span className="text-[15px] font-extrabold text-[#111827]">궁합 총평</span>
      </div>

      {/* 태그 */}
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{ background: "#F0EEFF", color: "#4338CA" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 설명 */}
      <div
        className="rounded-2xl border p-4"
        style={{ background: "#F9F8FF", borderColor: "#E0DAFF" }}
      >
        <p className="text-[13px] leading-[1.85] text-[#374151]">
          {description || "궁합 분석 결과를 확인해주세요."}
        </p>
      </div>
    </div>
  );
}
