import { NextResponse } from "next/server";

import { getWorkersAnalyticsOnServer } from "@/entities/analytics/server/getWorkersAnalyticsOnServer";

export async function GET() {
  try {
    const data = await getWorkersAnalyticsOnServer();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[analytics/workers]", error);
    return NextResponse.json({ error: "Failed to fetch workers analytics" }, { status: 500 });
  }
}
