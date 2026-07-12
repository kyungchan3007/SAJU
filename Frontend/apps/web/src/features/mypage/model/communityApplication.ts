import type { MyMembershipResponse } from "@/generated/api";
import {
  COMMUNITY_MEETING_INFO,
  formatCommunityFee,
} from "@/features/community/model/community-application";

export type MyApplicationBadgeTone = "amber" | "blue" | "green" | "gray";

export type MyApplicationView = {
  memberId: number | undefined;
  title: string;
  statusLabel: string;
  statusTone: MyApplicationBadgeTone;
  dateLabel: string;
  placeLabel: string;
  feeLabel: string;
  depositConfirmed: boolean;
  remindMessage: string;
};

type MembershipStatus = NonNullable<MyMembershipResponse["status"]>;

const STATUS_VIEW: Record<
  MembershipStatus,
  { label: string; tone: MyApplicationBadgeTone; remind: string }
> = {
  APPLIED: {
    label: "입금 대기",
    tone: "amber",
    remind: "입금이 확인되면 ‘확정’으로 바뀌어요. 신청자 이름으로 입금해 주세요.",
  },
  DEPOSIT_CONFIRMED: {
    label: "입금 확인",
    tone: "blue",
    remind: "입금이 확인됐어요. 곧 참가 확정 안내를 보내드릴게요.",
  },
  CONFIRMED: {
    label: "확정",
    tone: "green",
    remind:
      "운영자 입금 확인 완료 → 확정되었어요 · 시작 2일 전 리마인드 문자를 보내드려요.",
  },
  REFUND_PENDING: {
    label: "환불 대기",
    tone: "amber",
    remind: "취소 요청이 접수됐어요. 운영자 확인 후 수기 환불돼요.",
  },
  REFUNDED: {
    label: "환불 완료",
    tone: "gray",
    remind: "환불이 완료됐어요.",
  },
  CANCELLED: {
    label: "취소됨",
    tone: "gray",
    remind: "신청이 취소됐어요.",
  },
};

const FALLBACK_STATUS_VIEW: {
  label: string;
  tone: MyApplicationBadgeTone;
  remind: string;
} = {
  label: "신청 확인 중",
  tone: "gray",
  remind: "신청 상태를 확인하고 있어요.",
};

// members/me 한 건을 마이페이지 카드에 바로 뿌릴 수 있는 표시 모델로 변환.
// 일정/장소는 members 응답에 없어 /community와 동일한 정적 정보를 사용한다.
export function buildMyApplicationView(
  membership: MyMembershipResponse,
): MyApplicationView {
  const statusView = membership.status
    ? STATUS_VIEW[membership.status]
    : FALLBACK_STATUS_VIEW;

  return {
    memberId: membership.memberId,
    title: membership.cohortName?.trim() || COMMUNITY_MEETING_INFO.title,
    statusLabel: statusView.label,
    statusTone: statusView.tone,
    dateLabel: COMMUNITY_MEETING_INFO.dateLabel,
    placeLabel: COMMUNITY_MEETING_INFO.placeLabel,
    feeLabel: formatCommunityFee(membership.feeAmount),
    depositConfirmed:
      membership.status === "DEPOSIT_CONFIRMED" ||
      membership.status === "CONFIRMED",
    remindMessage: statusView.remind,
  };
}
