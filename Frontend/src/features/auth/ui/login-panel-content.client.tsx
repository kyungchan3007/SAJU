"use client";

import { KakaoIcon } from "@/shared/ui";

type LoginPanelContentProps = {
  kakaoLoginUrl: string;
};

export function LoginPanelContent({ kakaoLoginUrl }: LoginPanelContentProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* 서비스 로고 */}
      <div className="mb-6">
        <p className="font-display text-3xl font-bold tracking-tight text-black">
          사주이야기
        </p>
        <p className="mt-1 text-xs tracking-widest text-black/30">SAJU STORY</p>
      </div>

      {/* SEO용 헤딩 + 설명 */}
      <h1 className="text-base font-bold leading-snug text-black">
        간편하게 로그인하고
        <br />
        오늘의 사주를 확인해보세요
      </h1>
      <p className="mt-2 text-xs leading-relaxed text-black/45">
        생년월일 하나로 오늘의 운세·궁합·사주풀이를
        <br />
        무료로 만나볼 수 있어요.
      </p>

      {/* 카카오 로그인 버튼 — 카카오 공식 가이드라인 색상 */}
      <a
        href={kakaoLoginUrl}
        className="mt-7 flex h-[48px] w-full items-center justify-center gap-2 border-2 border-black font-bold text-[rgba(0,0,0,0.85)] transition hover:brightness-95"
        style={{
          backgroundColor: "#FEE500",
          boxShadow: "3px 3px 0 #000",
        }}
        aria-label="카카오 계정으로 사주이야기 로그인"
      >
        <KakaoIcon size={20} />
        카카오로 시작하기
      </a>
    </div>
  );
}
