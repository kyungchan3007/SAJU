type Props = {
  message: string | null;
};

export function SajuManageStatusMessage({ message }: Props) {
  if (!message) return null;

  return (
    <div className="rounded-sm border-2 border-green-500 bg-green-50 px-4 py-3 text-[13px] font-semibold text-green-700">
      {message}
    </div>
  );
}
