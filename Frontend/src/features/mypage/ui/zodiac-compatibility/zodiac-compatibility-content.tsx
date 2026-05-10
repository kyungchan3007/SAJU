import {
  buildZodiacCompatibilityEntries,
  findMyZodiacEntry,
  ZODIAC_COMPATIBILITY_GRADE_STYLES,
  ZODIAC_COMPATIBILITY_LEGEND_ITEMS,
} from "@/features/mypage/model/zodiacCompatibility";

type Props = {
  data: Record<string, unknown> | Array<unknown>;
  myZodiac?: string | null;
};

export function ZodiacCompatibilityContent({ data, myZodiac }: Props) {
  const entries = buildZodiacCompatibilityEntries(data);
  const myEntry = findMyZodiacEntry(myZodiac);

  return (
    <div className="flex flex-col gap-4">
      {/* 나의 띠 + 범례 */}
      <div
        className="rounded-sm border-2 border-black bg-[#FDFCF8] p-4"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        <div className="flex flex-wrap items-center gap-4">
          {/* 나의 띠 */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-[#fef9c3] text-3xl"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {myEntry?.animal ?? "🔮"}
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-widest text-[#7a7570]">
                나의 띠
              </p>
              <p className="font-['Jua',sans-serif] text-[22px]">
                {myZodiac ?? "–"}
              </p>
            </div>
          </div>

          {/* 범례 */}
          <div className="ml-auto flex flex-wrap gap-3">
            {ZODIAC_COMPATIBILITY_LEGEND_ITEMS.map(({ grade, color }) => (
              <div
                key={grade}
                className="flex items-center gap-1.5 text-[11px] font-semibold"
              >
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full border border-black/20 ${color}`}
                />
                {ZODIAC_COMPATIBILITY_GRADE_STYLES[grade].label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 12 띠 그리드 */}
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-4">
        {entries.map((entry) => {
          const style = ZODIAC_COMPATIBILITY_GRADE_STYLES[entry.grade];
          return (
            <div
              key={entry.key}
              className={`flex flex-col items-center gap-1.5 rounded-sm border-2 border-black p-3 text-center ${style.card} cursor-default transition hover:-translate-x-px hover:-translate-y-px`}
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              <div className="text-[26px]">{entry.animal}</div>
              <div className="text-[12px] font-bold leading-tight text-[#0d0d0d]">
                {entry.name}
              </div>
              <div className="text-[11px] text-[#7a7570]">{entry.branch}</div>

              {/* grade 바 */}
              <div className="h-1 w-full overflow-hidden rounded-full border border-black/20 bg-[#F0EDE6]">
                <div
                  className={`h-full rounded-full ${style.bar}`}
                  style={{ width: `${entry.score}%` }}
                />
              </div>

              <div className="font-['Jua',sans-serif] text-[18px]">
                {entry.score}
              </div>

              {/* 관계 뱃지 */}
              <div
                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${style.badge}`}
              >
                {entry.relation}
              </div>

              <div className="mt-0.5 text-[10px] leading-snug text-[#7a7570]">
                {entry.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
