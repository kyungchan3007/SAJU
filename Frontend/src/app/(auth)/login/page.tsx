import { LoginPanel } from "@/features/auth";

export default function LoginPage() {
  return (
    <main className="container flex min-h-dvh items-center justify-center py-10">
      <div className="w-full max-w-[420px]">
        <LoginPanel />
      </div>
    </main>
  );
}
