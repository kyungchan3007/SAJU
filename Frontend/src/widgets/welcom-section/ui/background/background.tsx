import styles from "@/widgets/welcom-section/ui/welcom-section.module.css";

export const Background = () => {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 80% 50% at 15% 20%, rgba(233,30,140,0.20) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 40% at 80% 15%, rgba(123,47,255,0.18) 0%, transparent 55%)",
            "radial-gradient(ellipse 70% 55% at 50% 70%, rgba(180,20,120,0.16) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 35% at 85% 75%, rgba(100,30,220,0.14) 0%, transparent 50%)",
            "radial-gradient(ellipse 55% 40% at 20% 80%, rgba(210,10,100,0.15) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      <div
        className={`pointer-events-none absolute inset-0 ${styles.pulseGlow}`}
        aria-hidden="true"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 40% 20% at 30% 60%, rgba(233,30,140,0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 35% 18% at 70% 40%, rgba(123,47,255,0.09) 0%, transparent 70%)",
            "radial-gradient(ellipse 45% 22% at 55% 80%, rgba(200,20,130,0.08) 0%, transparent 70%)",
          ].join(", "),
        }}
      />
    </>
  );
};
