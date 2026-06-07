"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { updateSajuProfileOnClient } from "@/entities/saju/client/updateSajuProfileOnClient";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import { JEONGTONGSAJU_QUERY_KEY, useJeongtongsaju } from "./useJeongtongsaju";
import {
  toSajuManageFormValues,
  toSajuManageSummaryValues,
} from "@/features/mypage/model/sajuManage";
import type { SajuRequest } from "@/generated/api";

export function useSajuManage() {
  const authScope = useAuthScope();
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sajuProfileQueryKey = [...SAJU_PROFILE_QUERY_KEY, authScope] as const;
  const jeongtongsajuQueryKey = [...JEONGTONGSAJU_QUERY_KEY, authScope] as const;

  const query = useQuery({
    queryKey: sajuProfileQueryKey,
    queryFn: fetchSajuProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const traditionalQuery = useJeongtongsaju();
  const profile = query.data?.success ? query.data.data : null;
  const traits = traditionalQuery.data?.success
    ? (traditionalQuery.data.data?.traits as
        | Record<string, unknown>
        | undefined)
    : undefined;

  const mutation = useMutation({
    mutationFn: (payload: SajuRequest) => updateSajuProfileOnClient(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sajuProfileQueryKey });
      void queryClient.invalidateQueries({ queryKey: jeongtongsajuQueryKey });
    },
  });

  function handleSave(payload: SajuRequest) {
    setSuccessMessage(null);
    setErrorMessage(null);

    mutation.mutate(payload, {
      onSuccess: () => setSuccessMessage("사주 정보가 수정됐습니다."),
      onError: (error) =>
        setErrorMessage(
          error instanceof Error ? error.message : "수정에 실패했습니다.",
        ),
    });
  }

  return {
    isLoading: query.isLoading,
    isRegistered: !!profile?.birthDate,
    initialValues: profile ? toSajuManageFormValues(profile) : null,
    summary: toSajuManageSummaryValues(traits),
    isPending: mutation.isPending,
    successMessage,
    errorMessage,
    handleSave,
  };
}
