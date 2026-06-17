import { Card } from "@saju/ui";

type WorkersErrorRateProps = {
  totalInvocations: number;
  totalErrors: number;
};

export function WorkersErrorRate({ totalInvocations, totalErrors }: WorkersErrorRateProps) {
  const errorRate = totalInvocations > 0 ? (totalErrors / totalInvocations) * 100 : 0;
  const successRate = 100 - errorRate;

  const isHealthy = errorRate < 1;
  const isWarning = errorRate >= 1 && errorRate < 5;

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-text-secondary">Workers 에러율 (최근 24시간)</h3>

      <div className="mb-4 flex items-end gap-2">
        <span
          className={`text-3xl font-bold ${
            isHealthy ? "text-green-600" : isWarning ? "text-yellow-500" : "text-red-600"
          }`}
        >
          {errorRate.toFixed(2)}%
        </span>
        <span className="mb-1 text-sm text-text-tertiary">에러율</span>
      </div>

      <div className="mb-4 h-4 w-full overflow-hidden rounded-full bg-surface-soft">
        <div
          className={`h-full rounded-full transition-all ${
            isHealthy ? "bg-green-500" : isWarning ? "bg-yellow-400" : "bg-red-500"
          }`}
          style={{ width: `${Math.min(errorRate, 100)}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-text-tertiary">총 호출수</div>
          <div className="font-medium text-text-primary">{totalInvocations.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-text-tertiary">에러 건수</div>
          <div className="font-medium text-red-600">{totalErrors.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-text-tertiary">성공률</div>
          <div className="font-medium text-green-600">{successRate.toFixed(2)}%</div>
        </div>
        <div>
          <div className="text-text-tertiary">상태</div>
          <div
            className={`font-medium ${
              isHealthy ? "text-green-600" : isWarning ? "text-yellow-600" : "text-red-600"
            }`}
          >
            {isHealthy ? "정상" : isWarning ? "주의" : "위험"}
          </div>
        </div>
      </div>
    </Card>
  );
}
