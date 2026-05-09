"use client";

import { useJeongtongsaju } from "@/features/mypage/hooks/useJeongtongsaju";
import { JeongtongsajuSummary } from "@/features/mypage/ui/jeongtongsaju-summary";
import { JeongtongsajuPillars } from "@/features/mypage/ui/jeongtongsaju-pillars";
import { JeongtongsajuFiveElements } from "@/features/mypage/ui/jeongtongsaju-fiveelements";
import { JeongtongsajuTwelveGrowth } from "@/features/mypage/ui/jeongtongsaju-twelve-growth";
import { JeongtongsajuDaewoon } from "@/features/mypage/ui/jeongtongsaju-daewoon";
import type { Pillar } from "@/features/mypage/ui/jeongtongsaju-pillars";
import type { FiveElements } from "@/features/mypage/ui/jeongtongsaju-fiveelements";
import type { TwelveGrowthInfo } from "@/features/mypage/ui/jeongtongsaju-twelve-growth";
import type { DaewoonItem } from "@/features/mypage/ui/jeongtongsaju-daewoon";

export function JeongtongsajuSection() {
  const { data, isLoading, isError } = useJeongtongsaju();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2.5 font-['Jua',sans-serif] text-[22px]">
          정통사주
          <span className="h-0.5 flex-1 bg-black" />
        </h2>
        <div
          className="rounded-sm border-2 border-black bg-[#FDFCF8] p-10 text-center text-[14px] text-[#7a7570]"
          style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
        >
          사주 정보를 불러오는 중...
        </div>
      </div>
    );
  }

  if (isError || !data?.success || !data.data) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2.5 font-['Jua',sans-serif] text-[22px]">
          정통사주
          <span className="h-0.5 flex-1 bg-black" />
        </h2>
        <div
          className="rounded-sm border-2 border-black bg-[#FDFCF8] p-10 text-center"
          style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
        >
          <p className="mb-2 font-bold">사주 정보가 없습니다</p>
          <p className="text-[13px] text-[#7a7570]">
            사주를 먼저 입력해 주세요.
          </p>
          <a
            href="/saju"
            className="mt-4 inline-block rounded-full border-2 border-black bg-yellow-300 px-5 py-2 text-[13px] font-bold"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            사주 입력하기 →
          </a>
        </div>
      </div>
    );
  }

  const saju = data.data;
  const traits = (saju.traits ?? {}) as Record<string, string>;
  const pillars = (saju.pillars ?? []) as Pillar[];
  const fiveElements = (saju.fiveElements ?? { elements: {} }) as FiveElements;
  const twelveGrowthInfo = (saju.twelveGrowthInfo ?? {}) as TwelveGrowthInfo;
  const bigLuck = (saju.bigLuck ?? []) as DaewoonItem[];
  console.log(bigLuck);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2.5 font-['Jua',sans-serif] text-[22px]">
        정통사주
        <span className="h-0.5 flex-1 bg-black" />
      </h2>

      {/* 명식 요약 */}
      <JeongtongsajuSummary traits={traits} />

      {/* 4기둥 */}
      {pillars.length > 0 && <JeongtongsajuPillars pillars={pillars} />}

      {/* 오행 밸런스 */}
      {Object.keys(fiveElements.elements ?? {}).length > 0 && (
        <JeongtongsajuFiveElements fiveElements={fiveElements} />
      )}

      {/* 12운성 */}
      {Object.keys(twelveGrowthInfo).length > 0 && (
        <JeongtongsajuTwelveGrowth twelveGrowthInfo={twelveGrowthInfo} />
      )}

      {/* 대운 흐름 */}
      {bigLuck.length > 0 && <JeongtongsajuDaewoon bigLuck={bigLuck} />}
    </div>
  );
}
