"use client";

import { useJeongtongsaju } from "@/features/mypage/hooks/useJeongtongsaju";
import { JeongtongsajuSummary } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-summary";
import { JeongtongsajuPillars } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-pillars";
import { JeongtongsajuFiveElements } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-fiveelements";
import { JeongtongsajuTwelveGrowth } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-twelve-growth";
import { JeongtongsajuDaewoon } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-daewoon";
import type { Pillar } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-pillars";
import type { FiveElements } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-fiveelements";
import type { TwelveGrowthInfo } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-twelve-growth";
import type { DaewoonItem } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-daewoon";
import {
  EmptyStateCard,
  ErrorStateCard,
  LoadingStateCard,
} from "@/shared/ui/state-card/state-card";

export function JeongtongsajuSection() {
  const { data, isLoading, isError } = useJeongtongsaju();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2.5 font-['Jua',sans-serif] text-[22px]">
          정통사주
          <span className="h-0.5 flex-1 bg-black" />
        </h2>
        <LoadingStateCard message="사주 정보를 불러오는 중..." />
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2.5 font-['Jua',sans-serif] text-[22px]">
          정통사주
          <span className="h-0.5 flex-1 bg-black" />
        </h2>
        <ErrorStateCard
          title="사주 정보를 불러오지 못했습니다"
          description="잠시 후 다시 확인해 주세요."
          actionHref="/mypage"
          actionLabel="마이페이지로 돌아가기"
        />
      </div>
    );
  }

  if (!data.data) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2.5 font-['Jua',sans-serif] text-[22px]">
          정통사주
          <span className="h-0.5 flex-1 bg-black" />
        </h2>
        <EmptyStateCard
          title="사주 정보가 없습니다"
          description="사주를 먼저 입력해 주세요."
          actionHref="/saju"
          actionLabel="사주 입력하기 →"
        />
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
