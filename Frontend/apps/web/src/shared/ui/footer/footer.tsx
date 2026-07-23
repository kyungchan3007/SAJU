import { cn } from "@/shared/lib/utils";
import type { Route } from "next";
import Link from "next/link";

const privacyPolicyHref = "/privacy-policy" as Route;
const termsOfServiceHref = "/terms-of-service" as Route;
const contactHref = "/contact" as Route;
const blogHref = "/blog" as Route;

type FooterProps = {
  showOnMobile?: boolean;
};

export function Footer({ showOnMobile = false }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-white px-8 py-10",
        showOnMobile ? "block" : "hidden md:block",
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" fill="#5956E9" />
            </svg>
            <span className="text-sm font-black text-gray-900">SAJU:ME</span>
          </div>
          <p className="text-xs text-gray-500">
            © 2026 SAJU:ME. All rights reserved.
          </p>
        </div>

        <div className="flex gap-6">
          <Link
            href={privacyPolicyHref}
            className="rounded-sm text-xs text-gray-500 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary focus-visible:ring-offset-2"
          >
            개인정보처리방침
          </Link>
          <Link
            href={termsOfServiceHref}
            className="rounded-sm text-xs text-gray-500 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary focus-visible:ring-offset-2"
          >
            서비스 이용약관
          </Link>
          <Link
            href={contactHref}
            className="rounded-sm text-xs text-gray-500 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary focus-visible:ring-offset-2"
          >
            문의하기
          </Link>
          <Link
            href={blogHref}
            className="rounded-sm text-xs text-gray-500 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary focus-visible:ring-offset-2"
          >
            사주 이야기
          </Link>
        </div>
      </div>
    </footer>
  );
}
