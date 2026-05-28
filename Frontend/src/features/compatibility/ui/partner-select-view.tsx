"use client";

import { useState } from "react";
import Image from "next/image";
import type { SajuProfileResponse, PartnerResponse } from "@/generated/api";
import {
  formatBirthDate,
  formatGender,
  getMyAvatarSrc,
  getPartnerAvatarSrc,
} from "@/features/compatibility/model/compatibility";
import { CompatibilityPartnerModal } from "./compatibility-partner-modal";

type Props = {
  myProfile: SajuProfileResponse | null | undefined;
  partners: PartnerResponse[];
  selectedPartnerId: number | null;
  onSelectPartner: (id: number) => void;
  onShowResult: () => void;
  isLoadingResult: boolean;
};

// ── 분석 항목 ──────────────────────────────────────────────
const ANALYSIS_ITEMS = [
  {
    label: "성격 궁합",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 13s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    label: "연애 궁합",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: "결혼 궁합",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9l4-6z" />
        <path d="M11 3 8 9l4 13 4-13-3-6" />
        <path d="M2 9h20" />
      </svg>
    ),
  },
  {
    label: "재물 궁합",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="7" x2="12" y2="9" />
        <line x1="12" y1="15" x2="12" y2="17" />
        <path d="M9.5 10a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4" />
      </svg>
    ),
  },
  {
    label: "대화 궁합",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "미래 흐름",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

export function PartnerSelectView({
  myProfile,
  partners,
  selectedPartnerId,
  onSelectPartner,
  onShowResult,
  isLoadingResult,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectedId, setModalSelectedId] = useState<number | null>(
    selectedPartnerId,
  );

  const selectedPartner = partners.find((p) => p.id === selectedPartnerId) ?? null;

  function openModal() {
    setModalSelectedId(selectedPartnerId);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function confirmModal() {
    if (modalSelectedId !== null) {
      onSelectPartner(modalSelectedId);
    }
    setIsModalOpen(false);
  }

  // 내 정보
  const myAvatarSrc = getMyAvatarSrc(myProfile?.gender);
  const myBirthDate = myProfile?.birthDate
    ? formatBirthDate(myProfile.birthDate)
    : null;
  const myGender = myProfile?.gender ? formatGender(myProfile.gender) : null;

  // 선택된 파트너 정보
  const partnerIndex = partners.findIndex((p) => p.id === selectedPartnerId);
  const partnerAvatarSrc = selectedPartner
    ? getPartnerAvatarSrc(selectedPartner.gender, partnerIndex)
    : null;
  const partnerBirthDate = selectedPartner?.birthDate
    ? formatBirthDate(selectedPartner.birthDate)
    : null;
  const partnerGender = selectedPartner?.gender
    ? formatGender(selectedPartner.gender)
    : null;

  return (
    <>
      <div className="flex flex-col gap-4">

        {/* ── 선택 카드 그리드 ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-2">

          {/* 내 정보 카드 */}
          <div
            className="relative flex flex-col items-center bg-white px-8 py-10 text-center [border-radius:20px_20px_0_0] md:[border-radius:20px_0_0_20px]"
            style={{
              border: "2px solid #5956E9",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            }}
          >
            {/* 체크 배지 */}
            <div
              className="absolute right-[18px] top-[18px] flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: "#5956E9" }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="mb-1 text-[17px] font-extrabold text-[#111827]">
              내 정보
            </h3>
            <p className="mb-5 text-[12px] text-[#9CA3AF]">
              나의 사주 정보입니다.
            </p>

            {/* 아바타 */}
            <div
              className="mb-5 h-[120px] w-[120px] overflow-hidden rounded-full bg-white"
              style={{
                border: "5px solid #F0EEFF",
                boxShadow: "0 4px 20px rgba(89,86,233,0.12)",
              }}
            >
              <Image
                src={myAvatarSrc}
                alt="내 프로필"
                width={120}
                height={120}
                className="h-full w-full object-cover"
              />
            </div>

            <a
              href="/mypage/saju-manage"
              className="mb-[18px] inline-block cursor-pointer rounded-[10px] border-none px-7 py-2.5 text-[13px] font-bold"
              style={{ background: "#F0EEFF", color: "#5956E9" }}
            >
              내 사주 정보
            </a>

            {myBirthDate && (
              <p className="text-[15px] font-extrabold text-[#111827]">
                {myBirthDate}
              </p>
            )}
            {myGender && (
              <p className="mt-1 text-[12px] text-[#9CA3AF]">{myGender}</p>
            )}
          </div>

          {/* 하트 구분자 (desktop only) */}
          <div
            className="absolute left-1/2 top-1/2 z-10 hidden h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white md:flex"
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              border: "1px solid #F0EEFF",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="#EF4444"
              stroke="none"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>

          {/* 상대방 카드 */}
          <div
            className="relative flex flex-col items-center bg-white px-8 py-10 text-center transition [border-radius:0_0_20px_20px] hover:border-[#C4BAFF] md:[border-radius:0_20px_20px_0]"
            style={{
              border: selectedPartnerId
                ? "2px solid #5956E9"
                : "1px solid #F3F4F6",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              cursor: "pointer",
            }}
            onClick={openModal}
          >
            {/* 선택됐을 때 체크 배지 */}
            {selectedPartnerId && (
              <div
                className="absolute right-[18px] top-[18px] flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "#5956E9" }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            <h3 className="mb-1 text-[17px] font-extrabold text-[#111827]">
              상대방 정보
            </h3>
            <p className="mb-5 text-[12px] text-[#9CA3AF]">
              {selectedPartnerId
                ? "선택한 상대입니다."
                : "궁합을 볼 상대를 선택해주세요."}
            </p>

            {/* 아바타 */}
            {selectedPartnerId && partnerAvatarSrc ? (
              <div
                className="mb-5 h-[120px] w-[120px] overflow-hidden rounded-full bg-white"
                style={{
                  border: "5px solid #F0EEFF",
                  boxShadow: "0 4px 20px rgba(89,86,233,0.12)",
                }}
              >
                <Image
                  src={partnerAvatarSrc}
                  alt="상대방 프로필"
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div
                className="mb-5 flex h-[120px] w-[120px] items-center justify-center rounded-full"
                style={{ background: "#F0EEFF" }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="#D1D5DB"
                  stroke="none"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}

            <button
              type="button"
              className="mb-[18px] rounded-[10px] border px-7 py-2.5 text-[13px] font-bold transition"
              style={{
                background: "transparent",
                borderColor: "#D1D5DB",
                color: "#5956E9",
              }}
              onClick={(e) => { e.stopPropagation(); openModal(); }}
            >
              {selectedPartnerId ? "변경하기" : "상대 선택하기"}
            </button>

            {partnerBirthDate && (
              <p className="text-[15px] font-extrabold text-[#111827]">
                {partnerBirthDate}
              </p>
            )}
            {partnerGender && (
              <p className="mt-1 text-[12px] text-[#9CA3AF]">{partnerGender}</p>
            )}
            {!selectedPartnerId && (
              <p className="text-[12px] text-[#9CA3AF]">
                생년월일, 성별, 태어난 시간
              </p>
            )}
          </div>
        </div>

        {/* ── 공지 바 ── */}
        <div
          className="flex items-center gap-2.5 rounded-[12px] border px-[18px] py-3.5 text-[13px] font-medium text-[#6B7280]"
          style={{ background: "#F5F3FF", borderColor: "#E0DAFF" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#5956E9"
            stroke="none"
            className="shrink-0"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          정확한 궁합 분석을 위해 두 사람의 정확한 생년월일시 정보가 필요해요.
        </div>

        {/* ── CTA 버튼 ── */}
        <button
          type="button"
          onClick={onShowResult}
          disabled={!selectedPartnerId || isLoadingResult}
          className="flex w-full items-center justify-center gap-3.5 rounded-2xl border-none py-5 px-8 text-[18px] font-black text-white transition disabled:opacity-40"
          style={{
            background: "linear-gradient(to right, #5956E9, #7C3AED)",
            boxShadow: "0 8px 32px rgba(89,86,233,0.28)",
          }}
        >
          <span>궁합 결과 확인하기</span>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        {/* ── 궁합 분석 항목 ── */}
        <div
          className="rounded-[14px] border border-[#F3F4F6] bg-white px-7 py-6"
          style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
        >
          <div className="mb-5 text-[13px] font-bold text-[#111827]">
            궁합 분석 항목
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {ANALYSIS_ITEMS.map((item) => (
              <div
                key={item.label}
                className="group flex cursor-pointer flex-col items-center gap-2.5"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-[14px] text-[#5956E9] transition group-hover:scale-105 group-hover:bg-[#5956E9] group-hover:text-white"
                  style={{ background: "#F0EEFF" }}
                >
                  {item.icon}
                </div>
                <span className="text-[12px] font-bold text-[#111827]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 궁합이란? ── */}
        <div
          className="flex flex-col items-start justify-between gap-7 rounded-[20px] border p-8 md:flex-row md:items-center"
          style={{ background: "#F5F3FF", borderColor: "#E0DAFF" }}
        >
          <div className="flex flex-1 items-start gap-5">
            <div
              className="flex shrink-0 items-center justify-center rounded-[14px] p-3.5"
              style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5956E9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <div>
              <h5 className="mb-2 text-[17px] font-extrabold text-[#111827]">
                궁합이란?
              </h5>
              <p
                className="max-w-[520px] text-[13px] leading-[1.85] text-[#6B7280]"
              >
                두 사람의 사주를 비교하여 서로의 기운이 조화를 이루는지,
                <br className="hidden md:block" />
                관계의 발전 가능성과 주의할 점을 분석하는 서비스예요.
              </p>
            </div>
          </div>

          {/* 장식 원형 아이콘 */}
          <div className="flex items-center self-end md:self-center">
            <div
              className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
              style={{
                background: "rgba(89,86,233,0.10)",
                marginRight: -24,
                zIndex: 0,
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="#5956E9"
                stroke="none"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div
              className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background: "rgba(239,68,68,0.14)",
                border: "4px solid white",
                boxShadow: "0 4px 18px rgba(0,0,0,0.10)",
              }}
            >
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="#EF4444"
                stroke="none"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 파트너 선택 모달 */}
      <CompatibilityPartnerModal
        isOpen={isModalOpen}
        partners={partners}
        selectedId={modalSelectedId}
        onSelect={setModalSelectedId}
        onConfirm={confirmModal}
        onCancel={closeModal}
      />
    </>
  );
}
