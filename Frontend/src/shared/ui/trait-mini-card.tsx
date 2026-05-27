type TraitMiniCardProps = {
  label: string;
  value: string;
  bg: string;
  className?: string;
  variant?: "default" | "dark";
};

export function TraitMiniCard({ label, value, bg, className, variant = "default" }: TraitMiniCardProps) {
  return (
    <div className={`flex flex-1 items-center gap-2 rounded-lg p-2.5 ${className ?? "bg-white shadow-[0_1px_5px_rgba(0,0,0,0.07)]"}`}>
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded"
        style={{ background: bg }}
      />
      <div>
        <div className={`text-[10px] leading-none ${variant === "dark" ? "text-white/60" : "text-gray-400"}`}>{label}</div>
        <div className={`text-[12px] font-bold leading-snug ${variant === "dark" ? "text-white" : "text-gray-900"}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

