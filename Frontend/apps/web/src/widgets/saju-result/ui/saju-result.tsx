import { SajuPreviewCard } from "@/domain/saju/guid-card/preview-card/ui/saju-preview-card";
import { getSajuProfileOnServer } from "@/entities/saju/server/getSajuProfileOnServer";
import { getSajuResultOnServer } from "@/entities/saju/server/getSajuResultOnServer";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { RewardedResultGate } from "@/features/saju-result/ui/rewarded-result-gate.client";

export async function SajuResult() {
  const result = await getSajuResultOnServer();

  if (!result.success) {
    if (result.status === 401) {
      return <AuthRefreshRetry />;
    }

    return (
      <div className="mx-auto max-w-lg px-4 py-10 text-sm text-red-600">
        {result.message || "사주 결과를 불러오지 못했습니다."}
      </div>
    );
  }

  const profile = await getSajuProfileOnServer({
    refreshOnUnauthorized: false,
  });

  return (
    <RewardedResultGate>
      <SajuPreviewCard
        dailyResult={result.data}
        profile={profile.success ? profile.data : null}
      />
    </RewardedResultGate>
  );
}
