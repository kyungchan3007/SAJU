import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { AuthScopeProvider } from "@/shared/app-infra/query-provider/auth-scope-context";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  USER_EMAIL_COOKIE_KEY,
} from "@/shared/config/authToken";
import { AppChromeOffset } from "@/shared/ui/app-chrome-offset.client";
import { Footer } from "@/shared/ui/footer/footer";
import { AppToaster } from "@/shared/ui/toaster.client";
import { GlobalNav } from "@/widgets/global-nav";

export default async function MainLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value;
  const userEmail = cookieStore.get(USER_EMAIL_COOKIE_KEY)?.value?.trim();
  const isLoggedIn = Boolean(accessToken || refreshToken);
  const authScope = isLoggedIn ? userEmail || "authenticated" : "guest";

  return (
    <AuthScopeProvider value={authScope}>
      <AppChromeOffset>
        <a href="#main-content" className="skip-link">
          본문으로 바로가기
        </a>
        <GlobalNav isLoggedIn={isLoggedIn} />
        <main id="main-content" className="flex flex-1 flex-col bg-white">
          {children}
        </main>
        <Footer />
      </AppChromeOffset>
      <AppToaster />
    </AuthScopeProvider>
  );
}
