import styles from "@/widgets/welcom-section/ui/welcom-section.module.css";
import { BRIGHT_STARS, STARS } from "@/widgets/welcom-section/model/ui-model";

export const StarBackground = () => {
  return (
    <>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {STARS.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-white ${styles.twinkle}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              ["--star-opacity" as string]: star.opacity,
              ["--twinkle-duration" as string]: `${star.duration}s`,
              ["--twinkle-delay" as string]: `${star.delay}s`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {BRIGHT_STARS.map((star) => (
          <div
            key={star.id}
            className={`absolute ${styles.twinkleBright}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: "translate(-50%, -50%)",
              ["--twinkle-delay" as string]: `${star.delay}s`,
            }}
          >
            <div
              className="rounded-full bg-white"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255,255,220,0.6)`,
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/40"
              style={{ width: `${star.size * 5}px`, height: "1px" }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/40"
              style={{ width: "1px", height: `${star.size * 5}px` }}
            />
          </div>
        ))}
      </div>

      <div
        className={`pointer-events-none absolute inset-0 ${styles.shimmer}`}
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 30% 8% at 45% 55%, rgba(233,30,140,0.10) 0%, transparent 100%)",
        }}
      />
    </>
  );
};
