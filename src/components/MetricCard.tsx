'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'red';
}

const accentMap: Record<string, string> = {
  blue: 'rgba(56, 189, 248, 0.16)',
  green: 'rgba(34, 197, 94, 0.16)',
  amber: 'rgba(234, 179, 8, 0.16)',
  purple: 'rgba(168, 85, 247, 0.16)',
  red: 'rgba(239, 68, 68, 0.16)',
};

const iconColorMap: Record<string, string> = {
  blue: 'rgba(96, 165, 250, 1)',
  green: 'rgba(34, 197, 94, 1)',
  amber: 'rgba(234, 179, 8, 1)',
  purple: 'rgba(168, 85, 247, 1)',
  red: 'rgba(239, 68, 68, 1)',
};

export function MetricCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  color = 'blue',
}: MetricCardProps) {
  return (
    <div className="card-lg border border-[rgba(var(--border),0.22)] bg-[rgba(var(--surface),0.95)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[rgb(var(--text-secondary))]">{label}</p>
          <p className="mt-4 text-3xl font-semibold text-[rgb(var(--text-primary))]">{value}</p>
          {change && (
            <p className={`mt-3 text-xs font-semibold ${
              changeType === 'positive'
                ? 'text-emerald-300'
                : changeType === 'negative'
                ? 'text-rose-300'
                : 'text-[rgb(var(--text-secondary))]'
            }`}>
              {changeType === 'positive' && '↑'} {changeType === 'negative' && '↓'} {change}
            </p>
          )}
        </div>
        {icon && (
          <div
            className="flex h-14 w-14 items-center justify-center rounded-3xl"
            style={{ backgroundColor: accentMap[color] }}
          >
            <div className="text-xl" style={{ color: iconColorMap[color] }}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
