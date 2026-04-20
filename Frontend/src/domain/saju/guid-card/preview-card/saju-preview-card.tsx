import {
  locationItems,
  ohengItems,
  statItems,
  todayItems,
} from "@/domain/saju/guid-card/preview-card/model/model";

const cardBase =
  "rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5";

export function SajuPreviewCard() {
  return (
    <div className="relative overflow-hidden rounded-[2rem]">
      {/* 잠금 오버레이 */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,11,28,0.12) 0%, rgba(8,11,28,0.72) 100%)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div
          className="absolute bottom-5 left-5 rounded-full border px-3.5 py-2.5 text-xs font-bold"
          style={{
            background: "rgba(178,121,255,0.12)",
            borderColor: "rgba(178,121,255,0.3)",
            color: "rgb(196,181,253)",
          }}
        >
          사주를 입력하면 열립니다
        </div>
      </div>

      {/* 실제 콘텐츠 (오버레이 아래) */}
      <div
        className="card-saju-primary h-full space-y-[18px] overflow-y-auto rounded-[2rem] border p-6"
        style={{
          borderColor: "rgba(170,132,238,0.34)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* 히어로 그리드 */}
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-[18px]">
          {/* 메인 패널 */}
          <div
            className="relative overflow-hidden rounded-[30px] border border-[rgba(255,255,255,0.08)] p-6"
            style={{
              background:
                "radial-gradient(circle at 92% 16%, rgba(233,30,140,0.14), transparent 16%), radial-gradient(circle at 12% 10%, rgba(178,121,255,0.14), transparent 22%), linear-gradient(180deg, rgba(28,19,51,0.92), rgba(12,9,24,0.95))",
            }}
          >
            {/* 오브 장식 */}
            <div
              className="pointer-events-none absolute -right-8 -top-10 h-[180px] w-[180px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(233,30,140,0.22), transparent 58%)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-12 -left-8 h-[180px] w-[180px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(178,121,255,0.18), transparent 58%)",
              }}
            />

            <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[rgba(167,181,227,0.7)]">
              오늘의 기운
            </p>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-[rgba(252,247,255,0.96)]">
              오늘은 흐름을
              <br />
              밀어붙이기보다
              <br />
              정리하는 날
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[rgba(228,205,255,0.72)]">
              무리한 확장보다 선택과 정리에 잘 맞는 날입니다. 조용하고 밀도 있는
              공간을 우선 추천합니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="btn-saju btn-saju-primary">
                추천 장소 보기
              </button>
              <button className="btn-saju btn-saju-secondary">
                궁합 보러가기
              </button>
            </div>
          </div>

          {/* 달 패널 */}
          <div
            className="grid min-h-[220px] place-items-center rounded-[30px] border border-[rgba(255,255,255,0.08)]"
            style={{
              background:
                "radial-gradient(circle at 60% 30%, rgba(178,121,255,0.1), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
            }}
          >
            <div
              className="relative grid place-items-center"
              style={{
                width: "min(92%, 200px)",
                aspectRatio: "1",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), rgba(255,255,255,0.02) 55%, transparent 65%)",
              }}
            >
              <div className="absolute inset-6 rounded-full border border-[rgba(178,121,255,0.2)]" />
              <div
                className="h-[130px] w-[130px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.11), rgba(178,121,255,0.06) 38%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(178,121,255,0.13), rgba(88,65,200,0.15) 42%, transparent 60%), linear-gradient(130deg, rgba(60,40,120,0.82), rgba(20,14,54,0.9) 55%, rgba(8,6,26,0.96))",
                  boxShadow:
                    "0 0 60px rgba(178,121,255,0.25), inset -18px -10px 40px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </div>
        </div>

        {/* 스탯 4개 */}
        <div className="grid grid-cols-4 gap-3.5">
          {statItems.map((s) => (
            <div key={s.label} className={cardBase}>
              <strong className="block text-xl font-bold tracking-tight text-[rgba(252,247,255,0.96)]">
                {s.value}
              </strong>
              <span className="mt-1 block text-xs text-[rgba(167,181,227,0.8)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* 오행 밸런스 + 오늘의 한마디 */}
        <div className="grid grid-cols-2 gap-[18px]">
          {/* 오행 밸런스 */}
          <div className={cardBase}>
            <h4 className="text-base font-bold text-[rgba(252,247,255,0.96)]">
              오행 밸런스
            </h4>
            <div className="mt-4 grid gap-2.5">
              {ohengItems.map((o) => (
                <div key={o.name}>
                  <div className="mb-1.5 flex justify-between text-xs text-[rgba(228,205,255,0.8)]">
                    <span>{o.name}</span>
                    <span>{o.pct}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${o.pct}%`,
                        background:
                          "linear-gradient(90deg, rgb(var(--saju-pink)), rgba(219,179,255,0.9))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오늘의 한마디 */}
          <div className={cardBase}>
            <h4 className="text-base font-bold text-[rgba(252,247,255,0.96)]">
              오늘의 한마디
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-[rgba(228,205,255,0.72)]">
              급하게 결론을 내리기보다 환경을 고르는 쪽이 더 중요한 날입니다.
              호흡이 느린 공간이 잘 맞습니다.
            </p>
            <div className="mt-4 grid gap-2.5">
              {todayItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-[18px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3"
                >
                  <span className="text-xs font-bold text-[rgba(228,205,255,0.9)]">
                    {item.label}
                  </span>
                  <small className="text-xs text-[rgba(167,181,227,0.7)]">
                    {item.value}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 추천 장소 3개 */}
        <div className="grid grid-cols-3 gap-4">
          {locationItems.map((loc) => (
            <div
              key={loc.name}
              className="grid gap-3 rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-[18px]"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-bold text-[rgba(252,247,255,0.96)]">
                  {loc.name}
                </h4>
                <span
                  className="text-2xl font-black tracking-tight"
                  style={{ color: "rgba(219,179,255,0.9)" }}
                >
                  {loc.score}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[rgba(228,205,255,0.72)]">
                {loc.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {loc.pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1.5 text-xs font-bold text-[rgba(231,236,255,0.9)]"
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
