'use client';

import { Bell, Search, ChevronDown } from 'lucide-react';

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث عن قضايا أو موكلين..."
              className="w-full pr-10 pl-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 mr-6">
          {/* Notifications */}
          <button className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors group">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="absolute inset-0 rounded-lg bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center font-semibold text-slate-900 text-sm">
                م
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-700">محمد</span>
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
