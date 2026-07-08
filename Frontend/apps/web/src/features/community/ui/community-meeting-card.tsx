import { Button } from "@/shared/ui";

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
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5956E9] text-[13px] font-extrabold text-white">
          01
        </div>
        <h2 className="text-[20px] font-black text-gray-900">
          관심 있는 모임 신청해보기
        </h2>
      </div>
      <p className="mb-5 ml-10 text-[13px] text-gray-400">
        사주 궁합으로 자리를 배치하는 로테이션 소개팅이에요.
      </p>

      <div className="grid grid-cols-1 gap-4 rounded-[20px] border-[1.5px] border-gray-100 p-5 md:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-black text-gray-900">
              {meeting.title}
            </h3>
            <span className="rounded-full border border-[#BFE6CF] bg-[#E9F7EF] px-2.5 py-1 text-[11px] font-bold text-[#2FA36B]">
              ● {meeting.stateLabel}
            </span>
          </div>

          <div className="flex h-[140px] items-center justify-center rounded-2xl border-[1.5px] border-gray-100 bg-gradient-to-br from-[#EEF0FE] to-[#E9F0FF] text-[13px] text-gray-400">
            🖼️ 사진
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#F5F5F8] px-3 py-1.5 text-[12px] text-gray-600">
              📅 {meeting.dateLabel}
            </span>
            <span className="rounded-full bg-[#F5F5F8] px-3 py-1.5 text-[12px] text-gray-600">
              📍 {meeting.placeLabel}
            </span>
          </div>

          <div className="rounded-2xl border-[1.5px] border-gray-100 p-4">
            <p className="mb-1.5 text-[12.5px] font-bold text-gray-800">안전 규칙</p>
            <ul className="space-y-1 text-[12px] leading-relaxed text-gray-500">
              {SAFETY_RULES.map((rule) => (
                <li key={rule}>· {rule}</li>
              ))}
            </ul>
            <p className="mb-1.5 mt-3 text-[12.5px] font-bold text-gray-800">
              환불 정책
            </p>
            <ul className="space-y-1 text-[12px] leading-relaxed text-gray-500">
              {REFUND_RULES.map((rule) => (
                <li key={rule}>· {rule}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 self-start rounded-2xl border-[1.5px] border-[#E0DAFF] bg-[#F9F8FF] p-4">
          <span className="text-[12px] text-gray-400">참가비</span>
          <span className="text-[24px] font-black text-gray-900">
            {meeting.feeLabel}
          </span>
          <span className="text-[11px] text-gray-400">{meeting.feeNote}</span>
          <Button
            type="button"
            onClick={onApply}
            disabled={disabled}
            className="mt-1 h-12 rounded-2xl text-[15px] font-extrabold shadow-[0_4px_20px_rgba(89,86,233,0.30)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {disabled ? "이미 신청 완료" : "신청하기"}
          </Button>
        </div>
      </div>
    </section>
  );
}
