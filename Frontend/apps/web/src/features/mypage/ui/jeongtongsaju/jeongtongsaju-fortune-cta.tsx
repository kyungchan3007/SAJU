type Props = {
  onShowFortune: () => void;
};

export function JeongtongsajuFortuneCta({ onShowFortune }: Props) {
  return (
    <div className="rounded-3xl p-8 text-center">
      <h2 className="mb-2 text-[20px] font-black">
        더 자세한 분석이 필요하신가요?
      </h2>
      <p className="mb-5 text-[13px] text-black/50">
        올해 운세 풀이 · 재물 · 애정 · 직업 · 건강 종합 분석
      </p>
      <button
        type="button"
        onClick={onShowFortune}
        className="inline-flex items-center gap-2 rounded-full bg-[#5956E9] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition hover:opacity-90"
      >
        정통사주 풀이 보기 →
      </button>
    </div>
  );
}
