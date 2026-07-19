export type PaymentStatus =
  | "REQUESTED"
  | "DEPOSIT_CONFIRMED"
  | "REFUND_PENDING"
  | "REFUNDED"
  | "CANCELLED";

export type PaymentRefundReason = "BATCH_AUTO" | "USER_CANCELLED";

export type PaymentListItem = {
  id?: number;
  memberId?: number;
  userId?: number;
  amount?: number;
  depositorName?: string;
  status?: PaymentStatus;
  refundReason?: PaymentRefundReason;
  requestedAt?: string;
  depositConfirmedAt?: string | null;
};

