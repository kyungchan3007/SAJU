import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Card } from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  args: {
    className: "w-72 p-5",
    children: (
      <>
        <p className="text-saju-section font-bold">카드 제목</p>
        <p className="mt-2 text-saju-body text-content-muted">
          공용 카드 표면과 테두리, 그림자 상태를 확인합니다.
        </p>
      </>
    ),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Soft: Story = {
  args: { variant: "soft" },
};

export const Elevated: Story = {
  args: { variant: "elevated" },
};

export const Selected: Story = {
  args: { variant: "selected" },
};

export const Interactive: Story = {
  args: { interactive: true },
};
