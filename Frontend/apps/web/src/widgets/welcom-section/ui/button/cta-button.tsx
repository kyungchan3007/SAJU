import Link from "next/link";

import { Button } from "@/shared/ui";

export const CtaButton = () => {
  return (
    <>
      {/* 주요 서비스 이동 링크 */}
      <nav
        aria-label="주요 서비스 바로가기"
        className="flex flex-col items-center gap-3 sm:flex-row"
      >
        <Button asChild size="lg" className="min-h-[48px] px-8 text-base">
          <Link href="/saju">무료 사주 보기</Link>
        </Button>

        <Button
          asChild
          size="lg"
          variant="secondary"
          className="min-h-[48px] px-8 text-base"
        >
          <Link href="/compatibility">무료 궁합 확인</Link>
        </Button>
      </nav>

      <p className="mt-5 text-xs tracking-widest text-black/40">
        AI 사주 해석 · 궁합 풀이 · 오늘의 흐름
      </p>
    </>
  );
};
