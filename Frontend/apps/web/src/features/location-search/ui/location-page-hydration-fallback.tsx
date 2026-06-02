export function LocationPageHydrationFallback() {
  return (
    <div className="grid gap-5 lg:h-[calc(100dvh-132px)] lg:min-h-0 lg:grid-cols-[360px_1fr] lg:items-stretch">
      <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
        <div
          className="h-[168px] rounded-sm border-2 border-black bg-white"
          style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
        />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 flex-1 animate-pulse rounded-sm border-2 border-black bg-[#F0EDE6]"
            />
          ))}
        </div>
        <div
          className="flex-1 rounded-sm border-2 border-black bg-white"
          style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
        />
      </div>
      <div
        className="rounded-sm border-2 border-black bg-white lg:h-full"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      />
    </div>
  );
}
