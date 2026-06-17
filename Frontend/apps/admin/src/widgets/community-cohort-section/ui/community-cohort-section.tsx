"use client";

import { Card } from "@saju/ui";
import { EmptyStateCard, ErrorStateCard, LoadingStateCard } from "@saju/ui";
import { useCohortList } from "@/features/community-cohort/hooks/useCohortList";
import { CohortListTable } from "@/features/community-cohort/ui/cohort-list-table";
import { CohortCreateFormContainer } from "@/features/community-cohort/ui/cohort-create-form-container.client";

export function CommunityCohotSection() {
  const { cohorts, isLoading, isError } = useCohortList();

  return (
    <div className="flex flex-col gap-6">
      {/* 기수 목록 */}
      <section>
        <h3 className="mb-3 text-base font-bold text-content-primary">기수 목록</h3>
        {isLoading ? (
          <LoadingStateCard message="기수 목록을 불러오는 중..." />
        ) : isError ? (
          <ErrorStateCard
            title="불러오기 실패"
            description="기수 목록을 가져오지 못했습니다. 잠시 후 다시 시도해주세요."
          />
        ) : cohorts.length === 0 ? (
          <EmptyStateCard
            title="등록된 기수가 없습니다"
            description="아래 폼에서 첫 번째 기수를 등록해보세요."
          />
        ) : (
          <CohortListTable cohorts={cohorts} />
        )}
      </section>

      {/* 기수 등록 */}
      <section>
        <h3 className="mb-3 text-base font-bold text-content-primary">신규 기수 등록</h3>
        <Card variant="elevated" className="p-6">
          <CohortCreateFormContainer />
        </Card>
      </section>
    </div>
  );
}
