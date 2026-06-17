import { Suspense } from "react";
import { LoginCardContent } from "./login-card-content.client";

const KAKAO_LOGIN_URL = "/api/auth/kakao";

export function LoginCard() {
  return (
    <div className="w-full rounded-saju-card border border-surface-border bg-white p-8 shadow-saju-card">
      <Suspense>
        <LoginCardContent kakaoLoginUrl={KAKAO_LOGIN_URL} />
      </Suspense>
    </div>
  );
}
