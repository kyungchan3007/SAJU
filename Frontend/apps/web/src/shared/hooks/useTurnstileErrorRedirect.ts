"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import {
  buildTurnstileVerifyPath,
  isTurnstileRequiredError,
} from "@/shared/api/auth/turnstileRecovery";

export function useTurnstileErrorRedirect(returnTo: string) {
  const router = useRouter();

  return useCallback(
    (error: unknown) => {
      if (!isTurnstileRequiredError(error)) {
        return false;
      }

      router.replace(buildTurnstileVerifyPath(returnTo) as Route);
      return true;
    },
    [returnTo, router],
  );
}
