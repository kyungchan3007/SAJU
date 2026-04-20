import { steps } from "@/domain/saju/guid-card/12zodiac/model/model";
import { SajuInputFieldsContainer } from "@/features/saju-input/form/client/saju-input-fields.container";
import { metadata } from "@/app/(main)/saju/page";

export function SajuInputForm() {
  return (
    <section
      className="card-saju-primary rounded-[2rem] border p-7"
      style={{
        borderColor: "rgba(170,132,238,0.34)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <h3 className="text-2xl font-bold tracking-tight text-[rgba(252,247,255,0.96)]">
        당신의 사주를 입력해주세요
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[rgba(228,205,255,0.72)]">
        복잡한 용어 없이 간단한 입력만으로 오늘의 기운 분석을 시작할 수
        있습니다.
      </p>

      <section className="mb-5 mt-5 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
        <h4 className="text-lg font-semibold text-[rgba(252,247,255,0.94)]">
          입력 전 확인할 사항
        </h4>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-[rgba(228,205,255,0.68)]">
          <li>양력과 음력 중 어떤 기준인지 먼저 확인한 뒤 입력해 주세요.</li>
          <li>
            출생 시간을 모르셔도 시간 미상 여부를 선택해 진행하실 수 있습니다.
          </li>
          <li>
            출생시간까지 입력하시면 사주 해석 결과를 더 풍부하게 받아보실 수
            있습니다.
          </li>
        </ul>
      </section>

      <SajuInputFieldsContainer steps={steps} />
    </section>
  );
}
