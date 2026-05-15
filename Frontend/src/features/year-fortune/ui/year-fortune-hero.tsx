type Props = {
  yearLabel: string;
  targetYear: number;
  generalTitle: string | undefined;
};

export function YearFortuneHero({
  yearLabel,
  targetYear,
  generalTitle,
}: Props) {
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2.5 font-display text-[22px]">
        신년운세
        <span className="h-0.5 flex-1 bg-black" />
      </h2>

      <div
        className="relative overflow-hidden rounded-md border-2 border-[#0d0d0d] text-white"
        style={{ background: "#06060f", boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
            radial-gradient(ellipse at 80% 15%, rgba(99,102,241,.28), transparent 40%),
            radial-gradient(ellipse at 15% 80%, rgba(253,224,71,.14), transparent 40%),
            radial-gradient(ellipse at 50% 50%, rgba(139,92,246,.12), transparent 55%)
          `,
          }}
        />
        <div className="relative z-10 p-6">
          <span
            className="mb-2.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[.08em]"
            style={{
              border: "1.5px solid rgba(99,102,241,.5)",
              color: "#a5b4fc",
              background: "rgba(99,102,241,.1)",
            }}
          >
            ✦ {yearLabel} 신년운세 풀이
          </span>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="font-display text-[clamp(20px,4vw,28px)] leading-tight"
                style={{ letterSpacing: "-.02em" }}
              >
                <span style={{ color: "#FDE047" }}>{targetYear}년</span>은
                <br />
                {generalTitle ?? "새로운 한 해"}
              </p>
              <p className="mt-2 text-[12px] leading-[1.7] text-[rgba(255,255,255,.5)]">
                {yearLabel}
              </p>
            </div>
            <div className="shrink-0 text-center">
              <p
                className="font-display text-[42px] leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, #a5b4fc 20%, #6366f1 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {targetYear}
              </p>
              <span
                className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-black"
                style={{
                  background: "rgba(99,102,241,.15)",
                  border: "1.5px solid rgba(99,102,241,.3)",
                  color: "#a5b4fc",
                }}
              >
                신년운세
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
