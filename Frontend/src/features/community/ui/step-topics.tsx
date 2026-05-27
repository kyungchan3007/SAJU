type Props = {
  selectedTopics: string[];
  onToggle: (topic: string) => void;
};

const FRIEND_TOPICS = [
  { id: "한강 산책", icon: "🌊" },
  { id: "연애 고민", icon: "💬" },
  { id: "운동하기", icon: "🏋️" },
  { id: "카페가기", icon: "☕" },
  { id: "영화·전시", icon: "🎬", wide: true },
];

const MEETING_TOPICS = [
  { id: "카페에서 가볍게 대화", icon: "☕", label: "카페에서\n가볍게 대화" },
  { id: "취향으로 가까워지는 소개팅", icon: "🎵", label: "취향으로\n가까워지는 소개팅" },
  { id: "밸런스 게임 대화 소개팅", icon: "🃏", label: "밸런스 게임\n대화 소개팅" },
  { id: "사주궁합 토크 소개팅", icon: "☯️", label: "사주궁합\n토크 소개팅" },
];

function TopicButton({
  id,
  icon,
  label,
  selected,
  onToggle,
  wide,
}: {
  id: string;
  icon: string;
  label?: string;
  selected: boolean;
  onToggle: (id: string) => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={`flex flex-col items-center gap-1.5 rounded-2xl border-[1.5px] bg-white px-2 py-3 text-center transition-all duration-150 ${
        wide ? "col-span-2" : ""
      } ${
        selected
          ? "border-[#5956E9] bg-[#F0EEFF]"
          : "border-gray-100 hover:border-[#C7C4F8] hover:bg-[#F9F8FF]"
      }`}
    >
      <span className="text-[22px]">{icon}</span>
      <span
        className={`whitespace-pre-line text-[11px] font-bold leading-snug ${
          selected ? "text-[#5956E9]" : "text-gray-700"
        }`}
      >
        {label ?? id}
      </span>
    </button>
  );
}

export function StepTopics({ selectedTopics, onToggle }: Props) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5956E9] text-[13px] font-extrabold text-white">
          05
        </div>
        <h2 className="text-[20px] font-black text-gray-900">관심 주제 선택</h2>
        <span className="ml-auto text-[11px] font-bold text-gray-400">3 / 3</span>
      </div>
      <p className="mb-5 ml-10 text-[13px] text-gray-400">관심 있는 주제를 선택해주세요. (복수 선택 가능)</p>

      <div className="grid grid-cols-2 gap-4">
        {/* 친구 모임 주제 */}
        <div className="rounded-[20px] border-[1.5px] border-[#E0DAFF] bg-[#F9F8FF] p-5">
          <div className="mb-4 border-b border-gray-100 pb-3 text-center text-[13px] font-extrabold text-[#5956E9]">
            친구 모임을 선택하셨나요? 💫
          </div>
          <div className="grid grid-cols-3 gap-2">
            {FRIEND_TOPICS.map(({ id, icon, wide }) => (
              <TopicButton
                key={id}
                id={id}
                icon={icon}
                selected={selectedTopics.includes(id)}
                onToggle={onToggle}
                wide={wide}
              />
            ))}
          </div>
        </div>

        {/* 소개팅 주제 */}
        <div className="rounded-[20px] border-[1.5px] border-[#FECDD3] bg-[#FFF5F7] p-5">
          <div className="mb-4 border-b border-gray-100 pb-3 text-center text-[13px] font-extrabold text-[#E8718D]">
            소개팅을 선택하셨나요? 💕
          </div>
          <div className="grid grid-cols-2 gap-2">
            {MEETING_TOPICS.map(({ id, icon, label }) => (
              <TopicButton
                key={id}
                id={id}
                icon={icon}
                label={label}
                selected={selectedTopics.includes(id)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
