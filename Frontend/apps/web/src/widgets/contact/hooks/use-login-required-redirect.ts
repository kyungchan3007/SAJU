"use client";

import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useEffect } from "react";

type LoginRequiredRedirectOptions = {
  enabled: boolean;
  delayMs?: number;
  loginPath: Route;
};

export function useLoginRequiredRedirect({
  enabled,
  delayMs = 2000,
  loginPath,
}: LoginRequiredRedirectOptions) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.push(loginPath);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [delayMs, enabled, loginPath, router]);
}
