// [DS] 역할: 히어로나 요약 영역에서 라벨/값/아이콘을 작게 보여주는 미니 정보 카드.
// [DS] 현재 사용처: 정통사주 히어로의 주요 속성 요약 카드.
type TraitMiniCardProps = {
  label: string;
  value: string;
  bg: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "dark";
};

export function TraitMiniCard({ label, value, bg, icon, className, variant = "default" }: TraitMiniCardProps) {
  return (
    <div
      className={`flex flex-1 items-center gap-2 rounded-lg p-2.5 ${className ?? "bg-white"}`}
      style={className ? undefined : { boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}
    >
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded"
        style={{ background: bg }}
      >
        {icon}
      </div>
      <div>
        <div className={`text-[10px] leading-none ${variant === "dark" ? "text-white/80" : "text-gray-500"}`}>{label}</div>
        <div className={`text-[12px] font-bold leading-snug ${variant === "dark" ? "text-white" : "text-gray-900"}`}>
          {value}
        </div>
      </div>
    </div>
  );
}
