import type { Route } from "next";
import Link from "next/link";

const privacyPolicyHref = "/privacy-policy" as Route;
const termsOfServiceHref = "/terms-of-service" as Route;
const contactHref = "/contact" as Route;

export function Footer() {
  return (
    <footer className="hidden bg-white px-8 py-10 md:block">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" fill="#5956E9" />
            </svg>
            <span className="text-sm font-black text-gray-900">SAJU:ME</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 SAJU:ME. All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <Link
            href={privacyPolicyHref}
            className="text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            개인정보처리방침
          </Link>
          <Link
            href={termsOfServiceHref}
            className="text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            서비스 이용약관
          </Link>
          <Link
            href={contactHref}
            className="text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            문의하기
          </Link>
        </div>
      </div>
    </footer>
  );
}
