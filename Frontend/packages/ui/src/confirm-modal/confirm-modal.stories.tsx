import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ConfirmModal } from "./confirm-modal";

const meta = {
  title: "UI/ConfirmModal",
  component: ConfirmModal,
  args: {
    isOpen: true,
    title: "로그아웃할까요?",
    description: "현재 기기에서 로그아웃됩니다.",
    confirmLabel: "로그아웃",
    onClose: () => undefined,
    onConfirm: () => undefined,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    title: "계정을 삭제할까요?",
    description: "삭제 후에는 계정 정보를 복구할 수 없습니다.",
    confirmLabel: "삭제하기",
    variant: "destructive",
  },
};

export const Pending: Story = {
  args: {
    isPending: true,
    pendingLabel: "처리 중...",
  },
};

export const WithError: Story = {
  args: {
    errorMessage: "요청을 처리하지 못했습니다. 다시 시도해주세요.",
  },
};
