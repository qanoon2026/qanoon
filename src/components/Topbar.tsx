'use client';

import { User, LogOut, Bell } from 'lucide-react';

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Right Side - Title/Breadcrumb */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-slate-900">مرحباً بك في قانوني</h2>
        </div>

        {/* Left Side - Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
              <User className="h-4 w-4" />
            </div>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
