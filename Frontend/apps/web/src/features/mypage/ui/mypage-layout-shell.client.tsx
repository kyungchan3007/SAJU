import { MypageSidebar } from "@/features/mypage/ui/mypage/mypage-sidebar";
import type { MypageUser } from "../type/types";

export function MypageLayoutShell({
  children,
  initialProfile,
}: {
  children: React.ReactNode;
  initialProfile: MypageUser;
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1152px] px-4 py-8 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="w-full lg:sticky lg:top-24 lg:w-80 lg:shrink-0">
            <MypageSidebar user={initialProfile} />
          </aside>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
