import { Button, FormMessage, Input } from "@saju/ui";
import type { NotificationType } from "@/features/notification/type/types";

export type NotificationFormValues = {
  title: string;
  content: string;
  type: NotificationType | "";
};

const TYPE_OPTIONS: { value: NotificationType; label: string }[] = [
  { value: "ANNOUNCEMENT", label: "공지사항" },
  { value: "NEW_SERVICE", label: "신규 서비스" },
];

type NotificationCreateFormProps = {
  values: NotificationFormValues;
  errorMessage: string | null;
  isPending: boolean;
  onChange: (field: keyof NotificationFormValues, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function NotificationCreateForm({
  values,
  errorMessage,
  isPending,
  onChange,
  onSubmit,
}: NotificationCreateFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-content-primary">
          알림 유형 <span className="text-status-danger">*</span>
        </label>
        <div className="flex gap-3">
          {TYPE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                values.type === opt.value
                  ? "border-saju-border bg-saju-light text-saju-primary"
                  : "border-surface-border bg-white text-content-secondary hover:border-saju-border hover:bg-saju-soft"
              }`}
            >
              <input
                type="radio"
                name="type"
                value={opt.value}
                checked={values.type === opt.value}
                onChange={(e) => onChange("type", e.target.value)}
                className="sr-only"
                disabled={isPending}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-content-primary">
          제목 <span className="text-status-danger">*</span>
        </label>
        <Input
          placeholder="알림 제목을 입력하세요 (최대 200자)"
          maxLength={200}
          value={values.title}
          onChange={(e) => onChange("title", e.target.value)}
          disabled={isPending}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-content-primary">
          내용 <span className="text-status-danger">*</span>
        </label>
        <textarea
          placeholder="알림 내용을 입력하세요"
          value={values.content}
          onChange={(e) => onChange("content", e.target.value)}
          disabled={isPending}
          required
          rows={4}
          className="w-full rounded-xl border border-border-default bg-white px-3 py-2.5 text-sm text-content-primary outline-none transition-colors placeholder:text-content-subtle focus:border-saju-primary focus:shadow-saju-sm disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {errorMessage ? (
        <FormMessage variant="error">{errorMessage}</FormMessage>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "등록 중..." : "알림 등록"}
        </Button>
      </div>
    </form>
  );
}
