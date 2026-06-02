import { cookies } from "next/headers";
import { MypageLayoutShell } from "@/features/mypage/ui/mypage-layout-shell.client";
import { USER_EMAIL_COOKIE_KEY } from "@/shared/config/authToken";

export default async function MypageSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const initialProfile = {
    email: cookieStore.get(USER_EMAIL_COOKIE_KEY)?.value ?? "회원",
    summaryZodiac: "",
  };

  return (
    <MypageLayoutShell initialProfile={initialProfile}>{children}</MypageLayoutShell>
  );
}

