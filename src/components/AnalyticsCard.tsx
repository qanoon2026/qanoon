type AnalyticsCardProps = {
  title: string;
  subtitle: string;
  values: Array<{
    label: string;
    value: number;
  }>;
};

export function AnalyticsCard({ title, subtitle, values }: AnalyticsCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-navy-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="space-y-4">
        {values.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="font-bold text-navy-900">{item.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-gold-500"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
