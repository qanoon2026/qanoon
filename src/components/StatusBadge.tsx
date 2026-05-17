'use client';

interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'gold';
}

const statusConfig = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  info: 'badge-info',
  gold: 'badge-gold',
};

export function StatusBadge({ status, variant = 'info' }: StatusBadgeProps) {
  return (
    <span className={statusConfig[variant]}>
      {status}
    </span>
  );
}
