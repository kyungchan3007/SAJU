"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useZodiacCompatibility } from "@/features/mypage/hooks/useZodiacCompatibility";
import { useJeongtongsaju } from "@/features/mypage/hooks/useJeongtongsaju";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/mypage/hooks/useSajuManage";
import { ZodiacCompatibilityContent } from "@/features/mypage/ui/zodiac-compatibility/zodiac-compatibility-content";
import { Button, EmptyStateCard, LoadingStateCard } from "@/shared/ui";

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
      {isLoading && (
        <LoadingStateCard message="띠별 궁합을 불러오는 중..." />
      )}

      {!isLoading && !compatibility && (
        <EmptyStateCard
          title="아직 사주 정보가 없어요"
          description="생년월일·시간·성별을 입력하면 나의 띠별 궁합을 확인할 수 있어요."
          action={
            <Button asChild size="sm" className="rounded-full">
              <Link href="/saju">사주 입력하기</Link>
            </Button>
          }
        />
      )}

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
