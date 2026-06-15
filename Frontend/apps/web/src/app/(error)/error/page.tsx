import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { resolveErrorPageCopy } from "@/shared/lib/error-page";

export const metadata: Metadata = {
  title: "오류 발생",
  robots: { index: false, follow: false },
};

type ErrorPageProps = {
  searchParams: Promise<{ code?: string }>;
};

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const { title, description } = resolveErrorPageCopy({
    code: params.code,
  });

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#FAFAFA] px-4">
      <div className="mb-8 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" fill="#5956E9" />
        </svg>
        <span className="text-sm font-black tracking-tight text-gray-900">
          SAJU:ME
        </span>
      </div>

      <div className="w-full max-w-[400px] rounded-2xl border border-slate-100 bg-white px-8 py-10 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertCircle size={28} className="text-red-500" />
          </div>
        </div>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
        <Link
          href="/home"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#5956E9] px-6 text-sm font-bold text-white transition-colors hover:bg-[#4845D4]"
        >
          홈으로 이동하기
        </Link>
      </div>
    </div>
  );
}
