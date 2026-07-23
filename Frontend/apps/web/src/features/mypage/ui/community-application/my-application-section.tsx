"use client";

import { useState } from "react";

import { ConfirmModal } from "@/shared/ui";
import { useCommunityMembershipCancel } from "@/features/community/hooks/use-community-membership-cancel";
import { useMyCommunityApplication } from "@/features/mypage/hooks/useMyCommunityApplication";
import { buildMyApplicationView } from "@/features/mypage/model/communityApplication";
import { ApiRequestError } from "@/shared/api/requestError";

import { MyApplicationCard } from "./my-application-card";

export function MyApplicationSection() {
  const { isLoading, isError, membership } = useMyCommunityApplication();

  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const { canCancel, isCancelling, cancelMembership } =
    useCommunityMembershipCancel({
      membership,
      returnTo: "/mypage",
      onCancelled: () => {
        setConfirmOpen(false);
        setCancelError(null);
      },
    });

  function openConfirm() {
    setCancelError(null);
    setConfirmOpen(true);
  }

  function closeConfirm() {
    if (isCancelling) return;
    setConfirmOpen(false);
    setCancelError(null);
  }

  async function handleConfirmCancel() {
    setCancelError(null);
    try {
      await cancelMembership();
    } catch (error) {
      setCancelError(
        error instanceof ApiRequestError
          ? error.message
          : "취소 요청에 실패했어요. 잠시 후 다시 시도해주세요.",
      );
    }
  }

  return (
    <section
      className="border border-slate-100 bg-white p-8 shadow-sm"
      style={{ borderRadius: 24 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">내 신청</h3>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-100" />
        </div>
      ) : isError ? (
        <p className="rounded-2xl border border-slate-100 px-4 py-8 text-center text-sm text-slate-400">
          신청 내역을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </p>
      ) : !membership ? (
        <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center">
          <p className="text-sm font-bold text-slate-500">
            아직 신청한 모임이 없어요
          </p>
          <p className="mt-1.5 text-xs text-slate-500">
            소개팅 모임에 참여하면 신청 내역과 상태를 여기에서 확인할 수 있어요.
          </p>
        </div>
      ) : (
        <MyApplicationCard
          view={buildMyApplicationView(membership)}
          canCancel={canCancel}
          isCancelling={isCancelling}
          onRequestCancel={openConfirm}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="참가 취소 요청"
        description={
          <>
            참가를 취소하면 운영자 확인 후 수기 환불이 진행돼요.
            <br />
            신청 시 입력한 환불 계좌로 환불되며, 취소 마감 이후에는 환불이 어려울
            수 있어요.
          </>
        }
        confirmLabel="취소 요청하기"
        pendingLabel="요청 중..."
        cancelLabel="닫기"
        isPending={isCancelling}
        errorMessage={cancelError}
        variant="destructive"
        onClose={closeConfirm}
        onConfirm={handleConfirmCancel}
      />
    </section>
  );
}
