import type { SVGProps } from "react";

// [DS] 역할: 카카오 로그인/프로필 진입 UI에서 쓰는 카카오 말풍선 아이콘.
// [DS] 현재 사용처: 로그인 패널, 프로필 진입 버튼, 웰컴 섹션 카카오 CTA.
type KakaoIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function KakaoIcon({ size = 18, ...props }: KakaoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.6 5.08 4.03 6.53L5.1 20.5a.5.5 0 0 0 .71.55l4.3-2.86A11.6 11.6 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3Z"
        fill="rgba(0,0,0,0.85)"
      />
    </svg>
  );
}
