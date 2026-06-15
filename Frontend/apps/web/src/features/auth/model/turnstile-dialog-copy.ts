export type TurnstileGateStatus = "idle" | "challenging" | "verifying";
export type TurnstileDialogVariant = "login" | "verify";

type TurnstileDialogCopy = {
  title: string;
  description: string;
};

export function getTurnstileDialogCopy(
  variant: TurnstileDialogVariant,
  status: TurnstileGateStatus,
): TurnstileDialogCopy {
  if (status === "verifying") {
    return {
      title: "보안 인증 확인 중",
      description: "인증 결과를 확인하고 있습니다. 잠시만 기다려주세요.",
    };
  }

  if (variant === "login") {
    return {
      title: "보안 인증이 필요합니다",
      description: "아래 보안 인증을 완료하면 로그인 버튼이 활성화됩니다.",
    };
  }

  return {
    title: "보안 인증이 필요합니다",
    description: "아래 보안 인증을 완료하면 원래 화면으로 돌아갑니다.",
  };
}
