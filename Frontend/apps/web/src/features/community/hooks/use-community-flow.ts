"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { checkCommunityNicknameOnClient } from "@/entities/community/client/checkCommunityNicknameOnClient";
import { fetchCurrentOpenCohortOnClient } from "@/entities/community/client/fetchCurrentOpenCohortOnClient";
import { fetchMyMembershipsOnClient } from "@/entities/community/client/fetchMyMembershipsOnClient";
import { joinCommunityOnClient } from "@/entities/community/client/joinCommunityOnClient";
import {
  COMMUNITY_CURRENT_COHORT_QUERY_KEY,
  COMMUNITY_MEMBERSHIPS_QUERY_KEY,
} from "@/entities/community/model/query";
import { ApiRequestError } from "@/shared/api/requestError";
import { resolveApiErrorMessage } from "@/shared/api/messages";
import {
  buildCommunityJoinRequest,
  COMMUNITY_DEPOSIT_ACCOUNT,
  formatCommunityFee,
  getActiveCommunityMembership,
  isCommunityApplicationFormValid,
  isCommunityNicknameValid,
  resolveCommunityDepositAccount,
  resolveCommunityCompletionInfo,
  resolveCommunityJoinCohortId,
  resolveCommunityMeetingInfo,
  type CommunityApplicationForm,
  type CommunityNicknameCheckStatus,
} from "@/features/community/model/community-application";
import { useTurnstileErrorRedirect } from "@/shared/hooks/useTurnstileErrorRedirect";

export type { CommunityApplicationForm, CommunityNicknameCheckStatus };

export type CommunityFlowView = "nickname" | "form" | "done";

const COMMUNITY_PATH = "/community";

const EMPTY_APPLICATION_FORM: CommunityApplicationForm = {
  depositorName: "",
  refundBankName: "",
  refundAccountNumber: "",
  refundAccountHolder: "",
  agreed: false,
  privacyConsent: false,
};

