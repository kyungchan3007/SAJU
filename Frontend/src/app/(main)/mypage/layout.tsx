import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = (await cookies()).get("saju_access_token")?.value;
  if (!accessToken) {
    redirect("/login?next=/mypage");
  }

  return <>{children}</>;
}
