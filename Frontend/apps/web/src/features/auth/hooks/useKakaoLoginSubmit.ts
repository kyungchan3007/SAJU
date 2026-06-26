"use client";

import { useRef, useState } from "react";

export type KakaoLoginSubmitStatus = "idle" | "submitting" | "complete";

type UseKakaoLoginSubmitParams = {
  canSubmit: boolean;
  kakaoLoginUrl: string;
};

export function useKakaoLoginSubmit({
  canSubmit,
  kakaoLoginUrl,
}: UseKakaoLoginSubmitParams) {
  const isSubmittingRef = useRef(false);
  const [submitStatus, setSubmitStatus] =
    useState<KakaoLoginSubmitStatus>("idle");

  const submitLogin = () => {
    if (!canSubmit || isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setSubmitStatus("submitting");

    window.setTimeout(() => {
      setSubmitStatus("complete");
      window.location.href = kakaoLoginUrl;
    }, 120);
  };

  return {
    isSubmitLocked: submitStatus !== "idle",
    submitLogin,
    submitStatus,
  };
}
