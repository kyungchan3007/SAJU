"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import {
  fetchSajuProfileOnClient,
  saveSajuOnClient,
  SajuProfileClientError,
  SajuSaveClientError,
} from "@/entities/saju";
import { fetchMyProfileOnClient } from "@/entities/user/client/fetchMyProfileOnClient";
import { getSajuHubCopy } from "@/features/saju-hub/model/copy";
import { MY_PROFILE_QUERY_KEY } from "@/features/mypage/hooks/useMyProfile";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import {
  buildLoginPath,
  buildSajuHubPath,
  buildSajuInputPath,
  buildSajuResultPath,
} from "@/shared/lib/internalRedirect";
import { buildErrorPagePath } from "@/shared/lib/error-page";

type UseSajuHubParams = {
  nextPath?: Route | null;
};

export function useSajuHub({ nextPath }: UseSajuHubParams = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pendingSaveAttemptedRef = useRef(false);
  const hubPath = buildSajuHubPath(nextPath);
  const resultPath = buildSajuResultPath(nextPath);
  const loginPath = buildLoginPath(hubPath);
  const inputPath = buildSajuInputPath(nextPath, { forceInput: true });
  const profileQuery = useQuery({
    queryKey: SAJU_PROFILE_QUERY_KEY,
    queryFn: fetchSajuProfileOnClient,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
  const myProfileQuery = useQuery({
    queryKey: MY_PROFILE_QUERY_KEY,
    queryFn: fetchMyProfileOnClient,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled: profileQuery.isSuccess,
  });
  const pendingSaveMutation = useMutation({
    mutationFn: () => saveSajuOnClient(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SAJU_PROFILE_QUERY_KEY,
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: MY_PROFILE_QUERY_KEY,
        exact: false,
      });
    },
  });
  const profile = profileQuery.data?.success
    ? (profileQuery.data.data ?? null)
    : null;
  const sajuAnalysis = profile?.sajuAnalysis ?? null;
  const strongestElement = myProfileQuery.data?.success
    ? (myProfileQuery.data.data?.strongestElement ?? null)
    : null;
  const copy = getSajuHubCopy(strongestElement);
  const isProfileLoginRequired =
    profileQuery.error instanceof SajuProfileClientError &&
    profileQuery.error.code === "LOGIN_REQUIRED";
  const isSaveLoginRequired =
    pendingSaveMutation.error instanceof SajuSaveClientError &&
    pendingSaveMutation.error.code === "LOGIN_REQUIRED";
  const isPendingFormRequired =
    pendingSaveMutation.error instanceof SajuSaveClientError &&
    pendingSaveMutation.error.code === "PENDING_FORM_NOT_FOUND";
  const isLoginRequired = isProfileLoginRequired || isSaveLoginRequired;
  const hasSajuAnalysis = Boolean(sajuAnalysis);

  useEffect(() => {
    if (
      !profileQuery.isSuccess ||
      hasSajuAnalysis ||
      pendingSaveAttemptedRef.current
    ) {
      return;
    }

    pendingSaveAttemptedRef.current = true;
    pendingSaveMutation.mutate();
  }, [hasSajuAnalysis, pendingSaveMutation, profileQuery.isSuccess]);

  const blockingError =
    profileQuery.error ?? myProfileQuery.error ?? pendingSaveMutation.error;
  const hasRedirectableError = Boolean(
    blockingError && !isLoginRequired && !isPendingFormRequired,
  );
  const isRecoveringPendingForm =
    profileQuery.isSuccess &&
    !hasSajuAnalysis &&
    !isPendingFormRequired &&
    !isLoginRequired &&
    !hasRedirectableError;

  useEffect(() => {
    if (!isPendingFormRequired) {
      return;
    }

    router.replace(inputPath);
  }, [inputPath, isPendingFormRequired, router]);

  useEffect(() => {
    if (!hasRedirectableError) {
      return;
    }

    router.replace(
      buildErrorPagePath({ code: "SAJU_RESULT_LOAD_FAILED" }) as Route,
    );
  }, [hasRedirectableError, router]);

  return {
    copy,
    inputPath,
    isLoginRequired,
    isPending:
      profileQuery.isPending ||
      myProfileQuery.isPending ||
      pendingSaveMutation.isPending ||
      isRecoveringPendingForm ||
      isPendingFormRequired,
    isPendingFormRequired,
    isSuccess: profileQuery.isSuccess && hasSajuAnalysis,
    loginPath,
    onCommunityClick: () => router.push("/community" as Route),
    onResultClick: () => router.push(resultPath),
  };
}
