type Props = {
  targetYear?: number;
};

export function TraditionalFortuneHeader({ targetYear }: Props) {
  return (
    <div>
      <h1 className="font-display text-[26px] tracking-tight">
        <h2 className="mb-4 flex items-center gap-2.5 font-display text-[22px]">
          정통사주
          {/*{targetYear && (*/}
          {/*  <span className="font-sans text-[15px] text-[rgba(13,13,13,0.45)]">*/}
          {/*    {targetYear}년*/}
          {/*  </span>*/}
          {/*)}*/}
          <span className="h-0.5 flex-1 bg-black" />
        </h2>
      </h1>
    </div>
  );
}
