import styles from "@/widgets/welcom-section/ui/welcom-section.module.css";

export const Title = () => {
  return (
    <>
      {/* 서비스 카테고리 문구로 핵심 키워드를 자연스럽게 노출 */}
      <header className={`${styles.starAppear1} mb-6`}>
        <p
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wider sm:px-4 sm:tracking-widest"
          style={{
            background: "rgba(233,30,140,0.15)",
            border: "1px solid rgba(233,30,140,0.35)",
            color: "rgba(255,170,220,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            aria-hidden="true"
            style={{
              background: "rgba(255,100,190,1)",
              boxShadow: "0 0 6px 2px rgba(233,30,140,0.7)",
            }}
          />
          무료 사주 풀이 · 궁합 · 오늘의 운세
        </p>
      </header>

      {/* h1은 홈 화면의 대표 검색 문맥을 직접 담도록 유지 */}
      <h1
        id="hero-heading"
        className={`${styles.starAppear2} mb-5 w-full max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-6xl`}
        style={{ color: "rgba(255,240,248,0.97)" }}
      >
        별이 말하는
        <br />
        <span
          style={{
            background:
              "linear-gradient(135deg, #E91E8C 0%, #A855F7 50%, #7B2FFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          당신의 사주 이야기
        </span>
      </h1>

      {/* 설명 문단에서 사주/궁합 키워드와 서비스 효용을 함께 전달 */}
      <p
        className={`${styles.starAppear3} mb-5 max-w-lg text-sm leading-relaxed sm:text-sm lg:text-base`}
        style={{ color: "rgba(255,190,230,0.80)" }}
      >
        사주팔자와 별의 흐름으로 오늘의 방향을 읽어보세요.
        <br />
        무료 사주 풀이와 궁합 확인으로 운명, 인연, 그리고 나만의 길을 더 선명하게 만날 수 있습니다.
      </p>
    </>
  );
};
