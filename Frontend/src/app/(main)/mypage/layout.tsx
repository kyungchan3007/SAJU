import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MypageSidebar } from "@/features/mypage";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";

export default async function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  if (!accessToken) {
    redirect("/login?next=/mypage");
  }

  return (
    <main className="page-shell">
      <div className="grid gap-5 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-6">
        <MypageSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
