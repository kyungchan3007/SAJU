import { CtaButton } from "@/widgets/welcom-section/ui/button/cta-button";
import { Background } from "@/widgets/welcom-section/ui/background/background";
import { StarBackground } from "@/widgets/welcom-section/ui/star/start";
import { Title } from "@/widgets/welcom-section/ui/title/title";

export function WelcomSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "#07050F" }}
    >
      <Background />
      <StarBackground />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Title />
        <CtaButton />
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to top, rgba(7,5,15,0.85), transparent)",
        }}
      />
    </section>
  );
}
