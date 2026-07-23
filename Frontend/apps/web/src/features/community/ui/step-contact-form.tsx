import { Button, Input } from "@/shared/ui";

import type { CommunityNicknameCheckStatus } from "@/features/community/model/community-application";
import styles from "@/features/community/ui/community.module.css";

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
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-extrabold text-white ${styles.stepIcon}`}>
          03
        </div>
        <h2 className={`font-black text-gray-900 ${styles.sectionTitle}`}>신청 정보 입력</h2>
      </div>
      <p className={`mb-5 text-gray-400 ${styles.sectionLead}`}>
        모임에서 사용할 닉네임을 입력하고 중복 확인을 눌러주세요.
      </p>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="community-nickname"
          className={`font-bold text-gray-700 ${styles.fieldLabel}`}
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
            className={`h-12 flex-1 rounded-2xl border border-gray-200 px-4 text-gray-900 placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60 ${styles.nicknameInput}`}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={onCheck}
            disabled={!canCheck}
            className={`h-12 shrink-0 rounded-2xl border px-4 font-bold disabled:cursor-not-allowed disabled:opacity-50 ${styles.nicknameCheckButton}`}
          >
            {isChecking ? "확인 중…" : "중복 확인"}
          </Button>
        </div>

        {checkStatus === "available" ? (
          <p className={`mt-0.5 font-bold ${styles.statusSuccess}`}>
            ✓ 사용 가능한 닉네임이에요
          </p>
        ) : checkStatus === "duplicate" ? (
          <p className={`mt-0.5 text-red-500 ${styles.statusSuccess}`}>
            이미 사용 중인 닉네임이에요. 다른 닉네임을 입력해주세요.
          </p>
        ) : checkStatus === "checking" ? (
          <p className={`mt-0.5 text-gray-400 ${styles.statusMuted}`}>닉네임 확인 중…</p>
        ) : hasNickname ? (
          <p className={`mt-0.5 font-semibold ${styles.statusPending}`}>
            중복 확인이 필요해요.
          </p>
        ) : null}
      </div>
      <p className={`mt-4 text-gray-400 ${styles.caption}`}>
        🔒 입력한 닉네임은 로테이션 모임 안내와 본인 확인 용도로만 사용돼요.
      </p>
    </div>
  );
}
