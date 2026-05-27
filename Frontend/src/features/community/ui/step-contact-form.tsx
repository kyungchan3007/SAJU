import type { ContactForm } from "../hooks/use-community-flow";

type Props = {
  form: ContactForm;
  onChange: (field: keyof ContactForm, value: string) => void;
};

const FIELDS: { key: keyof ContactForm; label: string; placeholder: string; type: string }[] = [
  { key: "nickname", label: "사용할 닉네임", placeholder: "예) 햇살같은나", type: "text" },
  { key: "age", label: "나이", placeholder: "예) 29", type: "text" },
  { key: "phone", label: "휴대폰 번호", placeholder: "예) 010-1234-5678", type: "tel" },
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

      <div className="grid grid-cols-3 gap-4">
        {FIELDS.map(({ key, label, placeholder, type }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-gray-700">{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              className="h-12 rounded-2xl border-[1.5px] border-gray-200 bg-white px-4 text-[13px] text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-[#5956E9] focus:shadow-[0_0_0_3px_rgba(89,86,233,0.10)]"
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] text-gray-400">
        🔒 입력한 정보는 로테이션 모임 안내와 본인 확인 용도로만 사용돼요.
      </p>
    </div>
  );
}
