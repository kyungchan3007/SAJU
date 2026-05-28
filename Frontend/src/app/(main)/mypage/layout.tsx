import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";

export default async function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!accessToken) {
    redirect("/login?next=/mypage");
  }

  return <main>{children}</main>;
}
