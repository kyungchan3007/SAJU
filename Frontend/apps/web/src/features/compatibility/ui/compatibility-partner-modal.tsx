"use client";

import type { PartnerResponse } from "@/generated/api";
import {
  formatBirthDate,
  formatGender,
  getInitial,
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
        style={{
          background: "rgba(18,28,42,0.30)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onCancel}
      />

      {/* 모달 박스 */}
      <div
        className="relative z-10 w-full max-w-[480px] overflow-hidden bg-white"
        style={{ borderRadius: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.14)" }}
      >
        {/* 헤더 */}
        <div className="relative border-b border-[#F3F4F6] px-7 pb-5 pt-7 text-center">
          <h2 className="mb-1 text-[18px] font-black text-gray-900">
            상대 선택하기
          </h2>
          <p className="text-[12px] text-slate-400">
            궁합을 볼 상대를 선택해주세요.
          </p>
          <button
            onClick={onCancel}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[14px] text-slate-500 transition hover:bg-[#F0EEFF] hover:text-[#5956E9]"
          >
            ✕
          </button>
        </div>

        {/* 파트너 목록 */}
        <div className="flex max-h-[360px] flex-col gap-1.5 overflow-y-auto px-5 py-4 [scrollbar-width:thin]">
          {partners.length === 0 ? (
            <div className="py-10 text-center text-[13px] text-slate-400">
              등록된 상대가 없어요.
              <br />
              사주 관리에서 먼저 추가해주세요.
            </div>
          ) : (
            partners.map((p) => {
              const isSelected = p.id === selectedId;
              const initial = getInitial(p.name);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelect(p.id!)}
                  className={`flex w-full items-center gap-3.5 rounded-[14px] border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-[#5956E9] bg-[#F0EEFF]"
                      : "border-[#F3F4F6] bg-white hover:border-[#E0DAFF] hover:bg-[#F9F8FF]"
                  }`}
                  style={{ borderWidth: 1.5 }}
                >
                  {/* 이니셜 아바타 */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-black"
                    style={{
                      background: isSelected ? "#5956E9" : "#F0EEFF",
                      color: isSelected ? "#fff" : "#5956E9",
                    }}
                  >
                    {initial}
                  </div>

                  {/* 정보 */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[14px] font-bold text-gray-900">
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
                    <div className="mt-0.5 text-[12px] text-slate-400">
                      {partnerDesc(p)}
                    </div>
                  </div>

                  {/* 라디오 */}
                  <div
                    className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-2 transition"
                    style={{
                      borderColor: isSelected ? "#5956E9" : "#D1D5DB",
                    }}
                  >
                    {isSelected && (
                      <div
                        className="h-[10px] w-[10px] rounded-full"
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
          className="mx-5 mb-4 flex items-center gap-3 rounded-[12px] border px-4 py-3"
          style={{ background: "#F5F3FF", borderColor: "#E0DAFF" }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-black"
            style={{ background: "#E0DAFF", color: "#5956E9" }}
          >
            {selectedPartner ? getInitial(selectedPartner.name) : "?"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold text-gray-900">
              {selectedPartner?.name ?? "선택한 상대"}
            </div>
            <div className="mt-0.5 text-slate-400 sm:text-[11px]">
              {selectedPartner
                ? partnerDesc(selectedPartner)
                : "상대를 선택해주세요."}
            </div>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className="flex gap-2.5 border-t border-[#F3F4F6] px-5 pb-6 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="h-[48px] flex-1 rounded-[12px] border bg-white text-[13px] font-bold text-slate-500 transition hover:border-[#C4BAFF] hover:text-[#5956E9]"
            style={{ borderWidth: 1.5, borderColor: "#E5E7EB" }}
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={selectedId === null}
            className="h-[48px] flex-1 rounded-[12px] border-none text-[13px] font-bold text-white transition disabled:opacity-50"
            style={{
              background: "linear-gradient(to right, #5956E9, #7C3AED)",
              boxShadow: "0 4px 16px rgba(89,86,233,0.26)",
            }}
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
}
