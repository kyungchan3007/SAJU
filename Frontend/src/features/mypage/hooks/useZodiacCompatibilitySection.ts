"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/mypage/hooks/useSajuManage";

import { useJeongtongsaju } from "./useJeongtongsaju";
import { useZodiacCompatibility } from "./useZodiacCompatibility";

export function useZodiacCompatibilitySection() {
  const compatibilityQuery = useZodiacCompatibility();
  const traditionalQuery = useJeongtongsaju();
  const profileQuery = useQuery({
    queryKey: SAJU_PROFILE_QUERY_KEY,
    queryFn: fetchSajuProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const compatibility =
    compatibilityQuery.data?.success &&
    compatibilityQuery.data.data?.zodiacCompatibility
      ? compatibilityQuery.data.data.zodiacCompatibility
      : null;

  const myZodiac = traditionalQuery.data?.success
    ? ((
        traditionalQuery.data.data?.traits as
          | Record<string, unknown>
          | undefined
      )?.summaryZodiac as string | null | undefined)
    : null;

  const birthDate = profileQuery.data?.success
    ? profileQuery.data.data?.birthDate
    : null;

  return {
    isLoading: compatibilityQuery.isLoading,
    compatibility,
    myZodiac,
    birthYear: birthDate ? birthDate.split("-")[0] : null,
  };
}
