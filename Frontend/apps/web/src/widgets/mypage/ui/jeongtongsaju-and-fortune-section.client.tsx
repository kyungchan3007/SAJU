"use client";

import type {
  SajuProfileResponse,
  SajuResponse,
  TraditionalFortuneResponse,
} from "@/generated/api";
import { useJeongtongsajuAndFortuneSection } from "@/features/mypage/hooks/useJeongtongsajuAndFortuneSection";
import { JeongtongsajuAndFortuneSectionView } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-and-fortune-section-view";
import type { ApiEnvelope } from "@/shared/api";

type Props = {
  initialSajuData?: ApiEnvelope<SajuResponse | undefined>;
  initialProfileData?: ApiEnvelope<SajuProfileResponse | undefined>;
  initialTraditionalFortuneData?: ApiEnvelope<
    TraditionalFortuneResponse | undefined
  >;
};

export function JeongtongsajuAndFortuneSectionClient(props: Props) {
  const section = useJeongtongsajuAndFortuneSection(props);

  return <JeongtongsajuAndFortuneSectionView {...section} />;
}
