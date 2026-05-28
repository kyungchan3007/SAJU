import type { UserInfoDisplay } from "@/features/year-fortune/model/yearFortune";

type Props = {
  yearLabel: string;
  targetYear: number;
  userInfo: UserInfoDisplay;
};

export function YearFortuneHero({ yearLabel, targetYear, userInfo }: Props) {
  const { manse, gender, birthYear, daeun } = userInfo;

  const metaLine = [
    manse,
    birthYear ? `${birthYear}년생` : undefined,
    gender,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-7 md:p-8"
      style={{
        background:
          "linear-gradient(135deg, #5956E9 0%, #7C3AED 60%, #A855F7 100%)",
        boxShadow: "0 4px 24px rgba(89,86,233,0.28)",
      }}
    >
      {/* 연도 워터마크 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-3 select-none font-black leading-none"
        style={{ fontSize: 110, color: "rgba(255,255,255,0.06)" }}
      >
        {targetYear}
      </span>

      {/* 뱃지 */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white">
          신년운세
        </span>
      </div>

      {/* 연도 */}
      <div
        className="mb-1 text-[30px] font-black leading-tight text-white"
        style={{ letterSpacing: "-0.5px" }}
      >
        {yearLabel}
      </div>

      {/* 만세력 · 출생년 · 성별 */}
      {metaLine && (
        <div className="mb-4 text-[13px] font-bold text-white/80">
          {metaLine}
        </div>
      )}

      {/* 대운 */}
      {daeun && (
        <div className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2">
          <span className="text-[12px] font-bold text-white">{daeun}</span>
        </div>
      )}
    </div>
  );
}
