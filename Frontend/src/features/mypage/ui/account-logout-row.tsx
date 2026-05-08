type Props = {
  onLogout: () => void;
};

export function AccountLogoutRow({ onLogout }: Props) {
  return (
    <div className="card-saju-primary overflow-hidden">
      <div className="border-b-2 border-black bg-[rgb(240_238_232)] px-5 py-3.5">
        <span className="font-bold text-[#0d0d0d]">🔓 로그아웃</span>
      </div>
      <div className="flex flex-col items-start gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-[#0d0d0d]">로그아웃</span>
          <span className="text-xs text-[#0d0d0d]/50">
            현재 기기에서 로그아웃합니다. 언제든지 다시 로그인할 수 있습니다.
          </span>
        </div>
        <button
          onClick={onLogout}
          className="btn-saju w-full shrink-0 rounded-sm border-2 border-black bg-[rgb(250_248_242)] px-5 py-2 text-sm font-bold text-[#0d0d0d] sm:w-auto"
          style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
