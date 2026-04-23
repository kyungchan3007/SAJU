import {
  locationItems,
  ohengItems,
  statItems,
  todayItems,
} from "@/domain/saju/guid-card/preview-card/model/model";

const cardBase = "sketch-border p-5";

export function SajuPreviewCard() {
  return (
    <div className="relative overflow-hidden rounded-sm">
      {/* 잠금 오버레이 */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-end bg-white/60 backdrop-blur-[3px]">
        <div className="absolute bottom-5 left-5 sketch-border rounded-sm px-3.5 py-2.5 text-xs font-bold text-black">
          사주를 입력하면 열립니다
        </div>
      </div>

      {/* 실제 콘텐츠 */}
      <div className="card-saju-primary h-full space-y-[18px] overflow-y-auto p-6">
        {/* 히어로 그리드 */}
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-[18px]">
          {/* 메인 패널 */}
          <div className="sketch-border relative overflow-hidden p-6">
            <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-black/50">
              오늘의 기운
            </p>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-black">
              오늘은 흐름을
              <br />
              밀어붙이기보다
              <br />
              정리하는 날
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-black/60">
              무리한 확장보다 선택과 정리에 잘 맞는 날입니다. 조용하고 밀도 있는
              공간을 우선 추천합니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="btn-saju btn-saju-primary">추천 장소 보기</button>
              <button className="btn-saju btn-saju-secondary">궁합 보러가기</button>
            </div>
          </div>

          {/* 달 패널 — 스케치 도형으로 대체 */}
          <div className="sketch-border grid min-h-[220px] place-items-center">
            <div
              className="h-[130px] w-[130px] rounded-full border-2 border-black"
              style={{ boxShadow: "4px 4px 0 #000" }}
            />
          </div>
        </div>

        {/* 스탯 4개 */}
        <div className="grid grid-cols-4 gap-3.5">
          {statItems.map((s) => (
            <div key={s.label} className={cardBase}>
              <strong className="block text-xl font-bold tracking-tight text-black">
                {s.value}
              </strong>
              <span className="mt-1 block text-xs text-black/50">{s.label}</span>
            </div>
          ))}
        </div>

        {/* 오행 밸런스 + 오늘의 한마디 */}
        <div className="grid grid-cols-2 gap-[18px]">
          <div className={cardBase}>
            <h4 className="text-base font-bold text-black">오행 밸런스</h4>
            <div className="mt-4 grid gap-2.5">
              {ohengItems.map((o) => (
                <div key={o.name}>
                  <div className="mb-1.5 flex justify-between text-xs text-black/60">
                    <span>{o.name}</span>
                    <span>{o.pct}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-none border border-black bg-transparent">
                    <div
                      className="h-full bg-black"
                      style={{ width: `${o.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cardBase}>
            <h4 className="text-base font-bold text-black">오늘의 한마디</h4>
            <p className="mt-3 text-sm leading-relaxed text-black/60">
              급하게 결론을 내리기보다 환경을 고르는 쪽이 더 중요한 날입니다.
              호흡이 느린 공간이 잘 맞습니다.
            </p>
            <div className="mt-4 grid gap-2.5">
              {todayItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 border-b border-black/15 px-1 py-2"
                >
                  <span className="text-xs font-bold text-black">{item.label}</span>
                  <small className="text-xs text-black/50">{item.value}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 추천 장소 3개 */}
        <div className="grid grid-cols-3 gap-4">
          {locationItems.map((loc) => (
            <div key={loc.name} className="sketch-border grid gap-3 p-[18px]">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-bold text-black">{loc.name}</h4>
                <span className="text-2xl font-black tracking-tight text-black">
                  {loc.score}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-black/60">{loc.desc}</p>
              <div className="flex flex-wrap gap-2">
                {loc.pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-none border border-black px-2.5 py-1 text-xs font-bold text-black"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
