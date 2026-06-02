import { LoginPanelContent } from "@/features/auth/ui/login-panel-content.client";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";

type LoginPanelProps = {
  nextPath?: string | null;
};

export function LoginPanel({ nextPath }: LoginPanelProps) {
  const kakaoLoginUrl = nextPath
    ? `${KAKAO_LOGIN_URL}?next=${encodeURIComponent(nextPath)}`
    : KAKAO_LOGIN_URL;

  return (
    <div className="card-saju-primary relative overflow-hidden p-7">
      <LoginPanelContent kakaoLoginUrl={kakaoLoginUrl} />
    </div>
  );
}
