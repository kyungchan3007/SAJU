import Link from "next/link";

import type { TraditionalFortuneResponse } from "@/generated/api";
import type { JeongtongsajuViewModel } from "@/features/mypage/model/jeongtongsaju";
import { TraditionalFortuneSection } from "@/features/traditional-fortune/ui/traditional-fortune-section";
import type { ApiEnvelope } from "@/shared/api";
import { RedirectToError } from "@/shared/app-infra/navigation/redirect-to-error.client";
import {
  Button,
  EmptyStateCard,
  LoadingStateCard,
} from "@/shared/ui";
import { PageContentLayout } from "@/shared/ui/page-content-layout";

import { JeongtongsajuDaewoon } from "./jeongtongsaju-daewoon";
import { JeongtongsajuFiveElements } from "./jeongtongsaju-fiveelements";
import { JeongtongsajuFortuneCta } from "./jeongtongsaju-fortune-cta";
import { JeongtongsajuHero } from "./jeongtongsaju-hero";
import { JeongtongsajuNextSteps } from "./jeongtongsaju-next-steps";
import { JeongtongsajuPillars } from "./jeongtongsaju-pillars";
import { JeongtongsajuTwelveGrowth } from "./jeongtongsaju-twelve-growth";

type Props = {
  showFortune: boolean;
  initialTraditionalFortuneData?: ApiEnvelope<
    TraditionalFortuneResponse | undefined
  >;
  isLoading: boolean;
  isError: boolean;
  hasSaju: boolean;
  viewModel: JeongtongsajuViewModel | null;
  gender: "MALE" | "FEMALE";
  nickname?: string;
  onShowFortune: () => void;
};

export function JeongtongsajuAndFortuneSectionView({
  showFortune,
  initialTraditionalFortuneData,
  isLoading,
  isError,
  hasSaju,
  viewModel,
  gender,
  nickname,
  onShowFortune,
}: Props) {
  if (showFortune) {
    return (
      <TraditionalFortuneSection initialData={initialTraditionalFortuneData} />
    );
  }

  if (isLoading) {
    return <LoadingStateCard message="사주 정보를 불러오는 중..." />;
  }

  if (isError) {
    return <RedirectToError code="JEONGTONGSAJU_LOAD_FAILED" />;
  }

  if (!hasSaju) {
    return (
      <EmptyStateCard
        title="사주 정보가 없습니다"
        description="사주를 먼저 입력해 주세요."
        action={
          <Button asChild size="sm" className="rounded-full">
            <Link href="/saju">사주 입력하기</Link>
          </Button>
        }
      />
    );
  }

  if (!viewModel) {
    return <RedirectToError code="JEONGTONGSAJU_LOAD_FAILED" />;
  }

  return (
    <PageContentLayout>
      <div className="flex flex-col gap-8">
        <JeongtongsajuHero
          traits={viewModel.traits}
          fiveElements={viewModel.fiveElements}
          gender={gender}
          nickname={nickname}
        />
        {viewModel.pillars.length > 0 && (
          <JeongtongsajuPillars pillars={viewModel.pillars} />
        )}
        {Object.keys(viewModel.fiveElements.elements ?? {}).length > 0 && (
          <JeongtongsajuFiveElements fiveElements={viewModel.fiveElements} />
        )}
        {Object.keys(viewModel.twelveGrowthInfo).length > 0 && (
          <JeongtongsajuTwelveGrowth
            twelveGrowthInfo={viewModel.twelveGrowthInfo}
            description={viewModel.sectionDescriptions.twelveGrowth}
          />
        )}
        {viewModel.bigLuck.length > 0 && (
          <JeongtongsajuDaewoon
            bigLuck={viewModel.bigLuck}
            description={viewModel.sectionDescriptions.bigLuck}
          />
        )}
        <JeongtongsajuNextSteps />
        <JeongtongsajuFortuneCta onShowFortune={onShowFortune} />
      </div>
    </PageContentLayout>
  );
}
