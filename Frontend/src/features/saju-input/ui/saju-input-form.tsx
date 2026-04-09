import { Button } from "@/shared/ui";

export function SajuInputForm() {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Input
        </p>
        <h2 className="text-xl font-semibold text-card-foreground">
          Birth date, time, and name form placeholder
        </h2>
        <p className="text-sm text-muted-foreground">
          The form action will later post to the BFF route at `/api/saju`.
        </p>
      </div>

      <form className="mt-6 grid gap-3 sm:grid-cols-2">
        <input
          className="rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring"
          placeholder="Name"
          readOnly
        />
        <input
          className="rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring"
          placeholder="YYYY-MM-DD"
          readOnly
        />
        <input
          className="rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring"
          placeholder="HH:mm"
          readOnly
        />
        <input
          className="rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring"
          placeholder="Calendar type"
          readOnly
        />
        <div className="sm:col-span-2">
          <Button type="button">Submit placeholder</Button>
        </div>
      </form>
    </section>
  );
}
