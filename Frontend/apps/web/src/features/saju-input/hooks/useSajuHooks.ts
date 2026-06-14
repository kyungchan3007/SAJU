"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { Route } from "next";
import { useRouter } from "next/navigation";

import { SAJU_RESULT_QUERY_KEY } from "@/features/saju-result";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import type { SajuFormValues } from "@/features/saju-input/type/type";
import type { ApiEnvelope } from "@/shared/api";
import { buildTurnstileVerifyPath } from "@/shared/api/auth/turnstileRecovery";
import {
  buildLoginPath,
  buildSajuInputPath,
  buildSajuResultPath,
} from "@/shared/lib/internalRedirect";

type UseSajuHooksParams = {
  nextPath?: Route | null;
};

export const useSajuHooks = ({ nextPath }: UseSajuHooksParams = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const resultPath = "/saju/result" as Route;
  const successPath = nextPath ?? resultPath;
  const loginPath = buildLoginPath(buildSajuInputPath(nextPath));

  const handleSubmitSaju = async (formValues: SajuFormValues) => {
    const response = await fetch("/api/saju/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (response.status === 401) {
      await fetch("/api/saju/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      router.push(loginPath);
      return;
    }

    if (response.status === 403) {
      const result = (await response.json()) as ApiEnvelope<unknown>;

      if (!result.success && result.error.code === "TURNSTILE_REQUIRED") {
        await fetch("/api/saju/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });
        router.push(buildTurnstileVerifyPath(buildSajuResultPath(nextPath)));
      }

      return;
    }

    if (!response.ok) {
      return;
    }

    const result = (await response.json()) as ApiEnvelope<unknown>;
    queryClient.setQueryData(SAJU_RESULT_QUERY_KEY, result);
    queryClient.removeQueries({ queryKey: SAJU_PROFILE_QUERY_KEY });
    router.push(successPath);
  };

  return {
    handleSubmitSaju,
  };
};
