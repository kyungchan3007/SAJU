import Image from "next/image";
import type { PartnerResponse, SajuProfileResponse } from "@/generated/api";
import {
  formatBirthDate,
  formatGender,
  getMatchingImageSrc,
  getPartnerTinImageSrc,
} from "@/features/compatibility/model/compatibility";

type Props = {
  myProfile?: SajuProfileResponse | null;
  partner: PartnerResponse;
};

export function CompatibilityResultHeader({ myProfile, partner }: Props) {
  const myDesc = [
    myProfile?.birthDate ? formatBirthDate(myProfile.birthDate) : null,
    myProfile?.gender ? formatGender(myProfile.gender) : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const partnerDesc = [
    partner.birthDate ? formatBirthDate(partner.birthDate) : null,
    partner.gender ? formatGender(partner.gender) : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* 상단 라벨 */}
      <div className="mb-4 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl"
          style={{ background: "#F0EEFF" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#5956E9"
            stroke="none"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <span className="text-[15px] font-extrabold text-[#111827]">
          궁합 대상
        </span>
      </div>

      {/* 두 사람 카드 */}
      <div className="relative grid grid-cols-2 gap-3">
        {/* 내 카드 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="relative h-[250px] w-full overflow-hidden rounded-[18px] shadow-md sm:h-[350px]">
            <Image
              src={getMatchingImageSrc(myProfile?.gender)}
              alt="나"
              fill
              sizes="(max-width: 768px) 45vw, 330px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3">
              <p className="text-[13px] font-black text-white">나</p>
            </div>
          </div>
          {myDesc && (
            <p className="text-center text-[11px] leading-[1.6] text-[#6B7280]">
              {myDesc}
            </p>
          )}
        </div>

        {/* VS 배지 */}
        <div
          className="absolute left-1/2 top-[175px] z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
          style={{ border: "1.5px solid #E0DAFF" }}
        >
          <span className="text-[10px] font-black text-[#5956E9]">VS</span>
        </div>

        {/* 파트너 카드 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="relative h-[250px] w-full overflow-hidden rounded-[18px] shadow-md sm:h-[350px]">
            <Image
              src={getPartnerTinImageSrc(partner.gender)}
              alt={partner.name ?? "상대방"}
              fill
              sizes="(max-width: 768px) 45vw, 330px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3">
              <p className="text-[13px] font-black text-white">
                {partner.name}
              </p>
            </div>
          </div>
          {partnerDesc && (
            <p className="text-center text-[11px] leading-[1.6] text-[#6B7280]">
              {partnerDesc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
