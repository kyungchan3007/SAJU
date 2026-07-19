import { Button, FormMessage, Input } from "@saju/ui";

export type CohortCreateFormValues = {
  name: string;
  capacity: string;
  expiredAt: string;
  location: string;
  maleFeeAmount: string;
  femaleFeeAmount: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountHolder: string;
  finalizationDate: string;
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
          <label className="text-sm font-semibold text-content-primary">
            소개팅 날짜 <span className="text-status-danger">*</span>
          </label>
          <Input
            type="datetime-local"
            value={values.expiredAt}
            onChange={(e) => onChange("expiredAt", e.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">참가인원 확정일</label>
          <Input
            type="datetime-local"
            value={values.finalizationDate}
            onChange={(e) => onChange("finalizationDate", e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">소개팅 장소</label>
          <Input
            placeholder="예) 강남"
            value={values.location}
            onChange={(e) => onChange("location", e.target.value)}
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">
            남성 참가비 <span className="text-status-danger">*</span>
          </label>
          <Input
            type="number"
            min={0}
            placeholder="예) 50000"
            value={values.maleFeeAmount}
            onChange={(e) => onChange("maleFeeAmount", e.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">
            여성 참가비 <span className="text-status-danger">*</span>
          </label>
          <Input
            type="number"
            min={0}
            placeholder="예) 30000"
            value={values.femaleFeeAmount}
            onChange={(e) => onChange("femaleFeeAmount", e.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">
            입금 은행명 <span className="text-status-danger">*</span>
          </label>
          <Input
            placeholder="예) 카카오뱅크"
            value={values.bankName}
            onChange={(e) => onChange("bankName", e.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">
            입금 계좌번호 <span className="text-status-danger">*</span>
          </label>
          <Input
            placeholder="예) 3333-00-0000000"
            value={values.bankAccountNumber}
            onChange={(e) => onChange("bankAccountNumber", e.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-content-primary">
            입금 예금주 <span className="text-status-danger">*</span>
          </label>
          <Input
            placeholder="예) 사주"
            value={values.bankAccountHolder}
            onChange={(e) => onChange("bankAccountHolder", e.target.value)}
            disabled={isPending}
            required
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
