'use client';

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';
import { Calendar, Users, FileText, TrendingUp, Zap } from 'lucide-react';

const overviewCards = [
  { label: 'القضايا المفتوحة', value: '45', change: '+14%', color: 'blue', icon: <FileText className="h-5 w-5" /> },
  { label: 'قضايا عالية الأولوية', value: '12', change: '+8%', color: 'amber', icon: <TrendingUp className="h-5 w-5" /> },
  { label: 'عملاء نشطون', value: '28', change: '+6%', color: 'green', icon: <Users className="h-5 w-5" /> },
  { label: 'جلسات هذا الأسبوع', value: '7', change: '+3', color: 'purple', icon: <Calendar className="h-5 w-5" /> },
];

const progressData = [
  { month: 'يناير', value: 72 },
  { month: 'فبراير', value: 78 },
  { month: 'مارس', value: 85 },
  { month: 'أبريل', value: 80 },
  { month: 'مايو', value: 88 },
];

const caseDistribution = [
  { name: 'جنائي', value: 38, color: '#eab308' },
  { name: 'مدني', value: 42, color: '#38bdf8' },
  { name: 'إداري', value: 20, color: '#c084fc' },
];

const upcomingSessions = [
  { id: 1, title: 'جلسة استئناف - قضية #2048', date: '16 مايو', time: '10:00', court: 'محكمة الاستئناف' },
  { id: 2, title: 'مرافعة نهائية - قضية #2045', date: '17 مايو', time: '14:00', court: 'المحكمة الإدارية' },
  { id: 3, title: 'جلسة تحكيم - قضية #2043', date: '20 مايو', time: '15:00', court: 'مركز التحكيم' },
];

const recentActions = [
  { id: 1, title: 'تم تحديث ملف قضية #2045', subtitle: 'مراجعة مستندات العقد', time: 'قبل 2 ساعة' },
  { id: 2, title: 'تم إضافة موكل جديد', subtitle: 'أحمد الدعيع', time: 'قبل 5 ساعات' },
  { id: 3, title: 'جلسة مؤجلة', subtitle: 'قضية #2050 إلى 23 مايو', time: 'قبل يوم' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="لوحة القيادة"
        description="لوحة تنفيذية متقدمة لإدارة القضايا، العملاء، والجلسات" 
        action={<ActionButton variant="ghost">عرض التحليلات المتقدمة</ActionButton>}
      />

      <section className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {overviewCards.map((item) => (
              <div key={item.label} className="glass-card p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">{item.label}</p>
                    <h3 className="mt-3 text-3xl font-semibold text-[rgb(var(--text-primary))]">{item.value}</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: 'rgba(var(--accent),0.16)' }}>
                    {item.icon}
                  </div>
                </div>
                <p className="mt-4 text-sm text-[rgb(var(--text-secondary))]">{item.change} مقارنة بالأسبوع الماضي</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">أداء المحفظة</p>
                <h2 className="mt-3 text-2xl font-semibold text-[rgb(var(--text-primary))]">تطور معدل إغلاق القضايا</h2>
              </div>
              <ActionButton variant="secondary">استخراج تقرير</ActionButton>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.68)" tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.68)" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10, 25, 56, 0.92)', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc' }} />
                  <Line type="monotone" dataKey="value" stroke="rgba(var(--accent),1)" strokeWidth={4} dot={{ r: 4, fill: 'rgba(var(--accent),1)' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="glass-card p-5 col-span-2">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">توزيع القضايا</p>
                  <h3 className="mt-2 text-xl font-semibold text-[rgb(var(--text-primary))]">التوزيع حسب الفئة</h3>
                </div>
                <span className="rounded-full bg-[rgba(var(--accent),0.16)] px-3 py-1 text-xs font-semibold text-[rgb(var(--accent))]">وقت حقيقي</span>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={caseDistribution} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={4}>
                      {caseDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'rgba(10, 25, 56, 0.92)', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">إحصاء نوع القضايا</p>
                  <h3 className="mt-2 text-xl font-semibold text-[rgb(var(--text-primary))]">رؤى معمقة</h3>
                </div>
              </div>
              <div className="space-y-4">
                {caseDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-[rgb(var(--text-secondary))]">
                      <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                      {item.name}
                    </span>
                    <span className="font-semibold text-[rgb(var(--text-primary))]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">ملخص المنصة</p>
                <h3 className="mt-2 text-2xl font-semibold text-[rgb(var(--text-primary))]">الرؤية القانونية</h3>
              </div>
              <Zap className="h-6 w-6 text-[rgb(var(--accent))]" />
            </div>
            <ul className="space-y-3 text-sm text-[rgb(var(--text-secondary))]">
              <li>• 3 ملفات جاهزة للتوقيع الذكي.</li>
              <li>• نسبة الجلسات المكتملة 92%.</li>
              <li>• أفضل فريق استجابة للعملاء في الشهر.</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">الجلسات القادمة</p>
            <div className="mt-4 space-y-3">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="rounded-3xl border border-[rgba(var(--border),0.16)] p-4 transition duration-200 hover:border-[rgba(var(--accent),0.35)] hover:bg-[rgba(var(--surface-soft),0.22)]">
                  <p className="font-semibold text-[rgb(var(--text-primary))]">{session.title}</p>
                  <p className="mt-2 text-sm text-[rgb(var(--text-secondary))]">{session.date} • {session.time}</p>
                  <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">{session.court}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">أحدث النشاطات</p>
            <div className="mt-4 space-y-3">
              {recentActions.map((action) => (
                <div key={action.id} className="rounded-3xl bg-[rgba(var(--surface-soft),0.12)] p-4">
                  <p className="font-semibold text-[rgb(var(--text-primary))]">{action.title}</p>
                  <p className="mt-1 text-sm text-[rgb(var(--text-secondary))]">{action.subtitle}</p>
                  <p className="mt-2 text-xs text-[rgb(var(--text-muted))]">{action.time}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
