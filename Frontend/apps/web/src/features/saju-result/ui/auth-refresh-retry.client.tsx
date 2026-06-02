"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnalysisPendingGate } from "@/features/saju-result/ui/analysis-pending-gate.client";

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
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        cache: "no-store",
      });

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
