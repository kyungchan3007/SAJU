import type { Route } from "next";
import Link from "next/link";

import { Button } from "@/shared/ui";

export function LoginPanel() {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-card/80 p-8 shadow-glow backdrop-blur">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Authentication
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-card-foreground">
          Kakao OAuth login entry point
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          The real provider callback is wired through NextAuth route handlers.
          This page stays intentionally thin and only exposes the login entry
          surface.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={"/api/auth/signin" as Route}>Continue with Kakao</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Back to overview</Link>
        </Button>
      </div>
    </section>
  );
}
