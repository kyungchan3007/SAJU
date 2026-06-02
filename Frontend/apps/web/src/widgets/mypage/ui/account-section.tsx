"use client";

import { useAccountActions } from "@/features/mypage/hooks/useAccountActions";
import {
  AccountLoginInfo,
  AccountLogoutRow,
  AccountWithdrawRow,
  AccountConfirmModal,
} from "@/features/mypage";

type Props = {
  email: string;
};

export function AccountSection({ email }: Props) {
  const { modalType, isSubmitting, errorMessage, openModal, closeModal, confirm } =
    useAccountActions();

  return (
    <>
      <div className="flex flex-col gap-4">
        <AccountLoginInfo email={email} />
        <AccountLogoutRow onLogout={() => openModal("logout")} />
        <AccountWithdrawRow onWithdraw={() => openModal("withdraw")} />
      </div>

      <AccountConfirmModal
        modalType={modalType}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onClose={closeModal}
        onConfirm={confirm}
      />
    </>
  );
}
