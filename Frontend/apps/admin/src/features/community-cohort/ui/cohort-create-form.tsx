import { Button, FormMessage, Input } from "@saju/ui";

export type CohortCreateFormValues = {
  name: string;
  capacity: string;
  expiredAt: string;
  openChatUrl: string;
};

type CohortCreateFormProps = {
  values: CohortCreateFormValues;
  errorMessage: string | null;
  isPending: boolean;
  onChange: (field: keyof CohortCreateFormValues, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function CohortCreateForm({
  values,
  errorMessage,
  isPending,
  onChange,
  onSubmit,
}: CohortCreateFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">
            기수명 <span className="text-status-danger">*</span>
          </label>
          <Input
            placeholder="예) 2기 여름"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">
            정원 <span className="text-status-danger">*</span>
          </label>
          <Input
            type="number"
            min={1}
            placeholder="예) 30"
            value={values.capacity}
            onChange={(e) => onChange("capacity", e.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">만료일</label>
          <Input
            type="datetime-local"
            value={values.expiredAt}
            onChange={(e) => onChange("expiredAt", e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">오픈채팅 URL</label>
          <Input
            type="url"
            placeholder="https://open.kakao.com/..."
            value={values.openChatUrl}
            onChange={(e) => onChange("openChatUrl", e.target.value)}
            disabled={isPending}
          />
        </div>
      </div>

      {errorMessage ? (
        <FormMessage variant="error">{errorMessage}</FormMessage>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} size="default">
          {isPending ? "등록 중..." : "기수 등록"}
        </Button>
      </div>
    </form>
  );
}
