"use client";

import { useEffect } from "react";
import { useTurnstileGate } from "@/features/auth/hooks/useTurnstileGate";

import { getTurnstileDialogCopy } from "@/features/auth/model/turnstile-dialog-copy";
import { TurnstileVerificationModal } from "@/features/auth/ui/turnstile-verification-modal";
import { KakaoIcon } from "@/shared/ui";
import { TurnstileWidget } from "@/shared/ui/TurnstileWidget";

type LoginPanelContentProps = {
  kakaoLoginUrl: string;
};

export function LoginPanelContent({ kakaoLoginUrl }: LoginPanelContentProps) {
  const turnstileGate = useTurnstileGate();
  const {
    error,
    handleError,
    handleExpire,
    handleWidgetSuccess,
    handleTimeout,
    handleUnsupported,
    isPending,
    isVerified,
    startVerification,
    status,
    resetChallenge,
    widgetKey,
  } = turnstileGate;
  const copy = getTurnstileDialogCopy("login", status);
  const hasRecoveryActions = Boolean(error) && !isPending;

  // 마운트 시 1회만 실행 — 인증 성공 후 status가 "idle"로 돌아와도 재시작하지 않음
  useEffect(() => {
    startVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex flex-col items-center text-center">
      {!isVerified ? (
        <TurnstileVerificationModal
          title={copy.title}
          description={copy.description}
          showSpinner={isPending}
          error={error}
          primaryActionLabel={hasRecoveryActions ? "다시 시도" : undefined}
          onPrimaryAction={hasRecoveryActions ? resetChallenge : undefined}
          secondaryActionLabel={hasRecoveryActions ? "홈으로 돌아가기" : undefined}
          onSecondaryAction={
            hasRecoveryActions ? () => { window.location.href = "/"; } : undefined
          }
        >
          <TurnstileWidget
            key={widgetKey}
            onSuccess={handleWidgetSuccess}
            onError={handleError}
            onExpire={handleExpire}
            onTimeout={handleTimeout}
            onUnsupported={handleUnsupported}
            size="flexible"
            appearance="always"
            wrapperClassName="mt-6 w-full flex justify-center overflow-visible"
          />
        </TurnstileVerificationModal>
      ) : null}

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
      {/* 카카오 로그인 버튼 */}
      <button
        type="button"
        onClick={() => {
          if (!isVerified || isPending) return;
          window.location.href = kakaoLoginUrl;
        }}
        disabled={!isVerified || isPending}
        className="mt-7 flex h-[48px] w-full items-center justify-center gap-2 border-2 border-black font-bold text-[rgba(0,0,0,0.85)] transition hover:brightness-95 disabled:opacity-70"
        style={{
          backgroundColor: "#FEE500",
          boxShadow: "3px 3px 0 #000",
        }}
        aria-label="카카오 계정으로 사주이야기 로그인"
      >
        <KakaoIcon size={20} />
        카카오로 시작하기
      </button>
    </div>
  );
}
