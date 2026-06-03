import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FormMessage } from "./form-message";

const meta = {
  title: "UI/FormMessage",
  component: FormMessage,
  args: {
    children: "입력 내용을 다시 확인해주세요.",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <FormMessage variant="info">안내 메시지입니다.</FormMessage>
      <FormMessage variant="success">저장이 완료되었습니다.</FormMessage>
      <FormMessage variant="warning">확인이 필요한 항목입니다.</FormMessage>
      <FormMessage variant="error">입력 내용을 다시 확인해주세요.</FormMessage>
    </div>
  ),
};
