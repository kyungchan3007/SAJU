type RecoCardProps = {
  bg: string;
  border: string;
  icon: string;
  label: string;
  value: string;
  valueColor: string;
  valueFontSize?: string;
  desc: string;
};

function RecoCard({ bg, border, icon, label, value, valueColor, valueFontSize = "text-2xl", desc }: RecoCardProps) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-[20px] border-[1.5px] p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
      style={{ backgroundColor: bg, borderColor: border }}
    >
      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[22px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        {icon}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.04em] text-gray-400">{label}</div>
      <div className={`${valueFontSize} font-black`} style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-[12px] leading-relaxed text-gray-500">{desc}</div>
    </div>
  );
}

export function SajuRecommendation() {
  return (
    <section>
      <div className="mb-1 flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5956E9] text-[13px] font-extrabold text-white">
          02
        </div>
        <h2 className="text-[20px] font-black text-gray-900">내 사주 기반 추천</h2>
      </div>
      <p className="mb-5 ml-10 text-[13px] text-gray-400">당신에게 잘 맞는 만남 분위기를 추천드려요.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <RecoCard
          bg="#F0F9FF"
          border="#BFDBFE"
          icon="💧"
          label="나의 주요 기운"
          value="수 · 금"
          valueColor="#1D4ED8"
          desc="차분하고 섬세한 대화를 선호하며 깊이 있는 관계를 중요하게 생각해요."
        />
        <RecoCard
          bg="#F0FDF4"
          border="#BBF7D0"
          icon="🌿"
          label="잘 맞는 분위기"
          value="편안한 대화형"
          valueColor="#15803D"
          valueFontSize="text-[18px]"
          desc="서로의 생각을 공유하며 천천히 친해지는 분위기가 잘 맞아요."
        />
        <RecoCard
          bg="#FFF1F2"
          border="#FECDD3"
          icon="❤️"
          label="추천 만남 스타일"
          value="공감 & 이해 중심"
          valueColor="#BE123C"
          valueFontSize="text-[18px]"
          desc="공감과 이해를 바탕으로 한 만남에서 더 편안함을 느낄 수 있어요."
        />
      </div>
      <p className="mt-3 text-center text-[10px] text-gray-400">
        ※ 사주 정보는 참고용이며, 개인 경험에 따라 다를 수 있습니다.
      </p>
    </section>
  );
}
