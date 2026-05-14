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
  Scale3d
} from 'lucide-react';

const menuItems = [
  { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
  { name: 'القضايا', href: '/cases', icon: Scale3d },
  { name: 'الموكلون', href: '/clients', icon: Users },
  { name: 'التقويم', href: '/calendar', icon: Calendar },
  { name: 'المهام', href: '/tasks', icon: CheckSquare },
  { name: 'الملفات', href: '/files', icon: FileUp },
  { name: 'الإعدادات', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 h-screen w-80 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl flex flex-col">
      {/* Logo Section */}
      <div className="border-b border-blue-700/30 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
              قانوني
            </h1>
            <p className="text-xs text-blue-200 mt-1">نظام إدارة قانوني متقدم</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30'
                  : 'hover:bg-blue-800/30 text-blue-100'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-blue-700/30 px-6 py-4">
        <p className="text-xs text-blue-300 text-center">
          إصدار 1.0.0 | 2026 ©
        </p>
      </div>
    </aside>
  );
}
