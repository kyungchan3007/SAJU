import { NextResponse } from "next/server";
import { createSuccessResponse } from "@/shared/api";
import { cookies } from "next/headers";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(
    createSuccessResponse({
      feature: "saju",
      status: "ready",
      message: "Saju BFF placeholder route is available.",
    }),
  );
}

export async function POST() {
  const token = (await cookies()).get("saju_access_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "LOGIN_REQUIRED" },
      { status: 401 },
    );
  }

  // 백엔드 요청 진행
}
