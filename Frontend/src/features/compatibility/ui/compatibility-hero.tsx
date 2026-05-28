"use client";

import type { SajuProfileResponse } from "@/generated/api";
import { SajuHeroCardShell } from "@/shared/ui/saju-hero-card-shell";
import { formatKoreanDateWithWeekday } from "@/shared/utils/date";

type Props = {
  myProfile?: SajuProfileResponse | null;
};

export function CompatibilityHero({ myProfile }: Props) {
  const nickname = myProfile?.nickname ?? "회원";

  return (
    <SajuHeroCardShell
      imageSrc="/image/compatibility/hero/compatibilityHero.png"
      imageAlt="궁합 인물"
    >
      <div className="relative z-10 flex min-h-[420px] flex-col gap-6 px-6 py-8 md:h-full md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
        <CompatibilityHeroTitle nickname={nickname} />
        <div className="hidden md:block md:flex-1" />
        <CompatibilityHeroMessage />
      </div>
    </SajuHeroCardShell>
  );
}

function CompatibilityHeroBadge() {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="11" height="11" viewBox="0 0 24 24" className="fill-saju-accent">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="text-[11px] font-bold tracking-[0.06em] text-saju-accent">
        궁합
      </span>
    </div>
  );
}

function CompatibilityHeroTitle({ nickname }: { nickname: string }) {
  return (
    <div className="flex flex-col gap-3 md:w-[240px] md:shrink-0">
      <CompatibilityHeroBadge />
      <div>
        <p className="text-[17px] font-semibold leading-[1.2] text-white/80">
          {nickname}님의
        </p>
        <h1 className="mt-1 text-[36px] font-black leading-[1.05] text-white md:text-[40px]">
          궁합 확인
        </h1>
      </div>
      <p className="text-[11.5px] leading-[1.8] text-white/65">
        서로의 사주를 바탕으로 관계의 조화와
        <br />
        미래의 흐름을 분석해드려요.
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
        <span className="text-[11.5px] font-semibold text-white">
          {formatKoreanDateWithWeekday(undefined)}
        </span>
      </div>
    </div>
  );
}

function CompatibilityHeroMessage() {
  return (
    <div className="flex flex-col gap-2.5 md:w-[240px] md:shrink-0">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-white/70">
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
      <p className="text-[12px] leading-[1.9] text-white/90">
        감정 표현이 자연스러운 날입니다.
        <br />
        다만 조절이 필요할 수 있습니다.
      </p>
      <div className="flex flex-col gap-0.5 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2.5 backdrop-blur-sm">
        <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-white/50">
          나의 사주
        </span>
        <span className="mt-0.5 text-base font-extrabold text-white">
          수 (水)
        </span>
        <span className="mt-0.5 text-[11px] leading-[1.6] text-white/65">
          오늘은 수 기운 보완이 필요한 날이에요.
        </span>
      </div>
      <p className="text-[11px] font-semibold leading-[1.75] text-white/60">
        &ldquo;오늘은 감정의 흐름을 따르되,
        <br />
        균형을 잃지 마세요.&rdquo;
      </p>
    </div>
  );
}
