"use client";

import { UserCircle } from "lucide-react";
import Link from "next/link";

import { useProfileEntryPopover } from "@/features/auth/hooks/useProfileEntryPopover";
import { KakaoIcon } from "@/shared/ui";

type ProfileEntryButtonProps = {
  isLoggedIn: boolean;
};

const iconButtonClass =
  "flex h-9 w-9 items-center justify-center rounded-full border-2 border-black/20 bg-white/60 text-black/60 transition hover:border-black/40 hover:text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black";

export function ProfileEntryButton({ isLoggedIn }: ProfileEntryButtonProps) {
  const { containerRef, open, close, toggle } = useProfileEntryPopover();

  if (isLoggedIn) {
    return (
      <Link
        href={{ pathname: "/mypage" }}
        aria-label="마이페이지"
        className={iconButtonClass}
      >
        <UserCircle size={20} />
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label="프로필"
        aria-expanded={open}
        className={iconButtonClass}
      >
        <UserCircle size={20} />
      </button>

      {open ? <LoginPrompt onClose={close} /> : null}
    </div>
  );
}

function LoginPrompt({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="로그인 안내"
      className="absolute right-0 top-11 z-50 w-64 border-2 border-black bg-white p-5 text-center shadow-[4px_4px_0_#000]"
    >
      <p className="text-sm font-bold leading-snug text-black">
        로그인하고 풀이 기록을 저장하세요
      </p>
      <p className="mt-2 text-xs leading-relaxed text-black/50">
        사주와 궁합 결과를 다시 확인할 수 있어요.
      </p>
      <a
        href="/login"
        onClick={onClose}
        className="mt-4 flex h-10 w-full items-center justify-center gap-2 border-2 border-black bg-[#FEE500] text-sm font-bold text-[rgba(0,0,0,0.85)] transition hover:brightness-95"
        style={{ boxShadow: "3px 3px 0 #000" }}
      >
        <KakaoIcon />
        간편 로그인하기
      </a>
    </div>
  );
}
