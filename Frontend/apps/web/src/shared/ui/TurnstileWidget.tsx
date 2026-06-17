"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
const LOAD_TIMEOUT_MS = 5000;

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
  const [isVisible, setIsVisible] = useState(false);
  const onErrorRef = useRef(onError);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onErrorRef.current = onError;
    onTimeoutRef.current = onTimeout;
  });

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIsVisible(true);
      onTimeoutRef.current?.();
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={isVisible ? wrapperClassName : "h-0 overflow-hidden"}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
        onUnsupported={onUnsupported}
        onTimeout={onTimeout}
        onLoad={() => setIsVisible(true)}
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
