"use client";

import { useEffect, useRef } from "react";

import { CommunityApplicationForm } from "@/features/community/ui/community-application-form";
import { CommunityMeetingCard } from "@/features/community/ui/community-meeting-card";
import type { CommunityApplicationForm as ApplicationFormValues } from "@/features/community/model/community-application";

type MeetingInfo = {
  title: string;
  stateLabel: string;
  dateLabel: string;
  placeLabel: string;
  feeLabel: string;
  feeNote: string;
};

type DepositAccount = {
  bankLabel: string;
  holderLabel: string;
  amountLabel: string;
};

type Props = {
  meeting: MeetingInfo;
  depositAccount: DepositAccount;
  form: ApplicationFormValues;
  disabled?: boolean;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onChange: (
    field: keyof ApplicationFormValues,
    value: string | boolean,
  ) => void;
  onSubmit: () => void;
  onPrev: () => void;
};

function scrollToNode(node: HTMLElement | null) {
  const behavior =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
  node?.scrollIntoView({ behavior, block: "start" });
}

// 신청 폼 뷰: 모임 카드 + 신청 폼 조립과 "폼으로 스크롤" 동작(=DOM 관심사)을 담당한다.
export function CommunityApplicationView({
  meeting,
  depositAccount,
  form,
  disabled = false,
  isSubmitting = false,
  errorMessage,
  onChange,
  onSubmit,
  onPrev,
}: Props) {
  const formSectionRef = useRef<HTMLDivElement | null>(null);

  // 폼 뷰 진입(마운트) 시 자동으로 신청 폼까지 스크롤
  useEffect(() => {
    scrollToNode(formSectionRef.current);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <CommunityMeetingCard
        meeting={meeting}
        disabled={disabled}
        onApply={() => scrollToNode(formSectionRef.current)}
      />
      <div ref={formSectionRef}>
        <CommunityApplicationForm
          form={form}
          depositAccount={depositAccount}
          disabled={disabled}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          onChange={onChange}
          onSubmit={onSubmit}
          onPrev={onPrev}
        />
      </div>
    </div>
  );
}
