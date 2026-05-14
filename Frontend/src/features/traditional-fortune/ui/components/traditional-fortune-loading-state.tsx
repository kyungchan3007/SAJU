export function TraditionalFortuneLoadingState() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-8 w-48 animate-pulse rounded-sm bg-[#F0EDE6]" />
      <div
        className="h-40 animate-pulse rounded-md border-2 border-black bg-[#0d0d0d]/10"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-48 animate-pulse rounded-md border-2 border-black bg-[#F0EDE6]"
          style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
        />
      ))}
    </div>
  );
}
