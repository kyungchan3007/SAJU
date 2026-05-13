"use client";

type Props = {
  partnerName: string | null;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function PartnerDeleteModal({
  partnerName,
  isPending,
  onClose,
  onConfirm,
}: Props) {
  if (!partnerName) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(13,13,13,0.45)] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="mx-5 w-full max-w-[360px] rounded-lg border-2 border-black bg-[#FDFCF8] p-6 text-center"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        <div className="mb-3 text-[36px]">🗑️</div>
        <div className="mb-2 font-display text-[17px]">
          &apos;{partnerName}&apos; 사주를 삭제할까요?
        </div>
        <p className="mb-5 text-[13px] leading-relaxed text-[#7a7570]">
          해당 사주 정보가 영구 삭제됩니다.
          <br />
          이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 rounded-sm border-2 border-black bg-[#F0EDE6] py-2.5 font-display text-[14px] disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="flex-[2] rounded-sm border-2 border-black bg-red-500 py-2.5 font-display text-[14px] text-white disabled:opacity-50"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            {isPending ? "삭제 중..." : "삭제하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
