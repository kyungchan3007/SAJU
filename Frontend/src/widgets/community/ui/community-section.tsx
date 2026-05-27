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
        <h2 className="text-[24px] font-black text-gray-900">관심 신청 완료!</h2>
        <p className="text-[14px] leading-relaxed text-gray-500">
          모임이 열리면 가장 먼저 알려드릴게요.
          <br />
          조금만 기다려주세요!
        </p>
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

        <div key={flow.step} className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
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
        onNext={flow.goNext}
        onPrev={flow.goPrev}
      />
    </div>
  );
}
