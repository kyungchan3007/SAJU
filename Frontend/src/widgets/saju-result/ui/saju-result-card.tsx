import type { SajuProfile } from "@/entities/saju";

type SajuResultCardProps = {
  profile?: Partial<SajuProfile>;
};

export function SajuResultCard({ profile }: SajuResultCardProps) {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Widget
      </p>
      <h2 className="mt-2 text-xl font-semibold text-card-foreground">
        Saju result composition block
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {profile?.summary ??
          "This widget will render normalized saju result data from the BFF."}
      </p>
    </section>
  );
}
