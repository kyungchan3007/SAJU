import type { DomainDisplay } from "@/features/year-fortune/model/yearFortune";

type Props = {
  active: DomainDisplay;
};

export function YearFortuneDomainContent({ active }: Props) {
  return (
    <div>
      {/* 도메인 헤더 */}
      <div className="mb-4 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: active.bg }}
        >
          <span className="text-[15px]">{active.icon}</span>
        </div>
        <span className="text-base font-black text-gray-900">{active.label}</span>
      </div>

      {/* 내용 */}
      {active.content ? (
        <p className="whitespace-pre-line text-[13px] leading-[1.8] text-slate-600">
          {active.content}
        </p>
      ) : (
        <p className="text-[13px] text-slate-400">내용이 없습니다.</p>
      )}
    </div>
  );
}
