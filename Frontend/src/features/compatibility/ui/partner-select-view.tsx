"use client";

import type { SajuProfileResponse, PartnerResponse } from "@/generated/api";
import {
  formatBirthDate,
  formatGender,
} from "@/features/compatibility/model/compatibility";
import { getPartnerAvatar } from "@/features/mypage/model/partner";

type Props = {
  myProfile: SajuProfileResponse | null | undefined;
  partners: PartnerResponse[];
  selectedPartnerId: number | null;
  onSelectPartner: (id: number) => void;
  onShowResult: () => void;
  isLoadingResult: boolean;
};

export function PartnerSelectView({
  myProfile,
  partners,
  selectedPartnerId,
  onSelectPartner,
  onShowResult,
  isLoadingResult,
}: Props) {
  const myDesc = [
    myProfile?.birthDate ? formatBirthDate(myProfile.birthDate) : null,
    myProfile?.gender ? formatGender(myProfile.gender) : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex flex-col gap-4">
      {/* 나의 사주 */}
      <div
        className="overflow-hidden rounded-sm border-2 border-black bg-[#FDFCF8]"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        <div className="border-b-2 border-black bg-[#F0EDE6] px-5 py-3 font-display text-[15px]">
          나의 사주
        </div>
        <div className="flex items-center gap-4 bg-[rgb(253,251,240)] px-5 py-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] border-2 border-black bg-[#F0EDE6] text-[26px]"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            🧑
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-display text-[16px]">나</span>
            {myDesc && (
              <span className="text-[12px] text-[#7a7570]">{myDesc}</span>
            )}
          </div>
        </div>
      </div>

      {/* 상대 선택 */}
      <div
        className="rounded-sm border-2 border-black bg-[#FDFCF8]"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        <div className="flex items-center justify-between border-b-2 border-black bg-[#F0EDE6] px-5 py-3 font-display text-[15px]">
          <span>상대 선택</span>
          <span className="font-sans text-[12px] font-semibold text-[#7a7570]">
            {selectedPartnerId ? "1명 선택" : "선택 전"}
          </span>
        </div>

        <div className="p-5">
          {partners.length === 0 ? (
            <div className="flex flex-col items-center gap-2.5 py-10 text-center">
              <span className="text-[44px]">👤</span>
              <span className="font-display text-[17px]">
                등록된 사주가 없어요
              </span>
              <p className="text-[13px] leading-relaxed text-[#7a7570]">
                사주 관리에서 가족이나 친구의 사주를
                <br />
                먼저 추가해주세요.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 pt-1">
              {partners.map((partner) => {
                const isSelected = selectedPartnerId === partner.id;
                const desc = [
                  partner.birthDate
                    ? formatBirthDate(partner.birthDate)
                    : null,
                  partner.gender ? formatGender(partner.gender) : null,
                ]
                  .filter(Boolean)
                  .join(" · ");

                return (
                  <button
                    key={partner.id}
                    type="button"
                    onClick={() => onSelectPartner(partner.id!)}
                    className="relative flex flex-col items-center gap-2"
                  >
                    {isSelected && (
                      <div
                        className="absolute -right-1.5 -top-1.5 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-[#0d0d0d] text-[11px] font-black text-white"
                        style={{ boxShadow: "0 1px 4px rgba(0,0,0,.25)" }}
                      >
                        ✓
                      </div>
                    )}
                    <div
                      className={`flex h-[72px] w-[72px] items-center justify-center rounded-xl border-2 border-black text-[32px] transition-all ${
                        isSelected
                          ? "bg-[#FFF9C2] [box-shadow:3px_3px_0_#0d0d0d]"
                          : "bg-[#F0EDE6] [box-shadow:2px_2px_0_#0d0d0d] hover:-translate-x-px hover:-translate-y-px hover:[box-shadow:3px_3px_0_#0d0d0d]"
                      }`}
                    >
                      {getPartnerAvatar(partner)}
                    </div>
                    <div className="text-center">
                      <div className="text-[12px] font-bold">
                        {partner.name}
                      </div>
                      {desc && (
                        <div className="text-[10px] text-[#7a7570]">{desc}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* VS 구분선 */}
      {selectedPartnerId && (
        <div className="flex items-center gap-2.5 px-1">
          <span className="h-[1.5px] flex-1 bg-[#d4d0c8]" />
          <span className="font-display text-[13px] text-[#7a7570]">
            나 vs {partners.find((p) => p.id === selectedPartnerId)?.name ?? "상대"}
          </span>
          <span className="h-[1.5px] flex-1 bg-[#d4d0c8]" />
        </div>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={onShowResult}
        disabled={!selectedPartnerId || isLoadingResult}
        className="flex w-full items-center justify-center gap-2 rounded-sm border-2 border-black bg-[#0d0d0d] py-[15px] font-display text-[16px] text-white transition-all disabled:cursor-not-allowed disabled:bg-[#F0EDE6] disabled:text-[#7a7570] disabled:opacity-35 disabled:[box-shadow:2px_2px_0_#0d0d0d] [box-shadow:4px_4px_0_#0d0d0d] hover:not(:disabled):-translate-x-px hover:not(:disabled):-translate-y-px hover:not(:disabled):[box-shadow:5px_5px_0_#0d0d0d]"
      >
        💑 짝궁합 보기
      </button>
    </div>
  );
}
