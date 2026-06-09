import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button/button";
import { Input } from "../input/input";
import {
  DialogShell,
  DialogShellDescription,
  DialogShellTitle,
} from "./dialog-shell";

const meta = {
  title: "UI/DialogShell",
  component: DialogShell,
  args: {
    isOpen: true,
    onClose: () => undefined,
    children: (
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <DialogShellTitle asChild>
            <h3 className="text-lg font-black text-content-primary">사주 추가</h3>
          </DialogShellTitle>
          <DialogShellDescription asChild>
            <p className="text-saju-body text-content-subtle">
              DialogShell 위에 폼, 확인, 안내 콘텐츠를 자유롭게 올릴 수 있습니다.
            </p>
          </DialogShellDescription>
        </div>
        <Input placeholder="이름을 입력하세요" />
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1">
            취소
          </Button>
          <Button type="button" className="flex-[2]">
            다음 사주 입력
          </Button>
        </div>
      </div>
    ),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DialogShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCloseButton: Story = {
  args: {
    showCloseButton: false,
  },
};

export const Locked: Story = {
  args: {
    isCloseDisabled: true,
    children: (
      <div className="space-y-3 pr-6">
        <DialogShellTitle asChild>
          <h3 className="text-lg font-black text-content-primary">처리 중</h3>
        </DialogShellTitle>
        <DialogShellDescription asChild>
          <p className="text-saju-body text-content-subtle">
            비동기 작업 중에는 바깥 클릭과 닫기 버튼을 막을 수 있습니다.
          </p>
        </DialogShellDescription>
      </div>
    ),
  },
};
