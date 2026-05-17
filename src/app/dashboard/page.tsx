'use client';

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

const overviewCards = [
  { label: 'القضايا المفتوحة', value: '45', change: '+14%', trend: 'إيجابي' },
  { label: 'الجلسات هذا الشهر', value: '18', change: '+11%', trend: 'مستقر' },
  { label: 'العملاء النشطون', value: '28', change: '+8%', trend: 'ممتاز' },
  { label: 'نسبة الفوز', value: '82%', change: '+5%', trend: 'قوي' },
];

const progressData = [
  { month: 'يناير', value: 62 },
  { month: 'فبراير', value: 70 },
  { month: 'مارس', value: 72 },
  { month: 'أبريل', value: 80 },
  { month: 'مايو', value: 86 },
];

const caseDistribution = [
  { name: 'جنائي', value: 38, color: '#d97706' },
  { name: 'مدني', value: 32, color: '#2563eb' },
  { name: 'إداري', value: 30, color: '#a16207' },
];

const upcomingHearings = [
  { id: 1, title: 'جلسة استئناف - قضية 2048', date: '16 مايو', court: 'محكمة الاستئناف' },
  { id: 2, title: 'مرافعة نهائية - قضية 2045', date: '18 مايو', court: 'المحكمة الإدارية' },
  { id: 3, title: 'جلسة تحكيم - قضية 2043', date: '22 مايو', court: 'مركز التحكيم' },
];

const recentActivity = [
  { id: 1, label: 'تم تحديث مستندات قضية 2048', time: 'قبل ساعة' },
  { id: 2, label: 'تم إضافة موكل جديد', time: 'قبل 3 ساعات' },
  { id: 3, label: 'تم جدولة جلسة 2045', time: 'أمس' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="لوحة القيادة"
        description="ملخص أداء المكتب القانوني مع مؤشرات الأداء الرئيسية، اتجاهات القضايا، والجلسات القادمة."
        action={<ActionButton variant="primary">عرض التقارير</ActionButton>}
      />

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((item) => (
            <div key={item.label} className="card-compact border-slate-200/70 bg-slate-50">
              <p className="text-label">{item.label}</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</h2>
              <p className="mt-3 text-sm text-slate-600">{item.change} مقارنة بالشهر السابق • {item.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="card">
            <div className="section-header">
              <div>
                <p className="text-label">تحليل القضايا</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">اتجاهات الأداء القانوني</h3>
              </div>
              <ActionButton variant="secondary">تصدير</ActionButton>
            </div>
            <div className="mt-6 h-[320px] min-h-[320px]">
              <ResponsiveContainer width="100%" height={320} minWidth={0}>
                <LineChart data={progressData} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                  <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'rgb(255,255,255)', borderColor: 'rgba(203,213,225,0.6)', color: '#0f172a' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#c7a86d" strokeWidth={4} dot={{ fill: '#c7a86d' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-compact bg-slate-50">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-label">جلسات قادمة</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">الاستحقاقات القادمة</h3>
                </div>
                <span className="badge badge-gold">الأولوية العليا</span>
              </div>
              <div className="mt-6 space-y-4">
                {upcomingHearings.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.date} • {item.court}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-compact bg-slate-50">
              <p className="text-label">النشاط الأخير</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">سجل الإجراءات</h3>
              <div className="mt-5 space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4">
                    <div>
                      <p className="font-semibold text-slate-900">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.time}</p>
                    </div>
                    <span className="text-xs uppercase text-slate-500">جديد</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-compact bg-slate-50">
            <div className="section-header">
              <div>
                <p className="text-label">توزيع القضايا</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">حسب الفئة القانونية</h3>
              </div>
            </div>
            <div className="mt-6 h-[280px] min-h-[280px]">
              <ResponsiveContainer width="100%" height={260} minWidth={0}>
                <PieChart>
                  <Pie data={caseDistribution} dataKey="value" innerRadius={56} outerRadius={100} paddingAngle={4}>
                    {caseDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'rgb(255,255,255)', borderColor: 'rgba(203,213,225,0.6)', color: '#0f172a' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-compact bg-slate-50">
            <div className="section-header">
              <p className="text-label">حالة المحفظة</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">جهوزية الفريق القانوني</h3>
            </div>
            <div className="mt-6 space-y-4">
              {caseDistribution.map((item) => (
                <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <p className="font-semibold text-slate-900">{item.name}</p>
                    </div>
                    <span className="text-sm text-slate-600">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
