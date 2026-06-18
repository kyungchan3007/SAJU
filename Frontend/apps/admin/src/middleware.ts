import { type NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";
import { decodeJwtPayload } from "@/shared/lib/jwt";

const PUBLIC_PATHS = ["/", "/login", "/api/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // TODO: 테스트 완료 후 ADMIN 으로 복구
  const payload = decodeJwtPayload(accessToken);
  if (payload?.role !== "ADMIN" && payload?.role !== "USER") {
    return NextResponse.redirect(new URL("/login?error=forbidden", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
