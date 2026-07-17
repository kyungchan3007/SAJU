import { SajuFlowRow } from "@/domain/saju/guid-card/preview-card/ui/saju-flow-row";
import type { SajuPreviewSectionProps } from "@/domain/saju/guid-card/preview-card/type/saju-preview-card.types";
import {
  DAILY_FIVE_ELEMENT_CONFIG,
  DAILY_FIVE_ELEMENT_ORDER,
} from "@/shared/model/five-elements/model";
import { getWeakElementDisplayInfo } from "@/shared/utils/weakElement";

const CIRCUMFERENCE = 2 * Math.PI * 40;

export function SajuMidSection({ dailyResult }: SajuPreviewSectionProps) {
  const fiveElements = dailyResult?.fiveElements ?? {};
  const weakElementInfo = getWeakElementDisplayInfo(dailyResult?.weakElement);
  const segments = DAILY_FIVE_ELEMENT_ORDER.map((key) => ({
    key,
    pct: (fiveElements[key] as number) ?? 0,
    color: DAILY_FIVE_ELEMENT_CONFIG[key]?.color ?? "#ccc",
    label: DAILY_FIVE_ELEMENT_CONFIG[key]?.label ?? key,
  }));
  const donutSegments = segments.reduce<
    ((typeof segments)[number] & {
      arc: number;
      dashoffset: number;
      rotation: number;
    })[]
  >((acc, seg) => {
    const cumulative = acc.reduce((sum, item) => sum + item.pct, 0);
    const arc = (seg.pct / 100) * CIRCUMFERENCE;
    const dashoffset = CIRCUMFERENCE - arc;
    const rotation = cumulative * 3.6;

    return [...acc, { ...seg, arc, dashoffset, rotation }];
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
      {/* 오늘의 오행 흐름 */}
      <div
        className="rounded-[14px] border border-gray-100 bg-white p-5"
        style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
      >
        <div className="mb-3.5 flex items-center gap-1.5">
          <span className="text-[13px] font-bold text-gray-900">
            오늘의 오행 흐름
          </span>
        </div>
        <div className="mb-3.5 flex items-center gap-5">
          <div className="relative h-[120px] w-[120px] shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#F3F4F6"
                strokeWidth="18"
              />
              {donutSegments.map((seg) =>
                seg.pct > 0 ? (
                  <circle
                    key={seg.key}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth="18"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={seg.dashoffset}
                    transform={`rotate(${seg.rotation}, 50, 50)`}
                  />
                ) : null,
              )}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[68px] w-[68px] rounded-full bg-white" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2.5">
            {segments.map((seg) => (
              <div key={seg.key} className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                  style={{ background: seg.color }}
                >
                  {seg.key}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-[width] duration-700"
                    style={{ width: `${seg.pct}%`, background: seg.color }}
                  />
                </div>
                <span className="w-9 text-right text-[11px] text-gray-400">
                  {seg.pct > 0 ? `${seg.pct}%` : "-"}
                </span>
              </div>
            ))}
          </div>
        </div>
        {weakElementInfo && (
          <div className="flex flex-col gap-0.5 rounded-[10px] bg-saju-soft px-3.5 py-3">
            <p className="text-[12px] text-gray-700">
              오늘은{" "}
              <span className="font-semibold text-blue-500">
                &apos;{weakElementInfo.ko}&apos;
              </span>{" "}
              기운이 약해요.
            </p>
            <p className="text-[12px] text-gray-400">
              {weakElementInfo.ko} 기운을 보완하면 더 안정적인 하루를 보낼 수
              있어요.
            </p>
            <p className="mt-0.5 text-[12px] text-gray-700">
              약한 기운:{" "}
              <span className="font-semibold text-blue-500">
                {weakElementInfo.ko} ({weakElementInfo.hanja})
              </span>
            </p>
          </div>
        )}
      </div>

      {/* 오늘의 흐름 한눈에 보기 */}
      <div
        className="rounded-[14px] border border-gray-100 bg-white p-5"
        style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
      >
        <div className="mb-3.5 flex items-center gap-1.5">
          <span className="text-[13px] font-bold text-gray-900">
            오늘의 흐름 한눈에 보기
          </span>
        </div>
        <div className="flex flex-col">
          <SajuFlowRow
            type="good"
            title="좋은 활동"
            items={dailyResult?.goodActions ?? []}
          />
          <SajuFlowRow
            type="bad"
            title="피해야 할 활동"
            items={dailyResult?.avoidActions ?? []}
          />
          <SajuFlowRow
            type="caution"
            title="주의할 흐름"
            items={dailyResult?.avoidFlows ?? []}
            isLast
          />
        </div>
      </div>
    </div>
  );
}
