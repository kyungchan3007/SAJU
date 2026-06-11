import type { PersonalityProfileResponse } from "@/generated/api";

type Props = {
  data: PersonalityProfileResponse;
};

export function PersonalityHero({ data }: Props) {
  return (
    <div
      className="rounded-3xl p-5 shadow-[0_4px_20px_rgba(89,86,233,0.25)]"
      style={{ background: "linear-gradient(135deg, #5956E9, #7C3AED)" }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white">
          상세 성향 리포트
        </span>
      </div>

      <div className="text-xl font-black text-white">
        {data.personalityType ?? "성향 분석 결과"}
      </div>

      {data.personalityDescription && (
        <div className="mt-3 rounded-2xl bg-white/15 p-4">
          <p className="text-[13px] leading-[1.75] text-white/90">
            {data.personalityDescription}
          </p>
        </div>
      )}
    </div>
  );
}
