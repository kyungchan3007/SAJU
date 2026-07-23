import type {
  CommunityTopicOption,
  MeetingType,
} from "@/features/community/model/community";
import styles from "@/features/community/ui/community.module.css";

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
      aria-pressed={selected}
      className={`flex flex-col items-center gap-1.5 rounded-2xl bg-white px-2 py-3 text-center transition-colors duration-150 ${styles.topicButton} ${
        wide ? "col-span-2" : ""
      } ${
        selected
          ? styles.topicButtonSelected
          : `border-gray-100 ${styles.topicButtonIdle}`
      } disabled:pointer-events-none disabled:opacity-70`}
    >
      <span className={styles.topicEmoji}>{icon}</span>
      <span
        className={`whitespace-pre-line font-bold leading-snug ${styles.topicLabel} ${
          selected ? styles.topicLabelSelected : "text-gray-700"
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
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-extrabold text-white ${styles.stepBadge}`}>
          05
        </div>
        <h2 className={`font-black text-gray-900 ${styles.sectionTitle}`}>관심 주제 선택</h2>
        <span className={`ml-auto font-bold text-gray-400 ${styles.bottomBarHint}`}>
          3 / 3
        </span>
      </div>
      <p className={`mb-5 text-gray-400 ${styles.sectionHint}`}>
        관심 있는 주제를 선택해 주세요. 복수 선택은 최대 2개까지 가능합니다.
      </p>

      <div className={`mb-5 rounded-2xl border bg-white px-4 py-3 ${styles.sectionHint} ${styles.summaryBox}`}>
        <div className="flex items-center justify-between gap-3">
          <p className={`font-bold text-slate-500 ${styles.summaryLabel}`}>선택한 주제</p>
          <span className={`font-black ${styles.summaryCount}`}>
            {selectedCount}/2 선택
          </span>
        </div>
        <div className="mt-3 flex min-h-8 flex-wrap gap-2">
          {selectedTopics.length > 0 ? (
            selectedTopics.map((topic) => (
              <span
                key={topic}
                className={`rounded-full px-3 py-1 font-bold ${styles.summaryChip}`}
              >
                {topic}
              </span>
            ))
          ) : (
            <span className={`text-slate-400 ${styles.summaryEmpty}`}>
              아직 선택한 주제가 없습니다.
            </span>
          )}
        </div>
      </div>

      {isLoadingTopics ? (
        <p className={`rounded-2xl px-4 py-3 font-semibold ${styles.loadingBox}`}>
          관심 주제 목록을 불러오는 중이에요.
        </p>
      ) : topicsError ? (
        <p className={`rounded-2xl px-4 py-3 font-semibold ${styles.errorBox}`}>
          {topicsError}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className={`relative overflow-hidden rounded-[20px] p-5 ${styles.topicPanelFriend}`}>
            <div className={`mb-4 border-b border-gray-100 pb-3 text-center font-extrabold ${styles.topicPanelTitleFriend}`}>
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

          <div className={`relative overflow-hidden rounded-[20px] p-5 ${styles.topicPanelMeeting}`}>
            <div className={`mb-4 border-b border-gray-100 pb-3 text-center font-extrabold ${styles.topicPanelTitleMeeting}`}>
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
      <div className={`rounded-2xl px-4 py-3 font-extrabold text-white ${styles.lockedLabel}`}>
        {label}
      </div>
    </div>
  );
}
