import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Select } from "./select";

const meta = {
  title: "UI/Select",
  component: Select,
  args: {
    children: (
      <>
        <option value="">선택하세요</option>
        <option value="solar">양력</option>
        <option value="lunar">음력</option>
      </>
    ),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { status: "error" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
