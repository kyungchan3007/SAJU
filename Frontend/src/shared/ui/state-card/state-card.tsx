import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type LinkHref = ComponentProps<typeof Link>["href"];

type StateCardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

type ActionStateCardProps = StateCardProps & {
  actionHref?: LinkHref;
  actionLabel?: string;
};

export function StateCard({
  title,
  description,
  children,
  className = "",
}: StateCardProps) {
  return (
    <div
      className={`rounded-sm border-2 border-black bg-[#FDFCF8] p-10 text-center ${className}`}
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      {title && <p className="mb-2 font-bold">{title}</p>}
      {description && (
        <p className="mb-5 text-[13px] text-[#7a7570]">{description}</p>
      )}
      {children}
    </div>
  );
}

export function LoadingStateCard({ message }: { message: string }) {
  return (
    <StateCard className="text-[14px] text-[#7a7570]">{message}</StateCard>
  );
}

export function EmptyStateCard({
  title,
  description,
  actionHref,
  actionLabel,
}: ActionStateCardProps) {
  return (
    <StateCard title={title} description={description}>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-block rounded-full border-2 border-black bg-yellow-300 px-5 py-2 text-[13px] font-bold"
          style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
        >
          {actionLabel}
        </Link>
      )}
    </StateCard>
  );
}

export function ErrorStateCard({
  title,
  description,
  actionHref,
  actionLabel,
}: ActionStateCardProps) {
  return (
    <StateCard title={title} description={description}>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-block rounded-full border-2 border-black bg-yellow-300 px-5 py-2 text-[13px] font-bold"
          style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
        >
          {actionLabel}
        </Link>
      )}
    </StateCard>
  );
}
