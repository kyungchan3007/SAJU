"use client";

import { useQuery } from "@tanstack/react-query";
import { useZodiacCompatibility } from "@/features/mypage/hooks/useZodiacCompatibility";
import { useJeongtongsaju } from "@/features/mypage/hooks/useJeongtongsaju";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/mypage/hooks/useSajuManage";
import { ZodiacCompatibilityLoadingState } from "@/features/mypage/ui/zodiac-compatibility/zodiac-compatibility-loading-state";
import { ZodiacCompatibilityEmptyState } from "@/features/mypage/ui/zodiac-compatibility/zodiac-compatibility-empty-state";
import { ZodiacCompatibilityContent } from "@/features/mypage/ui/zodiac-compatibility/zodiac-compatibility-content";

export function ZodiacCompatibilitySection() {
  const { isLoading, data } = useZodiacCompatibility();

  const traditionalQuery = useJeongtongsaju();
  const profileQuery = useQuery({
    queryKey: SAJU_PROFILE_QUERY_KEY,
    queryFn: fetchSajuProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const compatibility =
    data?.success && data.data?.zodiacCompatibility
      ? data.data.zodiacCompatibility
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
  const birthYear = birthDate ? birthDate.split("-")[0] : null;

  return (
    <div className="flex flex-col gap-4">
      {isLoading && <ZodiacCompatibilityLoadingState />}

      {!isLoading && !compatibility && <ZodiacCompatibilityEmptyState />}

      {!isLoading && compatibility && (
        <ZodiacCompatibilityContent
          data={compatibility}
          myZodiac={myZodiac}
          birthYear={birthYear}
        />
      )}
    </div>
  );
}
