import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 px-8 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
        {/* 브랜드 */}
        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" fill="#5956E9" />
            </svg>
            <span className="text-sm font-black text-gray-900">SAJU:ME</span>
          </div>
          <p className="text-xs text-gray-400">
            © 2026 SAJU:ME. All rights reserved.
          </p>
        </div>

        {/* 링크 */}
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
