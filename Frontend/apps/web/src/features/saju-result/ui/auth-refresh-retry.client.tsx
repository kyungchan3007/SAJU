"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnalysisPendingGate } from "@/features/saju-result/ui/analysis-pending-gate.client";
import { SAJU_AUTH_REFRESH_PATH } from "@/shared/config/endPoint";

const AUTH_REFRESH_TIMEOUT_MS = 8000;

type AuthRefreshRetryProps = {
  loginPath?: string;
};

export function AuthRefreshRetry({
  loginPath = "/login",
}: AuthRefreshRetryProps) {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => {
        controller.abort();
      }, AUTH_REFRESH_TIMEOUT_MS);

      let response: Response;

      try {
        response = await fetch(SAJU_AUTH_REFRESH_PATH, {
          method: "POST",
          cache: "no-store",
          signal: controller.signal,
        });
      } catch {
        if (!cancelled) {
          router.replace(loginPath as Route);
        }
        return;
      } finally {
        window.clearTimeout(timeoutId);
      }

      if (cancelled) {
        return;
      }

      if (response.ok) {
        router.refresh();
        return;
      }

      router.replace(loginPath as Route);
    };

    void refresh();

    return () => {
      cancelled = true;
    };
  }, [loginPath, router]);

  return <AnalysisPendingGate />;
}
