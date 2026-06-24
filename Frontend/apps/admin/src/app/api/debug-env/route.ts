export async function GET() {
  return Response.json({
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL ?? "MISSING",
  });
}
