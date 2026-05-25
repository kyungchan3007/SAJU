import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type HomeHeroSectionProps = {
  headingId: string;
  badgeLabel: string;
  primaryCtaLabel: string;
  rightSlot: ReactNode;
};

export function HomeHeroSection({
  headingId,
  badgeLabel,
  primaryCtaLabel,
  rightSlot,
}: HomeHeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-[#F2F0FA]"
      aria-labelledby={headingId}
    >
      {/* 히어로 중앙 배경 이미지. 모바일에서는 콘텐츠 가독성을 위해 투명도를 낮춤. */}
      <Image
        src="/image/hero/hero.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="object-contain object-center opacity-35 lg:opacity-100"
      />

      {/* 좌측 카피 영역과 우측 카드가 이미지 위에서도 읽히도록 배경 페이드 처리. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-[linear-gradient(to_right,rgba(242,240,250,0.97)_0%,rgba(242,240,250,0.88)_38%,rgba(242,240,250,0)_78%)] lg:w-[55%]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[40%] bg-[linear-gradient(to_left,rgba(242,240,250,0.90)_0%,rgba(242,240,250,0.60)_25%,rgba(242,240,250,0)_45%)] lg:block" />

      {/* 모바일은 단일 컬럼, 데스크탑은 카피 / 이미지 여백 / 우측 카드 3열 구조. */}
      <div className="relative z-20 mx-auto grid min-h-[580px] max-w-6xl grid-cols-1 gap-8 px-6 py-10 md:py-14 lg:grid-cols-[280px_minmax(0,1fr)_210px] lg:items-center lg:gap-x-6 lg:py-0">
        {/* 좌측 카피, CTA, 소셜 증명 영역. */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-saju-gradient px-3 py-1 text-xs font-bold text-white">
              {badgeLabel}
            </span>
          </div>

          <h1
            id={headingId}
            className="font-display text-[2rem] font-black leading-snug text-gray-900"
          >
            정통사주로 해석하는
            <br />
            <span className="text-saju-primary">나의 타고난 명식.</span>
          </h1>

          <p className="text-xs leading-relaxed text-gray-600">
            생년월일시를 바탕으로 사주팔자, 오행, 심성,
            <br />
            대운과 세운을 분석해 당신의 성향과
            <br />
            인생의 흐름을 깊이 있게 해석합니다.
          </p>

          <div>
            <Link
              href="/saju"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: "#5956E9" }}
            >
              {primaryCtaLabel}
            </Link>
          </div>

          {/* 소셜 증명: 아바타 3개 + 한 줄 텍스트 */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full border-2 border-white bg-purple-300" />
              <div className="h-6 w-6 rounded-full border-2 border-white bg-indigo-300" />
              <div className="h-6 w-6 rounded-full border-2 border-white bg-pink-300" />
            </div>
            <p className="text-[11px] leading-relaxed text-gray-500">
              203,000명 이상이 선택한 정통 사주 서비스
              <br />
              지금까지 <strong className="text-gray-700">124,563건</strong>의 분석이 완료되었어요.
            </p>
          </div>
        </div>

        {/* 데스크탑에서 배경 이미지가 보이는 중앙 여백 컬럼. */}
        <div className="hidden lg:block" />

        {/* 게스트 로그인 카드 또는 로그인 사용자 오늘의 운세 카드가 들어오는 우측 슬롯. */}
        <div className="w-full max-w-sm justify-self-center lg:max-w-none">
          {rightSlot}
        </div>
      </div>
    </section>
  );
}

