"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchCommunityCohortsOnClient } from "@/entities/community/client/fetchCommunityCohortsOnClient";
import { joinCommunityOnClient } from "@/entities/community/client/joinCommunityOnClient";
import {
  buildCommunityJoinPayload,
  canSelectCommunityTopic,
  getCommunityJoinedCount,
  isCommunityContactFormValid,
  isCommunityInterestSelectionValid,
  shouldShowCommunityJoinedCount,
  type ContactForm,
  type MeetingType,
} from "@/features/community/model/community";

export type { ContactForm, MeetingType };

const TOTAL_STEPS = 3;
const COMMUNITY_COHORTS_QUERY_KEY = ["community-cohorts"] as const;

export function useCommunityFlow() {
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

  const joinMutation = useMutation({
    mutationFn: () =>
      joinCommunityOnClient(
        buildCommunityJoinPayload(form, selectedType, selectedTopics),
      ),
    onSuccess: () => {
      setSubmitted(true);
      setErrorMessage(null);
    },
    onError: (error) => {
      setErrorMessage(
        error instanceof Error ? error.message : "관심 신청에 실패했어요.",
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

    if (step === 1 && !selectedType) {
      setErrorMessage("참여하고 싶은 만남 유형을 선택해 주세요.");
      return;
    }

    if (step === 2 && !isCommunityContactFormValid(form)) {
      setErrorMessage(
        "닉네임, 연령대, 휴대폰 번호 입력과 개인정보 수집·이용 동의가 필요해요.",
      );
      return;
    }

    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      return;
    }

    if (!isCommunityInterestSelectionValid(selectedType, selectedTopics)) {
      setErrorMessage("관심 주제를 1개 이상, 최대 2개까지 선택해 주세요.");
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
    "만남 유형을 선택한 뒤 다음으로 넘어가세요.",
    "정보를 입력한 뒤 다음으로 넘어가세요.",
    "관심 주제를 선택하고 알림을 신청해보세요!",
  ];

  return {
    step,
    totalSteps: TOTAL_STEPS,
    selectedType,
    setSelectedType,
    selectedTopics,
    toggleTopic,
    form,
    updateForm,
    submitted,
    joinedCount,
    shouldShowJoinedCount,
    isLoadingJoinedCount: cohortsQuery.isLoading,
    isSubmitting: joinMutation.isPending,
    errorMessage,
    goNext,
    goPrev,
    stepNote: stepNotes[step - 1],
  };
}
