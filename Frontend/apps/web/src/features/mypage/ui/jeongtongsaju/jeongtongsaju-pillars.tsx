import { SAJU_PILLAR_LABEL_MAP } from "@/shared/model/saju-pillar/model";
import {
  getSajuPillarTypeAt,
  isDayPillar,
  orderSajuPillars,
} from "@/shared/model/saju-pillar/utils";
import { describeGanjiPillar } from "@/shared/model/saju-ganji/utils";

export type Pillar = {
  type: string;
  stem: string;
  branch: string;
  twelveGrowth?: string;
};

type Props = { pillars: Pillar[] };

export function JeongtongsajuPillars({ pillars }: Props) {
  const ordered = orderSajuPillars(pillars);

  return (
    <div className="rounded-3xl bg-white p-6 sm:border sm:border-gray-100 sm:shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex items-baseline gap-2">
        <h2 className="text-[18px] font-bold text-gray-900">나의 사주팔자</h2>
        <span className="text-[13px] text-gray-500">4기둥 상세</span>
      </div>

      {/* 카드 그리드 — 모바일 2×2 / 데스크톱 4열 */}
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {ordered.map((pillar, i) => {
          const type = getSajuPillarTypeAt(i);
          const isDay = isDayPillar(type);

          return (
            <div key={type} className="flex flex-col items-center">
              <span className="mb-3 text-[12px] text-gray-500">
                {SAJU_PILLAR_LABEL_MAP[type]}
              </span>
              <div
                className={`flex w-full flex-col items-center rounded-2xl border p-4 shadow-sm ${
                  isDay
                    ? "border-[#C4BAFF] bg-[#F0EEFF]"
                    : "border-gray-100 bg-white"
                }`}
              >
                <span
                  className={`mb-1 text-[26px] font-bold leading-none ${
                    isDay ? "text-[#5956E9]" : "text-gray-800"
                  }`}
                >
                  {pillar?.stem ?? "—"}
                </span>
                <span
                  className={`mb-4 text-[26px] font-bold leading-none ${
                    isDay ? "text-[#5956E9]" : "text-gray-700"
                  }`}
                >
                  {pillar?.branch ?? "—"}
                </span>
                {pillar?.twelveGrowth && (
                  <>
                    <span
                      className={`text-[16px] font-bold ${
                        isDay ? "text-[#4340C5]" : "text-gray-700"
                      }`}
                    >
                      {pillar.twelveGrowth}
                    </span>
                    <span className="text-[16px] text-gray-700">
                      {pillar.twelveGrowth}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 기둥 설명 — full width 리스트 */}
      <div className="mb-5 flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-gray-50">
        {ordered.map((pillar, i) => {
          const type = getSajuPillarTypeAt(i);
          const isDay = isDayPillar(type);
          const description = pillar
            ? describeGanjiPillar(pillar)
            : `${SAJU_PILLAR_LABEL_MAP[type]}는 천간과 지지가 결합된 사주 기둥입니다.`;

          return (
            <div key={type} className="flex flex-col gap-2 px-4 py-3.5">
              <span
                className={`inline-flex w-fit items-center justify-center rounded-full px-3 py-1 text-[11px] font-bold ${
                  isDay
                    ? "bg-[#EAE7FF] text-[#4338CA]"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {SAJU_PILLAR_LABEL_MAP[type]}
              </span>
              <p className="text-[13px] leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          );
        })}
      </div>

      {/* 기둥 의미 요약 바 */}
      <div className="rounded-xl bg-gray-50 px-4 py-3">
        <div className="flex flex-wrap items-center justify-around gap-y-1.5 text-[11px] text-gray-500">
          <span>
            <strong className="text-gray-700">연주:</strong> 초기 환경, 외부
            이미지
          </span>
          <span>
            <strong className="text-gray-700">월주:</strong> 사회성, 일, 성장
            환경
          </span>
          <span>
            <strong className="text-gray-700">일주:</strong> 나 자신, 관계의
            중심
          </span>
          <span>
            <strong className="text-gray-700">시주:</strong> 미래 방향, 내면의
            잠재력
          </span>
        </div>
      </div>
    </div>
  );
}
