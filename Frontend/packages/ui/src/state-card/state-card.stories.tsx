import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button/button";
import {
  EmptyStateCard,
  ErrorStateCard,
  LoadingStateCard,
  StateCard,
} from "./state-card";

const meta = {
  title: "UI/StateCard",
  component: StateCard,
  args: {
    className: "w-96",
    title: "상태 카드",
    description: "조회 결과의 상태를 일관된 형태로 표시합니다.",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  render: () => (
    <div className="w-96">
      <LoadingStateCard message="분석 결과를 불러오고 있어요." />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-96">
      <EmptyStateCard
        title="저장된 정보가 없어요"
        description="새 정보를 등록하면 결과를 확인할 수 있어요."
        action={<Button size="sm">등록하기</Button>}
      />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-96">
      <ErrorStateCard
        title="결과를 불러오지 못했어요"
        description="잠시 후 다시 시도해주세요."
        action={
          <Button size="sm" variant="outline">
            다시 시도
          </Button>
        }
      />
    </div>
  ),
};
