import Image from "next/image";
import type { MeetingType } from "@/features/community/model/community";
import styles from "@/features/community/ui/community.module.css";

type Props = {
  selectedType: MeetingType;
  onSelect: (type: MeetingType) => void;
};

const TYPES = [
  {
    id: "friend" as const,
    image: "/image/community/friend.webp",
    title: "편하게 대화하는 친구 모임",
    desc: "연애가 부담스럽거나, 가볍게 대화하고 친구를 만들고 싶은 분들을 위한 모임이에요.",
  },
  {
    id: "meeting" as const,
    image: "/image/community/meeting.webp",
    title: "천천히 설레는 로테이션 소개팅",
    desc: "바로 매칭되는 부담 없이, 관심이 모이면 열리는 소개팅 회차에 참여할 수 있어요.",
  },
];

export function StepMeetingType({ selectedType, onSelect }: Props) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-3">
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-extrabold text-white ${styles.stepBadge}`}>
          03
        </div>
        <h2 className={`font-black text-gray-900 ${styles.sectionTitle}`}>관심 있는 만남 유형 선택</h2>
        <span className={`ml-auto font-bold text-gray-400 ${styles.bottomBarHint}`}>1 / 3</span>
      </div>
      <p className={`mb-5 text-gray-400 ${styles.sectionHint}`}>참여하고 싶은 만남 유형을 선택해주세요.</p>

      <div
        role="radiogroup"
        aria-label="관심 있는 만남 유형"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {TYPES.map(({ id, image, title, desc }) => {
          const selected = selectedType === id;
          return (
            <button
              key={id}
              role="radio"
              type="button"
              onClick={() => onSelect(id)}
              aria-checked={selected}
              className={`relative cursor-pointer overflow-hidden border-2 bg-white text-left transition-colors transition-shadow duration-200 ${styles.selectionCard} ${selected ? styles.selectionCardActive : `border-gray-100 ${styles.selectionCardIdle}`}`}
            >
              <div
                className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-200 ${selected ? styles.selectionRadioActive : "border-gray-200 bg-white"}`}
              >
                {selected && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
              </div>
              <div className={`relative w-full ${styles.selectionImage}`}>
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 50vw, 420px"
                  className="object-cover"
                />
              </div>
              <div className="p-4 pb-5">
                <div className={`mb-1.5 font-extrabold text-gray-900 ${styles.selectionTitle}`}>{title}</div>
                <div className={`leading-relaxed text-gray-500 ${styles.selectionDesc}`}>{desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className={`mt-4 flex items-start gap-2 rounded-2xl px-4 py-3 ${styles.tipBox}`}>
        <span className="mt-0.5 shrink-0 text-[14px]">💡</span>
        <p className={`font-semibold leading-relaxed ${styles.tipText}`}>
          지금 바로 매칭되거나 연결되는 서비스가 아니에요.
          <br />
          관심이 모이면 로테이션 친구 모임 또는 소개팅 회차가 열릴 수 있어요.
        </p>
      </div>
    </div>
  );
}
