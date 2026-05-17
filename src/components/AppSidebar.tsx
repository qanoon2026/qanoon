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
    <aside className="fixed right-0 top-0 z-50 flex h-screen w-[260px] flex-col bg-[#152a52] text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
      <div className="border-b border-white/10 px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-[#f7ead0] text-[#4f3820] shadow-soft">
            <Scale3d className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">قانوني</h1>
            <p className="text-xs text-white/70 mt-1">نظام إدارة قانوني متميز</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition duration-200 ${
                isActive
                  ? 'bg-[#0f2241] text-[#f8f7f5] shadow-[0_10px_30px_rgba(0,0,0,0.12)]'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-4 py-4 space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm text-white/70 transition duration-200 hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <button className="flex w-full items-center gap-3 rounded-3xl bg-white/10 px-4 py-3 text-left transition duration-200 hover:bg-white/15">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f7ead0] text-[#4f3820] font-semibold">م</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">محمد الشعيبي</p>
            <p className="text-[0.72rem] text-white/70">محامي رئيسي</p>
          </div>
          <LogOut className="h-4 w-4 text-white/70" />
        </button>
      </div>
    </aside>
  );
}
