"use client";

import { useTurnstileGate } from "@/features/auth/hooks/useTurnstileGate";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { TurnstileWidget } from "@/shared/ui/TurnstileWidget";

function VerifyContent() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/home";
  const turnstileGate = useTurnstileGate({ returnTo });

  async function handleSuccess(token: string) {
    turnstileGate.handleSuccess(token);
    await turnstileGate.verifyAndContinue(token);
  }

  return (
    <main className="container flex min-h-dvh items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-black/60">보안 인증 중입니다. 잠시만 기다려주세요.</p>
        <TurnstileWidget
          key={turnstileGate.widgetKey}
          onSuccess={handleSuccess}
          onError={turnstileGate.handleError}
        />
        {turnstileGate.error ? (
          <p className="text-sm text-red-600">{turnstileGate.error}</p>
        ) : null}
      </div>
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
