'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const caseData = [
  { month: 'يناير', cases: 12, resolved: 8 },
  { month: 'فبراير', cases: 15, resolved: 10 },
  { month: 'مارس', cases: 20, resolved: 14 },
  { month: 'أبريل', cases: 18, resolved: 12 },
  { month: 'مايو', cases: 22, resolved: 16 },
];

const taskData = [
  { week: 'أسبوع 1', completed: 45, pending: 25 },
  { week: 'أسبوع 2', completed: 52, pending: 18 },
  { week: 'أسبوع 3', completed: 48, pending: 22 },
  { week: 'أسبوع 4', completed: 61, pending: 15 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم</h1>
        <p className="text-slate-600 mt-1">مرحباً بك في نظام إدارة القانوني المتقدم</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-lg bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-600 font-medium">إجمالي القضايا</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">87</p>
            </div>
            <div className="h-12 w-12 bg-blue-200 rounded-lg flex items-center justify-center text-blue-600">
              📋
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">+5 قضايا هذا الشهر</p>
        </div>

        <div className="card-lg bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-600 font-medium">القضايا المُغلقة</p>
              <p className="text-3xl font-bold text-green-600 mt-2">42</p>
            </div>
            <div className="h-12 w-12 bg-green-200 rounded-lg flex items-center justify-center text-green-600">
              ✓
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">معدل الإغلاق: 48%</p>
        </div>

        <div className="card-lg bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-600 font-medium">الموكلون النشطون</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">23</p>
            </div>
            <div className="h-12 w-12 bg-amber-200 rounded-lg flex items-center justify-center text-amber-600">
              👥
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">+2 موكل جديد</p>
        </div>

        <div className="card-lg bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-600 font-medium">المهام المعلقة</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">18</p>
            </div>
            <div className="h-12 w-12 bg-purple-200 rounded-lg flex items-center justify-center text-purple-600">
              ⚡
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">تحتاج إلى إجراء</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-lg">
          <h3 className="text-lg font-bold text-slate-900 mb-4">إحصائيات القضايا</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Bar dataKey="cases" fill="#3b82f6" name="إجمالي القضايا" radius={[8, 8, 0, 0]} />
              <Bar dataKey="resolved" fill="#10b981" name="المُغلقة" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-lg">
          <h3 className="text-lg font-bold text-slate-900 mb-4">تقدم المهام</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#8b5cf6" strokeWidth={2} name="المُنجزة" />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="المعلقة" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-lg">
        <h3 className="text-lg font-bold text-slate-900 mb-4">النشاط الأخير</h3>
        <div className="space-y-3">
          {[
            { action: 'تم إغلاق القضية رقم #2048', time: 'قبل ساعة', type: 'success' },
            { action: 'تم إضافة موكل جديد', time: 'قبل 3 ساعات', type: 'info' },
            { action: 'تم تحديث حالة القضية #2045', time: 'قبل 5 ساعات', type: 'info' },
            { action: 'تم إنشاء مهمة جديدة', time: 'أمس', type: 'info' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <span className="font-medium text-slate-700">{item.action}</span>
              <span className="text-xs text-slate-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
