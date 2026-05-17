'use client';

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'gold';
}

const statusConfig = {
  success: 'bg-[rgba(34,197,94,0.15)] text-emerald-200 border border-[rgba(34,197,94,0.2)]',
  warning: 'bg-[rgba(245,158,11,0.15)] text-amber-200 border border-[rgba(245,158,11,0.2)]',
  danger: 'bg-[rgba(239,68,68,0.15)] text-rose-200 border border-[rgba(239,68,68,0.2)]',
  info: 'bg-[rgba(96,165,250,0.16)] text-sky-200 border border-[rgba(96,165,250,0.2)]',
  gold: 'bg-[rgba(234,179,8,0.16)] text-amber-200 border border-[rgba(234,179,8,0.2)]',
};

export function StatusBadge({ status, variant = 'info' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${statusConfig[variant]}`}>
      {status}
    </span>
  );
}
