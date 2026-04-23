import Link from "next/link";

export const CtaButton = () => {
  return (
    <>
      {/* 주요 서비스 이동 링크 */}
      <nav
        aria-label="주요 서비스 바로가기"
        className="flex flex-col items-center gap-3 sm:flex-row"
      >
        <Link
          href="/saju"
          className="btn-saju btn-saju-primary inline-flex min-h-[48px] items-center justify-center px-8 text-base"
        >
          무료 사주 보기
        </Link>

        <Link
          href="/compatibility"
          className="btn-saju btn-saju-secondary inline-flex min-h-[48px] items-center justify-center px-8 text-base"
        >
          무료 궁합 확인
        </Link>
      </nav>

      <p className="mt-5 text-xs tracking-widest text-black/40">
        AI 사주 해석 · 궁합 풀이 · 오늘의 흐름
      </p>
    </>
  );
};
