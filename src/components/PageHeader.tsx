'use client';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-[rgba(var(--border),0.18)] bg-[rgba(var(--surface),0.98)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[rgb(var(--text-primary))] tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-base text-[rgb(var(--text-secondary))] max-w-2xl">{description}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}
