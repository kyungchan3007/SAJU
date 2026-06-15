import { useState } from "react";

import type { TurnstileGateStatus } from "@/features/auth/model/turnstile-dialog-copy";
import { getTurnstileWidgetErrorMessage } from "@/features/auth/model/turnstile-widget-errors";
import { verifyTurnstileToken } from "@/features/auth/model/verifyTurnstileToken";

type UseTurnstileGateParams = {
  onVerified?: () => void;
};

export function useTurnstileGate({ onVerified }: UseTurnstileGateParams = {}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [widgetKey, setWidgetKey] = useState(0);
  const [status, setStatus] = useState<TurnstileGateStatus>("idle");

  function startVerification() {
    setError(null);
    setIsPending(false);
    setIsVerified(false);
    setStatus("challenging");
  }

  function handleError(code?: string) {
    console.warn("[Turnstile] widget error", { code });
    setIsPending(false);
    setIsVerified(false);
    setStatus("challenging");
    setError(getTurnstileWidgetErrorMessage(code));
  }

  function handleTimeout() {
    console.warn("[Turnstile] widget timeout");
    setIsPending(false);
    setIsVerified(false);
    setStatus("challenging");
  }

  function handleExpire() {
    console.warn("[Turnstile] widget expired");
    setIsPending(false);
    setIsVerified(false);
    setStatus("challenging");
  }

  function handleUnsupported() {
    console.warn("[Turnstile] widget unsupported");
    setIsPending(false);
    setIsVerified(false);
    setStatus("challenging");
    setError("현재 브라우저에서는 보안 인증을 완료하기 어려워요. 다시 시도해주세요.");
  }

  function resetChallenge(message?: string) {
    setWidgetKey((current) => current + 1);
    setIsPending(false);
    setIsVerified(false);
    setStatus("challenging");
    setError(message ?? null);
  }

  async function handleWidgetSuccess(nextToken: string) {
    setStatus("verifying");
    setIsPending(true);
    setError(null);

    const result = await verifyTurnstileToken(nextToken);

    if (!result.success) {
      resetChallenge(result.message);
      return false;
    }

    setIsPending(false);
    setIsVerified(true);
    setStatus("idle");
    onVerified?.();
    return true;
  }

  return {
    error,
    isPending,
    isVerified,
    status,
    widgetKey,
    handleExpire,
    handleError,
    handleWidgetSuccess,
    handleTimeout,
    handleUnsupported,
    startVerification,
    resetChallenge,
  };
}
