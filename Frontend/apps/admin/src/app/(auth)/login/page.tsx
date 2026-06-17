import type { Metadata } from "next";
import { LoginCard } from "@/features/auth/ui/login-card";

export const metadata: Metadata = { title: "로그인" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-page px-4">
      <div className="w-full max-w-sm">
        <LoginCard />
      </div>
    </main>
  );
}
