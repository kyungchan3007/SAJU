import { useState } from "react";
import type { Route } from "next";
import { useRouter } from "next/navigation";

import { verifyTurnstileToken } from "@/features/auth/model/verifyTurnstileToken";

type UseTurnstileGateParams = {
  onVerified?: () => void;
  returnTo?: string;
};

export function useTurnstileGate({
  onVerified,
  returnTo,
}: UseTurnstileGateParams = {}) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [widgetKey, setWidgetKey] = useState(0);

  function handleSuccess(nextToken: string) {
    setToken(nextToken);
    setError(null);
  }

  function handleError() {
    setToken(null);
    setError("보안 인증을 불러오지 못했어요. 다시 시도해주세요.");
  }

  function resetChallenge(message?: string) {
    setToken(null);
    setWidgetKey((current) => current + 1);
    setIsPending(false);
    if (message) {
      setError(message);
    }
  }

  async function verifyAndContinue(tokenOverride?: string) {
    const tokenToVerify = tokenOverride ?? token;

    if (!tokenToVerify) {
      resetChallenge("보안 인증이 아직 완료되지 않았어요. 다시 시도해주세요.");
      return false;
    }

    setIsPending(true);
    setError(null);

    const result = await verifyTurnstileToken(tokenToVerify);

    if (!result.success) {
      resetChallenge(result.message);
      return false;
    }

    if (onVerified) {
      onVerified();
    } else if (returnTo) {
      router.replace(returnTo as Route);
    }

    return true;
  }

  return {
    error,
    isPending,
    widgetKey,
    handleError,
    handleSuccess,
    resetChallenge,
    verifyAndContinue,
  };
}
