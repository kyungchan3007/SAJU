import { cookies } from "next/headers";
import { LoginPanelContent } from "@/features/auth/ui/login-panel-content.client";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";
import { TURNSTILE_VERIFIED_COOKIE_KEY } from "@/shared/config/turnstile";

type LoginPanelProps = {
  nextPath?: string | null;
};

export async function LoginPanel({ nextPath }: LoginPanelProps) {
  const kakaoLoginUrl = nextPath
    ? `${KAKAO_LOGIN_URL}?next=${encodeURIComponent(nextPath)}`
    : KAKAO_LOGIN_URL;

  const cookieStore = await cookies();
  const isPreVerified = cookieStore.get(TURNSTILE_VERIFIED_COOKIE_KEY)?.value === "1";

  return (
    <div className="card-saju-primary relative overflow-hidden p-7">
      <LoginPanelContent kakaoLoginUrl={kakaoLoginUrl} isPreVerified={isPreVerified} />
    </div>
  );
}
