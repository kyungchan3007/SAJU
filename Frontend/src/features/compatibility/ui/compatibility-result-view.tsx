"use client";

import type { PartnerResponse } from "@/generated/api";
import type { CompatibilityResultDisplay } from "@/features/compatibility/model/compatibility";
import { getPartnerAvatar } from "@/features/mypage/model/partner";

type Props = {
  partner: PartnerResponse;
  result: CompatibilityResultDisplay;
  onReset: () => void;
};

const CIRCUMFERENCE = 2 * Math.PI * 44;

export function CompatibilityResultView({ partner, result, onReset }: Props) {
  const dashOffset = CIRCUMFERENCE * (1 - result.overallScore / 100);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="overflow-hidden rounded-sm border-2 border-black bg-[#FDFCF8]"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        {/* 매칭 헤더 */}
        <div className="flex items-center justify-center px-5 pb-5 pt-6">
          <div className="flex flex-1 flex-col items-center gap-2">
            <div
              className="flex h-[68px] w-[68px] items-center justify-center rounded-xl border-2 border-black bg-[#FFF9C2] text-[30px]"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              🧑
            </div>
            <span className="font-display text-[15px]">나</span>
          </div>

          <div className="flex shrink-0 animate-heartbeat items-center justify-center px-3 text-[28px]">
            💑
          </div>

          <div className="flex flex-1 flex-col items-center gap-2">
            <div
              className="flex h-[68px] w-[68px] items-center justify-center rounded-xl border-2 border-black bg-[#F0EDE6] text-[30px]"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {getPartnerAvatar(partner)}
            </div>
            <span className="font-display text-[15px]">{partner.name}</span>
          </div>
        </div>

        {/* 종합 점수 */}
        <div className="border-b-2 border-t-2 border-black bg-[rgb(253,251,240)] px-5 py-5 text-center">
          <div className="relative inline-flex items-center justify-center">
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle
                cx="55"
                cy="55"
                r="44"
                fill="none"
                stroke="rgba(13,13,13,.08)"
                strokeWidth="10"
              />
              <circle
                cx="55"
                cy="55"
                r="44"
                fill="none"
                stroke="#0d0d0d"
                strokeWidth="10"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 55 55)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[32px] leading-none">
                {result.overallScore}
              </span>
              <span className="text-[11px] text-[#7a7570]">/ 100</span>
            </div>
          </div>

          {result.keyword && (
            <div>
              <span
                className="mt-3 inline-block rounded-full border-2 border-black bg-[#FFE500] px-4 py-1 font-display text-[14px]"
                style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
              >
                {result.keyword}
              </span>
            </div>
          )}

          {result.description && (
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#7a7570]">
              {result.description}
            </p>
          )}
        </div>

        {/* 분야별 궁합 */}
        {result.sections.length > 0 && (
          <div className="border-b-2 border-black p-5">
            <div className="mb-3.5 font-display text-[14px]">분야별 궁합</div>
            <div className="flex flex-col gap-2.5">
              {result.sections.map((section, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="w-4 shrink-0 text-[16px]">
                    {section.icon}
                  </span>
                  <span className="w-[52px] shrink-0 text-[12px] font-bold">
                    {section.label}
                  </span>
                  <div className="flex-1 overflow-hidden rounded-full border border-[#d4d0c8] bg-[rgba(13,13,13,.08)]" style={{ height: 9 }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${section.score}%`,
                        background: section.color,
                      }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right text-[11px] font-bold text-[#7a7570]">
                    {section.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 궁합 총평 */}
        <div className="p-5">
          <div
            className="rounded-sm border-2 border-black bg-[rgb(253,251,240)] p-4"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            <div className="mb-1.5 text-[10px] font-bold tracking-widest text-[#7a7570]">
              궁합 총평
            </div>
            <p className="text-[13px] leading-[1.85] text-[rgba(13,13,13,0.72)]">
              {result.description || "궁합 분석 결과를 확인하세요."}
            </p>
            {result.tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {result.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full border-[1.5px] border-[#d4d0c8] bg-[#F8F6F1] px-2.5 py-0.5 text-[11px] font-bold text-[#7a7570]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 다시 하기 */}
      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-sm border-2 border-black bg-[#F0EDE6] py-3.5 font-display text-[15px] transition-all [box-shadow:2px_2px_0_#0d0d0d] hover:-translate-x-px hover:-translate-y-px hover:[box-shadow:4px_4px_0_#0d0d0d]"
      >
        ← 다른 사람과 궁합 보기
      </button>
    </div>
  );
}
