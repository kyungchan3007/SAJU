"use client";

import { useEffect, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_WIDGET_MISSING_SITE_KEY } from "@/features/auth/model/turnstile-widget-errors";

type TurnstileWidgetProps = {
  onSuccess: (token: string) => void;
  onError?: (code?: string) => void;
  onExpire?: () => void;
  onUnsupported?: () => void;
  onTimeout?: () => void;
  size?: "normal" | "compact" | "flexible" | "invisible";
  appearance?: "always" | "execute" | "interaction-only";
  /** 위젯이 로드된 후 적용할 wrapper 클래스 (로드 전엔 공간 없음) */
  wrapperClassName?: string;
};

export function TurnstileWidget({
  onSuccess,
  onError,
  onExpire,
  onUnsupported,
  onTimeout,
  size = "invisible",
  appearance,
  wrapperClassName = "",
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!siteKey) {
      onError?.(TURNSTILE_WIDGET_MISSING_SITE_KEY);
    }
  }, [onError, siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    // 로드 전: h-0 + overflow-hidden으로 공간 차지 안 함
    // 로드 후: wrapperClassName 적용해서 레이아웃에 자리 잡음
    <div className={isLoaded ? wrapperClassName : "h-0 overflow-hidden"}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
        onUnsupported={onUnsupported}
        onTimeout={onTimeout}
        onLoad={() => setIsLoaded(true)}
        options={{
          size,
          appearance,
          retry: "auto",
          refreshExpired: "auto",
          refreshTimeout: "auto",
        }}
      />
    </div>
  );
}
