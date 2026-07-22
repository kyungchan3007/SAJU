export const Title = () => {
  return (
    <>
      {/* 서비스 카테고리 배지 */}
      <header className="mb-6">
        <p className="inline-flex items-center gap-2 rounded-sm border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-black">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-black"
            aria-hidden="true"
          />
          무료 사주 풀이 · 궁합 · 오늘의 운세
        </p>
      </header>

      {/* 메인 헤딩 — 검은 박스 강조 스타일 */}
      <h1
        id="hero-heading"
        className="mb-5 w-full max-w-2xl font-display text-3xl leading-tight tracking-tight text-black sm:text-4xl lg:text-6xl"
      >
        별이 말하는
        <br />
        <span className="mt-1 inline-block rounded-[4px] bg-[#5956E9] px-[0.3em] pb-[0.05em] text-white">
          당신의 사주 이야기
        </span>
      </h1>

      {/* 설명 문단 */}
      <p className="mb-5 max-w-lg text-sm leading-relaxed text-black/60 sm:text-sm lg:text-base">
        사주팔자와 별의 흐름으로 오늘의 방향을 읽어보세요.
        <br />
        무료 사주 풀이와 궁합 확인으로 운명, 인연, 그리고 나만의 길을 더 선명하게 만날 수 있습니다.
      </p>
    </>
  );
};
