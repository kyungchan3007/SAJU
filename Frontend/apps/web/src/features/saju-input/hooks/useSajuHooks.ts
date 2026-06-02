"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { Route } from "next";
import { useRouter } from "next/navigation";

import { SAJU_RESULT_QUERY_KEY } from "@/features/saju-result";
import type { SajuFormValues } from "@/features/saju-input/type/type";
import type { ApiEnvelope } from "@/shared/api";

export const useSajuHooks = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const resultPath = "/saju/result" as Route;

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
      router.push("/login?intent=saju_submit");
      return;
    }

    if (!response.ok) {
      return;
    }

    const result = (await response.json()) as ApiEnvelope<unknown>;
    queryClient.setQueryData(SAJU_RESULT_QUERY_KEY, result);
    router.push(resultPath);
  };

  return {
    handleSubmitSaju,
  };
};
