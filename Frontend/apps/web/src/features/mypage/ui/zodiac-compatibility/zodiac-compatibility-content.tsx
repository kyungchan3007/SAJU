import Image from "next/image";
import {
  buildZodiacCompatibilityEntries,
  findMyZodiacEntry,
  ZODIAC_COMPATIBILITY_GRADE_STYLES,
  ZODIAC_COMPATIBILITY_LEGEND_ITEMS,
  ZODIAC_COMPATIBILITY_ME_STYLE,
} from "@/features/mypage/model/zodiacCompatibility";
import { Badge, ProgressBar } from "@/shared/ui";

type Props = {
  data: Record<string, unknown> | Array<unknown>;
  myZodiac?: string | null;
  birthYear?: string | null;
};

export function ZodiacCompatibilityContent({
  data,
  myZodiac,
  birthYear,
}: Props) {
  const entries = buildZodiacCompatibilityEntries(data);
  const myEntry = findMyZodiacEntry(myZodiac);

  return (
    <div className="flex flex-col gap-5">
      {/* ── 배너 ── */}
      <div
        className="relative overflow-hidden rounded-[2rem] xs:hidden sm:block"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)", minHeight: 200 }}
      >
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 w-[90%] rounded-2xl xs:w-[82%] md:w-[56%]"
          style={{
            background:
              "radial-gradient(90% 120% at 0% 50%, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.26) 45%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0) 100%)",
            filter: "blur(1px)",
          }}
        />
        <Image
          src="/image/animals/dog_cat.webp"
          alt="띠별궁합 배너"
          width={1152}
          height={320}
          sizes="(max-width: 640px) 100vw, 1152px"
          className="block h-full w-full object-contain"
          style={{ minHeight: 200 }}
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-10">
          <Badge
            variant="primary"
            className="mb-4 w-fit bg-white/85 px-3.5 py-1 xs:p-1 xs:text-xs"
            style={{ background: "rgba(255,255,255,0.85)" }}
          >
            띠별궁합
          </Badge>
          <h2
            className="mb-2 text-[26px] font-black leading-[1.35] text-white xs:text-xl"
            style={{
              letterSpacing: "-0.5px",
              textShadow:
                "0 2px 12px rgba(0,0,0,0.50), 0 1px 4px rgba(0,0,0,0.35)",
            }}
          >
            나의 띠로 알아보는
            <br />
            12간지 궁합
          </h2>
          <p
            className="text-[15px] font-bold leading-[1.7] text-white"
            style={{
              textShadow:
                "0 2px 10px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.40)",
            }}
          >
            나와 잘 맞는 띠, 조심해야 할 띠를
            <br />
            사주가 알려드립니다.
          </p>
        </div>
      </div>

      {/* ── 나의 띠 카드 + 범례 ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-[#F3F4F6] bg-white p-5"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
      >
        {/* 나의 띠 */}
        <div className="flex items-center gap-4">
          <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-[18px] bg-[#F0EEFF]">
            {myEntry ? (
              <Image
                src={`/image/animals/${myEntry.img}`}
                alt={myEntry.name}
                width={44}
                height={44}
                className="object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            ) : (
              <span className="text-3xl">🔮</span>
            )}
          </div>
          <div>
            <p
              className="mb-1 text-[11px] font-semibold text-[#9CA3AF]"
              style={{ letterSpacing: "0.05em" }}
            >
              나의 띠
            </p>
            <p
              className="text-[22px] font-black leading-tight text-[#111827]"
              style={{ letterSpacing: "-0.5px" }}
            >
              {myEntry?.name ?? myZodiac ?? "–"}
            </p>
            <p className="mt-0.5 text-[13px] font-bold text-[#5956E9]">
              {myEntry?.branch ?? ""}
              {birthYear ? ` · ${birthYear}년생` : ""}
            </p>
          </div>
        </div>

        {/* 범례 */}
        <div className="flex flex-wrap items-center gap-4">
          {ZODIAC_COMPATIBILITY_LEGEND_ITEMS.map(({ grade, color }) => (
            <div
              key={grade}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-[#374151]"
            >
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${color}`}
              />
              {ZODIAC_COMPATIBILITY_GRADE_STYLES[grade].label}
            </div>
          ))}
        </div>
      </div>

      {/* ── 12띠 궁합 그리드 ── */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {entries.map((entry) => {
          const isMe = myEntry?.key === entry.key;
          const style = isMe
            ? ZODIAC_COMPATIBILITY_ME_STYLE
            : ZODIAC_COMPATIBILITY_GRADE_STYLES[entry.grade];

          return (
            <div
              key={entry.key}
              className={`flex flex-col items-center gap-2 rounded-[1.25rem] border-[1.5px] p-4 text-center transition hover:-translate-y-0.5 hover:shadow-md ${style.card}`}
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              {/* 동물 이미지 */}
              <div className="flex h-12 w-12 items-center justify-center">
                <Image
                  src={`/image/animals/${entry.img}`}
                  alt={entry.name}
                  width={44}
                  height={44}
                  className="object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>

              {/* 이름 + 지지 */}
              <div className="text-[14px] font-extrabold text-[#111827]">
                {entry.name}
              </div>
              <div
                className="text-[12px] font-semibold text-[#9CA3AF]"
                style={{ marginTop: -6 }}
              >
                {entry.branch}
              </div>

              {/* 점수 바 */}
              <ProgressBar
                value={entry.score}
                className="h-1.5 bg-[#F3F4F6]"
                indicatorClassName={style.bar}
              />

              {/* 점수 */}
              <div
                className="text-[22px] font-black leading-none text-[#111827]"
                style={{ letterSpacing: "-0.5px" }}
              >
                {entry.score}
              </div>

              {/* 관계 뱃지 */}
              <Badge className={`px-2.5 py-0.5 text-[10px] ${style.badge}`}>
                {isMe ? "나의 띠" : entry.relation}
              </Badge>

              {/* 설명 */}
              <p
                className="text-[10px] leading-[1.5] text-[#6B7280]"
                style={{ wordBreak: "keep-all" }}
              >
                {isMe ? "같은 기운을 가진 동띠입니다." : entry.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
