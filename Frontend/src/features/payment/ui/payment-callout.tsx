import { Button } from "@/shared/ui";

export function PaymentCallout() {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Payment Flow
        </p>
        <h2 className="text-xl font-semibold text-card-foreground">
          {"PortOne -> Toss Payments -> BFF verify"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Preview data is free. Detailed compatibility remains locked until the
          verification endpoint confirms payment ownership.
        </p>
      </div>

      <div className="mt-5">
        <Button type="button">Payment placeholder</Button>
      </div>
    </section>
  );
}
