type Props = {
  message: string;
};

export function TraditionalFortuneEmptyState({ message }: Props) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-md border-2 border-black bg-[#FFFEF9] py-14 text-center"
      style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
    >
      <span className="text-[44px]">🔮</span>
      <span className="font-display text-[17px]">데이터가 없습니다</span>
      <p className="text-[13px] leading-relaxed text-[rgba(13,13,13,0.45)]">
        {message}
      </p>
    </div>
  );
}
