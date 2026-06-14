"use client";

import type { Route } from "next";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { fetchCommunityCohortsOnClient } from "@/entities/community/client/fetchCommunityCohortsOnClient";
import { fetchCommunityInterestsOnClient } from "@/entities/community/client/fetchCommunityInterestsOnClient";
import { joinCommunityOnClient } from "@/entities/community/client/joinCommunityOnClient";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import {
  buildCommunityJoinPayload,
  canSelectCommunityTopic,
  getCommunityJoinedCount,
  isCommunityContactFormValid,
  isCommunityInterestSelectionValid,
  mapCommunityTopicsByMeetingType,
  resolveCommunityInterestType,
  shouldShowCommunityJoinedCount,
  type ContactForm,
  type MeetingType,
} from "@/features/community/model/community";
import {
  buildTurnstileVerifyPath,
  isTurnstileRequiredError,
} from "@/shared/api/auth/turnstileRecovery";

export type { ContactForm, MeetingType };

const TOTAL_STEPS = 3;
const COMMUNITY_COHORTS_QUERY_KEY = ["community-cohorts"] as const;
const COMMUNITY_INTERESTS_QUERY_KEY = ["community-interests"] as const;
const SAJU_PROFILE_QUERY_KEY = ["saju-profile", "community-joined"] as const;

export function useCommunityFlow() {
  const authScope = useAuthScope();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<MeetingType>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [form, setForm] = useState<ContactForm>({
    nickname: "",
    ageGroup: "",
    phone: "",
    agreedToPrivacy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sajuProfileQuery = useQuery({
    queryKey: [...SAJU_PROFILE_QUERY_KEY, authScope],
    queryFn: fetchSajuProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
  const isCommunityJoined = Boolean(
    sajuProfileQuery.data?.success && sajuProfileQuery.data.data?.communityJoined,
  );
  const shouldDisableCommunityAction =
    sajuProfileQuery.isLoading ||
    sajuProfileQuery.isError ||
    !sajuProfileQuery.data?.success ||
    isCommunityJoined;

  const interestsQuery = useQuery({
    queryKey: COMMUNITY_INTERESTS_QUERY_KEY,
    queryFn: fetchCommunityInterestsOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const joinMutation = useMutation({
    mutationFn: () =>
      joinCommunityOnClient(
        buildCommunityJoinPayload(
          form,
          selectedType,
          selectedTopics,
          undefined,
          resolveCommunityInterestType(
            interestsQuery.data?.success ? interestsQuery.data.data : undefined,
            selectedType,
          ),
        ),
      ),
    onSuccess: () => {
      setSubmitted(true);
      setErrorMessage(null);
    },
    onError: (error) => {
      if (isTurnstileRequiredError(error)) {
        router.replace(buildTurnstileVerifyPath("/community") as Route);
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : "커뮤니티 요청에 실패했어요.",
      );
    },
  });

  const cohortsQuery = useQuery({
    queryKey: COMMUNITY_COHORTS_QUERY_KEY,
    queryFn: fetchCommunityCohortsOnClient,
    enabled: submitted,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  const { friendTopics, meetingTopics } = useMemo(
    () =>
      mapCommunityTopicsByMeetingType(
        interestsQuery.data?.success ? interestsQuery.data.data : undefined,
      ),
    [interestsQuery.data],
  );

  const joinedCount = useMemo(
    () =>
      getCommunityJoinedCount(
        cohortsQuery.data?.success ? cohortsQuery.data.data : undefined,
        joinMutation.data?.success ? joinMutation.data.data : null,
      ),
    [cohortsQuery.data, joinMutation.data],
  );
  const shouldShowJoinedCount = shouldShowCommunityJoinedCount(joinedCount);

  function goNext() {
    setErrorMessage(null);

    if (sajuProfileQuery.isLoading) {
      setErrorMessage("참가 상태를 확인 중이에요.");
      return;
    }

    if (sajuProfileQuery.isError || !sajuProfileQuery.data?.success) {
      setErrorMessage("참가 상태를 확인하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (isCommunityJoined) {
      setErrorMessage("이미 커뮤니티 참가가 완료되었어요.");
      return;
    }

    if (step === 1 && !selectedType) {
      setErrorMessage("참여할 만남 유형을 선택해주세요.");
      return;
    }

    if (step === 2 && !isCommunityContactFormValid(form)) {
      setErrorMessage("닉네임/연령대/연락처/개인정보 동의를 확인해주세요.");
      return;
    }

    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      return;
    }

    if (!isCommunityInterestSelectionValid(selectedType, selectedTopics)) {
      setErrorMessage("관심 주제를 1~2개 선택해주세요.");
      return;
    }

    joinMutation.mutate();
  }

  function goPrev() {
    setErrorMessage(null);
    if (step > 1) setStep((s) => s - 1);
  }

  function toggleTopic(topic: string) {
    if (!canSelectCommunityTopic(selectedTopics, topic)) {
      setErrorMessage("관심 주제는 최대 2개까지 선택할 수 있어요.");
      return;
    }

    setErrorMessage(null);
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic],
    );
  }

  function updateForm(field: keyof ContactForm, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const stepNotes = [
    "만남 유형을 고르면 다음 단계로 넘어가요.",
    "기본 정보를 입력하면 다음 단계로 넘어가요.",
    "관심 주제를 고르고 신청해주세요.",
  ];

  return {
    step,
    totalSteps: TOTAL_STEPS,
    selectedType,
    setSelectedType,
    selectedTopics,
    friendTopics,
    meetingTopics,
    isLoadingTopics: interestsQuery.isLoading,
    topicsError:
      interestsQuery.isError || !interestsQuery.data?.success
        ? "관심 주제 목록을 불러오지 못했어요."
        : null,
    toggleTopic,
    form,
    updateForm,
    submitted,
    joinedCount,
    shouldShowJoinedCount,
    isLoadingJoinedCount: cohortsQuery.isLoading,
    isSubmitting: joinMutation.isPending,
    isCommunityJoined: shouldDisableCommunityAction,
    errorMessage,
    goNext,
    goPrev,
    stepNote: isCommunityJoined
      ? "이미 커뮤니티에 참가한 상태예요."
      : stepNotes[step - 1],
  };
}
