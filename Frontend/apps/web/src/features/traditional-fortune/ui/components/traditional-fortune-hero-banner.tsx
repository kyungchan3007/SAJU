import type { TraditionalFortuneResponse } from "@/generated/api";

type Props = {
  data: TraditionalFortuneResponse;
};

const CIRCUMFERENCE = 2 * Math.PI * 44;

export function TraditionalFortuneHeroBanner({ data }: Props) {
  const score = data.totalScore ?? 0;
  const offset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-[110px] w-[110px] shrink-0">
          <svg
            width="110"
            height="110"
            viewBox="0 0 110 110"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="55"
              cy="55"
              r="44"
              fill="none"
              stroke="#F0EEFF"
              strokeWidth="10"
            />
            <circle
              cx="55"
              cy="55"
              r="44"
              fill="none"
              stroke="url(#brandGrad)"
              strokeWidth="10"
              strokeDasharray={String(CIRCUMFERENCE)}
              strokeDashoffset={String(offset)}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5956E9" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[28px] font-black leading-none text-[#5956E9]">
              {score}
            </span>
            <span className="text-[11px] text-slate-400">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          {data.topPercentage && (
            <div
              className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: "#F0EEFF" }}
            >
              <span className="text-[11px] font-black text-[#5956E9]">
                {data.topPercentage}
              </span>
            </div>
          )}
          <div className="mb-2 text-[13px] font-black text-gray-800">
            {data.description ?? "올해 운세"}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: "재물운", score: data.wealth?.score },
              { label: "연애운", score: data.love?.score },
              { label: "직업운", score: data.career?.score },
              { label: "건강운", score: data.health?.score },
            ]
              .filter(({ score: itemScore }) => itemScore != null)
              .map(({ label, score: itemScore }) => (
                <div
                  key={label}
                  className="rounded-xl p-1.5 text-center"
                  style={{ background: "#F9F8FF" }}
                >
                  <div className="text-[10px] text-slate-400">{label}</div>
                  <div className="text-[13px] font-black text-[#5956E9]">
                    {itemScore}점
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
