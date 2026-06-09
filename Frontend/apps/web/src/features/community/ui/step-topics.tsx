import type {
  CommunityTopicOption,
  MeetingType,
} from "@/features/community/model/community";

type Props = {
  selectedType: MeetingType;
  selectedTopics: string[];
  friendTopics: CommunityTopicOption[];
  meetingTopics: CommunityTopicOption[];
  isLoadingTopics: boolean;
  topicsError?: string | null;
  onToggle: (topic: string) => void;
};

function TopicButton({
  id,
  icon,
  label,
  elementColor,
  selected,
  onToggle,
  wide,
  disabled = false,
}: {
  id: string;
  icon: string;
  label?: string;
  elementColor?: string;
  selected: boolean;
  onToggle: (id: string) => void;
  wide?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      disabled={disabled}
      className={`flex flex-col items-center gap-1.5 rounded-2xl border-[1.5px] bg-white px-2 py-3 text-center transition-all duration-150 ${
        wide ? "col-span-2" : ""
      } ${
        selected
          ? "border-[#5956E9] bg-[#F0EEFF]"
          : "border-gray-100 hover:border-[#C7C4F8] hover:bg-[#F9F8FF]"
      } disabled:pointer-events-none disabled:opacity-70`}
    >
      <span className="text-[22px]">{icon}</span>
      <span
        className={`whitespace-pre-line text-[11px] font-bold leading-snug ${
          selected ? "text-[#5956E9]" : "text-gray-700"
        }`}
        style={!selected && elementColor ? { color: elementColor } : undefined}
      >
        {label ?? id}
      </span>
    </button>
  );
}

export function StepTopics({
  selectedType,
  selectedTopics,
  friendTopics,
  meetingTopics,
  isLoadingTopics,
  topicsError,
  onToggle,
}: Props) {
  const isFriendLocked = selectedType === "meeting";
  const isMeetingLocked = selectedType === "friend";
  const selectedCount = selectedTopics.length;

  return (
    <div>
      <div className="mb-1 flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5956E9] text-[13px] font-extrabold text-white">
          05
        </div>
        <h2 className="text-[20px] font-black text-gray-900">관심 주제 선택</h2>
        <span className="ml-auto text-[11px] font-bold text-gray-400">
          3 / 3
        </span>
      </div>
      <p className="mb-5 ml-10 text-[13px] text-gray-400">
        관심 있는 주제를 선택해 주세요. 복수 선택은 최대 2개까지 가능합니다.
      </p>

      <div className="mb-5 ml-10 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-bold text-slate-500">선택한 주제</p>
          <span className="text-[12px] font-black text-[#5956E9]">
            {selectedCount}/2 선택
          </span>
        </div>
        <div className="mt-3 flex min-h-8 flex-wrap gap-2">
          {selectedTopics.length > 0 ? (
            selectedTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-[#F0EEFF] px-3 py-1 text-[12px] font-bold text-[#5956E9]"
              >
                {topic}
              </span>
            ))
          ) : (
            <span className="text-[12px] text-slate-400">
              아직 선택한 주제가 없습니다.
            </span>
          )}
        </div>
      </div>

      {isLoadingTopics ? (
        <p className="rounded-2xl bg-[#F8F9FF] px-4 py-3 text-[12px] font-semibold text-[#5956E9]">
          관심 주제 목록을 불러오는 중이에요.
        </p>
      ) : topicsError ? (
        <p className="rounded-2xl bg-[#FFF1F2] px-4 py-3 text-[12px] font-semibold text-[#E11D48]">
          {topicsError}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-[20px] border-[1.5px] border-[#E0DAFF] bg-[#F9F8FF] p-5">
            <div className="mb-4 border-b border-gray-100 pb-3 text-center text-[13px] font-extrabold text-[#5956E9]">
              친구 만들기 선택 주제
            </div>
            <div className="grid grid-cols-3 gap-2">
              {friendTopics.map(({ id, icon, label, elementColor, wide }) => (
                <TopicButton
                  key={id}
                  id={id}
                  icon={icon}
                  label={label}
                  elementColor={elementColor}
                  selected={selectedTopics.includes(id)}
                  onToggle={onToggle}
                  wide={wide}
                  disabled={isFriendLocked}
                />
              ))}
            </div>
            {isFriendLocked && (
              <LockedOverlay label="소개팅 유형을 선택했어요." />
            )}
          </div>

          <div className="relative overflow-hidden rounded-[20px] border-[1.5px] border-[#FECDD3] bg-[#FFF5F7] p-5">
            <div className="mb-4 border-b border-gray-100 pb-3 text-center text-[13px] font-extrabold text-[#E8718D]">
              소개팅 선택 주제
            </div>
            <div className="grid grid-cols-3 gap-2">
              {meetingTopics.map(({ id, icon, label, elementColor, wide }) => (
                <TopicButton
                  key={id}
                  id={id}
                  icon={icon}
                  label={label}
                  elementColor={elementColor}
                  selected={selectedTopics.includes(id)}
                  onToggle={onToggle}
                  wide={wide}
                  disabled={isMeetingLocked}
                />
              ))}
            </div>
            {isMeetingLocked && (
              <LockedOverlay label="친구 만들기 유형을 선택했어요." />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LockedOverlay({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-black/55 via-black/45 to-black/60 px-5 text-center">
      <div className="rounded-2xl bg-black/35 px-4 py-3 text-[13px] font-extrabold text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)]">
        {label}
      </div>
    </div>
  );
}
