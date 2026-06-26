"use client";

import type { CSSProperties } from "react";

import type { KakaoLoginSubmitStatus } from "@/features/auth/hooks/useKakaoLoginSubmit";
import { useKakaoLoginSubmit } from "@/features/auth/hooks/useKakaoLoginSubmit";
import { KakaoIcon } from "@/shared/ui";

type KakaoLoginSubmitButtonProps = {
  ariaLabel: string;
  canSubmit?: boolean;
  className: string;
  kakaoLoginUrl: string;
  style?: CSSProperties;
};

export function KakaoLoginSubmitButton({
  ariaLabel,
  canSubmit = true,
  className,
  kakaoLoginUrl,
  style,
}: KakaoLoginSubmitButtonProps) {
  const { isSubmitLocked, submitLogin, submitStatus } = useKakaoLoginSubmit({
    canSubmit,
    kakaoLoginUrl,
  });

  return (
    <button
      type="button"
      onClick={submitLogin}
      disabled={!canSubmit || isSubmitLocked}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      <KakaoLoginButtonContent submitStatus={submitStatus} />
    </button>
  );
}

function KakaoLoginButtonContent({
  submitStatus,
}: {
  submitStatus: KakaoLoginSubmitStatus;
}) {
  if (submitStatus === "submitting") {
    return (
      <>
        <span
          className="size-4 animate-spin rounded-full border-2 border-black/25 border-t-black"
          aria-hidden="true"
        />
        로그인 준비 중…
      </>
    );
  }

  if (submitStatus === "complete") {
    return <>완료되었어요!</>;
  }

  return (
    <>
      <KakaoIcon size={20} />
      카카오로 시작하기
    </>
  );
}
