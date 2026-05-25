import Link from "next/link";
import { HomeMarketingSections } from "@/features/home/ui/home-marketing-sections";
import { HomeHeroSection } from "@/widgets/home-hero/ui/home-hero-section";
import { KakaoIcon } from "@/shared/ui";

export function WelcomSection() {
  return (
    <div className="w-full">
      {/* 비로그인 랜딩 첫 화면: 공통 히어로에 게스트 전용 우측 카드를 주입. */}
      <HomeHeroSection
        headingId="hero-heading"
        badgeLabel="무료 서비스"
        primaryCtaLabel="무료 사주 풀이 시작 →"
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
      className="flex flex-col gap-4 rounded-2xl bg-white/95 p-5 backdrop-blur-sm"
      style={{ boxShadow: "0 8px 32px rgba(89,86,233,0.18)" }}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-saju-gradient-br">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-gray-900">오늘의 운세</span>
      </div>

      {/* 실제 데이터 대신 흐릿한 샘플 차트로 로그인 후 확인 가능한 내용을 예고. */}
      <div className="relative overflow-hidden rounded-xl bg-[#F5F4FF]">
        <div
          className="flex select-none flex-col gap-2 p-4 blur-sm"
          aria-hidden="true"
        >
          <div className="flex justify-between text-xs text-gray-400">
            <span>오행 균형</span>
            <span>78점</span>
          </div>
          <div className="flex gap-1">
            {[70, 45, 80, 55, 65].map((w, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${w * 0.5}px`,
                  background: [
                    "#5956E9",
                    "#7C3AED",
                    "#A78BFA",
                    "#C4B5FD",
                    "#EDE9FE",
                  ][i],
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
          <div className="mt-1 h-2 w-3/4 rounded bg-purple-200" />
          <div className="h-2 w-1/2 rounded bg-purple-100" />
        </div>
        {/* 잠금 상태 오버레이. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/60 backdrop-blur-[2px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-saju-gradient-br">
            <svg
              width="18"
              height="18"
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
          <span className="text-xs font-semibold text-gray-600">
            로그인 후 확인
          </span>
        </div>
      </div>

      <Link
        href="/api/auth/kakao"
        prefetch={false}
        className="flex min-h-11 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition hover:brightness-95 active:scale-[0.98]"
        style={{
          backgroundColor: "#FEE500",
          color: "rgba(0,0,0,0.85)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
        aria-label="카카오 계정으로 로그인"
      >
        <KakaoIcon />
        카카오로 시작하기
      </Link>

      <p className="text-center text-[10px] text-gray-400">
        무료 · 광고 없음 · 1분 완성
      </p>
    </div>
  );
}
