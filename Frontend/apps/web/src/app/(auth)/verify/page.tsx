"use client";

import type { Route } from "next";
import { normalizePostLoginRedirect } from "@/shared/api/auth/postLoginRedirect";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";
import { getTurnstileDialogCopy } from "@/features/auth/model/turnstile-dialog-copy";
import { useTurnstileGate } from "@/features/auth/hooks/useTurnstileGate";
import { TurnstileVerificationModal } from "@/features/auth/ui/turnstile-verification-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { TurnstileWidget } from "@/shared/ui/TurnstileWidget";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const requestedNext = normalizePostLoginRedirect(searchParams.get("next"));
  const returnTo = searchParams.get("returnTo") ?? "/home";
  const turnstileGate = useTurnstileGate({
    onVerified: () => {
      if (intent === "login") {
        const loginUrl = requestedNext
          ? `${KAKAO_LOGIN_URL}?next=${encodeURIComponent(requestedNext)}`
          : KAKAO_LOGIN_URL;

        window.location.href = loginUrl;
        return;
      }

      router.replace(returnTo as Route);
    },
  });
  const {
    error,
    handleError,
    handleExpire,
    handleWidgetSuccess,
    handleTimeout,
    handleUnsupported,
    isPending,
    startVerification,
    resetChallenge,
    status,
    widgetKey,
  } = turnstileGate;
  const variant = intent === "login" ? "login" : "verify";
  const copy = getTurnstileDialogCopy(variant, status);
  const hasRecoveryActions = Boolean(error) && !isPending;

  // 마운트 시 1회만 실행
  useEffect(() => {
    startVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="fixed inset-0 z-[100] min-h-dvh bg-transparent">
      <TurnstileVerificationModal
        title={copy.title}
        description={copy.description}
        showSpinner={isPending}
        error={error}
        primaryActionLabel={hasRecoveryActions ? "다시 시도" : undefined}
        onPrimaryAction={hasRecoveryActions ? resetChallenge : undefined}
        secondaryActionLabel={hasRecoveryActions ? "홈으로 돌아가기" : undefined}
        onSecondaryAction={hasRecoveryActions ? () => router.replace("/") : undefined}
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
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
