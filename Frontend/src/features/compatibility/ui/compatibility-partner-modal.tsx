"use client";

import Image from "next/image";
import type { PartnerResponse } from "@/generated/api";
import {
  formatBirthDate,
  formatGender,
  getPartnerAvatarSrc,
} from "../model/compatibility";

type Props = {
  isOpen: boolean;
  partners: PartnerResponse[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export function CompatibilityPartnerModal({
  isOpen,
  partners,
  selectedId,
  onSelect,
  onConfirm,
  onCancel,
}: Props) {
  if (!isOpen) return null;

  const selectedPartner = partners.find((p) => p.id === selectedId) ?? null;

  function partnerDesc(p: PartnerResponse): string {
    const parts: string[] = [];
    if (p.birthDate) parts.push(formatBirthDate(p.birthDate));
    if (p.gender) parts.push(formatGender(p.gender));
    return parts.join(" · ");
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* 백드롭 */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(18,28,42,0.30)", backdropFilter: "blur(4px)" }}
        onClick={onCancel}
      />

      {/* 모달 박스 */}
      <div
        className="relative z-10 w-full max-w-[560px] overflow-hidden bg-white"
        style={{ borderRadius: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.16)" }}
      >
        {/* 헤더 */}
        <div className="relative border-b border-[#F3F4F6] px-8 py-8 pb-5 text-center">
          <h2 className="mb-1 text-[20px] font-extrabold text-[#111827]">
            상대 선택하기
          </h2>
          <p className="text-[13px] text-[#9CA3AF]">
            궁합을 볼 상대를 선택해주세요.
          </p>
          <button
            onClick={onCancel}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border-none bg-[#F3F4F6] text-[#6B7280] transition hover:bg-[#E0DAFF] hover:text-[#5956E9]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 파트너 목록 */}
        <div
          className="flex max-h-[380px] flex-col gap-2 overflow-y-auto px-6 py-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#E0DAFF transparent",
          }}
        >
          {partners.length === 0 ? (
            <div className="py-10 text-center text-[14px] text-[#9CA3AF]">
              등록된 상대가 없어요.
              <br />
              사주 관리에서 먼저 추가해주세요.
            </div>
          ) : (
            partners.map((p, idx) => {
              const isSelected = p.id === selectedId;
              const avatarSrc = getPartnerAvatarSrc(p.gender, idx);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelect(p.id!)}
                  className={`flex w-full items-center gap-3.5 rounded-[14px] border p-3 transition ${
                    isSelected
                      ? "border-[#5956E9] bg-[#F0EEFF]"
                      : "border-[#F3F4F6] bg-white hover:border-[#E0DAFF] hover:bg-[#F5F3FF]"
                  }`}
                  style={{ borderWidth: 1.5 }}
                >
                  {/* 아바타 */}
                  <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full bg-white">
                    <Image
                      src={avatarSrc}
                      alt={p.name ?? "상대방"}
                      width={52}
                      height={52}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* 정보 */}
                  <div className="flex-1 text-left">
                    <div className="mb-0.5 flex items-center gap-1.5 text-[15px] font-bold text-[#111827]">
                      {p.name}
                      {isSelected && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                          style={{ background: "#E0DAFF", color: "#5956E9" }}
                        >
                          선택됨
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] text-[#9CA3AF]">
                      {partnerDesc(p)}
                    </div>
                  </div>

                  {/* 라디오 */}
                  <div
                    className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition"
                    style={{
                      borderColor: isSelected ? "#5956E9" : "#D1D5DB",
                    }}
                  >
                    {isSelected && (
                      <div
                        className="h-[11px] w-[11px] rounded-full"
                        style={{ background: "#5956E9" }}
                      />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* 선택 요약 */}
        <div
          className="mx-6 mb-4 flex items-center gap-3 rounded-[14px] border p-3.5"
          style={{ background: "#F5F3FF", borderColor: "#E0DAFF" }}
        >
          <div
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px]"
            style={{ background: "#E0DAFF", color: "#5956E9" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          <div>
            <div className="text-[14px] font-bold text-[#111827]">
              {selectedPartner?.name ?? "선택한 상대"}
            </div>
            <div className="mt-0.5 text-[11px] text-[#9CA3AF]">
              {selectedPartner
                ? partnerDesc(selectedPartner)
                : "상대를 선택해주세요."}
            </div>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className="flex gap-2.5 border-t border-[#F3F4F6] px-6 pb-6 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="h-[52px] flex-1 rounded-[12px] border bg-white text-[14px] font-bold text-[#6B7280] transition hover:border-[#C4BAFF] hover:text-[#5956E9]"
            style={{ borderWidth: 1.5, borderColor: "#E5E7EB" }}
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={selectedId === null}
            className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-[12px] border-none text-[14px] font-bold text-white transition disabled:opacity-50"
            style={{
              background: "linear-gradient(to right, #5956E9, #7C3AED)",
              boxShadow: "0 4px 16px rgba(89,86,233,0.28)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
}
