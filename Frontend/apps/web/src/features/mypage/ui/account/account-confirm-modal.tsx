import { AlertTriangle, LogOut } from "lucide-react";
import type { AccountModalType } from "../../hooks/useAccountActions";
import { ConfirmModal } from "@/shared/ui/confirm-modal";

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
  if (modalType === "logout") {
    return (
      <ConfirmModal
        isOpen
        icon={<LogOut size={26} color="#5956E9" />}
        title="로그아웃 하시겠어요?"
        description={
          <>
            현재 기기에서 로그아웃됩니다.
            <br />
            언제든지 다시 로그인할 수 있습니다.
          </>
        }
        confirmLabel="로그아웃"
        confirmVariant="primary"
        isLoading={isSubmitting}
        errorMessage={errorMessage}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
  }

  if (modalType === "withdraw") {
    return (
      <ConfirmModal
        isOpen
        icon={<AlertTriangle size={26} color="#EF4444" />}
        title="정말 탈퇴하시겠어요?"
        description={
          <>
            탈퇴 시{" "}
            <strong className="font-bold text-[#374151]">
              모든 운세 데이터, 코인, 구매 내역
            </strong>
            이
            <br />
            영구적으로 삭제됩니다. 되돌릴 수 없습니다.
          </>
        }
        confirmLabel="탈퇴하기"
        confirmVariant="danger"
        isLoading={isSubmitting}
        errorMessage={errorMessage}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
  }

  return null;
}
