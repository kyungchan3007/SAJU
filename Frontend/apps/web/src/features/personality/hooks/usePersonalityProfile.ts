"use client";

import { useEffect, useState } from "react";

import { fetchPersonalityProfileOnClient } from "@/entities/saju/client/fetchPersonalityProfileOnClient";
import type { PersonalityProfileResponse } from "@/generated/api";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import type { GeneratedInterpretationMeta } from "@/shared/api/backend/parseGeneratedInterpretationResponse";

type PersonalityState = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  data: PersonalityProfileResponse | null;
  backendStatus: unknown;
  meta: GeneratedInterpretationMeta | undefined;
};

const INITIAL_STATE: PersonalityState = {
  isLoading: true,
  isError: false,
  errorMessage: null,
  data: null,
  backendStatus: undefined,
  meta: undefined,
};

export function usePersonalityProfile() {
  const authScope = useAuthScope();
  const [state, setState] = useState<PersonalityState>(INITIAL_STATE);

  useEffect(() => {
    let isMounted = true;

    void fetchPersonalityProfileOnClient()
      .then((result) => {
        if (!isMounted) return;

        setState({
          isLoading: false,
          isError: !result.success,
          errorMessage: result.success ? null : result.error.message,
          data: result.success ? (result.data ?? null) : null,
          backendStatus: result.meta?.backendStatus,
          meta: result.meta,
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) return;

        setState({
          isLoading: false,
          isError: true,
          errorMessage:
            error instanceof Error
              ? error.message
              : "상세 성향 리포트를 불러오지 못했습니다.",
          data: null,
          backendStatus: undefined,
          meta: undefined,
        });
      });

    return () => {
      isMounted = false;
    };
  }, [authScope]);

  return {
    ...state,
    isPending: state.backendStatus === "PENDING",
  };
}
