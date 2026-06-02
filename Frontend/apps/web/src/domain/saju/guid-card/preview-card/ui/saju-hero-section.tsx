import type { DailyEnergyResponse, SajuProfileResponse } from "@/generated/api";
import { getSajuHeroImageSrc } from "@/shared/model/saju-hero-image/utils";
import { SajuHeroCardShell } from "@/shared/ui/saju-hero-card-shell";
import { formatKoreanDateWithWeekday } from "@/shared/utils/date";
import { getWeakElementDisplayInfo } from "@/shared/utils/weakElement";

type SajuHeroSectionProps = {
  dailyResult?: DailyEnergyResponse | null;
  profile?: SajuProfileResponse | null;
};

export function SajuHeroSection({
  dailyResult,
  profile,
}: SajuHeroSectionProps) {
  const weakElement = dailyResult?.weakElement ?? "";
  const gender = profile?.gender ?? "FEMALE";
  const nickname = profile?.nickname ?? "사용자";
  const imageSrc = getSajuHeroImageSrc("water", gender);

  return (
    <SajuHeroCardShell imageSrc={imageSrc} imageAlt="오늘의 운세 인물">
      <div className="relative z-10 flex min-h-[420px] flex-col gap-6 px-6 py-8 md:h-full md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
        <SajuHeroTitle
          nickname={nickname}
          targetDate={dailyResult?.targetDate}
        />
        <div className="hidden md:block md:flex-1" />
        <SajuHeroMessage
          message={dailyResult?.dailyMessage}
          weakElement={weakElement}
        />
      </div>
    </SajuHeroCardShell>
  );
}

function SajuHeroTitle({
  nickname,
  targetDate,
}: {
  nickname: string;
  targetDate?: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:w-[240px] md:shrink-0">
      <SajuHeroBadge label="오늘의 사주" />
      <div>
        <p className="text-[17px] font-semibold leading-[1.2] text-white/80">
          {nickname}님의
        </p>
        <h1 className="mt-1 text-[36px] font-black leading-[1.05] text-white md:text-[40px]">
          오늘의 운세
        </h1>
      </div>
      <p className="text-[13px] leading-[1.8] text-white/70">
        당신의 사주를 바탕으로 분석한
        <br />
        오늘의 에너지 흐름과 조언을 확인하세요.
      </p>
      <SajuHeroDateChip date={targetDate} />
    </div>
  );
}

function SajuHeroBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="11" height="11" viewBox="0 0 24 24" className="fill-saju-accent">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
      <span className="text-[12px] font-bold tracking-[0.06em] text-saju-accent">
        {label}
      </span>
    </div>
  );
}

function SajuHeroDateChip({ date }: { date?: string }) {
  return (
    <div className="flex w-fit items-center gap-2 rounded-[10px] border border-white/20 bg-white/15 px-3 py-1.5 backdrop-blur-sm">
      <svg
        width="12"
        height="12"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      <span className="text-[12.5px] font-semibold text-white">
        {formatKoreanDateWithWeekday(date)}
      </span>
    </div>
  );
}

function SajuHeroMessage({
  message,
  weakElement,
}: {
  message?: string;
  weakElement?: string;
}) {
  const weakElementInfo = getWeakElementDisplayInfo(weakElement);

  return (
    <div className="flex flex-col gap-2.5 md:w-[240px] md:shrink-0">
      <div className="flex items-center gap-1.5 text-[12px] font-bold text-white/75">
        <svg
          width="12"
          height="12"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        오늘의 한마디
      </div>
      <p className="text-[13.5px] leading-[1.9] text-white/95">
        {message ?? "-"}
      </p>
      {weakElementInfo && <SajuWeakElementCard info={weakElementInfo} />}
      <p className="text-[12px] font-semibold leading-[1.75] text-white/70">
        &ldquo;오늘의 흐름을 잘 활용해
        <br />
        편안하고 안정적인 하루 보내세요.&rdquo;
      </p>
    </div>
  );
}

function SajuWeakElementCard({
  info,
}: {
  info: NonNullable<ReturnType<typeof getWeakElementDisplayInfo>>;
}) {
  return (
    <div className="flex flex-col gap-0.5 rounded-[10px] border border-white/20 bg-white/10 px-3 py-2.5 backdrop-blur-sm">
      <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-white/60">
        나의 사주
      </span>
      <span className="mt-0.5 text-base font-extrabold text-white">
        {info.ko} ({info.hanja})
      </span>
      <span className="mt-0.5 text-[12px] leading-[1.65] text-white/75">
        오늘은 {info.ko} 기운 보완이 필요한 날이에요.
      </span>
    </div>
  );
}
