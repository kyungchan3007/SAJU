"use client";

import type { SajuProfileResponse } from "@/generated/api";
import { useCompatibilityDaily } from "@/features/compatibility/hooks/useCompatibilityDaily";
import { SajuHeroCardShell } from "@/shared/ui/saju-hero-card-shell";
import { formatKoreanDateWithWeekday } from "@/shared/utils/date";
import { getWeakElementDisplayInfo } from "@/shared/utils/weakElement";

type Props = {
  myProfile?: SajuProfileResponse | null;
};

export function CompatibilityHero({ myProfile }: Props) {
  const nickname = myProfile?.nickname ?? "회원";

  return (
    <SajuHeroCardShell
      imageSrc="/image/compatibility/hero/compatibilityHero.png"
      imageAlt="궁합 히어로"
    >
      <div className="relative z-10 flex min-h-[420px] flex-col gap-6 px-6 py-8 md:h-full md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
        <CompatibilityHeroTitle nickname={nickname} />
        <div className="hidden md:block md:flex-1" />
        <CompatibilityHeroMessage />
      </div>
    </SajuHeroCardShell>
  );
}

function CompatibilityHeroTitle({ nickname }: { nickname: string }) {
  const today = new Date();
  const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-3 md:w-[240px] md:shrink-0">
      <div>
        <p className="text-[17px] font-semibold leading-[1.2] text-white/80">
          {nickname}님의
        </p>
        <h1 className="mt-1 text-[36px] font-black leading-[1.05] text-white md:text-[40px]">
          궁합 확인
        </h1>
      </div>
      <p className="text-[13px] leading-[1.8] text-white/70">
        서로의 사주를 바탕으로 관계의 조화와
        <br />
        미래 흐름을 분석해드려요.
      </p>
      <div className="flex w-fit items-center gap-2 rounded-[10px] border border-white/20 bg-white/15 px-3 py-1.5 backdrop-blur-sm">
        <svg
          width="12"
          height="12"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="text-[12.5px] font-semibold text-white">
          {formatKoreanDateWithWeekday(todayDate)}
        </span>
      </div>
    </div>
  );
}

function CompatibilityHeroMessage() {
  const dailyQuery = useCompatibilityDaily();
  const daily = dailyQuery.data?.success ? dailyQuery.data.data : undefined;
  const weakElementInfo = getWeakElementDisplayInfo(daily?.weakElement);

  const message =
    daily?.dailyMessage ??
    "감정 표현은 자연스럽고 유연하지만, 상황 조절이 필요한 날이에요.";

  return (
    <div className="flex flex-col gap-2.5 md:w-[240px] md:shrink-0">
      <div className="flex items-center gap-1.5 text-[12px] font-bold text-white/75">
        <svg
          width="12"
          height="12"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        오늘의 한마디
      </div>
      <p className="text-[13.5px] leading-[1.9] text-white/95">{message}</p>
      {weakElementInfo && (
        <div className="flex flex-col gap-0.5 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2.5 backdrop-blur-sm">
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-white/60">
            나의 사주
          </span>
          <span className="mt-0.5 text-base font-extrabold text-white">
            {weakElementInfo.ko} ({weakElementInfo.hanja})
          </span>
          <span className="mt-0.5 text-[12px] leading-[1.65] text-white/75">
            오늘은 {weakElementInfo.ko} 기운 보완이 필요한 날이에요.
          </span>
        </div>
      )}
      <p className="text-[12px] font-semibold leading-[1.75] text-white/70">
        &ldquo;오늘은 감정의 흐름을 따르되,
        <br />
        균형 있는 선택이 중요해요.&rdquo;
      </p>
    </div>
  );
}
