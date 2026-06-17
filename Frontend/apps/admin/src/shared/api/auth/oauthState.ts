import "server-only";

import { randomBytes, timingSafeEqual } from "node:crypto";

export function createOAuthState(): string {
  return randomBytes(32).toString("base64url");
}

export function isOAuthStateValid(
  receivedState: string | null,
  storedState: string | undefined,
): boolean {
  if (!receivedState || !storedState) return false;

  const receivedBuffer = Buffer.from(receivedState);
  const storedBuffer = Buffer.from(storedState);

  return (
    receivedBuffer.length === storedBuffer.length &&
    timingSafeEqual(receivedBuffer, storedBuffer)
  );
}
