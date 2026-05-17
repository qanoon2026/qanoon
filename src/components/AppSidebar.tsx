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
    <aside className="fixed right-0 top-0 z-50 flex h-screen w-80 flex-col border-l border-[rgba(var(--border),0.22)] bg-[rgba(var(--surface),0.94)] shadow-[0_24px_80px_rgba(0,0,0,0.20)] backdrop-blur-xl">
      <div className="border-b border-[rgba(var(--border),0.18)] px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[rgba(var(--accent),0.18)] shadow-soft text-[rgb(var(--accent))]">
            <Scale3d className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[rgb(var(--text-primary))]">قانوني</h1>
            <p className="text-xs font-medium text-[rgb(var(--text-secondary))] mt-1">نظام إدارة قانوني متميز</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition duration-200 ${
                isActive
                  ? 'bg-[rgba(var(--accent),0.16)] text-[rgb(var(--text-primary))] shadow-lg shadow-[rgba(var(--accent),0.10)]'
                  : 'text-[rgb(var(--text-secondary))] hover:bg-[rgba(var(--text-primary),0.06)] hover:text-[rgb(var(--text-primary))]'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
              {isActive && <div className="mr-auto h-1 w-1 rounded-full bg-[rgb(var(--accent))]"></div>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[rgba(var(--border),0.18)] px-3 py-4 space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-3xl px-4 py-3 text-[rgb(var(--text-secondary))] transition duration-200 hover:bg-[rgba(var(--text-primary),0.06)] hover:text-[rgb(var(--text-primary))]"
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-[rgba(var(--border),0.18)] px-4 py-4">
        <button className="flex w-full items-center gap-3 rounded-3xl border border-[rgba(var(--border),0.18)] bg-[rgba(var(--surface-soft),0.72)] px-4 py-3 text-left transition duration-200 hover:bg-[rgba(var(--surface-soft),0.92)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-[rgba(var(--accent),0.18)] text-[rgb(var(--accent))] font-semibold">م</div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">محمد الشعيبي</p>
            <p className="text-[0.68rem] text-[rgb(var(--text-secondary))]">محامي رئيسي</p>
          </div>
          <LogOut className="h-4 w-4 text-[rgb(var(--text-secondary))]" />
        </button>
      </div>
    </aside>
  );
}
