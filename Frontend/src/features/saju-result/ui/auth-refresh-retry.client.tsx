"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnalysisPendingGate } from "@/features/saju-result/ui/analysis-pending-gate.client";

export function AuthRefreshRetry() {
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

      router.replace("/login");
    };

    void refresh();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return <AnalysisPendingGate />;
}
