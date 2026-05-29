import { COMPATIBILITY_ANALYSIS_LABELS } from "@/features/compatibility/model/compatibility";

export function CompatibilityAnalysisInfo() {
  return (
    <>
      <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          궁합 분석 항목
        </p>
        <div className="flex flex-wrap gap-2">
          {COMPATIBILITY_ANALYSIS_LABELS.map((label) => (
            <span
              key={label}
              className="rounded-full px-3 py-1 text-[12px] font-bold"
              style={{ background: "#F0EEFF", color: "#5956E9" }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <p className="border-l-2 border-[#E0DAFF] pl-4 text-[13px] leading-[1.85] text-slate-500">
        두 사람의 사주를 비교하여 서로의 기운이 조화를 이루는지, 관계의 발전
        가능성과 주의할 점을 분석합니다.
      </p>
    </>
  );
}
