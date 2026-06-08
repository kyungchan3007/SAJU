import type { Route } from "next";
import Link from "next/link";

// [DS] ??븷: ?곗뒪?ы넲 ?섎떒 釉뚮옖???뺤콉 留곹겕 ?곸뿭???쒓났?섎뒗 ?꾩뿭 ?명꽣.
// [DS] ?꾩옱 ?ъ슜泥? app layout?먯꽌 ?꾩뿭 ?섏씠吏 ?섎떒???뚮뜑留?
const privacyPolicyHref = "/privacy-policy" as Route;

export function Footer() {
  return (
    <footer className="hidden bg-white px-8 py-10 md:block">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5">
        {/* 釉뚮옖??*/}
        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" fill="#5956E9" />
            </svg>
            <span className="text-sm font-black text-gray-900">SAJU:ME</span>
          </div>
          <p className="text-xs text-gray-400">
            짤 2026 SAJU:ME. All rights reserved.
          </p>
        </div>

        {/* 留곹겕 */}
        <div className="flex gap-6">
          <Link
            href={privacyPolicyHref}
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


