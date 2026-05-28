type Props = {
  onLogout: () => void;
};

export function AccountLogoutRow({ onLogout }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-[#F9F8FF] px-5 py-3">
        <span className="text-sm font-bold text-gray-900">로그아웃</span>
      </div>
      <div className="flex flex-col items-start gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-gray-900">로그아웃</span>
          <span className="text-xs text-slate-400">
            현재 기기에서 로그아웃합니다. 언제든지 다시 로그인할 수 있습니다.
          </span>
        </div>
        <button
          onClick={onLogout}
          className="w-full shrink-0 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