export function useCommunityFlow() {
  const authScope = useAuthScope();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const redirectIfTurnstileRequired = useTurnstileErrorRedirect(COMMUNITY_PATH);

  const applyParam = searchParams.get("apply");

  const [nickname, setNickname] = useState("");
  const [form, setForm] = useState<CommunityApplicationForm>(
    EMPTY_APPLICATION_FORM,
  );
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nicknameCheckStatus, setNicknameCheckStatus] =
    useState<CommunityNicknameCheckStatus>("idle");

  const membershipsQuery = useQuery({
    queryKey: [...COMMUNITY_MEMBERSHIPS_QUERY_KEY, authScope],
    queryFn: fetchMyMembershipsOnClient,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  const currentCohortQuery = useQuery({
    queryKey: COMMUNITY_CURRENT_COHORT_QUERY_KEY,
    queryFn: fetchCurrentOpenCohortOnClient,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  const activeMembership = useMemo(
    () =>
      getActiveCommunityMembership(
        membershipsQuery.data?.success ? membershipsQuery.data.data : undefined,
      ),
    [membershipsQuery.data],
  );
  const hasActiveMembership = Boolean(activeMembership);
  const currentCohort = useMemo(
    () =>
      currentCohortQuery.data?.success ? currentCohortQuery.data.data : undefined,
    [currentCohortQuery.data],
  );
  const joinCohortId = useMemo(
    () => resolveCommunityJoinCohortId(currentCohort),
    [currentCohort],
  );
  const hasCurrentCohortLookupError =
    currentCohortQuery.isError || !currentCohortQuery.data?.success;
  const isApplicationUnavailable = joinCohortId === null;
  const hasMembershipLookupError =
    membershipsQuery.isError || !membershipsQuery.data?.success;
  const defaultBlockedMessage = hasMembershipLookupError
    ? "신청 상태를 확인하지 못했어요. 잠시 후 다시 시도해주세요."
    : hasCurrentCohortLookupError
      ? "현재 모집 중인 기수를 확인하지 못했어요. 잠시 후 다시 시도해주세요."
    : isApplicationUnavailable
      ? "아직 신청 가능한 회차가 열리지 않았어요."
      : null;
  const isNicknameAvailable = nicknameCheckStatus === "available";

  const nicknameCheckMutation = useMutation({
    mutationFn: async () => {
      if (joinCohortId === null) {
        throw new ApiRequestError(
          "아직 신청 가능한 회차가 열리지 않았어요.",
          "COMMUNITY_JOIN_FAILED",
          400,
        );
      }

      return checkCommunityNicknameOnClient(joinCohortId, nickname.trim());
    },
    onMutate: () => {
      setNicknameCheckStatus("checking");
      setErrorMessage(null);
    },
    onSuccess: (result) => {
      if (result.success && result.data?.available) {
        setNicknameCheckStatus("available");
        setErrorMessage(null);
        return;
      }

      setNicknameCheckStatus("duplicate");
      setErrorMessage("이미 사용 중인 닉네임이에요. 다른 닉네임을 입력해주세요.");
    },
    onError: (error) => {
      setNicknameCheckStatus("error");
      setErrorMessage(
        error instanceof ApiRequestError
          ? resolveApiErrorMessage(error.code, error.message)
          : resolveApiErrorMessage("COMMUNITY_NICKNAME_CHECK_FAILED"),
      );
    },
  });

  const joinMutation = useMutation({
    mutationFn: () =>
      joinCommunityOnClient(
        buildCommunityJoinRequest(
          nickname,
          form,
          joinCohortId as number,
        ),
      ),
    onSuccess: async () => {
      setSubmitted(true);
      setErrorMessage(null);
      await queryClient.invalidateQueries({
        queryKey: [...COMMUNITY_MEMBERSHIPS_QUERY_KEY, authScope],
      });
      router.replace(`${COMMUNITY_PATH}?apply=done`);
    },
    onError: (error) => {
      if (redirectIfTurnstileRequired(error)) {
        return;
      }

      setErrorMessage(
        error instanceof ApiRequestError
          ? resolveApiErrorMessage(error.code, error.message)
          : resolveApiErrorMessage("COMMUNITY_JOIN_FAILED"),
      );
    },
  });

  // 뷰 결정: 완료 > 신청폼 > 닉네임. 완료의 진실은 in-session 제출 or members/me.
  const view: CommunityFlowView =
    submitted || (applyParam === "done" && hasActiveMembership)
      ? "done"
      : applyParam === "form"
        ? "form"
        : "nickname";

  // 완료(입금대기) 화면에 바로 뿌릴 수 있는 표시 문자열로 가공.
  const completionView = useMemo(() => {
    const info = resolveCommunityCompletionInfo(
      joinMutation.data?.success ? joinMutation.data.data : null,
      activeMembership,
    );

    return {
      depositorName: form.depositorName,
      feeLabel: formatCommunityFee(info.feeAmount),
      bankLabel:
        info.bankName && info.bankAccountNumber
          ? `${info.bankName} ${info.bankAccountNumber}`
          : COMMUNITY_DEPOSIT_ACCOUNT.bankLabel,
      holderLabel: info.bankAccountHolder
        ? `예금주 : ${info.bankAccountHolder}`
        : COMMUNITY_DEPOSIT_ACCOUNT.holderLabel,
    };
  }, [joinMutation.data, activeMembership, form.depositorName]);

  // 신청폼을 직접/새로고침으로 진입했는데 닉네임이 없으면 닉네임 입력으로 되돌림
  useEffect(() => {
    if (applyParam === "form" && !submitted && !isCommunityNicknameValid(nickname)) {
      router.replace(COMMUNITY_PATH);
    }
  }, [applyParam, submitted, nickname, router]);

  function goToForm() {
    setErrorMessage(null);

    if (membershipsQuery.isLoading) {
      setErrorMessage("신청 상태를 확인 중이에요.");
      return;
    }

    if (hasMembershipLookupError) {
      setErrorMessage("신청 상태를 확인하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (hasActiveMembership) {
      setErrorMessage("이미 신청이 접수되었어요.");
      return;
    }

    if (hasCurrentCohortLookupError) {
      setErrorMessage("현재 모집 중인 기수를 확인하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (isApplicationUnavailable) {
      setErrorMessage("아직 신청 가능한 회차가 열리지 않았어요.");
      return;
    }

    if (!isCommunityNicknameValid(nickname)) {
      setErrorMessage("사용할 닉네임을 입력해주세요.");
      return;
    }

    if (!isNicknameAvailable) {
      setErrorMessage("닉네임 중복 확인을 완료해주세요.");
      return;
    }

    router.push(`${COMMUNITY_PATH}?apply=form`);
  }

  function goBackToNickname() {
    setErrorMessage(null);
    router.push(COMMUNITY_PATH);
  }

  function updateNickname(value: string) {
    setErrorMessage(null);
    setNicknameCheckStatus((prev) =>
      value.trim() === nickname.trim() ? prev : "idle",
    );
    setNickname(value);
  }

  function checkNickname() {
    setErrorMessage(null);

    if (hasMembershipLookupError) {
      setErrorMessage("신청 상태를 확인하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (hasActiveMembership) {
      setErrorMessage("이미 신청이 접수되었어요.");
      return;
    }

    if (hasCurrentCohortLookupError) {
      setErrorMessage("현재 모집 중인 기수를 확인하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (isApplicationUnavailable || joinCohortId === null) {
      setErrorMessage("아직 신청 가능한 회차가 열리지 않았어요.");
      return;
    }

    if (!isCommunityNicknameValid(nickname)) {
      setErrorMessage("사용할 닉네임을 입력해주세요.");
      return;
    }

    nicknameCheckMutation.mutate();
  }

  function updateForm(
    field: keyof CommunityApplicationForm,
    value: string | boolean,
  ) {
    setErrorMessage(null);
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submitApplication() {
    setErrorMessage(null);

    if (hasMembershipLookupError) {
      setErrorMessage("신청 상태를 확인하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (hasActiveMembership) {
      setErrorMessage("이미 신청이 접수되었어요.");
      return;
    }

    if (hasCurrentCohortLookupError) {
      setErrorMessage("현재 모집 중인 기수를 확인하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (isApplicationUnavailable || joinCohortId === null) {
      setErrorMessage("아직 신청 가능한 회차가 열리지 않았어요.");
      return;
    }

    if (!isCommunityNicknameValid(nickname)) {
      setErrorMessage("사용할 닉네임을 입력해주세요.");
      return;
    }

    if (!isNicknameAvailable) {
      setErrorMessage("닉네임 중복 확인을 완료해주세요.");
      return;
    }

    if (!isCommunityApplicationFormValid(form)) {
      setErrorMessage("입금자명·환불계좌·동의 여부를 확인해주세요.");
      return;
    }

    joinMutation.mutate();
  }

  return {
    view,
    meeting: resolveCommunityMeetingInfo(currentCohort),
    depositAccount: resolveCommunityDepositAccount(currentCohort),
    nickname,
    nicknameCheckStatus,
    isCheckingNickname: nicknameCheckMutation.isPending,
    isNicknameAvailable,
    checkNickname,
    updateNickname,
    form,
    updateForm,
    completionView,
    hasActiveMembership,
    isApplicationUnavailable,
    isCheckingMembership: membershipsQuery.isLoading,
    isSubmitting: joinMutation.isPending,
    errorMessage: errorMessage ?? defaultBlockedMessage,
    goToForm,
    goBackToNickname,
    submitApplication,
  };
}
