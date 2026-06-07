"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import type {
  SajuProfileResponse,
  SajuResponse,
  TraditionalFortuneResponse,
} from "@/generated/api";
import { toJeongtongsajuViewModel } from "@/features/mypage/model/jeongtongsaju";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import type { ApiEnvelope } from "@/shared/api";

import { useJeongtongsaju } from "./useJeongtongsaju";

type UseJeongtongsajuAndFortuneSectionOptions = {
  initialSajuData?: ApiEnvelope<SajuResponse | undefined>;
  initialProfileData?: ApiEnvelope<SajuProfileResponse | undefined>;
  initialTraditionalFortuneData?: ApiEnvelope<
    TraditionalFortuneResponse | undefined
  >;
};

export function useJeongtongsajuAndFortuneSection({
  initialSajuData,
  initialProfileData,
  initialTraditionalFortuneData,
}: UseJeongtongsajuAndFortuneSectionOptions) {
  const authScope = useAuthScope();
  const [showFortune, setShowFortune] = useState(false);

  const sajuQuery = useJeongtongsaju({
    initialData: initialSajuData,
  });
  const profileQuery = useQuery({
    queryKey: [...SAJU_PROFILE_QUERY_KEY, authScope],
    queryFn: fetchSajuProfileOnClient,
    initialData: initialProfileData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const profile = profileQuery.data?.success ? profileQuery.data.data : null;
  const saju = sajuQuery.data?.success ? sajuQuery.data.data : undefined;

  return {
    showFortune,
    initialTraditionalFortuneData,
    isLoading: sajuQuery.isLoading,
    isError: sajuQuery.isError || sajuQuery.data?.success === false,
    hasSaju: Boolean(saju),
    viewModel: saju ? toJeongtongsajuViewModel(saju) : null,
    gender: toProfileGender(profile?.gender),
    nickname: profile?.nickname ?? undefined,
    onShowFortune: () => setShowFortune(true),
  };
}

function toProfileGender(
  gender: string | null | undefined,
): "MALE" | "FEMALE" {
  return gender === "MALE" || gender === "FEMALE" ? gender : "FEMALE";
}
