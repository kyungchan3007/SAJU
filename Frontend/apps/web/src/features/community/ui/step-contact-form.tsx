import type { ContactForm } from "@/features/community/model/community";
import { COMMUNITY_AGE_GROUP_OPTIONS } from "@/features/community/model/community";
import { Input, Select } from "@/shared/ui";

type Props = {
  form: ContactForm;
  onChange: (field: keyof ContactForm, value: string | boolean) => void;
};

const FIELDS: {
  key: "nickname";
  label: string;
  placeholder: string;
  type: string;
}[] = [
  {
    key: "nickname",
    label: "사용할 닉네임",
    placeholder: "예) 햇살같은나",
    type: "text",
  },
];

export function StepContactForm({ form, onChange }: Props) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5956E9] text-[13px] font-extrabold text-white">
          04
        </div>
        <h2 className="text-[20px] font-black text-gray-900">신청 정보 입력</h2>
        <span className="ml-auto text-[11px] font-bold text-gray-400">2 / 3</span>
      </div>
      <p className="mb-5 ml-10 text-[13px] text-gray-400">정확한 안내를 위해 정보를 입력해주세요.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FIELDS.map(({ key, label, placeholder, type }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label
              htmlFor={`community-${key}`}
              className="text-[12px] font-bold text-gray-700"
            >
              {label}
            </label>
            <Input
              id={`community-${key}`}
              type={type}
              value={form[key]}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              className="h-12 rounded-2xl border-[1.5px] border-gray-200 px-4 text-gray-900 placeholder:text-gray-300"
            />
          </div>
        ))}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="community-ageGroup"
            className="text-[12px] font-bold text-gray-700"
          >
            연령대
          </label>
          <Select
            id="community-ageGroup"
            value={form.ageGroup}
            onChange={(e) => onChange("ageGroup", e.target.value)}
            className="h-12 rounded-2xl border-[1.5px] border-gray-200 px-4 text-gray-900"
          >
            <option value="">선택</option>
            {COMMUNITY_AGE_GROUP_OPTIONS.map((ageGroup) => (
              <option key={ageGroup} value={ageGroup}>
                {ageGroup}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="community-phone"
            className="text-[12px] font-bold text-gray-700"
          >
            휴대폰 번호
          </label>
          <Input
            id="community-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="예) 010-1234-5678"
            className="h-12 rounded-2xl border-[1.5px] border-gray-200 px-4 text-gray-900 placeholder:text-gray-300"
          />
        </div>
      </div>
      <label
        htmlFor="community-agreedToPrivacy"
        className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] border-[#E0DAFF] bg-[#F9F8FF] px-4 py-3"
      >
        <input
          id="community-agreedToPrivacy"
          type="checkbox"
          checked={form.agreedToPrivacy}
          onChange={(e) => onChange("agreedToPrivacy", e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#5956E9]"
        />
        <span className="text-[12px] font-semibold leading-relaxed text-gray-600">
          커뮤니티 모임 안내 및 알림톡 발송을 위해 닉네임, 연령대, 휴대폰
          번호, 관심 주제를 수집·이용하는 데 동의합니다.
          <span className="mt-1 block text-[11px] font-medium text-gray-400">
            수집된 정보는 커뮤니티 신청 확인, 모임 오픈 안내, 알림톡 발송
            목적으로만 사용됩니다.
          </span>
        </span>
      </label>
      <p className="mt-4 text-center text-[11px] text-gray-400">
        🔒 입력한 정보는 로테이션 모임 안내와 본인 확인 용도로만 사용돼요.
      </p>
    </div>
  );
}
