import { LoginPanel } from "@/features/auth";
import { normalizePostLoginRedirect } from "@/shared/api/auth/postLoginRedirect";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = normalizePostLoginRedirect(params.next);

  return (
    <main className="container flex min-h-dvh items-center justify-center py-10">
      <div className="w-full max-w-[420px]">
        <LoginPanel nextPath={nextPath} />
      </div>
    </main>
  );
}
