type SajuHeroCardShellProps = {
  imageSrc?: string | null;
  imageAlt: string;
  children: React.ReactNode;
};

export function SajuHeroCardShell({
  imageSrc,
  imageAlt,
  children,
}: SajuHeroCardShellProps) {
  return (
    <section className="pt-6">
      <div
        className="relative min-h-[420px] overflow-hidden rounded-[28px] md:h-[420px] md:rounded-[32px]"
        style={{
          boxShadow: "0 8px 40px rgba(89,86,233,0.18)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #3730a3 0%, #5956E9 45%, #7C3AED 100%)",
          }}
        />

        {imageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "60% 10%" }}
          />
        )}

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(20,15,60,0.72) 0%, rgba(20,15,60,0) 32%), linear-gradient(to left, rgba(20,15,60,0.72) 0%, rgba(20,15,60,0) 32%)",
          }}
        />

        {children}
      </div>
    </section>
  );
}
