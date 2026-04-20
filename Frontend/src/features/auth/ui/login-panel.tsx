import { LoginPanelContent } from "@/features/auth/ui/login-panel-content.client";

const KAKAO_LOGIN_URL = "/api/auth/signin?provider=kakao";

export function LoginPanel() {
  return (
    <div
      className="card-saju-primary relative overflow-hidden rounded-[2rem] border p-7"
      style={{
        borderColor: "rgba(170,132,238,0.34)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full blur-sm"
        style={{
          background:
            "radial-gradient(circle, rgba(243,201,105,.22), transparent 58%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-8 h-44 w-44 rounded-full blur-sm"
        style={{
          background:
            "radial-gradient(circle, rgba(161,142,255,.18), transparent 58%)",
        }}
      />
      <LoginPanelContent kakaoLoginUrl={KAKAO_LOGIN_URL} />
    </div>
  );
}
