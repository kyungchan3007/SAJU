import type { Route } from "next";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";
import { HomeMarketingSections } from "@/features/home/ui/home-marketing-sections";
import { HomeHeroSection } from "@/widgets/home-hero/ui/home-hero-section";
import { KakaoLoginSubmitButton } from "@/features/auth/ui/kakao-login-submit-button.client";

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
      {/* 히어로 아래 공통 마케팅/서비스 소개 영역. */}
      <HomeMarketingSections />
    </div>
  );
}

// 비로그인 사용자에게 보여주는 오늘의 운세 잠금 프리뷰와 카카오 로그인 CTA.
function GuestFortuneCard() {
  return (
    <div
      className="flex flex-col gap-4 rounded-2xl p-5 backdrop-blur-xl"
      style={{
        background: "rgba(15,10,40,0.50)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-saju-gradient-br">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-white">오늘의 운세</span>
      </div>

      {/* 오행 바 리스트 — 블러 + 잠금 오버레이 */}
      <div className="relative overflow-hidden rounded-xl">
        {/* 오행 디자인 그대로, 블러 처리 */}
        <div
          className="select-none space-y-2 p-3 blur-[3px]"
          aria-hidden="true"
        >
          <div className="text-[10px] text-white/50">오행 균형</div>
          {GUEST_OHAENG.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-3 text-[10px] text-white/80">
                {item.label}
              </span>
              <div
                className="h-1.5 flex-1 overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.value}%`, background: item.color }}
                />
              </div>
              <span className="w-8 text-right text-[10px] text-white/60">
                {item.value}%
              </span>
            </div>
          ))}
          <div
            className="pt-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
          >
            <div className="mb-1 text-[10px] text-white/50">나의 주 오행</div>
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              수(水)
            </span>
          </div>
        </div>

        {/* 잠금 오버레이 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ background: "rgba(15,10,40,0.60)" }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-saju-gradient-br">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
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

      <KakaoLoginSubmitButton
        ariaLabel="카카오 계정으로 로그인"
        className="flex min-h-11 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition hover:brightness-95 active:scale-[0.98]"
        style={{
          backgroundColor: "#FEE500",
          color: "rgba(0,0,0,0.85)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
        kakaoLoginUrl={KAKAO_LOGIN_URL}
      />

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
