"use client";

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};

export function SegmentedButtonGroup<T extends string>({
  value,
  options,
  onChange,
  className = "",
  activeClassName = "bg-[#5956E9] text-white",
  inactiveClassName = "bg-white text-slate-400 hover:bg-[#F0EEFF] hover:text-[#5956E9]",
}: Props<T>) {
  return (
    <div
      className={`flex overflow-hidden rounded-xl border border-[#E5E7EB] ${className}`.trim()}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex-1 border-r border-[#E5E7EB] py-2.5 text-[13px] font-bold transition-all last:border-r-0 ${
            value === option.value ? activeClassName : inactiveClassName
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
