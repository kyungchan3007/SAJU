"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { saveSajuOnClient, SajuSaveClientError } from "@/entities/saju";
import { SAJU_RESULT_QUERY_KEY } from "@/features/saju-result";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import type { SajuFormValues } from "@/features/saju-input/type/type";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { buildTurnstileVerifyPath } from "@/shared/api/auth/turnstileRecovery";
import { SAJU_DRAFT_ENDPOINT_PATH } from "@/shared/config/endPoint";
import {
  buildSajuHubPath,
  buildLoginPath,
} from "@/shared/lib/internalRedirect";

type UseSajuHooksParams = {
  nextPath?: Route | null;
};

export type SajuSubmitStatus = "idle" | "submitting" | "complete";

export const useSajuHooks = ({ nextPath }: UseSajuHooksParams = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authScope = useAuthScope();
  const isSubmittingRef = useRef(false);
  const [submitStatus, setSubmitStatus] = useState<SajuSubmitStatus>("idle");
  const hubPath = buildSajuHubPath(nextPath);
  const loginPath = buildLoginPath(hubPath);

  const saveDraft = async (formValues: SajuFormValues) => {
    const response = await fetch(SAJU_DRAFT_ENDPOINT_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      throw new Error("Failed to save saju draft.");
    }
  };

  const resetSubmitStatus = () => {
    isSubmittingRef.current = false;
    setSubmitStatus("idle");
  };

  const handleSubmitSaju = async (formValues: SajuFormValues) => {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setSubmitStatus("submitting");

    if (authScope === "guest") {
      try {
        await saveDraft(formValues);
      } catch {
        resetSubmitStatus();
        return;
      }

      setSubmitStatus("complete");
      router.push(loginPath);
      return;
    }

    try {
      await saveSajuOnClient(formValues);
    } catch (error) {
      if (
        error instanceof SajuSaveClientError &&
        error.code === "LOGIN_REQUIRED"
      ) {
        try {
          await saveDraft(formValues);
        } catch {
          resetSubmitStatus();
          return;
        }

        setSubmitStatus("complete");
        router.push(loginPath);
        return;
      }

      if (
        error instanceof SajuSaveClientError &&
        error.code === "TURNSTILE_REQUIRED"
      ) {
        try {
          await saveDraft(formValues);
        } catch {
          resetSubmitStatus();
          return;
        }

        setSubmitStatus("complete");
        router.push(buildTurnstileVerifyPath(hubPath));
        return;
      }

      resetSubmitStatus();
      return;
    }

    queryClient.removeQueries({
      queryKey: [...SAJU_RESULT_QUERY_KEY, authScope],
      exact: true,
    });
    queryClient.removeQueries({
      queryKey: SAJU_PROFILE_QUERY_KEY,
      exact: false,
    });
    setSubmitStatus("complete");
    router.push(hubPath);
  };

  return {
    handleSubmitSaju,
    submitStatus,
  };
};
