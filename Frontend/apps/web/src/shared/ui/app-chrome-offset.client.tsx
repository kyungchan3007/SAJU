import type { ReactNode } from "react";

type AppChromeOffsetProps = {
  children: ReactNode;
};

export function AppChromeOffset({ children }: AppChromeOffsetProps) {
  return <div className="flex min-h-dvh flex-col pt-14 pb-16 md:pb-0">{children}</div>;
}
