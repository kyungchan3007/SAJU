import type {
  SajuProfileResponse,
  SajuResponse,
  TraditionalFortuneResponse,
} from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { JeongtongsajuAndFortuneSectionClient } from "@/widgets/mypage/ui/jeongtongsaju-and-fortune-section.client";

type Props = {
  initialSajuData?: ApiEnvelope<SajuResponse | undefined>;
  initialProfileData?: ApiEnvelope<SajuProfileResponse | undefined>;
  initialTraditionalFortuneData?: ApiEnvelope<TraditionalFortuneResponse | undefined>;
};

export function JeongtongsajuAndFortuneSection(props: Props) {
  return <JeongtongsajuAndFortuneSectionClient {...props} />;
}

