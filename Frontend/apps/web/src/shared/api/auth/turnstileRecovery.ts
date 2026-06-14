import type { Route } from "next";

export const TURNSTILE_REQUIRED_ERROR_CODE = "TURNSTILE_REQUIRED";

type ErrorWithCode = {
  code?: string;
};

export function isTurnstileRequiredError(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    (error as ErrorWithCode).code === TURNSTILE_REQUIRED_ERROR_CODE
  );
}

export function buildTurnstileVerifyPath(returnTo: string): Route {
  return `/verify?returnTo=${encodeURIComponent(returnTo)}` as Route;
}
