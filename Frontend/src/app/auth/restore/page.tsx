import { RestoreAccountPanel } from "@/features/auth/ui/restore-account-panel.client";

export default function RestorePage() {
  return (
    <main className="container flex min-h-dvh items-center justify-center py-10">
      <div className="w-full max-w-[400px]">
        <RestoreAccountPanel />
      </div>
    </main>
  );
}
