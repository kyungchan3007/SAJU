"use client";

type TurnstileVerificationModalProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  showSpinner?: boolean;
  error?: string | null;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

export function TurnstileVerificationModal({
  children,
  title,
  description,
  showSpinner = false,
  error,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: TurnstileVerificationModalProps) {
  return (
    <div
      aria-modal="true"
      aria-labelledby="turnstile-modal-title"
      role="dialog"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
    >
      <div className="w-full max-w-[340px] rounded-[28px] bg-white px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <div className="text-center">
          <p id="turnstile-modal-title" className="text-[16px] font-semibold leading-none text-[#111827]">{title}</p>
          <p className="mt-5 text-[14px] leading-[1.9] text-[#6B7280]">{description}</p>
        </div>
        {children}
        {showSpinner ? (
          <div className="mt-4 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E0DAFF] border-t-[#5956E9]" />
          </div>
        ) : null}
        {error ? (
          <p className="mt-4 text-center text-[14px] leading-[1.7] text-[#FF4D4F]">{error}</p>
        ) : null}
        {primaryActionLabel || secondaryActionLabel ? (
          <div className="mt-6 flex flex-col gap-3">
            {primaryActionLabel && onPrimaryAction ? (
              <button
                type="button"
                onClick={onPrimaryAction}
                className="h-[42px] rounded-full bg-[#5956E9] px-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#4A47D6]"
              >
                {primaryActionLabel}
              </button>
            ) : null}
            {secondaryActionLabel && onSecondaryAction ? (
              <button
                type="button"
                onClick={onSecondaryAction}
                className="h-[42px] rounded-full border border-[#D1D5DB] px-4 text-[15px] font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB]"
              >
                {secondaryActionLabel}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
