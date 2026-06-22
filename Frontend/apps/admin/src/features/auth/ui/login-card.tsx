import { Suspense } from "react";
import { LoginCardContent } from "./login-card-content.client";

export function LoginCard() {
  return (
    <div className="w-full rounded-saju-card border border-surface-border bg-white p-8 shadow-saju-card">
      <Suspense>
        <LoginCardContent />
      </Suspense>
    </div>
  );
}
