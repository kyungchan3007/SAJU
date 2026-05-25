import type { SVGProps } from "react";

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
