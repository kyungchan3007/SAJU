import type { Metadata } from "next";
import { NotificationSection } from "@/widgets/notification-section/ui/notification-section";

export const metadata: Metadata = { title: "알림 관리" };

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-content-primary">알림 관리</h2>
        <p className="mt-1 text-sm text-content-muted">전체 사용자에게 공지사항 또는 신규 서비스 알림을 등록합니다.</p>
      </div>
      <NotificationSection />
    </div>
  );
}
