"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCompatibilityOnClient } from "@/entities/compatibility/client/fetchCompatibilityOnClient";
import { fetchPartnersOnClient } from "@/entities/partner/client/fetchPartnersOnClient";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/mypage/hooks/useSajuManage";
import { PARTNERS_QUERY_KEY } from "@/features/mypage/hooks/usePartners";
import {
  toCompatibilityResultDisplay,
  type CompatibilityResultDisplay,
} from "@/features/compatibility/model/compatibility";

export type CompatibilityView = "select" | "result";

export function useCompatibility() {
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(
    null,
  );
  const [fetchPartnerId, setFetchPartnerId] = useState<number | null>(null);

  const myProfileQuery = useQuery({
    queryKey: SAJU_PROFILE_QUERY_KEY,
    queryFn: fetchSajuProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const partnersQuery = useQuery({
    queryKey: PARTNERS_QUERY_KEY,
    queryFn: fetchPartnersOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const compatibilityQuery = useQuery({
    queryKey: ["compatibility", fetchPartnerId],
    queryFn: () => fetchCompatibilityOnClient(fetchPartnerId!),
    enabled: !!fetchPartnerId,
    staleTime: 0,
    retry: 1,
  });

  const myProfile = myProfileQuery.data?.success
    ? myProfileQuery.data.data
    : null;

  const partners = partnersQuery.data?.success
    ? (partnersQuery.data.data?.partners ?? [])
    : [];

  const selectedPartner = partners.find((p) => p.id === selectedPartnerId) ?? null;

  const compatibilityData = compatibilityQuery.data?.success
    ? compatibilityQuery.data.data
    : null;
  const shouldPollCompatibility = compatibilityData?.status === "PENDING";

  useEffect(() => {
    if (!fetchPartnerId || !shouldPollCompatibility) {
      return;
    }

    const timer = window.setInterval(() => {
      compatibilityQuery.refetch();
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    compatibilityQuery.refetch,
    fetchPartnerId,
    shouldPollCompatibility,
  ]);

  const result: CompatibilityResultDisplay | null = compatibilityData
    ? toCompatibilityResultDisplay(compatibilityData)
    : null;

  const isInResultView = !!fetchPartnerId;

  function handleSelectPartner(partnerId: number) {
    setSelectedPartnerId(partnerId);
  }

  function handleShowResult() {
    if (!selectedPartnerId) return;
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
    resultLoading: compatibilityQuery.isFetching,
    resultError: compatibilityQuery.isError
      ? (compatibilityQuery.error instanceof Error
          ? compatibilityQuery.error.message
          : "궁합 조회에 실패했어요.")
      : null,
    handleReset,
  };
}
