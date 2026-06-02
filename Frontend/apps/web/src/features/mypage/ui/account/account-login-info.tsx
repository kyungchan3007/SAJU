type Props = {
  email: string;
};

export function AccountLoginInfo({ email }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-[#F9F8FF] px-5 py-3">
        <span className="text-sm font-bold text-gray-900">로그인 정보</span>
      </div>
      <ul>
        <li className="border-b border-slate-100">
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-gray-900">연동 계정</span>
              <span className="text-xs text-slate-400">
                카카오 소셜 로그인으로 가입된 계정입니다.
              </span>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#F0D02C] bg-[#FEE500] px-3 py-1 text-xs font-bold text-[#191919]">
              카카오
            </span>
          </div>
        </li>
        <li>
          <div className="flex flex-col gap-0.5 px-5 py-4">
            <span className="text-sm font-bold text-gray-900">이메일</span>
            <span className="text-xs text-slate-400">{email}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
