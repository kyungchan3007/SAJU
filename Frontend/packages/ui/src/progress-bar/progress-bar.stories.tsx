import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgressBar } from "./progress-bar";

const meta = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  args: {
    value: 68,
    className: "w-80",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <ProgressBar value={90} tone="success" />
      <ProgressBar value={65} tone="primary" />
      <ProgressBar value={45} tone="warning" />
      <ProgressBar value={20} tone="danger" />
      <ProgressBar value={50} tone="neutral" />
    </div>
  ),
};
