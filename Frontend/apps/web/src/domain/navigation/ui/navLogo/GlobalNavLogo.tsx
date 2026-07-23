import Link from "next/link";

type GlobalNavLogoProps = {
  isLoggedIn: boolean;
};

export function GlobalNavLogo({ isLoggedIn }: GlobalNavLogoProps) {
  return (
    <Link
      href={{ pathname: isLoggedIn ? "/home" : "/" }}
      className="flex items-center gap-2 no-underline"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" fill="#5956E9" />
      </svg>
      <div>
        <div className="text-sm font-black leading-tight tracking-tight text-gray-900">
          SAJU:ME
        </div>
        <div className="text-[10px] leading-none text-gray-500 sm:text-[11px]">
          정통사주로 해석하는 나의 명식
        </div>
      </div>
    </Link>
  );
}
