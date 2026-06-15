export { apiClient } from "@/shared/api/base";
export {
  parseBackendApiResponse,
  type BackendParseResult,
} from "@/shared/api/backend/parseBackendApiResponse";
export {
  API_ERROR_MESSAGES,
  API_SUCCESS_MESSAGES,
  resolveApiErrorMessage,
  resolveApiSuccessMessage,
} from "@/shared/api/messages";
export {
  createErrorResponse,
  createSuccessResponse,
  type ApiEnvelope,
  type ApiFailure,
  type ApiSuccess,
} from "@/shared/api/response";
