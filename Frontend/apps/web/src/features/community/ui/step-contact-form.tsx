import { Button, Input } from "@/shared/ui";

import type { CommunityNicknameCheckStatus } from "@/features/community/model/community-application";

type Props = {
  nickname: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  checkStatus: CommunityNicknameCheckStatus;
  isChecking: boolean;
  onCheck: () => void;
};

export function StepContactForm({
  nickname,
  onChange,
  disabled = false,
  checkStatus,
  isChecking,
  onCheck,
}: Props) {
  const hasNickname = nickname.trim().length > 0;
  const canCheck =
    !disabled && !isChecking && checkStatus !== "available" && hasNickname;

  return (
    <div>
      <div className="mb-1 flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5956E9] text-[13px] font-extrabold text-white">
          03
        </div>
        <h2 className="text-[20px] font-black text-gray-900">신청 정보 입력</h2>
      </div>
      <p className="mb-5 ml-10 text-[13px] text-gray-400">
        모임에서 사용할 닉네임을 입력하고 중복 확인을 눌러주세요.
      </p>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="community-nickname"
          className="text-[12px] font-bold text-gray-700"
        >
          사용할 닉네임
        </label>
        <div className="flex gap-2">
          <Input
            id="community-nickname"
            type="text"
            value={nickname}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || isChecking}
            placeholder="예) 햇살같은나"
            className="h-12 flex-1 rounded-2xl border-[1.5px] border-gray-200 px-4 text-gray-900 placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={onCheck}
            disabled={!canCheck}
            className="h-12 shrink-0 rounded-2xl border-[1.5px] border-[#E0DAFF] bg-white px-4 text-[13px] font-bold text-[#5956E9] hover:bg-[#F9F8FF] hover:text-[#5956E9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isChecking ? "확인 중..." : "중복 확인"}
          </Button>
        </div>

        {checkStatus === "available" ? (
          <p className="mt-0.5 text-[12px] font-bold text-[#2FA36B]">
            ✓ 사용 가능한 닉네임이에요
          </p>
        ) : checkStatus === "duplicate" ? (
          <p className="mt-0.5 text-[12px] font-bold text-red-500">
            이미 사용 중인 닉네임이에요. 다른 닉네임을 입력해주세요.
          </p>
        ) : checkStatus === "checking" ? (
          <p className="mt-0.5 text-[12px] text-gray-400">닉네임 확인 중...</p>
        ) : hasNickname ? (
          <p className="mt-0.5 text-[12px] font-semibold text-[#5956E9]">
            중복 확인이 필요해요.
          </p>
        ) : null}
      </div>
      <p className="mt-4 text-[11px] text-gray-400">
        🔒 입력한 닉네임은 로테이션 모임 안내와 본인 확인 용도로만 사용돼요.
      </p>
    </div>
  );
}
