import { NextResponse } from "next/server";

import { getZoneAnalyticsOnServer } from "@/entities/analytics/server/getZoneAnalyticsOnServer";

export async function GET() {
  try {
    const data = await getZoneAnalyticsOnServer();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[analytics/zone]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
