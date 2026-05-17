'use client';

import { Bell, Search, ChevronDown, Moon, SunMedium } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-lg">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن قضايا أو موكلين..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-900 shadow-sm outline-none transition duration-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-between sm:justify-end">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition duration-200 hover:border-gold-300 hover:bg-slate-100"
            aria-label="تبديل الوضع"
          >
            {theme === 'dark' ? <SunMedium className="h-4 w-4 text-gold-600" /> : <Moon className="h-4 w-4 text-gold-600" />}
            <span>{theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
          </button>

          <button className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 transition duration-200 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-error-600 shadow-[0_0_0_4px_rgba(255,255,255,0.2)]"></span>
          </button>

          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 shadow-sm sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 font-semibold">م</div>
            <div className="text-sm font-medium text-slate-900">محمد</div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
