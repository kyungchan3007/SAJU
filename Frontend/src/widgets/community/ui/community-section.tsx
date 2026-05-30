"use client";

import { CommunityBottomBar } from "@/features/community/ui/community-bottom-bar";
import { CommunityHero } from "@/features/community/ui/community-hero";
import { SajuRecommendation } from "@/features/community/ui/saju-recommendation";
import { StepContactForm } from "@/features/community/ui/step-contact-form";
import { StepMeetingType } from "@/features/community/ui/step-meeting-type";
import { StepProgress } from "@/features/community/ui/step-progress";
import { StepTopics } from "@/features/community/ui/step-topics";
import { useCommunityFlow } from "@/features/community/hooks/use-community-flow";

const STEP_LABELS = ["만남 유형", "신청 정보", "관심 주제"];

export function CommunitySection() {
  const flow = useCommunityFlow();

  if (flow.submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <span className="text-[64px]">🎉</span>
        <h2 className="text-[24px] font-black text-gray-900">
          관심 신청 완료!
        </h2>
        {flow.shouldShowJoinedCount && flow.joinedCount !== null ? (
          <div className="rounded-3xl bg-[#F0EEFF] px-6 py-4">
            <p className="text-[15px] font-black text-[#5956E9]">
              현재 {flow.joinedCount}명이 관심 신청했어요
            </p>
            <p className="mt-1 text-[12px] font-semibold text-[#6B7280]">
              인원이 모이면 모임 오픈 안내를 보내드릴게요.
            </p>
          </div>
        ) : (
          <p className="text-[14px] leading-relaxed text-gray-500">
            모임이 열리면 가장 먼저 알려드릴게요.
            <br />
            조금만 기다려주세요!
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <CommunityHero />

      <SajuRecommendation />

      <section>
        <StepProgress
          currentStep={flow.step}
          totalSteps={flow.totalSteps}
          labels={STEP_LABELS}
        />

        <div
          key={flow.step}
          className="duration-300 animate-in fade-in-0 slide-in-from-bottom-2"
        >
          {flow.step === 1 && (
            <StepMeetingType
              selectedType={flow.selectedType}
              onSelect={flow.setSelectedType}
            />
          )}
          {flow.step === 2 && (
            <StepContactForm form={flow.form} onChange={flow.updateForm} />
          )}
          {flow.step === 3 && (
            <StepTopics
              selectedType={flow.selectedType}
              selectedTopics={flow.selectedTopics}
              onToggle={flow.toggleTopic}
            />
          )}
        </div>
      </section>

      <CommunityBottomBar
        step={flow.step}
        totalSteps={flow.totalSteps}
        stepNote={flow.stepNote}
        errorMessage={flow.errorMessage}
        isSubmitting={flow.isSubmitting}
        onNext={flow.goNext}
        onPrev={flow.goPrev}
      />
    </div>
  );
}
