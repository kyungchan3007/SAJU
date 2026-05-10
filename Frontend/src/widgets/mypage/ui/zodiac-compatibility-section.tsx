"use client";

import { useZodiacCompatibility } from "@/features/mypage/hooks/useZodiacCompatibility";
import { useJeongtongsaju } from "@/features/mypage/hooks/useJeongtongsaju";
import { ZodiacCompatibilityLoadingState } from "@/features/mypage/ui/zodiac-compatibility/zodiac-compatibility-loading-state";
import { ZodiacCompatibilityEmptyState } from "@/features/mypage/ui/zodiac-compatibility/zodiac-compatibility-empty-state";
import { ZodiacCompatibilityContent } from "@/features/mypage/ui/zodiac-compatibility/zodiac-compatibility-content";

export function ZodiacCompatibilitySection() {
  const { isLoading, data } = useZodiacCompatibility();

  const traditionalQuery = useJeongtongsaju();
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2.5 font-['Jua',sans-serif] text-[22px]">
        띠별 궁합 <span className="h-0.5 flex-1 bg-black" />
      </h2>

      {isLoading && <ZodiacCompatibilityLoadingState />}

      {!isLoading && !compatibility && <ZodiacCompatibilityEmptyState />}

      {!isLoading && compatibility && (
        <ZodiacCompatibilityContent data={compatibility} myZodiac={myZodiac} />
      )}
    </div>
  );
}
