import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MypageLayoutShell } from "@/features/mypage/ui/mypage-layout-shell.client";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  USER_EMAIL_COOKIE_KEY,
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
  const initialProfile = {
    email: cookieStore.get(USER_EMAIL_COOKIE_KEY)?.value ?? "회원",
    summaryZodiac: "",
  };

  return (
    <main>
      <MypageLayoutShell initialProfile={initialProfile}>
        {children}
      </MypageLayoutShell>
    </main>
  );
}
