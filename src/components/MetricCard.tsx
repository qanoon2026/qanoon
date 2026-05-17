'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'red';
}

const colorMap = {
  blue: 'bg-blue-50 border-blue-200',
  green: 'bg-green-50 border-green-200',
  amber: 'bg-amber-50 border-amber-200',
  purple: 'bg-purple-50 border-purple-200',
  red: 'bg-red-50 border-red-200',
};

const iconBgMap = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  amber: 'bg-amber-100 text-amber-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600',
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
    <div className={`card-lg ${colorMap[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {change && (
            <p className={`text-xs font-semibold mt-2 ${
              changeType === 'positive' ? 'text-green-600' :
              changeType === 'negative' ? 'text-red-600' :
              'text-slate-600'
            }`}>
              {changeType === 'positive' && '↑'} {changeType === 'negative' && '↓'} {change}
            </p>
          )}
        </div>
        {icon && (
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${iconBgMap[color]} flex-shrink-0`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
