import Link from "next/link";

import { Button, EmptyStateCard, LoadingStateCard } from "@/shared/ui";

import { ZodiacCompatibilityContent } from "./zodiac-compatibility-content";

type Props = {
  isLoading: boolean;
  compatibility: Record<string, unknown> | Array<unknown> | null;
  myZodiac?: string | null;
  birthYear?: string | null;
};

export function ZodiacCompatibilitySectionView({
  isLoading,
  compatibility,
  myZodiac,
  birthYear,
}: Props) {
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
