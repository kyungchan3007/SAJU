import { CtaButton } from "@/widgets/welcom-section/ui/button/cta-button";
import { Title } from "@/widgets/welcom-section/ui/title/title";

export function WelcomSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
    >
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Title />
        <CtaButton />
      </div>
    </section>
  );
}
