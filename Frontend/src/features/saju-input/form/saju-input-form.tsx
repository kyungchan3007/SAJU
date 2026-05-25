import Image from "next/image";
import { steps } from "@/domain/saju/guid-card/12zodiac/model/model";
import { SajuInputFieldsContainer } from "@/features/saju-input/form/client/saju-input-fields.container";

export function SajuInputForm() {
  return (
    <div className="mx-auto flex max-w-[860px] flex-col gap-8 px-6 py-8">
      {/* ── 히어로 ── */}
      <section
        className="relative overflow-hidden rounded-3xl shadow-lg"
        style={{ height: "368px" }}
      >
        <Image
          src="/image/hero/hero.png"
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
        <div className="absolute inset-0 flex max-w-[560px] flex-col justify-center px-12 py-12">
          <span
            className="mb-4 w-fit rounded-full px-3.5 py-1.5 text-xs font-bold"
            style={{ background: "rgba(255,255,255,0.90)", color: "#5956E9" }}
          >
            정통사주
          </span>
          <h1
            className="mb-3 text-[28px] font-black leading-snug text-white"
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
            className="text-[15px] font-bold leading-relaxed text-white"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
          >
            생년월일과 출생 시간만 있으면
            <br />
            나만의 사주 해석이 시작됩니다.
          </p>
        </div>
      </section>

      {/* ── 입력 카드 ── */}
      <section
        className="rounded-[28px] bg-white px-9 py-9"
        style={{
          border: "1.5px solid #EDE9FF",
          boxShadow: "0 2px 16px rgba(89,86,233,0.08)",
        }}
      >
        {/* 카드 헤더 */}
        <div className="mb-6">
          <h2 className="mb-1.5 text-xl font-black tracking-tight text-gray-900">
            사주 정보 입력
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">
            정확한 사주 분석을 위해 아래 정보를 입력해주세요.
          </p>
        </div>

        {/* 안내 박스 */}
        <div
          className="mb-7 flex gap-2.5 rounded-2xl px-4 py-4"
          style={{ background: "#F0EEFF" }}
        >
          <span className="mt-0.5 shrink-0 text-base">💡</span>
          <ul className="flex flex-col gap-1.5">
            <li
              className="text-xs font-semibold leading-relaxed"
              style={{ color: "#5956E9" }}
            >
              양력과 음력 중 어떤 기준인지 먼저 확인한 뒤 입력해 주세요.
            </li>
            <li
              className="text-xs font-semibold leading-relaxed"
              style={{ color: "#5956E9" }}
            >
              출생 시간을 모르셔도 시간 미상 여부를 선택해 진행하실 수 있습니다.
            </li>
            <li
              className="text-xs font-semibold leading-relaxed"
              style={{ color: "#5956E9" }}
            >
              출생 시간까지 입력하시면 사주 해석 결과를 더 풍부하게 받아보실 수
              있습니다.
            </li>
          </ul>
        </div>

        <SajuInputFieldsContainer steps={steps} />
      </section>
    </div>
  );
}
