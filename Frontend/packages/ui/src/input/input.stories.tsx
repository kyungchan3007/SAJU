import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  args: {
    placeholder: "내용을 입력하세요",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    status: "error",
    defaultValue: "잘못된 값",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "수정할 수 없는 값",
  },
};
