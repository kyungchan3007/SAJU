import { Button } from "@/shared/ui";
import styles from "@/features/community/ui/community.module.css";

type MeetingInfo = {
  title: string;
  stateLabel: string;
  dateLabel: string;
  placeLabel: string;
  feeLabel: string;
  feeNote: string;
};

type Props = {
  meeting: MeetingInfo;
  disabled?: boolean;
  onApply: () => void;
};

const SAFETY_RULES = [
  "본인 인증(카카오) 후 신청한 참가자만 입장해요.",
  "다른 참가자의 사진·연락처를 무단 촬영·공유하지 않아요.",
  "음주 강요·불쾌한 언행은 신고·차단 대상이며, 즉시 퇴장 및 이후 참여가 제한돼요.",
];

const REFUND_RULES = [
  "개최 7일 전까지 취소 시 전액 환불",
  "3~6일 전 50% 환불 / 2일 전~당일·노쇼는 환불 불가",
  "정원 미달 등으로 모임이 취소되면 전액 환불해 드려요.",
];

export function CommunityMeetingCard({ meeting, disabled = false, onApply }: Props) {
  return (
    <section>
      <div className="mb-1 flex items-center gap-3">
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-extrabold text-white ${styles.stepBadge}`}>
          01
        </div>
        <h2 className={`font-black text-gray-900 ${styles.sectionTitle}`}>
          관심 있는 모임 신청해보기
        </h2>
      </div>
      <p className={`mb-5 text-gray-400 ${styles.sectionHint}`}>
        사주 궁합으로 자리를 배치하는 로테이션 소개팅이에요.
      </p>

      <div className={`grid grid-cols-1 gap-4 border-gray-100 p-5 md:grid-cols-[1.5fr_1fr] ${styles.meetingCard} ${styles.meetingGrid}`}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-black text-gray-900">
              {meeting.title}
            </h3>
            <span className={`rounded-full border px-2.5 py-1 font-bold ${styles.statusChip}`}>
              ● {meeting.stateLabel}
            </span>
          </div>

          <div className={`flex items-center justify-center rounded-2xl border-gray-100 text-gray-400 ${styles.meetingPoster}`}>
            🖼️ 사진
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1.5 text-gray-600 ${styles.metaChip}`}>
              📅 {meeting.dateLabel}
            </span>
            <span className={`rounded-full px-3 py-1.5 text-gray-600 ${styles.metaChip}`}>
              📍 {meeting.placeLabel}
            </span>
          </div>

          <div className={`rounded-2xl border-gray-100 p-4 ${styles.policyCard}`}>
            <p className={`mb-1.5 font-bold text-gray-800 ${styles.policyHeading}`}>안전 규칙</p>
            <ul className={`space-y-1 text-gray-500 ${styles.policyBody}`}>
              {SAFETY_RULES.map((rule) => (
                <li key={rule}>· {rule}</li>
              ))}
            </ul>
            <p className={`mb-1.5 mt-3 font-bold text-gray-800 ${styles.policyHeading}`}>
              환불 정책
            </p>
            <ul className={`space-y-1 text-gray-500 ${styles.policyBody}`}>
              {REFUND_RULES.map((rule) => (
                <li key={rule}>· {rule}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`flex flex-col gap-3 self-start rounded-2xl p-4 ${styles.feeCard}`}>
          <span className={`text-gray-400 ${styles.feeLabel}`}>참가비</span>
          <span className="text-[24px] font-black text-gray-900">
            {meeting.feeLabel}
          </span>
          <span className={`text-gray-400 ${styles.feeNote}`}>{meeting.feeNote}</span>
          <Button
            type="button"
            onClick={onApply}
            disabled={disabled}
            className={`mt-1 h-12 rounded-2xl font-extrabold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${styles.primaryButton}`}
          >
            {disabled ? "이미 신청 완료" : "신청하기"}
          </Button>
        </div>
      </div>
    </section>
  );
}
