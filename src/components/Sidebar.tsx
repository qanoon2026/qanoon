"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  CalendarDays,
  Files,
  LayoutDashboard,
  ListChecks,
  Scale,
  Settings,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/cases", label: "القضايا", icon: BriefcaseBusiness },
  { href: "/clients", label: "العملاء", icon: Users },
  { href: "/calendar", label: "التقويم", icon: CalendarDays },
  { href: "/tasks", label: "المهام", icon: ListChecks },
  { href: "/files", label: "الملفات", icon: Files },
  { href: "/settings", label: "الإعدادات", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed right-4 top-4 z-30 hidden h-[calc(100vh-2rem)] w-72 flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-950 text-white shadow-[0_30px_90px_rgba(7,17,31,0.32)] lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_8%,rgba(201,162,39,0.20),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_38%)]" />
        <div className="relative flex h-24 items-center gap-3 border-b border-white/10 px-6">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/20">
            <Scale className="size-6" />
          </span>
          <div>
            <p className="text-2xl font-black tracking-normal">قانوني</p>
            <p className="text-xs font-bold text-white/45">Enterprise Legal OS</p>
          </div>
        </div>

        <nav className="relative flex-1 space-y-1 px-4 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition",
                  active
                    ? "bg-white text-navy-950 shadow-lg shadow-black/10"
                    : "text-white/64 hover:bg-white/10 hover:text-white"
                )}
              >
                <span
                  className={clsx(
                    "inline-flex size-9 items-center justify-center rounded-xl transition",
                    active ? "bg-gold-500 text-navy-950" : "bg-white/8 text-gold-400 group-hover:bg-white/12"
                  )}
                >
                  <Icon className="size-4" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative border-t border-white/10 p-4">
          <div className="rounded-2xl border border-gold-400/20 bg-white/10 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-gold-400">
              <Sparkles className="size-4" />
              <p className="text-sm font-black">AI Legal Pulse</p>
            </div>
            <p className="mt-2 text-xs leading-6 text-white/58">
              تحليل يومي للمخاطر، المهام، وفرص التحصيل داخل المكتب.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white/72">
              <ShieldCheck className="size-4 text-gold-400" />
              بيانات تجريبية آمنة
            </div>
          </div>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-7 rounded-3xl border border-white/80 bg-white/85 p-2 shadow-[0_18px_60px_rgba(7,17,31,0.18)] backdrop-blur-xl lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex min-h-12 items-center justify-center rounded-2xl transition",
                active ? "bg-navy-950 text-gold-400" : "text-slate-500 hover:bg-slate-100"
              )}
              aria-label={item.label}
            >
              <Icon className="size-5" />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
