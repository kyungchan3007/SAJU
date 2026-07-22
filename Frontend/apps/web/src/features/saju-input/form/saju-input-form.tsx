import Image from "next/image";
import type { Route } from "next";
import { SajuInputFieldsContainer } from "@/features/saju-input/form/client/saju-input-fields.container";
import { SajuInputHintAccordion } from "@/features/saju-input/form/client/saju-input-hint-accordion";

type SajuInputFormProps = {
  nextPath?: Route | null;
};

export function SajuInputForm({ nextPath }: SajuInputFormProps) {
  return (
    <div className="mx-auto flex max-w-[860px] flex-col gap-8 pb-4 pt-0">
      {/* ── 히어로 ── */}
      <section className="relative h-[220px] overflow-hidden rounded-3xl shadow-lg sm:h-[368px]">
        <Image
          src="/image/hero/hero.webp"
          alt="사주 입력"
          fill
          priority
          sizes="(max-width: 860px) calc(100vw - 48px), 860px"
          className="object-cover object-top"
        />
        {/* 다크 오버레이 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, transparent 85%)",
          }}
        />
        {/* 텍스트 */}
        <div className="absolute inset-0 flex max-w-[560px] flex-col justify-center px-5 py-6 sm:px-12 sm:py-12">
          <span
            className="mb-3 w-fit rounded-full px-3 py-1 text-[10px] font-bold sm:mb-4 sm:px-3.5 sm:py-1.5 sm:text-xs"
            style={{ background: "rgba(255,255,255,0.90)", color: "#5956E9" }}
          >
            정통사주
          </span>
          <h1
            className="text-saju-hero mb-2 font-black leading-snug text-white sm:mb-3"
            style={{
              textShadow: "0 2px 12px rgba(0,0,0,0.45)",
              letterSpacing: "-0.5px",
            }}
          >
            당신의 사주를
            <br />
            <span style={{ color: "#C7C4F8" }}>입력해주세요</span>
          </h1>
          <p
            className="text-[12px] font-bold leading-relaxed text-white sm:text-[15px]"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
          >
            생년월일과 출생 시간만 있으면
            <br />
            나만의 사주 해석이 시작됩니다.
          </p>
        </div>
      </section>

      {/* ── 입력 카드 ── */}
      <section className="bg-white pb-4 pt-6 sm:rounded-[28px] sm:border sm:border-[#EDE9FF] sm:px-9 sm:py-9 sm:shadow-[0_2px_16px_rgba(89,86,233,0.08)]">
        {/* 카드 헤더 */}
        <div className="mb-6">
          <h2 className="mb-1.5 text-xl font-black tracking-tight text-gray-900">
            사주 정보 입력
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">
            정확한 사주 분석을 위해 아래 정보를 입력해주세요.
          </p>
        </div>

        {/* 안내 박스 — 아코디언 */}
        <SajuInputHintAccordion />

        <SajuInputFieldsContainer nextPath={nextPath} />
      </section>
    </div>
  );
}
