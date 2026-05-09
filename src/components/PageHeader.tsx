type PageHeaderProps = {
  title: string;
  description: string;
  action?: string;
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-sm font-semibold text-gold-500">Qanooni Enterprise</p>
        <h1 className="text-2xl font-bold tracking-normal text-navy-950 sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
      </div>
      {action ? (
        <button className="inline-flex items-center justify-center rounded-md bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-navy-800">
          {action}
        </button>
      ) : null}
    </div>
  );
}
