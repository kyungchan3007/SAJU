"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { fetchCompatibilityOnClient } from "@/entities/compatibility/client/fetchCompatibilityOnClient";
import { fetchPartnersOnClient } from "@/entities/partner/client/fetchPartnersOnClient";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import { PARTNERS_QUERY_KEY } from "@/features/mypage/hooks/usePartners";
import {
  resolveCompatibilityStatus,
  toCompatibilityResultDisplay,
  type CompatibilityResultDisplay,
} from "@/features/compatibility/model/compatibility";

export type CompatibilityView = "select" | "result";

export function useCompatibility() {
  const authScope = useAuthScope();
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(
    null,
  );
  const [fetchPartnerId, setFetchPartnerId] = useState<number | null>(null);
  const [resultRequestId, setResultRequestId] = useState(0);

  const myProfileQuery = useQuery({
    queryKey: [...SAJU_PROFILE_QUERY_KEY, authScope],
    queryFn: fetchSajuProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const partnersQuery = useQuery({
    queryKey: [...PARTNERS_QUERY_KEY, authScope],
    queryFn: fetchPartnersOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const compatibilityQuery = useQuery({
    queryKey: ["compatibility", authScope, fetchPartnerId],
    queryFn: () => fetchCompatibilityOnClient(fetchPartnerId!),
    enabled: !!fetchPartnerId,
    staleTime: 0,
    retry: 1,
  });
  const { refetch: refetchCompatibility } = compatibilityQuery;

  const myProfile = myProfileQuery.data?.success
    ? myProfileQuery.data.data
    : null;

  const partners = partnersQuery.data?.success
    ? (partnersQuery.data.data?.partners ?? [])
    : [];

  const selectedPartner =
    partners.find((p) => p.id === selectedPartnerId) ?? null;

  const compatibilityData = compatibilityQuery.data?.success
    ? compatibilityQuery.data.data
    : null;
  const compatibilityStatus = resolveCompatibilityStatus(
    compatibilityQuery.data?.success
      ? compatibilityQuery.data.meta?.backendStatus
      : undefined,
    compatibilityData?.status,
  );
  const shouldPollCompatibility = compatibilityStatus === "PENDING";

  useEffect(() => {
    if (!fetchPartnerId || !shouldPollCompatibility) {
      return;
    }

    const timer = window.setInterval(() => {
      refetchCompatibility();
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [fetchPartnerId, refetchCompatibility, shouldPollCompatibility]);

  const result: CompatibilityResultDisplay | null = compatibilityData
    ? toCompatibilityResultDisplay(
        compatibilityData,
        compatibilityQuery.data?.success
          ? compatibilityQuery.data.meta?.backendStatus
          : undefined,
      )
    : null;

  const isInResultView = !!fetchPartnerId;

  function handleSelectPartner(partnerId: number) {
    setSelectedPartnerId(partnerId);
  }

  function handleShowResult() {
    if (!selectedPartnerId) return;
    setResultRequestId((current) => current + 1);
    setFetchPartnerId(selectedPartnerId);
  }

  function handleReset() {
    setFetchPartnerId(null);
    setSelectedPartnerId(null);
  }

  return {
    isInResultView,
    // 선택 화면
    myProfile,
    myProfileLoading: myProfileQuery.isLoading,
    partners,
    partnersLoading: partnersQuery.isLoading,
    selectedPartnerId,
    selectedPartner,
    handleSelectPartner,
    handleShowResult,
    // 결과 화면
    result,
    resultRequestId,
    resultLoading: compatibilityQuery.isFetching,
    resultError: compatibilityQuery.isError
      ? compatibilityQuery.error instanceof Error
        ? compatibilityQuery.error.message
        : "궁합 조회에 실패했어요."
      : null,
    handleReset,
  };
}
