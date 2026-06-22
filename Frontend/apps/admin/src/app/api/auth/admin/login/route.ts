import { NextResponse } from "next/server";
import {
  type AdminLoginRequest,
  loginAdminOnServer,
} from "@/entities/auth/server/loginAdminOnServer";
import { setAdminAuthCookies } from "@/entities/auth/server/adminAuthCookies";

export async function POST(request: Request) {
  const credentials = await parseAdminLoginRequest(request);

  if (!credentials) {
    return NextResponse.json(
      { success: false, message: "INVALID_REQUEST_BODY" },
      { status: 400 },
    );
  }

  const result = await loginAdminOnServer(credentials);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: result.status },
    );
  }

  const response = NextResponse.json({
    success: true,
    data: { authenticated: true },
  });

  setAdminAuthCookies(response, result.data);

  return response;
}

async function parseAdminLoginRequest(
  request: Request,
): Promise<AdminLoginRequest | null> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return null;
  }

  if (!isAdminLoginRequest(body)) {
    return null;
  }

  return body;
}

function isAdminLoginRequest(value: unknown): value is AdminLoginRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.username === "string" &&
    candidate.username.trim().length > 0 &&
    typeof candidate.password === "string" &&
    candidate.password.length > 0
  );
}
