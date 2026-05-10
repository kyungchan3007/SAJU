import { EmptyStateCard } from "@/shared/ui/state-card/state-card";

export function SajuManageEmptyState() {
  return (
    <EmptyStateCard
      title="아직 사주 정보가 없어요"
      description="생년월일·시간·성별을 입력하면 나만의 사주 분석을 시작할 수 있어요."
      actionHref="/saju"
      actionLabel="사주 입력하기"
    />
  );
}
