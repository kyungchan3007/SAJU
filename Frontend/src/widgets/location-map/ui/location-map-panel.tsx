export function LocationMapPanel() {
  return (
    <section className="rounded-[2rem] border border-dashed border-border/80 bg-card/60 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Widget
      </p>
      <h2 className="mt-2 text-xl font-semibold text-card-foreground">
        Kakao Maps integration surface
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The real map script loader and overlays are deferred. This block marks
        the future location recommendation map container.
      </p>
      <div className="mt-5 h-72 rounded-[1.5rem] border border-border/60 bg-background/70" />
    </section>
  );
}
