const guideItems = [
  {
    title: "출생시간을 모르는 경우",
    description: "시간 미상 모드로 먼저 진행한 뒤 나중에 수정할 수 있습니다.",
    badge: "Optional",
    badgeClass: "bg-muted text-muted-foreground",
  },
  {
    title: "양력 / 음력 선택",
    description: "실제 기록 기준으로 선택하면 분석 정확도를 높일 수 있습니다.",
    badge: "Guide",
    badgeClass: "bg-amber-100 text-amber-700",
  },
  {
    title: "분석 시작 후",
    description: "오늘의 기운과 추천 장소, 궁합 기능이 모두 열립니다.",
    badge: "Next",
    badgeClass: "bg-teal-100 text-teal-700",
  },
] as const;

export function SajuResultCard() {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-card/80 p-7 shadow-glow backdrop-blur">
      {/* 헤더 */}
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        Input Guide
      </p>

      {/* 가이드 목록 */}
      <ul className="mt-5 space-y-3">
        {guideItems.map((item) => (
          <li
            key={item.title}
            className="flex items-start justify-between gap-4 rounded-xl border border-border/50 bg-background/60 px-4 py-3.5"
          >
            <div className="min-w-0">
              <h6 className="text-sm font-semibold text-card-foreground">{item.title}</h6>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${item.badgeClass}`}
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
          입력을 완료한 사용자의 92%가 첫 분석 결과를 확인하고 서비스를 계속 이용합니다.
        </p>
      </div>
    </section>
  );
}
