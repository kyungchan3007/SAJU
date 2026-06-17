import { Card } from "@saju/ui";
import { NotificationCreateFormContainer } from "@/features/notification/ui/notification-create-form-container.client";

export function NotificationSection() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="mb-3 text-base font-bold text-content-primary">알림 등록</h3>
        <Card variant="elevated" className="p-6">
          <NotificationCreateFormContainer />
        </Card>
      </section>
    </div>
  );
}
