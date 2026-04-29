"use client";

import { useQuery } from "@tanstack/react-query";

import { SajuPreviewCard } from "@/domain/saju";
import { fetchSajuResultOnClient } from "@/entities/saju";
import { SAJU_RESULT_QUERY_KEY } from "@/features/saju-result/model/query";

export function SajuResult() {
  const { data, isLoading, error } = useQuery({
    queryKey: SAJU_RESULT_QUERY_KEY,
    queryFn: fetchSajuResultOnClient,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="card-saju-primary p-6 text-sm text-black/60">
        사주 결과를 불러오는 중입니다.
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-saju-primary p-6 text-sm text-red-600">
        {error instanceof Error
          ? error.message
          : "사주 결과를 불러오지 못했습니다."}
      </div>
    );
  }

  return <SajuPreviewCard dailyResult={data?.data} />;
}
