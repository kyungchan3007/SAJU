import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";
import { rejectUnverifiedTurnstile } from "@/shared/api/auth/rejectUnverifiedTurnstile";

type RouteHandler<TRequest extends Request | undefined, TArgs extends unknown[] = []> = (
  request: TRequest,
  ...args: TArgs
) => Response | Promise<Response>;

type ApiGuardOptions = {
  requireCsrf?: boolean;
  requireTurnstile?: boolean;
};

export function withApiGuards<
  TRequest extends Request | undefined = Request | undefined,
  TArgs extends unknown[] = [],
>(
  options: ApiGuardOptions,
  handler: RouteHandler<TRequest, TArgs>,
): RouteHandler<TRequest, TArgs> {
  return async (request: TRequest, ...args: TArgs) => {
    if (options.requireCsrf) {
      const csrfResponse = rejectCrossOriginRequest(request);
      if (csrfResponse) {
        return csrfResponse;
      }
    }

    if (options.requireTurnstile) {
      const turnstileResponse = await rejectUnverifiedTurnstile();
      if (turnstileResponse) {
        return turnstileResponse;
      }
    }

    return handler(request, ...args);
  };
}
