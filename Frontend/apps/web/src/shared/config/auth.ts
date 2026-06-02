import "server-only";

import type { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

import { getServerEnv } from "@/shared/config/env";

function getProviders() {
  const serverEnv = getServerEnv();

  if (!serverEnv.KAKAO_CLIENT_ID || !serverEnv.KAKAO_CLIENT_SECRET) {
    return [];
  }

  return [
    KakaoProvider({
      clientId: serverEnv.KAKAO_CLIENT_ID,
      clientSecret: serverEnv.KAKAO_CLIENT_SECRET,
    }),
  ];
}

export const authOptions: NextAuthOptions = {
  providers: getProviders(),
  secret: getServerEnv().NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.kakaoAccessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }

      session.kakaoAccessToken = token.kakaoAccessToken;

      return session;
    },
  },
};
