"use client";

import { useTurnstileGate } from "@/features/auth/hooks/useTurnstileGate";
import { TurnstileWidget } from "@/shared/ui/TurnstileWidget";
import { KakaoIcon } from "@/shared/ui";

type LoginPanelContentProps = {
  kakaoLoginUrl: string;
};

export function LoginPanelContent({ kakaoLoginUrl }: LoginPanelContentProps) {
  const turnstileGate = useTurnstileGate({
    onVerified: () => {
      window.location.href = kakaoLoginUrl;
    },
  });

  async function handleLogin() {
    await turnstileGate.verifyAndContinue();
  }

  return (
    <div className="flex flex-col items-center text-center">
      <TurnstileWidget
        key={turnstileGate.widgetKey}
        onSuccess={turnstileGate.handleSuccess}
        onError={turnstileGate.handleError}
      />

      {/* 서비스 로고 */}
      <div className="mb-6">
        <p className="font-display text-3xl font-bold tracking-tight text-black">
          사주이야기
        </p>
        <p className="mt-1 text-xs tracking-widest text-black/30">SAJU STORY</p>
      </div>

      {/* SEO용 헤딩 + 설명 */}
      <h1 className="text-base font-bold leading-snug text-black">
        간편하게 로그인하고
        <br />
        오늘의 사주를 확인해보세요
      </h1>
      <p className="mt-2 text-xs leading-relaxed text-black/45">
        생년월일 하나로 오늘의 운세·궁합·사주풀이를
        <br />
        무료로 만나볼 수 있어요.
      </p>
      {turnstileGate.error ? (
        <p className="mt-3 text-xs leading-relaxed text-red-600">
          {turnstileGate.error}
        </p>
      ) : null}

      {/* 카카오 로그인 버튼 — 카카오 공식 가이드라인 색상 */}
      <button
        type="button"
        onClick={handleLogin}
        disabled={turnstileGate.isPending}
        className="mt-7 flex h-[48px] w-full items-center justify-center gap-2 border-2 border-black font-bold text-[rgba(0,0,0,0.85)] transition hover:brightness-95 disabled:opacity-70"
        style={{
          backgroundColor: "#FEE500",
          boxShadow: "3px 3px 0 #000",
        }}
        aria-label="카카오 계정으로 사주이야기 로그인"
      >
        <KakaoIcon size={20} />
        {turnstileGate.isPending ? "보안 확인 중..." : "카카오로 시작하기"}
      </button>
    </div>
  );
}
