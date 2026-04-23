import { LoginPanelContent } from "@/features/auth/ui/login-panel-content.client";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";

export function LoginPanel() {
  return (
    <div className="card-saju-primary relative overflow-hidden p-7">
      <LoginPanelContent kakaoLoginUrl={KAKAO_LOGIN_URL} />
    </div>
  );
}
