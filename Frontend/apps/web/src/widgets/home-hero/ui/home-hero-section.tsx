import Link from "next/link";
import { getImageProps } from "next/image";
import type { Route } from "next";
import type { ReactNode } from "react";
import styles from "@/widgets/home-hero/ui/home-hero-section.module.css";

type HomeHeroSectionProps = {
  headingId: string;
  badgeLabel: string;
  primaryCtaLabel: string;
  primaryCtaHref: Route;
  rightSlot: ReactNode;
};

export function HomeHeroSection({
  headingId,
  badgeLabel,
  primaryCtaLabel,
  primaryCtaHref,
  rightSlot,
}: HomeHeroSectionProps) {
  const { props: mobileImageProps } = getImageProps({
    src: "/image/hero/hero_3-mobile.webp",
    alt: "",
    width: 941,
    height: 1672,
    sizes: "100vw",
    quality: 70,
    preload: true,
  });
  const { props: desktopImageProps } = getImageProps({
    src: "/image/hero/hero_3-desktop.webp",
    alt: "",
    width: 1440,
    height: 768,
    sizes: "100vw",
    quality: 75,
    preload: true,
  });

  return (
    <section
      className={`relative overflow-hidden ${styles.heroSection}`}
      aria-labelledby={headingId}
    >
      {/* 배경 이미지 — 항상 풀 커버 */}
      <picture className="absolute inset-0">
        <source
          media="(max-width: 767px)"
          srcSet={mobileImageProps.srcSet}
          sizes={mobileImageProps.sizes}
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet={desktopImageProps.srcSet}
          sizes={desktopImageProps.sizes}
          type="image/webp"
        />
        <img
          {...desktopImageProps}
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </picture>

      {/* 전체 어두운 오버레이 — 텍스트 가독성 기반 */}
      <div className="bg-black/05 pointer-events-none absolute inset-0" />

      {/* 좌측 카피 영역 페이드 — 텍스트가 더 선명하게 */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 ${styles.leftFade}`}
      />

      {/* 우측 카드 페이드 — 데스크탑에서만 */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 hidden lg:block ${styles.rightFade}`}
      />

      {/* 컨텐츠 그리드 */}
      <div
        className={`relative z-20 mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 md:py-16 lg:grid-cols-[300px_minmax(0,1fr)_220px] lg:items-center lg:gap-x-6 lg:py-0 ${styles.contentGrid}`}
      >
        {/* 좌측 카피 영역 */}
        <div className="flex flex-col gap-5">
          {/* 뱃지 */}
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/50 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {badgeLabel}
            </span>
          </div>

          {/* 헤딩 */}
          <h1
            id={headingId}
            className="font-display leading-snug text-white sm:text-2xl"
          >
            나와 비슷한 기운의 사람들과
            <br />
            <span>연결되어 보세요.</span>
          </h1>

          {/* 서브카피 */}
          <p className="text-xs leading-relaxed text-white/75">
            오행별 모임부터
            <br />
            취향 기반 커뮤니티까지
            <br />
            나와 잘 맞는 사람들을 만나보세요.
          </p>

          {/* CTA */}
          <div>
            <Link
              href={primaryCtaHref}
              prefetch={false}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 active:scale-[0.98] ${styles.ctaLink}`}
            >
              {primaryCtaLabel}
            </Link>
          </div>

          {/* 소셜 증명 */}
          <div className="flex items-center gap-3 pt-1">
            {/*<div className="flex -space-x-2">*/}
            {/*  <div className="h-7 w-7 overflow-hidden rounded-full border-2 border-white/60 bg-purple-300" />*/}
            {/*  <div className="h-7 w-7 overflow-hidden rounded-full border-2 border-white/60 bg-indigo-300" />*/}
            {/*  <div className="h-7 w-7 overflow-hidden rounded-full border-2 border-white/60 bg-pink-300" />*/}
            {/*</div>*/}
            <p className="text-[11px] leading-relaxed text-white/80">
              203,000명 이상이 선택한 정통 사주
              <br />
              지금까지 <strong className="text-white/90">124,563건</strong>의
              분석이 완료되었어요.
            </p>
          </div>
        </div>

        {/* 데스크탑 중앙 여백 */}
        <div className="hidden lg:block" />

        {/* 우측 슬롯 */}
        <div className="w-full max-w-sm justify-self-center lg:max-w-none">
          {rightSlot}
        </div>
      </div>
    </section>
  );
}
