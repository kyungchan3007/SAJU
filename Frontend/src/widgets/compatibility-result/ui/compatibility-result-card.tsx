import type { CompatibilityPreview } from "@/entities/compatibility";

type CompatibilityResultCardProps = {
  preview?: Partial<CompatibilityPreview>;
};

export function CompatibilityResultCard({
  preview,
}: CompatibilityResultCardProps) {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Widget
      </p>
      <h2 className="mt-2 text-xl font-semibold text-card-foreground">
        Compatibility preview block
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {preview?.summary ??
          "Free preview data lands here first. Detailed analysis remains behind the payment unlock."}
      </p>
    </section>
  );
}
