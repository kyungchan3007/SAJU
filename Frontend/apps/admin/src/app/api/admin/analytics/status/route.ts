import { NextResponse } from "next/server";

import { getHttpStatusAnalyticsOnServer } from "@/entities/analytics/server/getHttpStatusAnalyticsOnServer";

export async function GET() {
  try {
    const data = await getHttpStatusAnalyticsOnServer();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[analytics/status]", error);
    return NextResponse.json({ error: "Failed to fetch status analytics" }, { status: 500 });
  }
}
