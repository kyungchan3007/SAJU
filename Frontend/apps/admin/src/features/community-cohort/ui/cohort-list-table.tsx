import { Badge } from "@saju/ui";
import { isCohortExpired, isCohortFull } from "@/features/community-cohort/model/cohort";
import type { CommunityCohortStatus } from "@/features/community-cohort/type/types";

type CohortListTableProps = {
  cohorts: CommunityCohortStatus[];
};

export function CohortListTable({ cohorts }: CohortListTableProps) {
  return (
    <div className="overflow-x-auto rounded-saju-card border border-surface-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-border bg-surface-soft">
            <th className="px-4 py-3 text-left font-semibold text-content-secondary">기수명</th>
            <th className="px-4 py-3 text-center font-semibold text-content-secondary">정원</th>
            <th className="px-4 py-3 text-center font-semibold text-content-secondary">현재 인원</th>
            <th className="px-4 py-3 text-center font-semibold text-content-secondary">장소</th>
            <th className="px-4 py-3 text-center font-semibold text-content-secondary">소개팅 날짜</th>
            <th className="px-4 py-3 text-center font-semibold text-content-secondary">상태</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border bg-white">
          {cohorts.map((cohort) => (
            <CohortRow key={cohort.cohortId ?? cohort.name} cohort={cohort} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CohortRow({ cohort }: { cohort: CommunityCohortStatus }) {
  const full = isCohortFull(cohort);
  const expired = isCohortExpired(cohort);

  return (
    <tr className="transition-colors hover:bg-surface-soft">
      <td className="px-4 py-3 font-medium text-content-primary">{cohort.name ?? "-"}</td>
      <td className="px-4 py-3 text-center text-content-secondary">
        {cohort.capacity ?? "-"}
      </td>
      <td className="px-4 py-3 text-center text-content-secondary">
        <span className={full ? "font-bold text-status-danger" : ""}>
          {cohort.currentCount ?? "-"}
        </span>
      </td>
      <td className="px-4 py-3 text-center text-content-muted">{cohort.location ?? "-"}</td>
      <td className="px-4 py-3 text-center text-content-muted">
        {cohort.expiredAt
          ? new Date(cohort.expiredAt).toLocaleDateString("ko-KR")
          : "-"}
      </td>
      <td className="px-4 py-3 text-center">
        <CohortStatusBadge status={cohort.cohortStatus} full={full} expired={expired} />
      </td>
    </tr>
  );
}

function CohortStatusBadge({
  status,
  full,
  expired,
}: {
  status: CommunityCohortStatus["cohortStatus"];
  full: boolean;
  expired: boolean;
}) {
  if (status === "CLOSED") return <Badge variant="neutral">종료</Badge>;
  if (status === "FINALIZED") return <Badge variant="warning">확정</Badge>;
  if (status === "OPEN") return <Badge variant="success">모집중</Badge>;
  if (expired) return <Badge variant="neutral">만료</Badge>;
  if (full) return <Badge variant="danger">마감</Badge>;
  return <Badge variant="success">모집중</Badge>;
}
