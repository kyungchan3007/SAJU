"use client";

import { useState } from "react";

export type MeetingType = "friend" | "meeting" | null;

export type ContactForm = {
  nickname: string;
  age: string;
  phone: string;
};

const TOTAL_STEPS = 3;

export function useCommunityFlow() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<MeetingType>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [form, setForm] = useState<ContactForm>({ nickname: "", age: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  function goNext() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      setSubmitted(true);
    }
  }

  function goPrev() {
    if (step > 1) setStep((s) => s - 1);
  }

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }

  function updateForm(field: keyof ContactForm, value: string) {
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
    goNext,
    goPrev,
    stepNote: stepNotes[step - 1],
  };
}
