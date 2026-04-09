import styles from "@/widgets/welcom-section/ui/welcom-section.module.css";

export const Title = () => {
  return (
    <>
      <div className={`${styles.starAppear1} mb-6`}>
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
          style={{
            background: "rgba(233,30,140,0.15)",
            border: "1px solid rgba(233,30,140,0.35)",
            color: "rgba(255,170,220,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{
              background: "rgba(255,100,190,1)",
              boxShadow: "0 0 6px 2px rgba(233,30,140,0.7)",
            }}
          />
          사주 운명 별자리
        </span>
      </div>

      <h1
        className={`${styles.starAppear2} mb-5 max-w-2xl font-display text-5xl leading-tight tracking-tight sm:text-4xl lg:text-6xl`}
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
          당신의 이야기
        </span>
      </h1>

      <p
        className={`${styles.starAppear3} mb-5 max-w-lg text-base leading-relaxed sm:text-xs md:text-sm lg:text-sm`}
        style={{ color: "rgba(255,190,230,0.80)" }}
      >
        사주와 별의 흐름으로 오늘의 방향을 읽어보세요.
        <br />
        운명, 인연, 그리고 나만의 길을 더 선명하게 만납니다.
      </p>
    </>
  );
};
