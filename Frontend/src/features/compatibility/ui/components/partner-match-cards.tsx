"use client";

import Image from "next/image";
import type { PartnerResponse } from "@/generated/api";
import {
  getMatchingImageSrc,
  getPartnerTinImageSrc,
} from "@/features/compatibility/model/compatibility";

type Props = {
  myGender?: string | null;
  myDescription: string;
  selectedPartner: PartnerResponse | null;
  selectedPartnerId: number | null;
  partnerDescription: string;
  onOpenPartnerModal: () => void;
};

export function PartnerMatchCards({
  myGender,
  myDescription,
  selectedPartner,
  selectedPartnerId,
  partnerDescription,
  onOpenPartnerModal,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* 내 정보 카드 */}
      <MyProfileCard gender={myGender} description={myDescription} />

      {/* VS 배지 */}
      <div className="flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-slate-100" />
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
          style={{ border: "1.5px solid #E0DAFF" }}
        >
          <span className="text-[11px] font-black text-[#5956E9]">VS</span>
        </div>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      {/* 파트너 카드 */}
      {selectedPartnerId && selectedPartner ? (
        <SelectedPartnerCard
          partner={selectedPartner}
          description={partnerDescription}
          onClick={onOpenPartnerModal}
        />
      ) : (
        <EmptyPartnerCard onClick={onOpenPartnerModal} />
      )}
    </div>
  );
}

function MyProfileCard({
  gender,
  description,
}: {
  gender?: string | null;
  description: string;
}) {
  return (
    <div
      className="flex h-[160px] overflow-hidden rounded-[20px] bg-white shadow-md"
      style={{ border: "1.5px solid #E0DAFF" }}
    >
      {/* 이미지 */}
      <div className="relative w-36 shrink-0">
        <Image
          src={getMatchingImageSrc(gender)}
          alt="내 프로필"
          fill
          sizes="144px"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* 정보 */}
      <div className="flex flex-1 flex-col justify-between px-5 py-4">
        <div>
          <p className="text-[13px] font-bold text-[#9CA3AF]">나의 정보</p>
          <p className="mt-1 text-[22px] font-black text-[#111827]">나</p>
          {description && (
            <p className="mt-1 text-[13px] text-[#6B7280]">{description}</p>
          )}
        </div>
        <a
          href="/mypage/saju-manage"
          className="flex w-fit items-center gap-1 rounded-[8px] px-3 py-1.5 text-[12px] font-bold transition hover:opacity-80"
          style={{ background: "#F0EEFF", color: "#5956E9" }}
        >
          내 정보 →
        </a>
      </div>
    </div>
  );
}

function EmptyPartnerCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-[160px] w-full overflow-hidden rounded-[20px] border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-[#5956E9] hover:bg-[#F5F3FF]"
    >
      {/* 이미지 자리 플레이스홀더 */}
      <div className="flex w-36 shrink-0 items-center justify-center bg-slate-100 transition group-hover:bg-[#E0DAFF]">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D1D5DB"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition group-hover:stroke-[#5956E9]"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      {/* 정보 */}
      <div className="flex flex-1 flex-col justify-between px-5 py-4 text-left">
        <div>
          <p className="text-[13px] font-bold text-[#9CA3AF] transition group-hover:text-[#5956E9]">
            상대방 정보
          </p>
          <p className="mt-1 text-[17px] font-bold text-slate-300 transition group-hover:text-[#5956E9]">
            상대를 선택해주세요
          </p>
        </div>
        <span
          className="flex w-fit items-center gap-1 rounded-[8px] px-3 py-1.5 text-[12px] font-bold"
          style={{ background: "#F3F4F6", color: "#9CA3AF" }}
        >
          선택하기 →
        </span>
      </div>
    </button>
  );
}

function SelectedPartnerCard({
  partner,
  description,
  onClick,
}: {
  partner: PartnerResponse;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[160px] w-full overflow-hidden rounded-[20px] bg-white shadow-md transition hover:brightness-[0.97]"
      style={{ border: "1.5px solid #5956E9" }}
    >
      {/* 이미지 */}
      <div className="relative w-36 shrink-0">
        <Image
          src={getPartnerTinImageSrc(partner.gender)}
          alt={partner.name ?? "상대방"}
          fill
          sizes="144px"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* 정보 */}
      <div className="flex flex-1 flex-col justify-between px-5 py-4 text-left">
        <div>
          <p className="text-[13px] font-bold text-[#9CA3AF]">상대방 정보</p>
          <p className="mt-1 text-[22px] font-black text-[#111827]">
            {partner.name}
          </p>
          {description && (
            <p className="mt-1 text-[13px] text-[#6B7280]">{description}</p>
          )}
        </div>
        <span
          className="flex w-fit items-center gap-1 rounded-[8px] px-3 py-1.5 text-[12px] font-bold"
          style={{ background: "#F0EEFF", color: "#5956E9" }}
        >
          변경하기 →
        </span>
      </div>
    </button>
  );
}
