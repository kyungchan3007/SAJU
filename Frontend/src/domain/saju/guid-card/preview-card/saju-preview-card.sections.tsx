import Link from "next/link";
import type { DailyEnergyResponse } from "@/generated/api";

import { ExpandableTextRow } from "@/domain/saju/guid-card/preview-card/expandable-text-row";
import { SajuElementAnimation } from "@/features/saju-result/ui/saju-element-animation";
import { FiveElementsBalanceCard } from "@/shared/ui/five-elements-balance/five-elements-balance";
import { formatWeakElementLabel } from "@/shared/utils/weakElement";

const cardBase = "sketch-border p-5";

type SajuPreviewCardProps = {
  dailyResult?: DailyEnergyResponse | null;
};

export function SajuHeroSection({ dailyResult }: SajuPreviewCardProps) {
  return (
    <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-[1.1fr_0.9fr]">
      <div className="sketch-border relative overflow-hidden p-6">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-black/50">
          오늘의 기운
        </p>
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-black">
          오늘의 흐름은
          <br />
          {dailyResult?.avoidFlows?.[0] ?? "-"}
          <br />
          {dailyResult?.avoidFlows?.[1] ?? "-"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-black/60">
          {dailyResult?.dailyMessage}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/location" className="btn-saju btn-saju-primary">
            추천 장소 보기
          </Link>
          <Link href="/compatibility" className="btn-saju btn-saju-secondary">
            궁합 보러가기
          </Link>
        </div>
      </div>

      <div className="sketch-border grid min-h-[220px] place-items-center">
        <div
          className="h-[200px] w-[200px] overflow-hidden rounded-full border-2 border-black"
          style={{ boxShadow: "4px 4px 0 #000" }}
        >
          {dailyResult?.weakElement && (
            <SajuElementAnimation element={dailyResult.weakElement} />
          )}
        </div>
      </div>
    </div>
  );
}

export function SajuStatsSection({ dailyResult }: SajuPreviewCardProps) {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
      <div className={cardBase}>
        <strong className="block text-xl font-bold tracking-tight text-black">
          {dailyResult?.todayScore} 점
        </strong>
        <span className="mt-1 block text-xs text-black/50">
          오늘의 전체 흐름
        </span>
      </div>
      <div className={cardBase}>
        <strong className="block text-xl font-bold tracking-tight text-black">
          {formatWeakElementLabel(dailyResult?.weakElement)}
        </strong>
        <span className="mt-1 block text-xs text-black/50">보완 필요</span>
      </div>
      <div className={cardBase}>
        <strong className="block text-xl font-bold tracking-tight text-black">
          {dailyResult?.goodTime}
        </strong>
        <span className="mt-1 block text-xs text-black/50">좋은 시간대</span>
      </div>
      <div className={cardBase}>
        <strong className="block text-xl font-bold tracking-tight text-black">
          {dailyResult?.mood}
        </strong>
        <span className="mt-1 block text-xs text-black/50">권장 무드</span>
      </div>
    </div>
  );
}

export function SajuInsightsSection({ dailyResult }: SajuPreviewCardProps) {
  return (
    <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
      <FiveElementsBalanceCard
        fiveElements={{ elements: dailyResult?.fiveElements ?? {} }}
      />

      <div className={cardBase}>
        <h4 className="text-base font-bold text-black">오늘의 한마디</h4>
        <p className="mt-3 text-sm leading-relaxed text-black/60">
          급하게 결론을 내리기보다 환경을 고르는 쪽이 더 중요한 날입니다. 호흡이
          느린 공간이 잘 맞습니다.
        </p>
        <div className="mt-4 grid gap-0">
          <ExpandableTextRow
            label="좋은 행동"
            value={dailyResult?.goodActions?.join(", ") ?? "-"}
          />
          <ExpandableTextRow
            label="피할 흐름"
            value={dailyResult?.avoidActions?.join(", ") ?? "-"}
          />
          <ExpandableTextRow
            label="권장 장소"
            value={dailyResult?.recommendPlaces?.join(", ") ?? "-"}
          />
        </div>
      </div>
    </div>
  );
}

// export function SajuLocationSection({ dailyResult }: SajuPreviewCardProps) {
//   console.log(dailyResult);
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {locationItems.map((loc) => (
//         <div key={loc.name} className="sketch-border grid gap-3 p-[18px]">
//           <div className="flex items-start justify-between gap-3">
//             <h4 className="text-sm font-bold text-black">{loc.name}</h4>
//             <span className="text-2xl font-black tracking-tight text-black">
//               {loc.score}
//             </span>
//           </div>
//           <p className="text-xs leading-relaxed text-black/60">{loc.desc}</p>
//           <div className="flex flex-wrap gap-2">
//             {loc.pills.map((p) => (
//               <span
//                 key={p}
//                 className="rounded-none border border-black px-2.5 py-1 text-xs font-bold text-black"
//               >
//                 {p}
//               </span>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
