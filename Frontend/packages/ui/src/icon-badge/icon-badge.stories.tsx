import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bell, Check, Info, TriangleAlert } from "lucide-react";

import { IconBadge } from "./icon-badge";

const meta = {
  title: "UI/IconBadge",
  component: IconBadge,
  args: {
    children: <Bell className="h-4 w-4" aria-hidden="true" />,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconBadge variant="primary">
        <Bell className="h-4 w-4" aria-hidden="true" />
      </IconBadge>
      <IconBadge variant="success">
        <Check className="h-4 w-4" aria-hidden="true" />
      </IconBadge>
      <IconBadge variant="warning">
        <TriangleAlert className="h-4 w-4" aria-hidden="true" />
      </IconBadge>
      <IconBadge variant="info">
        <Info className="h-4 w-4" aria-hidden="true" />
      </IconBadge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconBadge size="sm">
        <Bell className="h-3.5 w-3.5" aria-hidden="true" />
      </IconBadge>
      <IconBadge size="md">
        <Bell className="h-4 w-4" aria-hidden="true" />
      </IconBadge>
      <IconBadge size="lg">
        <Bell className="h-5 w-5" aria-hidden="true" />
      </IconBadge>
    </div>
  ),
};
