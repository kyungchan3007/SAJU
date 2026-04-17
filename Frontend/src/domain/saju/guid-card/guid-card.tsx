const guideItems = [
  {
    title: "출생 시각을 모른다면",
    description:
      "시간을 몰라도 괜찮아요. 먼저 진행하고 나중에 언제든 수정할 수 있습니다.",
    badge: "선택",
    badgeClass: "bg-violet-500/10 text-violet-300 border border-violet-400/30",
  },
  {
    title: "양력 / 음력 선택",
    description:
      "출생신고서나 가족관계증명서 기준으로 선택하면 정확도가 높아집니다.",
    badge: "길잡이",
    badgeClass: "bg-amber-400/10 text-amber-300 border border-amber-400/30",
  },
  {
    title: "분석을 마치면",
    description:
      "오늘의 기운, 추천 장소, 궁합까지 모든 기능이 한번에 열립니다.",
    badge: "이후",
    badgeClass: "bg-cyan-400/10 text-cyan-300 border border-cyan-400/30",
  },
] as const;

const fieldClassName =
  "w-full rounded-xl border border-[rgba(170,132,238,0.32)] bg-[rgba(13,9,26,0.62)] px-4 py-2.5 text-sm text-[rgba(248,241,255,0.95)] outline-none transition placeholder:text-[rgba(211,186,247,0.55)] focus:border-[rgba(239,200,255,0.9)] focus:ring-2 focus:ring-[rgba(182,120,255,0.28)]";

export function GuidCard() {
  return (
    <section
      className="card-saju-primary rounded-[2rem] border p-7 backdrop-blur-xl"
      style={{
        borderColor: "rgba(170,132,238,0.34)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* 헤더 */}
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(223,196,255,0.86)]">
        알아두세요
      </p>

      {/* 가이드 목록 */}
      <ul className="mt-5 space-y-3">
        {guideItems.map((item) => (
          <li key={item.title} className={`${fieldClassName}`}>
            <div className="min-w-0">
              <h6 className="text-sm font-semibold text-[rgba(252,247,255,0.96)]">
                {item.title}
              </h6>
              <p className="mt-1.5 text-sm text-[rgba(228,205,255,0.72)]">
                {item.description}
              </p>
            </div>
            <span
              className={`mt-2 inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${item.badgeClass}`}
            >
              {item.badge}
            </span>
          </li>
        ))}
      </ul>

      {/* 완료율 미니 카드 */}
      <div className="mt-5 rounded-xl border border-border/50 bg-aura px-5 py-4">
        <strong className="text-3xl font-bold text-primary">92%</strong>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          사주를 입력한 분들 중 92%가 첫 결과를 확인한 뒤에도 매일 기운을
          살펴봅니다.
        </p>
      </div>
    </section>
  );
}
