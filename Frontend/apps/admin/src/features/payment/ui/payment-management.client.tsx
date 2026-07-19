"use client";

import { useMemo, useState } from "react";
import { Badge, Button, EmptyStateCard, ErrorStateCard, LoadingStateCard } from "@saju/ui";
import { useCohortList } from "@/features/community-cohort/hooks/useCohortList";
import { usePaymentActions } from "@/features/payment/hooks/usePaymentActions";
import { usePaymentList } from "@/features/payment/hooks/usePaymentList";
import type { PaymentListItem, PaymentStatus } from "@/features/payment/type/types";

const PAYMENT_STATUS_OPTIONS: Array<{ label: string; value: PaymentStatus | "" }> = [
  { label: "전체", value: "" },
  { label: "입금 대기", value: "REQUESTED" },
  { label: "입금 확인", value: "DEPOSIT_CONFIRMED" },
  { label: "환불 대기", value: "REFUND_PENDING" },
  { label: "환불 완료", value: "REFUNDED" },
  { label: "취소", value: "CANCELLED" },
];

export function PaymentManagement() {
  const { cohorts, isLoading: isCohortsLoading, isError: isCohortsError } = useCohortList();
  const [selectedCohortId, setSelectedCohortId] = useState<number | null>(null);
  const [status, setStatus] = useState<PaymentStatus | "">("");

  const selectedOrFirstCohortId = useMemo(() => {
    if (selectedCohortId) return selectedCohortId;
    const firstCohortId = cohorts.find((cohort) => typeof cohort.cohortId === "number")
      ?.cohortId;
    return firstCohortId ?? null;
  }, [cohorts, selectedCohortId]);

  const { payments, isLoading, isError } = usePaymentList(selectedOrFirstCohortId, status);
  const actions = usePaymentActions();

  if (isCohortsLoading) {
    return <LoadingStateCard message="기수 목록을 불러오는 중..." />;
  }

  if (isCohortsError) {
    return (
      <ErrorStateCard
        title="기수 조회 실패"
        description="결제 목록을 조회할 기수 목록을 가져오지 못했습니다."
      />
    );
  }

  if (cohorts.length === 0) {
    return (
      <EmptyStateCard
        title="등록된 기수가 없습니다"
        description="결제 관리는 기수 등록 후 사용할 수 있습니다."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 rounded-saju-card border border-surface-border bg-white p-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-content-primary">
          기수
          <select
            className="h-10 rounded-lg border border-surface-border bg-white px-3 text-sm text-content-primary"
            value={selectedOrFirstCohortId ?? ""}
            onChange={(event) => setSelectedCohortId(Number(event.target.value))}
          >
            {cohorts.map((cohort) => (
              <option key={cohort.cohortId ?? cohort.name} value={cohort.cohortId}>
                {cohort.name ?? `${cohort.cohortId}번 기수`}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-content-primary">
          결제 상태
          <select
            className="h-10 rounded-lg border border-surface-border bg-white px-3 text-sm text-content-primary"
            value={status}
            onChange={(event) => setStatus(event.target.value as PaymentStatus | "")}
          >
            {PAYMENT_STATUS_OPTIONS.map((option) => (
              <option key={option.value || "ALL"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <LoadingStateCard message="결제 목록을 불러오는 중..." />
      ) : isError ? (
        <ErrorStateCard
          title="결제 조회 실패"
          description="기수별 결제 목록을 가져오지 못했습니다."
        />
      ) : payments.length === 0 ? (
        <EmptyStateCard
          title="결제 내역이 없습니다"
          description="선택한 조건에 해당하는 결제 내역이 없습니다."
        />
      ) : (
        <PaymentTable payments={payments} actions={actions} />
      )}
    </div>
  );
}

function PaymentTable({
  payments,
  actions,
}: {
  payments: PaymentListItem[];
  actions: ReturnType<typeof usePaymentActions>;
}) {
  return (
    <div className="overflow-x-auto rounded-saju-card border border-surface-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-border bg-surface-soft">
            <th className="px-4 py-3 text-left font-semibold text-content-secondary">결제 ID</th>
            <th className="px-4 py-3 text-left font-semibold text-content-secondary">멤버 ID</th>
            <th className="px-4 py-3 text-left font-semibold text-content-secondary">입금자</th>
            <th className="px-4 py-3 text-right font-semibold text-content-secondary">금액</th>
            <th className="px-4 py-3 text-center font-semibold text-content-secondary">상태</th>
            <th className="px-4 py-3 text-center font-semibold text-content-secondary">신청일</th>
            <th className="px-4 py-3 text-center font-semibold text-content-secondary">처리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border bg-white">
          {payments.map((payment) => (
            <PaymentRow key={payment.id ?? `${payment.memberId}-${payment.requestedAt}`} payment={payment} actions={actions} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaymentRow({
  payment,
  actions,
}: {
  payment: PaymentListItem;
  actions: ReturnType<typeof usePaymentActions>;
}) {
  const paymentId = payment.id;
  const memberId = payment.memberId;
  const isAnyPending =
    actions.confirmDeposit.isPending ||
    actions.confirmMember.isPending ||
    actions.completeRefund.isPending;

  return (
    <tr className="transition-colors hover:bg-surface-soft">
      <td className="px-4 py-3 font-medium text-content-primary">{paymentId ?? "-"}</td>
      <td className="px-4 py-3 text-content-secondary">{memberId ?? "-"}</td>
      <td className="px-4 py-3 text-content-secondary">{payment.depositorName ?? "-"}</td>
      <td className="px-4 py-3 text-right text-content-secondary">
        {typeof payment.amount === "number" ? payment.amount.toLocaleString("ko-KR") : "-"}
      </td>
      <td className="px-4 py-3 text-center">
        <PaymentStatusBadge status={payment.status} />
      </td>
      <td className="px-4 py-3 text-center text-content-muted">
        {payment.requestedAt ? new Date(payment.requestedAt).toLocaleDateString("ko-KR") : "-"}
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-center gap-2">
          {payment.status === "REQUESTED" && typeof paymentId === "number" ? (
            <Button
              type="button"
              size="sm"
              disabled={isAnyPending}
              onClick={() => actions.confirmDeposit.mutate(paymentId)}
            >
              입금 확인
            </Button>
          ) : null}
          {payment.status === "DEPOSIT_CONFIRMED" && typeof memberId === "number" ? (
            <Button
              type="button"
              size="sm"
              disabled={isAnyPending}
              onClick={() => actions.confirmMember.mutate(memberId)}
            >
              참여 확정
            </Button>
          ) : null}
          {payment.status === "REFUND_PENDING" && typeof paymentId === "number" ? (
            <Button
              type="button"
              size="sm"
              disabled={isAnyPending}
              onClick={() => actions.completeRefund.mutate(paymentId)}
            >
              환불 완료
            </Button>
          ) : null}
          {payment.status !== "REQUESTED" &&
          payment.status !== "DEPOSIT_CONFIRMED" &&
          payment.status !== "REFUND_PENDING" ? (
            <span className="text-content-subtle">-</span>
          ) : null}
        </div>
      </td>
    </tr>
  );
}

function PaymentStatusBadge({ status }: { status: PaymentListItem["status"] }) {
  if (status === "REQUESTED") return <Badge variant="warning">입금 대기</Badge>;
  if (status === "DEPOSIT_CONFIRMED") return <Badge variant="success">입금 확인</Badge>;
  if (status === "REFUND_PENDING") return <Badge variant="warning">환불 대기</Badge>;
  if (status === "REFUNDED") return <Badge variant="neutral">환불 완료</Badge>;
  if (status === "CANCELLED") return <Badge variant="neutral">취소</Badge>;
  return <Badge variant="neutral">-</Badge>;
}

