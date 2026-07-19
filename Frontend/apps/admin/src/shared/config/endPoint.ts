export const ADMIN_LOGIN_ENDPOINT_PATH = "/api/auth/admin/login";
export const ADMIN_NOTIFICATIONS_ENDPOINT_PATH = "/api/admin/notifications";
export const ADMIN_COMMUNITY_COHORT_ENDPOINT_PATH =
  "/api/admin/community/cohort";
export const ADMIN_COMMUNITY_COHORTS_ENDPOINT_PATH =
  "/api/admin/community/cohorts";
export const ADMIN_COMMUNITY_COHORT_PAYMENTS_ENDPOINT_PATH = (
  cohortId: number,
) => `/api/admin/community/cohorts/${cohortId}/payments`;
export const ADMIN_PAYMENT_CONFIRM_DEPOSIT_ENDPOINT_PATH = (
  paymentId: number,
) => `/api/admin/payments/${paymentId}/confirm-deposit`;
export const ADMIN_COMMUNITY_MEMBER_CONFIRM_ENDPOINT_PATH = (memberId: number) =>
  `/api/admin/community/members/${memberId}/confirm`;
export const ADMIN_PAYMENT_COMPLETE_REFUND_ENDPOINT_PATH = (
  paymentId: number,
) => `/api/admin/payments/${paymentId}/complete-refund`;

export const ADMIN_ANALYTICS_ZONE_ENDPOINT_PATH = "/api/admin/analytics/zone";
export const ADMIN_ANALYTICS_WORKERS_ENDPOINT_PATH =
  "/api/admin/analytics/workers";
export const ADMIN_ANALYTICS_STATUS_ENDPOINT_PATH =
  "/api/admin/analytics/status";

export const CLOUDFLARE_GRAPHQL_ENDPOINT =
  "https://api.cloudflare.com/client/v4/graphql";
