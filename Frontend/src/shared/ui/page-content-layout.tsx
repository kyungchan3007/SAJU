export function PageContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1152px] px-4 md:px-8">{children}</div>
    </div>
  );
}
