const SERVICES = [
  {
    emoji: "🔮",
    title: "사주 풀이",
    desc: "생년월일로 오늘의 기운과 운명의 흐름을 읽어드려요.",
    tag: "무료",
  },
  {
    emoji: "💞",
    title: "궁합",
    desc: "두 사람의 사주로 인연의 깊이와 궁합 점수를 확인하세요.",
    tag: "무료",
  },
  {
    emoji: "📅",
    title: "오늘의 운세",
    desc: "매일 업데이트되는 오늘의 흐름을 간편하게 확인하세요.",
    tag: "매일",
  },
];

export function ServiceCards() {
  return (
    <div className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-3">
      {SERVICES.map((s) => (
        <div
          key={s.title}
          className="border-2 border-black bg-white p-4 text-left"
          style={{ boxShadow: "3px 3px 0 #000" }}
        >
          <span className="text-2xl">{s.emoji}</span>
          <div className="mt-2 flex items-center gap-1.5">
            <p className="text-sm font-bold text-black">{s.title}</p>
            <span className="border border-black px-1 py-0.5 text-[9px] font-bold text-black">
              {s.tag}
            </span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-sketch-muted">
            {s.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
