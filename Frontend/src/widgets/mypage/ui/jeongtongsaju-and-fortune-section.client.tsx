"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
  SajuProfileResponse,
  SajuResponse,
  TraditionalFortuneResponse,
} from "@/generated/api";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { useJeongtongsaju } from "@/features/mypage/hooks/useJeongtongsaju";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/mypage/hooks/useSajuManage";
import { toJeongtongsajuViewModel } from "@/features/mypage/model/jeongtongsaju";
import { JeongtongsajuDaewoon } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-daewoon";
import { JeongtongsajuFiveElements } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-fiveelements";
import { JeongtongsajuHero } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-hero";
import { JeongtongsajuNextSteps } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-next-steps";
import { JeongtongsajuPillars } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-pillars";
import { JeongtongsajuTwelveGrowth } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-twelve-growth";
import { TraditionalFortuneSection } from "@/features/traditional-fortune/ui/traditional-fortune-section";
import type { ApiEnvelope } from "@/shared/api";
import { PageContentLayout } from "@/shared/ui/page-content-layout";
import {
  EmptyStateCard,
  ErrorStateCard,
  LoadingStateCard,
} from "@/shared/ui/state-card/state-card";

type Props = {
  initialSajuData?: ApiEnvelope<SajuResponse | undefined>;
  initialProfileData?: ApiEnvelope<SajuProfileResponse | undefined>;
  initialTraditionalFortuneData?: ApiEnvelope<
    TraditionalFortuneResponse | undefined
  >;
};

export function JeongtongsajuAndFortuneSectionClient({
  initialSajuData,
  initialProfileData,
  initialTraditionalFortuneData,
}: Props) {
  const [showFortune, setShowFortune] = useState(false);

  const {
    data: sajuData,
    isLoading,
    isError,
  } = useJeongtongsaju({
    initialData: initialSajuData,
  });
  const { data: profileData } = useQuery({
    queryKey: SAJU_PROFILE_QUERY_KEY,
    queryFn: fetchSajuProfileOnClient,
    initialData: initialProfileData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const gender = profileData?.success
    ? (profileData.data?.gender ?? "FEMALE")
    : "FEMALE";
  const nickname = profileData?.success
    ? (profileData.data?.nickname ?? undefined)
    : undefined;

  if (showFortune) {
    return <TraditionalFortuneSection initialData={initialTraditionalFortuneData} />;
  }

  if (isLoading) {
    return <LoadingStateCard message="사주 정보를 불러오는 중..." />;
  }

  if (isError || !sajuData?.success) {
    return (
      <ErrorStateCard
        title="사주 정보를 불러오지 못했습니다"
        description="잠시 후 다시 확인해 주세요."
        actionHref="/mypage"
        actionLabel="마이페이지로 돌아가기"
      />
    );
  }

  if (!sajuData.data) {
    return (
      <EmptyStateCard
        title="사주 정보가 없습니다"
        description="사주를 먼저 입력해 주세요."
        actionHref="/saju"
        actionLabel="사주 입력하기 →"
      />
    );
  }

  const {
    traits,
    pillars,
    fiveElements,
    twelveGrowthInfo,
    bigLuck,
    sectionDescriptions,
  } = toJeongtongsajuViewModel(sajuData.data);

  return (
    <PageContentLayout>
      <div className="flex flex-col gap-8">
        <JeongtongsajuHero
          traits={traits}
          fiveElements={fiveElements}
          gender={gender}
          nickname={nickname}
        />
        {pillars.length > 0 && <JeongtongsajuPillars pillars={pillars} />}
        {Object.keys(fiveElements.elements ?? {}).length > 0 && (
          <JeongtongsajuFiveElements fiveElements={fiveElements} />
        )}
        {Object.keys(twelveGrowthInfo).length > 0 && (
          <JeongtongsajuTwelveGrowth
            twelveGrowthInfo={twelveGrowthInfo}
            description={sectionDescriptions.twelveGrowth}
          />
        )}
        {bigLuck.length > 0 && (
          <JeongtongsajuDaewoon
            bigLuck={bigLuck}
            description={sectionDescriptions.bigLuck}
          />
        )}
        <JeongtongsajuNextSteps />

        <div className="rounded-3xl p-8 text-center">
          <h2 className="mb-2 text-[20px] font-black">
            더 자세한 분석이 필요하신가요?
          </h2>
          <p className="mb-5 text-[13px] text-black/50">
            올해 운세 풀이 · 재물 · 애정 · 직업 · 건강 종합 분석
          </p>
          <button
            type="button"
            onClick={() => setShowFortune(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#5956E9] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:opacity-90"
          >
            정통사주 풀이 보기 →
          </button>
        </div>
      </div>
    </PageContentLayout>
  );
}
