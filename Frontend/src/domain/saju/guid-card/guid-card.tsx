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
        Input Guide
      </p>

      {/* 가이드 목록 */}
      <ul className="mt-5 space-y-3">
        {guideItems.map((item) => (
          <li key={item.title} className={fieldClassName}>
            <div className="min-w-0">
              <h6 className="text-sm font-semibold text-[rgba(252,247,255,0.96)]">
                {item.title}
              </h6>
              <p className="mt-1.5 text-sm text-[rgba(228,205,255,0.72)]">
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
          입력을 완료한 사용자의 92%가 첫 분석 결과를 확인하고 서비스를 계속
          이용합니다.
        </p>
      </div>
    </section>
  );
}
