import { Card } from "@saju/ui";

import type { HourlyRequest } from "../type/types";

const CHART_HEIGHT = 100;

type RequestsChartProps = {
  data: HourlyRequest[];
};

export function RequestsChart({ data }: RequestsChartProps) {
  const maxRequests = Math.max(...data.map((d) => d.requests), 1);

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-text-secondary">시간대별 요청수 (최근 24시간)</h3>

      {data.length === 0 ? (
        <div className="flex items-center justify-center text-sm text-text-tertiary" style={{ height: CHART_HEIGHT }}>
          데이터 없음
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="flex items-end gap-[2px]" style={{ height: CHART_HEIGHT }}>
            {data.map((d) => {
              const barHeight = Math.max(
                Math.round((d.requests / maxRequests) * CHART_HEIGHT),
                d.requests > 0 ? 2 : 0,
              );
              return (
                <div key={d.datetime} className="group relative flex flex-1 justify-center items-end">
                  <div
                    className="w-full rounded-t bg-saju-primary opacity-80 transition-opacity group-hover:opacity-100"
                    style={{ height: barHeight }}
                  />
                  <div className="pointer-events-none absolute bottom-full mb-1 hidden rounded bg-surface-card px-2 py-1 text-xs shadow-saju-sm group-hover:block whitespace-nowrap">
                    {d.requests.toLocaleString()}건
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-[2px]">
            {data.map((d) => (
              <span key={d.datetime} className="flex-1 text-center text-[10px] text-text-tertiary">
                {d.hour}시
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
