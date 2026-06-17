import { useMutation } from "@tanstack/react-query";
import { toast } from "@saju/ui";

import { createNotificationOnClient } from "@/entities/notification/client/createNotificationOnClient";

export function useNotificationCreate(onSuccess?: () => void) {
  return useMutation({
    mutationFn: createNotificationOnClient,
    onSuccess: () => {
      toast.success("알림이 등록되었습니다.");
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "등록에 실패했습니다.");
    },
  });
}
