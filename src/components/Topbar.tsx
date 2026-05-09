import { Bell, Command, Search, Sparkles } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur-2xl">
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="hidden text-xs font-black uppercase tracking-[0.24em] text-gold-500 sm:block">
            Qanooni Command Center
          </p>
          <h2 className="truncate text-lg font-black text-navy-950 sm:text-xl">صباح الخير، محمد</h2>
        </div>

        <div className="hidden min-w-80 max-w-xl flex-1 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-2.5 shadow-sm md:flex">
          <Search className="size-4 text-slate-400" />
          <input
            className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="ابحث عن قضية، عميل، مهمة، أو مستند"
          />
          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-400">
            <Command className="size-3" /> K
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden items-center gap-2 rounded-2xl bg-navy-950 px-4 py-2.5 text-sm font-black text-white shadow-[0_14px_38px_rgba(7,17,31,0.18)] transition hover:bg-navy-900 sm:inline-flex">
            <Sparkles className="size-4 text-gold-400" />
            AI Brief
          </button>
          <button className="relative inline-flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-navy-900 shadow-sm">
            <Bell className="size-5" />
            <span className="absolute left-3 top-3 size-2 rounded-full bg-gold-500 ring-2 ring-white" />
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-2.5 py-2 shadow-sm">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-navy-950 to-navy-700 text-center text-sm font-black leading-10 text-gold-400">
              م
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-black text-navy-950">محمد لولو</p>
              <p className="text-xs font-semibold text-slate-500">Managing Partner</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
