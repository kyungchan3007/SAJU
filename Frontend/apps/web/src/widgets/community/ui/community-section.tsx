"use client";

import { Button } from "@/shared/ui";
import { CommunityApplicationDone } from "@/features/community/ui/community-application-done";
import { CommunityApplicationView } from "@/features/community/ui/community-application-view";
import { CommunityHero } from "@/features/community/ui/community-hero";
import { SajuRecommendation } from "@/features/community/ui/saju-recommendation";
import { StepContactForm } from "@/features/community/ui/step-contact-form";
import { useCommunityFlow } from "@/features/community/hooks/use-community-flow";

export function CommunitySection() {
  const flow = useCommunityFlow();

  if (flow.view === "done") {
    return <CommunityApplicationDone completion={flow.completionView} />;
  }

  if (flow.view === "form") {
    return (
      <CommunityApplicationView
        meeting={flow.meeting}
        depositAccount={flow.depositAccount}
        form={flow.form}
        disabled={flow.hasActiveMembership || flow.isApplicationUnavailable}
        isSubmitting={flow.isSubmitting}
        errorMessage={flow.errorMessage}
        onChange={flow.updateForm}
        onSubmit={flow.submitApplication}
        onPrev={flow.goBackToNickname}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <CommunityHero />

      <SajuRecommendation />

      <StepContactForm
        nickname={flow.nickname}
        onChange={flow.updateNickname}
        disabled={flow.hasActiveMembership || flow.isApplicationUnavailable}
        checkStatus={flow.nicknameCheckStatus}
        isChecking={flow.isCheckingNickname}
        onCheck={flow.checkNickname}
      />

      <div className="px-6">
        <Button
          type="button"
          onClick={flow.goToForm}
          disabled={
            flow.hasActiveMembership ||
            flow.isApplicationUnavailable ||
            !flow.isNicknameAvailable
          }
          className="mx-auto flex h-[52px] w-full max-w-[400px] items-center justify-center rounded-2xl text-[15px] font-extrabold shadow-[0_4px_20px_rgba(89,86,233,0.30)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {flow.hasActiveMembership
            ? "이미 신청 완료"
            : flow.isApplicationUnavailable
              ? "신청기간이 아니에요!"
              : "신청하기"}
        </Button>
        <p
          className={`mt-1.5 text-center text-[11px] ${
            flow.errorMessage ? "font-bold text-red-500" : "text-gray-400"
          }`}
        >
          {flow.errorMessage ??
            (flow.hasActiveMembership
              ? "이미 신청이 접수되어 있어요. 상태는 마이페이지에서 확인해요."
              : flow.isApplicationUnavailable
                ? "아직 신청 가능한 회차가 열리지 않았어요."
                : !flow.isNicknameAvailable
                  ? "닉네임 중복 확인을 완료하면 신청할 수 있어요."
                  : "신청하기를 눌러 다음 단계로 이동해요.")}
        </p>
      </div>
    </div>
  );
}
