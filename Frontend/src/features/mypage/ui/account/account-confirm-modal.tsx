import type { AccountModalType } from "../../hooks/useAccountActions";

const MODAL_CONFIG: Record<
  Exclude<AccountModalType, null>,
  {
    icon: string;
    title: string;
    desc: React.ReactNode;
    confirmLabel: string;
    confirmClass: string;
  }
> = {
  logout: {
    icon: "🔓",
    title: "로그아웃 하시겠어요?",
    desc: (
      <>
        현재 기기에서 로그아웃됩니다.
        <br />
        언제든지 다시 로그인할 수 있습니다.
      </>
    ),
    confirmLabel: "로그아웃",
    confirmClass: "border-2 border-black bg-[rgb(250_248_242)] text-[#0d0d0d]",
  },
  withdraw: {
    icon: "⚠️",
    title: "정말 탈퇴하시겠어요?",
    desc: (
      <>
        탈퇴 시{" "}
        <strong className="text-[#0d0d0d]">
          모든 운세 데이터, 코인, 구매 내역
        </strong>
        이
        <br />
        영구적으로 삭제됩니다. 되돌릴 수 없습니다.
      </>
    ),
    confirmLabel: "탈퇴하기",
    confirmClass: "border-2 border-black bg-red-500 text-white",
  },
};

type Props = {
  modalType: AccountModalType;
  isSubmitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export function AccountConfirmModal({
  modalType,
  isSubmitting,
  errorMessage,
  onClose,
  onConfirm,
}: Props) {
  if (!modalType) return null;

  const config = MODAL_CONFIG[modalType];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="mx-5 w-full max-w-sm rounded-md border-2 border-black bg-[#FFFEF9] p-6 text-center"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        <div className="mb-3 text-4xl">{config.icon}</div>
        <h2
          className="mb-2 font-bold text-[#0d0d0d]"
          style={{
            fontFamily: "var(--font-jua, sans-serif)",
            fontSize: "18px",
          }}
        >
          {config.title}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-[#0d0d0d]/55">
          {config.desc}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="btn-saju flex-1 rounded-sm border-2 border-black bg-[rgb(250_248_242)] py-2.5 text-sm font-bold text-[#0d0d0d]"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className={`btn-saju flex-1 rounded-sm py-2.5 text-sm font-bold ${config.confirmClass}`}
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            {isSubmitting ? "처리 중..." : config.confirmLabel}
          </button>
        </div>
        {errorMessage ? (
          <p className="mt-3 text-xs font-medium text-red-500">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
