import { type FiveElementsBalance } from "@/shared/model/five-elements/model";
import {
  getJeongtongsajuHeroImageSrc,
  getOrderedHeroElements,
  getYongshinDisplayInfo,
} from "@/features/mypage/model/jeongtongsaju-hero";
import { SajuHeroCardShell } from "@/shared/ui/saju-hero-card-shell";
import { TraitMiniCard } from "@/shared/ui/trait-mini-card";

type Traits = {
  summaryZodiac?: string;
  summaryStrength?: string;
  geokguk?: string;
  summaryPillars?: string;
};

type Props = {
  traits: Traits;
  fiveElements: FiveElementsBalance;
  gender: string;
  nickname?: string;
};

export function JeongtongsajuHero({
  traits,
  fiveElements,
  gender,
  nickname,
}: Props) {
  const { elements, yongshinPrimary, yongshinSecondary } = fiveElements;
  const imgSrc = getJeongtongsajuHeroImageSrc(yongshinPrimary, gender);
  const primaryInfo = getYongshinDisplayInfo(yongshinPrimary);
  const secondaryInfo = getYongshinDisplayInfo(yongshinSecondary);
  const orderedElements = getOrderedHeroElements(elements);

  return (
    <SajuHeroCardShell imageSrc={imgSrc} imageAlt="사주 프로필 이미지">
      <div className="relative z-10 mx-auto grid min-h-[420px] grid-cols-1 gap-6 p-6 md:h-full md:grid-cols-[280px_1fr_260px] md:gap-0">
        {/* LEFT: 타이틀 + 흰 카드들 */}
        <div className="flex flex-col justify-center gap-3">
          {/* 타이틀 */}
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#A5A3F7">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
              </svg>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C4C2FF]">
                정통사주
              </span>
            </div>
            <p className="text-[15px] font-semibold leading-[1.2] text-white/80">
              {nickname ?? "사용자"}님의
            </p>
            <h1 className="text-[22px] font-black leading-tight text-white">
              명식 리포트
            </h1>
          </div>

          {/* 띠 / 신강신약 / 격국 */}
          <div className="flex flex-col gap-1.5">
            {/* 신강/신약 — 단독 full width */}
            {traits.summaryStrength && (
              <TraitMiniCard
                label="신강/신약"
                value={traits.summaryStrength}
                bg="#FEF3C7"
                className="border border-white/40 bg-white/25 backdrop-blur-md"
                variant="dark"
              />
            )}
            {/* 띠 + 격국 — 나란히 */}
            {(traits.summaryZodiac || traits.geokguk) && (
              <div className="flex gap-1.5">
                {traits.summaryZodiac && (
                  <TraitMiniCard
                    label="띠"
                    value={traits.summaryZodiac}
                    bg="#FFF3E8"
                    className="border border-white/40 bg-white/25 backdrop-blur-md"
                    variant="dark"
                  />
                )}
                {traits.geokguk && (
                  <TraitMiniCard
                    label="격국"
                    value={traits.geokguk}
                    bg="#F1F5F9"
                    className="border border-white/40 bg-white/25 backdrop-blur-md"
                    variant="dark"
                  />
                )}
              </div>
            )}
          </div>

          {/* 사주 요약 */}
          {traits.summaryPillars && (
            <div className="rounded-lg border border-white/40 bg-white/25 px-3 py-2.5 backdrop-blur-md">
              <div className="mb-1 text-[10px] text-white/60">사주 요약</div>
              <div className="text-[12px] font-semibold tracking-wide text-white/90">
                {traits.summaryPillars}
              </div>
            </div>
          )}

          {/* 용신 / 보조 용신 */}
          {(primaryInfo || secondaryInfo) && (
            <div className="flex gap-1.5">
              {primaryInfo && (
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/40 bg-white/25 px-3 py-2.5 backdrop-blur-md">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[13px]"
                    style={{ background: primaryInfo.bg }}
                  >
                    {primaryInfo.emoji}
                  </div>
                  <div>
                    <div className="text-[10px] text-white/60">용신</div>
                    <div className="text-[14px] font-black text-white">
                      {primaryInfo.ko}({primaryInfo.hanja})
                    </div>
                  </div>
                </div>
              )}
              {secondaryInfo && (
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/40 bg-white/25 px-3 py-2.5 backdrop-blur-md">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[13px]"
                    style={{ background: secondaryInfo.bg }}
                  >
                    {secondaryInfo.emoji}
                  </div>
                  <div>
                    <div className="text-[10px] text-white/60">보조 용신</div>
                    <div
                      className="text-[14px] font-black"
                      style={{ color: secondaryInfo.color }}
                    >
                      {secondaryInfo.ko}({secondaryInfo.hanja})
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CENTER: 이미지 통과 영역 */}
        <div />

        {/* RIGHT: 오행 분포 + 풀이 예고 */}
        <div className="flex flex-col justify-center gap-2.5 py-3">
          {/* 오행 분포 카드 */}
          {orderedElements.length > 0 && (
            <div className="rounded-2xl border border-white/40 bg-white/25 p-3 backdrop-blur-md">
              <div className="mb-2 text-[11px] font-bold text-white">
                오행 분포
              </div>
              <div className="flex flex-col gap-1.5">
                {orderedElements.map(({ key, val, cfg }) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="w-5 text-[10px] text-white/80">{key}</span>
                    <div className="h-[5px] flex-1 rounded-full bg-white/30">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${val}%`, background: cfg.color }}
                      />
                    </div>
                    <span className="w-8 text-right text-[10px] text-white/70">
                      {val.toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
              {(primaryInfo || secondaryInfo) && (
                <div className="mt-2.5 flex gap-1.5 border-t border-white/20 pt-2.5">
                  {primaryInfo && (
                    <div className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/30 bg-white/20 px-2 py-1">
                      <span className="text-[10px] text-white/60">용신</span>
                      <span className="text-[12px] font-bold text-white">
                        {primaryInfo.ko}
                      </span>
                    </div>
                  )}
                  {secondaryInfo && (
                    <div className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/30 bg-white/20 px-2 py-1">
                      <span className="text-[10px] text-white/60">보조</span>
                      <span className="text-[12px] font-bold text-white">
                        {secondaryInfo.ko}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 풀이 예고 카드 */}
          <div
            className="rounded-2xl border border-white/20 p-3 shadow-[0_2px_12px_rgba(89,86,233,0.32)] backdrop-blur-md"
            style={{
              background:
                "linear-gradient(135deg, rgba(55,48,163,0.75), rgba(124,58,237,0.75))",
            }}
          >
            <div className="mb-1 text-[10px] tracking-wide text-white/65">
              정통사주 풀이
            </div>
            <div className="text-[12px] font-bold leading-snug text-white">
              연간 운세 · 재물 · 애정
              <br />
              직업 · 건강 분석
            </div>
            <div className="mt-2 text-[10px] text-white/70">
              아래 버튼으로 상세 분석 확인 ↓
            </div>
          </div>
        </div>
      </div>
    </SajuHeroCardShell>
  );
}
