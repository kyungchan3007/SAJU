"use client";

import { useSearchParams } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  forbidden: "관리자 계정이 아닙니다.",
  oauth_failed: "카카오 로그인에 실패했습니다. 다시 시도해주세요.",
  invalid_state: "인증 요청이 유효하지 않습니다. 다시 시도해주세요.",
  oauth_exception: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
};

type LoginCardContentProps = {
  kakaoLoginUrl: string;
};

export function LoginCardContent({ kakaoLoginUrl }: LoginCardContentProps) {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");
  const errorMessage = errorCode ? (ERROR_MESSAGES[errorCode] ?? "알 수 없는 오류가 발생했습니다.") : null;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <p className="text-2xl font-bold tracking-tight text-content-primary">사주 어드민</p>
        <p className="mt-1 text-sm text-content-muted">관리자 전용 페이지입니다</p>
      </div>

      {errorMessage ? (
        <div className="mb-4 w-full rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      ) : null}

      <a
        href={kakaoLoginUrl}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md font-semibold text-[rgba(0,0,0,0.85)] transition hover:brightness-95"
        style={{ backgroundColor: "#FEE500" }}
      >
        <KakaoIcon />
        카카오로 로그인
      </a>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 1.5C4.858 1.5 1.5 4.134 1.5 7.368c0 2.07 1.368 3.888 3.438 4.932L4.05 15.0c-.054.18.144.324.306.216l3.474-2.304c.384.054.774.084 1.17.084 4.142 0 7.5-2.634 7.5-5.868C16.5 4.134 13.142 1.5 9 1.5z"
        fill="currentColor"
      />
    </svg>
  );
}
