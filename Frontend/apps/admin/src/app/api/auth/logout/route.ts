import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  AUTH_COOKIE_OPTIONS,
  TOKEN_TYPE_COOKIE_KEY,
} from "@/shared/config/authToken";

export async function POST() {
  const response = NextResponse.redirect("/login");

  const clearOptions = { ...AUTH_COOKIE_OPTIONS, maxAge: 0 };
  response.cookies.set(ACCESS_TOKEN_COOKIE_KEY, "", clearOptions);
  response.cookies.set(TOKEN_TYPE_COOKIE_KEY, "", clearOptions);

  return response;
}
