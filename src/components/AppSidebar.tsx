'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  CheckSquare,
  FileUp,
  Settings,
  Scale3d,
  LogOut,
  HelpCircle
} from 'lucide-react';

const menuItems = [
  { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
  { name: 'القضايا', href: '/cases', icon: Scale3d },
  { name: 'الموكلون', href: '/clients', icon: Users },
  { name: 'التقويم', href: '/calendar', icon: Calendar },
  { name: 'المهام', href: '/tasks', icon: CheckSquare },
  { name: 'الملفات', href: '/files', icon: FileUp },
];

const bottomItems = [
  { name: 'الإعدادات', href: '/settings', icon: Settings },
  { name: 'المساعدة', href: '#', icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 h-screen w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl flex flex-col z-50 border-l border-slate-700">
      {/* Logo Section */}
      <div className="border-b border-slate-700/50 px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
            <Scale3d className="h-6 w-6 text-slate-900 font-bold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
              قانوني
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">منصة إدارة قضايا</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium text-sm">{item.name}</span>
              {isActive && (
                <div className="mr-auto h-1 w-1 rounded-full bg-yellow-300"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-700/50 px-3 py-4 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-700/50 transition-all duration-200"
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User Profile Section */}
      <div className="border-t border-slate-700/50 px-4 py-4">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/30 transition-colors group">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center font-semibold text-slate-900">
            م
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold">محمد الشعيبي</p>
            <p className="text-xs text-slate-400">محامي رئيسي</p>
          </div>
          <LogOut className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </aside>
  );
}
