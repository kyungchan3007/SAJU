"use client";

import { useState } from "react";
import type { PartnerResponse } from "@/generated/api";
import {
  canAddPartner,
  getPartnerAvatar,
} from "@/features/mypage/model/partner";
import type { SajuManageSelectedTarget } from "@/features/mypage/model/sajuManageTarget";

type MyProfile = {
  birthYear?: string;
  gender?: string;
  summaryZodiac?: string | null;
  yongshinPrimary?: string | null;
};

type Props = {
  myProfile?: MyProfile;
  partners: PartnerResponse[];
  selectedTarget: SajuManageSelectedTarget;
  onSelect: (target: SajuManageSelectedTarget) => void;
  onAdd: () => void;
  onDelete: (partnerId: number, partnerName: string) => void;
  disabled?: boolean;
};

export function SajuCardList({
  myProfile,
  partners,
  selectedTarget,
  onSelect,
  onAdd,
  onDelete,
  disabled,
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const canAdd = canAddPartner(partners.length);
  const isMySelected = selectedTarget === "me";

  const genderLabel =
    myProfile?.gender === "MALE"
      ? "남성"
      : myProfile?.gender === "FEMALE"
        ? "여성"
        : null;

  const myLine1 = [
    myProfile?.birthYear ? `${myProfile.birthYear}년생` : null,
    genderLabel,
  ]
    .filter(Boolean)
    .join(" · ");

  const myLine2 = [
    myProfile?.summaryZodiac ?? null,
    myProfile?.yongshinPrimary
      ? `용신: ${myProfile.yongshinPrimary}`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex flex-col gap-5">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-gray-900">
            📋 사주 정보 관리
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            나와 가족·친구의 사주를 관리해요
          </p>
        </div>
        {canAdd && (
          <button
            type="button"
            onClick={disabled ? undefined : onAdd}
            disabled={disabled}
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{
              background: "linear-gradient(to right,#5956E9,#7C3AED)",
              boxShadow: "0 4px 14px rgba(89,86,233,0.28)",
            }}
          >
            + 사주 추가
          </button>
        )}
      </div>

      {/* 나의 사주 카드 */}
      <section
        className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${
          isMySelected ? "border-[#5956E9]" : "border-slate-100"
        }`}
        style={
          isMySelected
            ? { boxShadow: "0 4px 20px rgba(89,86,233,0.14)" }
            : undefined
        }
      >
        <div
          className="flex items-center gap-2 border-b px-5 py-3"
          style={{ background: "#F9F8FF", borderBottomColor: "#EDE9FF" }}
        >
          <span
            className="text-[13px] font-bold"
            style={{ color: "#5956E9" }}
          >
            나의 사주
          </span>
          {isMySelected && (
            <span
              className="ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold"
              style={{ background: "#F0EEFF", color: "#5956E9" }}
            >
              선택됨
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => !isEditMode && onSelect("me")}
          className="flex w-full items-center gap-4 px-5 py-4 text-left"
        >
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl"
            style={{ background: "#F0EEFF", border: "1.5px solid #DDD8FF" }}
          >
            🧑
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">
              나{myLine1 ? ` · ${myLine1}` : ""}
            </div>
            {myLine2 && (
              <div className="mt-0.5 text-xs text-slate-400">{myLine2}</div>
            )}
          </div>
          <div className="ml-auto">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: "#F0EEFF", color: "#5956E9" }}
            >
              나
            </span>
          </div>
        </button>
      </section>

      {/* VS 구분선 */}
      {partners.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-black tracking-widest text-slate-400">
            VS
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      )}

      {/* 파트너 섹션 */}
      {(partners.length > 0 || canAdd) && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-600">
              등록된 사주{" "}
              <span className="font-bold" style={{ color: "#5956E9" }}>
                ({partners.length}명)
              </span>
            </span>
            {partners.length > 0 && (
              <button
                type="button"
                onClick={() => setIsEditMode((prev) => !prev)}
                className={`rounded-full border px-3 py-1 text-[12px] font-bold transition-all ${
                  isEditMode
                    ? "border-[#5956E9] bg-[#5956E9] text-white"
                    : "border-slate-200 text-slate-400 hover:border-[#5956E9] hover:text-[#5956E9]"
                }`}
              >
                {isEditMode ? "완료" : "편집"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {partners.map((partner) => {
              const isSelected =
                selectedTarget === partner.id && !isEditMode;
              const birthYear = partner.birthDate?.split("-")[0];
              const partnerGender =
                partner.gender === "MALE"
                  ? "남성"
                  : partner.gender === "FEMALE"
                    ? "여성"
                    : null;
              const infoLine = [
                birthYear ? `${birthYear}년생` : null,
                partnerGender,
              ]
                .filter(Boolean)
                .join(" · ");

              return (
                <div
                  key={partner.id}
                  className={`relative flex flex-col items-center rounded-[20px] border-2 bg-white p-4 pb-5 transition-all ${
                    isSelected
                      ? "border-[#5956E9] bg-[#F9F8FF]"
                      : "border-[#F3F4F6] hover:border-[#C7C4F8] hover:shadow-sm"
                  }`}
                  style={
                    isSelected
                      ? { boxShadow: "0 4px 20px rgba(89,86,233,0.18)" }
                      : undefined
                  }
                >
                  {/* 삭제 버튼 (편집 모드) */}
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(partner.id!, partner.name ?? "");
                      }}
                      className="absolute -right-2 -top-2 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-red-500 text-[11px] font-black text-white"
                      style={{ boxShadow: "0 1px 4px rgba(0,0,0,.3)" }}
                    >
                      ✕
                    </button>
                  )}

                  {/* 선택 체크 */}
                  {isSelected && (
                    <div
                      className="absolute right-2.5 top-2.5 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: "#5956E9" }}
                    >
                      ✓
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      !isEditMode && onSelect(partner.id!)
                    }
                    className="flex w-full flex-col items-center gap-2.5 text-center"
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                      style={{
                        background: isSelected ? "#EDE9FF" : "#F0EEFF",
                        border: "1.5px solid #E0DAFF",
                      }}
                    >
                      {getPartnerAvatar(partner)}
                    </div>
                    <div className="text-[13px] font-extrabold text-gray-900">
                      {partner.name}
                    </div>
                    {infoLine && (
                      <div className="text-[11px] leading-relaxed text-slate-400">
                        {infoLine}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}

            {/* 추가 카드 */}
            {!isEditMode && canAdd && (
              <button
                type="button"
                onClick={disabled ? undefined : onAdd}
                disabled={disabled}
                className="flex min-h-[160px] flex-col items-center justify-center gap-2.5 rounded-[20px] border-2 border-dashed border-[#D1D5DB] bg-white transition-all hover:border-[#5956E9] hover:bg-[#F9F8FF] disabled:opacity-40"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                  style={{ background: "#F0EEFF" }}
                >
                  ＋
                </div>
                <div className="text-sm font-bold text-slate-400">
                  사주 추가
                </div>
                <div className="text-center text-xs text-slate-300">
                  가족·친구·연인의
                  <br />
                  사주를 등록해보세요
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
