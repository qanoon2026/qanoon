'use client';

import { Bell, Search, ChevronDown, Moon, SunMedium } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(var(--border),0.22)] bg-[rgba(var(--surface),0.88)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-lg">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--text-muted))]" />
            <input
              type="text"
              placeholder="ابحث عن قضايا أو موكلين..."
              className="w-full rounded-2xl border border-[rgba(var(--border),0.28)] bg-[rgba(var(--surface-soft),0.92)] px-4 py-3 pr-11 text-sm text-[rgb(var(--text-primary))] shadow-soft outline-none transition duration-200 focus:border-[rgba(var(--accent),0.55)] focus:ring-2 focus:ring-[rgba(var(--accent),0.18)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-between lg:justify-end">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(var(--border),0.22)] bg-[rgba(var(--surface-soft),0.85)] px-4 py-3 text-sm font-medium text-[rgb(var(--text-primary))] transition duration-200 hover:border-[rgba(var(--accent),0.45)] hover:bg-[rgba(var(--surface-soft),0.98)]"
            aria-label="تبديل الوضع"
          >
            {theme === 'dark' ? <SunMedium className="h-4 w-4 text-[rgb(var(--accent))]" /> : <Moon className="h-4 w-4 text-[rgb(var(--accent))]" />}
            <span>{theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
          </button>

          <button className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(var(--border),0.22)] bg-[rgba(var(--surface-soft),0.82)] text-[rgb(var(--text-primary))] transition duration-200 hover:bg-[rgba(var(--surface-soft),0.98)]">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#ef4444] shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"></span>
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-[rgba(var(--border),0.22)] bg-[rgba(var(--surface-soft),0.85)] px-3 py-2 text-[rgb(var(--text-secondary))] shadow-soft transition duration-200 hover:bg-[rgba(var(--surface-soft),0.98)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(var(--accent),0.18)] text-[rgb(var(--accent))] font-semibold">
              م
            </div>
            <div className="hidden sm:block text-sm font-medium text-[rgb(var(--text-primary))]">محمد</div>
            <ChevronDown className="h-4 w-4 text-[rgb(var(--text-muted))]" />
          </div>
        </div>
      </div>
    </header>
  );
}
