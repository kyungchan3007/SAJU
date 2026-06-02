"use client";

import Link from "next/link";

import { useJeongtongsaju } from "@/features/mypage/hooks/useJeongtongsaju";
import { JeongtongsajuSummary } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-summary";
import { JeongtongsajuPillars } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-pillars";
import { JeongtongsajuFiveElements } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-fiveelements";
import { JeongtongsajuTwelveGrowth } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-twelve-growth";
import { JeongtongsajuDaewoon } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-daewoon";
import { toJeongtongsajuViewModel } from "@/features/mypage/model/jeongtongsaju";
import { Button } from "@/shared/ui";
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
          action={
            <Button asChild size="sm" className="rounded-full">
              <Link href="/mypage">마이페이지로 돌아가기</Link>
            </Button>
          }
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
          action={
            <Button asChild size="sm" className="rounded-full">
              <Link href="/saju">사주 입력하기 →</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const { traits, pillars, fiveElements, twelveGrowthInfo, bigLuck } =
    toJeongtongsajuViewModel(data.data);

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
