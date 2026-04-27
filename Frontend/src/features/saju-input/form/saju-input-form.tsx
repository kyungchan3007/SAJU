import { steps } from "@/domain/saju/guid-card/12zodiac/model/model";
import { SajuInputFieldsContainer } from "@/features/saju-input/form/client/saju-input-fields.container";

export function SajuInputForm() {
  return (
    <section className="card-saju-primary p-7">
      <h3 className="text-2xl font-bold tracking-tight text-black">
        당신의 사주를 입력해주세요
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-black/60">
        복잡한 용어 없이 간단한 입력만으로 오늘의 기운 분석을 시작할 수
        있습니다.
      </p>

      <section className="mb-5 mt-5 sketch-border p-5">
        <h4 className="text-lg font-semibold text-black">
          입력 전 확인할 사항
        </h4>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-black/55">
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
