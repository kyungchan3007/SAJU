import type { TraditionalFortuneResponse } from "@/generated/api";

type Props = {
  data: TraditionalFortuneResponse;
};

export function TraditionalFortuneHeroBanner({ data }: Props) {
  const score = data.yearScore ?? 0;
  const stars = Math.round((score / 100) * 5);

  return (
    <div
      className="relative overflow-hidden rounded-md border-2 border-black bg-[#0d0d0d] text-white"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 15%,rgba(34,197,94,.18),transparent 40%), radial-gradient(ellipse at 15% 85%,rgba(253,224,71,.14),transparent 38%), radial-gradient(ellipse at 50% 55%,rgba(139,92,246,.08),transparent 50%)",
        }}
      />
      <div className="relative z-10 grid grid-cols-[1fr_auto] items-center gap-6 p-5 sm:p-6">
        <div>
          <div className="mb-2.5 inline-block rounded-full border-[1.5px] border-[rgba(34,197,94,.45)] bg-[rgba(34,197,94,.08)] px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-[#86efac]">
            정통사주 해설
          </div>
          <div className="mb-2 font-display text-[clamp(18px,4vw,26px)] leading-tight">
            {data.yearDescription ? (
              <>
                올해에게 주는 말
                <br />
                <span className="text-[#FDE047]">{data.yearDescription}</span>
              </>
            ) : (
              "올해에게 주는 말"
            )}
          </div>
          {data.fiveElementsSummary && (
            <p className="text-[12px] leading-relaxed text-[rgba(255,255,255,.5)]">
              {data.fiveElementsSummary}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-center gap-1 text-center">
          <div className="mb-1 text-[18px] tracking-[3px]">
            {"★".repeat(Math.max(1, stars))}
          </div>
          <span
            className="font-display text-[48px] leading-none"
            style={{
              background: "linear-gradient(135deg,#86efac 20%,#22C55E 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {score}
          </span>
          <div className="mt-1 flex flex-col items-center gap-1">
            <span className="rounded-full border-[1.5px] border-[rgba(34,197,94,.3)] bg-[rgba(34,197,94,.15)] px-2.5 py-0.5 text-[12px] font-black text-[#86efac]">
              기운 점수
            </span>
            {data.topPercentage && (
              <span className="text-[10px] text-[rgba(255,255,255,.38)]">
                {data.topPercentage}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
