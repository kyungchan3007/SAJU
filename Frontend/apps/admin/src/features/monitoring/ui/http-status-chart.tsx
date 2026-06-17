import { Card } from "@saju/ui";

import type { HttpStatusGroup, StatusCategory } from "../type/types";

type HttpStatusChartProps = {
  data: HttpStatusGroup[];
};

function getCategory(status: number): StatusCategory {
  if (status >= 200 && status < 300) return "2xx";
  if (status >= 300 && status < 400) return "3xx";
  if (status >= 400 && status < 500) return "4xx";
  if (status >= 500 && status < 600) return "5xx";
  return "other";
}

const CATEGORY_COLOR: Record<StatusCategory, string> = {
  "2xx": "bg-green-500",
  "3xx": "bg-blue-400",
  "4xx": "bg-yellow-400",
  "5xx": "bg-red-500",
  other: "bg-surface-border",
};

const CATEGORY_LABEL: Record<StatusCategory, string> = {
  "2xx": "2xx 성공",
  "3xx": "3xx 리다이렉트",
  "4xx": "4xx 클라이언트 오류",
  "5xx": "5xx 서버 오류",
  other: "기타",
};

type CategorySummary = { category: StatusCategory; requests: number };

export function HttpStatusChart({ data }: HttpStatusChartProps) {
  const summaryMap = data.reduce<Partial<Record<StatusCategory, number>>>((acc, item) => {
    const cat = getCategory(item.status);
    acc[cat] = (acc[cat] ?? 0) + item.requests;
    return acc;
  }, {});

  const total = Object.values(summaryMap).reduce<number>((sum, v) => sum + (v ?? 0), 0);

  const categories: CategorySummary[] = (["2xx", "3xx", "4xx", "5xx", "other"] as StatusCategory[])
    .map((cat) => ({ category: cat, requests: summaryMap[cat] ?? 0 }))
    .filter((c) => c.requests > 0);

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-text-secondary">HTTP 상태코드 분포 (최근 24시간)</h3>

      {total === 0 ? (
        <div className="flex h-20 items-center justify-center text-sm text-text-tertiary">
          데이터 없음
        </div>
      ) : (
        <>
          <div className="mb-4 flex h-6 w-full overflow-hidden rounded-full">
            {categories.map(({ category, requests }) => (
              <div
                key={category}
                className={`${CATEGORY_COLOR[category]} transition-all`}
                style={{ width: `${(requests / total) * 100}%` }}
                title={`${CATEGORY_LABEL[category]}: ${requests.toLocaleString()}`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {categories.map(({ category, requests }) => (
              <div key={category} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-3 w-3 rounded-sm ${CATEGORY_COLOR[category]}`} />
                  <span className="text-text-secondary">{CATEGORY_LABEL[category]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-primary font-medium">{requests.toLocaleString()}</span>
                  <span className="w-12 text-right text-text-tertiary">
                    {((requests / total) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 border-t border-surface-border pt-3 text-xs text-text-tertiary">
            총 요청 {total.toLocaleString()}건
          </div>
        </>
      )}
    </Card>
  );
}
