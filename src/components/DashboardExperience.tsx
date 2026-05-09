"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { motion } from "framer-motion";
import {
  ArrowUpLeft,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Gavel,
  Scale,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import { CaseTable } from "@/components/CaseTable";

const kpis = [
  {
    title: "القضايا النشطة",
    value: "128",
    delta: "+12.4%",
    detail: "مقارنة بالشهر السابق",
    icon: BriefcaseBusiness
  },
  {
    title: "الإيراد المتوقع",
    value: "1.8M",
    delta: "+18.2%",
    detail: "ريال سعودي قيد التحصيل",
    icon: CircleDollarSign
  },
  {
    title: "جلسات خلال 14 يوم",
    value: "17",
    delta: "5 حرجة",
    detail: "تحتاج مراجعة مذكرات",
    icon: CalendarClock
  },
  {
    title: "معدل الإنجاز",
    value: "92%",
    delta: "+6.1%",
    detail: "للمهام عالية الأولوية",
    icon: CheckCircle2
  }
];

const caseVelocity = [
  { month: "يناير", opened: 28, closed: 18 },
  { month: "فبراير", opened: 34, closed: 26 },
  { month: "مارس", opened: 31, closed: 29 },
  { month: "أبريل", opened: 42, closed: 33 },
  { month: "مايو", opened: 38, closed: 36 },
  { month: "يونيو", opened: 46, closed: 39 }
];

const workload = [
  { name: "تجاري", value: 38 },
  { name: "عمالي", value: 24 },
  { name: "مدني", value: 21 },
  { name: "عقود", value: 17 }
];

const revenue = [
  { day: "س", value: 180 },
  { day: "ح", value: 240 },
  { day: "ن", value: 220 },
  { day: "ث", value: 310 },
  { day: "ر", value: 285 },
  { day: "خ", value: 390 },
  { day: "ج", value: 360 }
];

const activities = [
  {
    title: "تمت مراجعة مذكرة الدفاع",
    meta: "قضية Q-2026-014 بواسطة سارة الزهراني",
    time: "قبل 12 دقيقة",
    icon: FileCheck2
  },
  {
    title: "جلسة جديدة تمت جدولتها",
    meta: "المحكمة التجارية بالرياض - 18 مايو",
    time: "قبل 36 دقيقة",
    icon: Gavel
  },
  {
    title: "عميل جديد أضيف للنظام",
    meta: "شركة المدار القابضة - تصنيف Enterprise",
    time: "قبل ساعتين",
    icon: Users
  },
  {
    title: "تم تحديث احتمالية الفوز",
    meta: "ارتفعت إلى 78% بعد إضافة مستندات داعمة",
    time: "اليوم",
    icon: TrendingUp
  }
];

const insights = [
  "هناك 5 قضايا عالية الأولوية بلا مستندات محدثة خلال آخر 72 ساعة.",
  "معدل إغلاق القضايا التجارية أعلى من المتوسط بـ 14% هذا الربع.",
  "يوصى بتوزيع 3 مهام من فريق التقاضي إلى فريق العقود لتخفيف الضغط."
];

const pieColors = ["#c9a227", "#12345a", "#6b7280", "#dfbd52"];

function GlassPanel({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`rounded-2xl border border-white/70 bg-white/72 shadow-[0_24px_70px_rgba(7,17,31,0.10)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function DashboardExperience() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/70 bg-navy-950 px-5 py-6 text-white shadow-[0_28px_80px_rgba(7,17,31,0.24)] sm:px-7 lg:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(223,189,82,0.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent_42%)]" />
        <div className="relative grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/10 px-3 py-1 text-xs font-bold text-gold-100 backdrop-blur">
              <Sparkles className="size-4" />
              مركز قيادة قانوني مدعوم بالتحليلات
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-4xl lg:text-5xl">
              لوحة تحكم تنفيذية لإدارة مكتب المحاماة بثقة وسرعة.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              متابعة القضايا، الإيرادات، المخاطر، أداء الفريق، ورؤى الذكاء الاصطناعي من واجهة عربية واحدة مصممة لفرق قانونية عالية الأداء.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-3 text-sm font-black text-navy-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400">
                مراجعة الأولويات
                <ArrowUpLeft className="size-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15">
                إنشاء تقرير تنفيذي
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {[
              ["نسبة الالتزام", "96%", "مواعيد وتسليمات"],
              ["قيمة المخاطر", "2.4M", "ريال تحت المراجعة"],
              ["SLA العملاء", "98%", "استجابة ضمن الهدف"]
            ].map(([label, value, hint]) => (
              <div key={label} className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs font-bold text-white/55">{label}</p>
                <p className="mt-2 text-3xl font-black text-gold-400">{value}</p>
                <p className="mt-1 text-xs text-white/55">{hint}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.section
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.42 }}
              className="group rounded-2xl border border-white/80 bg-white/78 p-5 shadow-[0_18px_55px_rgba(7,17,31,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(7,17,31,0.13)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-navy-950 text-gold-400">
                  <Icon className="size-5" />
                </span>
                <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-black text-navy-900 ring-1 ring-gold-400/30">
                  {item.delta}
                </span>
              </div>
              <p className="mt-5 text-sm font-bold text-slate-500">{item.title}</p>
              <p className="mt-2 text-4xl font-black tracking-normal text-navy-950">{item.value}</p>
              <p className="mt-2 text-xs font-semibold leading-6 text-slate-500">{item.detail}</p>
            </motion.section>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <GlassPanel className="p-5">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black text-navy-950">تدفق القضايا</h2>
              <p className="mt-1 text-sm text-slate-500">القضايا المفتوحة والمغلقة خلال آخر 6 أشهر</p>
            </div>
            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold text-slate-500">
              <span className="rounded-lg bg-navy-950 px-3 py-2 text-white">شهري</span>
              <span className="px-3 py-2">ربع سنوي</span>
            </div>
          </div>
          <div className="h-80">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={caseVelocity} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "rgba(201,162,39,0.08)" }} />
                  <Bar dataKey="opened" name="مفتوحة" fill="#12345a" radius={[10, 10, 0, 0]} />
                  <Bar dataKey="closed" name="مغلقة" fill="#c9a227" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-2xl bg-slate-100/80" />
            )}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <div className="mb-5">
            <h2 className="text-xl font-black text-navy-950">توزيع الملفات</h2>
            <p className="mt-1 text-sm text-slate-500">حسب نوع الممارسة القانونية</p>
          </div>
          <div className="h-64">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie data={workload} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
                    {workload.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-2xl bg-slate-100/80" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {workload.map((item, index) => (
              <div key={item.name} className="rounded-xl border border-slate-200 bg-white/70 p-3">
                <span className="mb-2 block size-2 rounded-full" style={{ background: pieColors[index] }} />
                <p className="text-xs font-bold text-slate-500">{item.name}</p>
                <p className="text-lg font-black text-navy-950">{item.value}%</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassPanel className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-navy-950">AI Insights</h2>
              <p className="mt-1 text-sm text-slate-500">قراءة ذكية للمخاطر والفرص التشغيلية</p>
            </div>
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-navy-950 text-gold-400">
              <Bot className="size-5" />
            </span>
          </div>
          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight} className="flex gap-3 rounded-2xl border border-gold-400/20 bg-gold-100/60 p-4">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-gold-500" />
                <p className="text-sm font-semibold leading-7 text-navy-900">{insight}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-navy-950">مؤشر التحصيل الأسبوعي</h2>
              <p className="mt-1 text-sm text-slate-500">بالآلاف، بناء على الفواتير والمراحل المكتملة</p>
            </div>
            <Scale className="size-6 text-gold-500" />
          </div>
          <div className="h-64">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={revenue}>
                  <defs>
                    <linearGradient id="goldRevenue" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#c9a227" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#c9a227" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" name="التحصيل" stroke="#c9a227" strokeWidth={3} fill="url(#goldRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-2xl bg-slate-100/80" />
            )}
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CaseTable variant="glass" />

        <GlassPanel className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-navy-950">Activity Feed</h2>
              <p className="mt-1 text-sm text-slate-500">آخر ما حدث داخل المكتب</p>
            </div>
            <Clock3 className="size-5 text-gold-500" />
          </div>
          <div className="space-y-4">
            {activities.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="relative flex gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-black text-navy-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{item.meta}</p>
                    <p className="mt-2 text-xs font-bold text-gold-500">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
