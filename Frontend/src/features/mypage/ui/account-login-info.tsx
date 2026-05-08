type Props = {
  email: string;
};

export function AccountLoginInfo({ email }: Props) {
  return (
    <div className="card-saju-primary overflow-hidden">
      <div className="border-b-2 border-black bg-[rgb(240_238_232)] px-5 py-3.5">
        <span className="font-bold text-[#0d0d0d]">🔐 로그인 정보</span>
      </div>
      <ul>
        <li className="border-b border-black/10">
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-[#0d0d0d]">연동 계정</span>
              <span className="text-xs text-[#0d0d0d]/50">
                카카오 소셜 로그인으로 가입된 계정입니다.
              </span>
            </div>
            <span
              className="flex shrink-0 items-center gap-1.5 rounded-sm border-2 border-black bg-[#FEE500] px-3 py-1 text-xs font-bold text-[#191919]"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              카카오
            </span>
          </div>
        </li>
        <li>
          <div className="flex flex-col gap-0.5 px-5 py-4">
            <span className="text-sm font-bold text-[#0d0d0d]">이메일</span>
            <span className="text-xs text-[#0d0d0d]/50">{email}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
