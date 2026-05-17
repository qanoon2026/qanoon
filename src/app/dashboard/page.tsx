'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { PageHeader } from '@/components/PageHeader';
import { MetricCard } from '@/components/MetricCard';
import { ActionButton } from '@/components/ActionButton';
import { Calendar, Users, FileText, TrendingUp, Zap, Clock } from 'lucide-react';

const caseData = [
  { month: 'يناير', active: 12, closed: 8 },
  { month: 'فبراير', active: 15, closed: 10 },
  { month: 'مارس', active: 20, closed: 14 },
  { month: 'أبريل', active: 18, closed: 12 },
  { month: 'مايو', active: 22, closed: 16 },
];

const caseTypeData = [
  { name: 'جنائي', value: 35, color: '#ef4444' },
  { name: 'مدني', value: 45, color: '#3b82f6' },
  { name: 'إداري', value: 20, color: '#f59e0b' },
];

const upcomingSessions = [
  { id: 1, title: 'جلسة استئناف - قضية #2048', date: 'الخميس 16 مايو', time: '10:00 صباحاً', caseId: '2048' },
  { id: 2, title: 'مرافعة نهائية - قضية #2045', date: 'الجمعة 17 مايو', time: '02:00 مساءً', caseId: '2045' },
  { id: 3, title: 'جلسة تحكيم - قضية #2043', date: 'الاثنين 20 مايو', time: '03:00 مساءً', caseId: '2043' },
];

const recentActivity = [
  { id: 1, action: 'تم إغلاق القضية رقم #2048', time: 'قبل ساعتين', type: 'closed', initials: 'إ' },
  { id: 2, action: 'تم إضافة موكل جديد: أحمد الدعيع', time: 'قبل 4 ساعات', type: 'client', initials: 'ع' },
  { id: 3, action: 'تم تحديث ملف القضية #2045', time: 'قبل يوم', type: 'update', initials: 'ت' },
  { id: 4, action: 'تم جدولة جلسة قضائية جديدة', time: 'قبل يومين', type: 'session', initials: 'ج' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="لوحة التحكم"
        description="نظرة عامة شاملة على عملك القانوني"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="إجمالي القضايا"
          value="87"
          change="12 قضية هذا الشهر"
          changeType="positive"
          icon={<FileText className="h-6 w-6" />}
          color="blue"
        />
        <MetricCard
          label="القضايا النشطة"
          value="45"
          change="من 87"
          changeType="neutral"
          icon={<TrendingUp className="h-6 w-6" />}
          color="purple"
        />
        <MetricCard
          label="الموكلون"
          value="28"
          change="5 موكلين جدد"
          changeType="positive"
          icon={<Users className="h-6 w-6" />}
          color="green"
        />
        <MetricCard
          label="الجلسات القادمة"
          value="12"
          change="خلال 30 يوم"
          changeType="neutral"
          icon={<Calendar className="h-6 w-6" />}
          color="amber"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Progress Chart */}
        <div className="lg:col-span-2 card-lg">
          <h3 className="text-lg font-bold text-slate-900 mb-6">تقدم القضايا</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '0.875rem' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '0.875rem' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#1e293b'
                }}
              />
              <Bar dataKey="active" fill="#3b82f6" name="نشطة" radius={[8, 8, 0, 0]} />
              <Bar dataKey="closed" fill="#10b981" name="مُغلقة" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Case Type Distribution */}
        <div className="card-lg">
          <h3 className="text-lg font-bold text-slate-900 mb-6">نوع القضايا</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={caseTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {caseTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {caseTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Sessions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 card-lg">
          <h3 className="text-lg font-bold text-slate-900 mb-6">الجلسات القادمة</h3>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{session.title}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </span>
                    </div>
                  </div>
                  <ActionButton variant="ghost" size="sm">عرض</ActionButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="card-premium border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 via-yellow-50 to-amber-50">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
            <h3 className="text-lg font-bold text-slate-900">رؤى ذكية</h3>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-slate-700">
              • لديك 5 قضايا تقترب من الجلسة النهائية - تأكد من جاهزية المستندات
            </p>
            <p className="text-slate-700">
              • معدل إغلاق القضايا ارتفع بنسبة 23% عن الشهر السابق - أداء متميز
            </p>
            <p className="text-slate-700">
              • موكل واحد لم يقدم المستندات المطلوبة - يحتاج متابعة
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-lg">
        <h3 className="text-lg font-bold text-slate-900 mb-6">النشاط الأخير</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center font-semibold text-blue-700 flex-shrink-0">
                {activity.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">{activity.action}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
