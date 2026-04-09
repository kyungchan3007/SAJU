import { Button } from "@/shared/ui";

export function LocationSearchPanel() {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Location Search
        </p>
        <h2 className="text-xl font-semibold text-card-foreground">
          Saju-aware place recommendation request
        </h2>
        <p className="text-sm text-muted-foreground">
          Future requests will combine saju profile context and user location
          signals before hitting the location BFF route.
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <Button type="button">Use current location</Button>
        <Button type="button" variant="outline">
          Search by region
        </Button>
      </div>
    </section>
  );
}
