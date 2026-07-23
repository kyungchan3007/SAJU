import type { Route } from "next";
import Link from "next/link";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";
import { HomeMarketingSections } from "@/features/home/ui/home-marketing-sections";
import { HomeHeroSection } from "@/widgets/home-hero/ui/home-hero-section";
import styles from "@/widgets/welcom-section/ui/welcom-section.module.css";

type WelcomSectionProps = {
  primaryCtaHref: Route;
};

export function WelcomSection({ primaryCtaHref }: WelcomSectionProps) {
  return (
    <div className="w-full">
      {/* 비로그인 랜딩 첫 화면: 공통 히어로에 게스트 전용 우측 카드를 주입. */}
      <HomeHeroSection
        headingId="hero-heading"
        badgeLabel="무료 서비스"
        primaryCtaLabel="커뮤니티 참가하기 →"
        primaryCtaHref={primaryCtaHref}
        rightSlot={<GuestFortuneCard />}
      />
      <PublicContentHighlights />
      {/* 히어로 아래 공통 마케팅/서비스 소개 영역. */}
      <HomeMarketingSections />
    </div>
  );
}

function PublicContentHighlights() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto flex w-full max-w-saju-content flex-col gap-6 px-4 md:px-8">
        <div className="flex flex-col gap-2">
          <div className="max-w-3xl text-sm leading-7 text-gray-600">
            <p>SAJU:ME는 결과 화면만 잠깐 보여주는 서비스가 아닙니다.</p>
            <p>아래 페이지에서 사주 기초 설명과 예시 화면 구성을 먼저 확인해보세요.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/blog/how-to-read-saju"
            className="rounded-3xl border border-gray-100 bg-white px-5 py-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary focus-visible:ring-offset-2"
          >
            <p className="text-xs font-bold" style={{ color: "#5956E9" }}>
              사주 기초
            </p>
            <h3 className="mt-2 text-base font-black text-gray-900">사주 보는 법 입문</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              사주를 처음 읽는 사람이 무엇부터 확인해야 하는지 6단계 순서로 정리한 공개 가이드입니다.
            </p>
          </Link>
          <Link
            href="/blog/2026-zodiac-fortune"
            className="rounded-3xl border border-gray-100 bg-white px-5 py-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary focus-visible:ring-offset-2"
          >
            <p className="text-xs font-bold" style={{ color: "#5956E9" }}>
              2026년 운세
            </p>
            <h3 className="mt-2 text-base font-black text-gray-900">12띠 흐름 통합 가이드</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              쥐띠부터 돼지띠까지 재물, 관계, 건강, 일의 흐름을 한 페이지에서 비교할 수 있습니다.
            </p>
          </Link>
          <Link
            href="/preview/traditional-saju"
            className="rounded-3xl border border-gray-100 bg-white px-5 py-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary focus-visible:ring-offset-2"
          >
            <p className="text-xs font-bold" style={{ color: "#5956E9" }}>
              공개 예시
            </p>
            <h3 className="mt-2 text-base font-black text-gray-900">정통사주 결과 화면 안내</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              명식, 오행, 대운이 어떤 순서로 읽히는지 예시 화면을 통해 미리 확인할 수 있습니다.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

// 비로그인 사용자에게 보여주는 오늘의 운세 잠금 프리뷰와 카카오 로그인 CTA.
function GuestFortuneCard() {
  return (
    <div className={`flex flex-col gap-4 rounded-2xl p-5 backdrop-blur-xl ${styles.guestFortuneCard}`}>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-saju-gradient-br">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-white">오늘의 운세</span>
      </div>

      {/* 오행 바 리스트 — 블러 + 잠금 오버레이 */}
      <div className="relative overflow-hidden rounded-xl">
        {/* 오행 디자인 그대로, 블러 처리 */}
        <div
          className={`select-none space-y-2 p-3 ${styles.microCopy}`}
          style={{ filter: "blur(3px)" }}
          aria-hidden="true"
        >
          <div className="text-white/50">오행 균형</div>
          {GUEST_OHAENG.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-3 text-white/80">{item.label}</span>
              <div
                className={`h-1.5 flex-1 overflow-hidden rounded-full ${styles.guestFortuneBarTrack}`}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.value}%`, background: item.color }}
                />
              </div>
              <span className="w-8 text-right text-white/60">{item.value}%</span>
            </div>
          ))}
          <div className={`pt-2 ${styles.guestFortuneDivider}`}>
            <div className="mb-1 text-white/50">나의 주 오행</div>
            <span
              className={`rounded-full px-2.5 py-0.5 font-semibold text-white ${styles.guestFortuneBadge}`}
            >
              수(水)
            </span>
          </div>
        </div>

        {/* 잠금 오버레이 */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${styles.guestFortuneOverlay}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-saju-gradient-br">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-white/80">
            로그인하면 볼 수 있어요
          </span>
        </div>
      </div>

      <a
        href={KAKAO_LOGIN_URL}
        className={`flex min-h-11 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${styles.kakaoLoginLink}`}
        aria-label="카카오 계정으로 로그인"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M10 2.5c-4.418 0-8 2.756-8 6.156 0 2.199 1.508 4.125 3.775 5.215l-.954 3.49a.427.427 0 0 0 .638.468l4.16-2.754c.127.008.255.012.381.012 4.418 0 8-2.756 8-6.156S14.418 2.5 10 2.5Z"
          />
        </svg>
        카카오로 시작하기
      </a>

      {/*<p className="text-center text-[10px] text-gray-400">*/}
      {/*  무료 · 광고 없음 · 1분 완성*/}
      {/*</p>*/}
    </div>
  );
}

const GUEST_OHAENG = [
  { label: "목", value: 18.5, color: "#22C55E" },
  { label: "화", value: 27.3, color: "#EF4444" },
  { label: "토", value: 31.8, color: "#EAB308" },
  { label: "금", value: 12.1, color: "#9CA3AF" },
  { label: "수", value: 10.2, color: "#3B82F6" },
];
