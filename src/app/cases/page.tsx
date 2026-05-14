'use client';

import { useState } from 'react';
import { Search, Plus, Filter, ArrowDown, ArrowUp, AlertCircle } from 'lucide-react';

const cases = [
  {
    id: '2048',
    title: 'قضية تعويضات عمالية',
    client: 'أحمد محمد العامري',
    status: 'قيد التقاضي',
    date: '15 مايو 2026',
    priority: 'عالي',
    progress: 75,
  },
  {
    id: '2047',
    title: 'نزاع عقاري',
    client: 'فاطمة علي السويدي',
    status: 'قيد الدراسة',
    date: '12 مايو 2026',
    priority: 'متوسط',
    progress: 45,
  },
  {
    id: '2046',
    title: 'قضية تصفية تركة',
    client: 'محمود حسن الكعبي',
    status: 'مُغلقة',
    date: '10 مايو 2026',
    priority: 'منخفض',
    progress: 100,
  },
];

export default function CasesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">القضايا</h1>
          <p className="text-slate-600 mt-1">إدارة جميع قضاياك القانونية</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          قضية جديدة
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن قضية..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <Filter className="h-4 w-4" />
          التصفية
        </button>
      </div>

      {/* Cases Table */}
      <div className="card-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">رقم القضية</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">العنوان</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">الموكل</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">الحالة</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">الأولوية</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">التقدم</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-blue-600">#{caseItem.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{caseItem.title}</td>
                  <td className="px-4 py-3 text-slate-700">{caseItem.client}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      caseItem.status === 'مُغلقة' ? 'bg-green-100 text-green-800' :
                      caseItem.status === 'قيد التقاضي' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                      caseItem.priority === 'عالي' ? 'bg-red-100 text-red-800' :
                      caseItem.priority === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {caseItem.priority === 'عالي' && <ArrowUp className="h-3 w-3" />}
                      {caseItem.priority === 'منخفض' && <ArrowDown className="h-3 w-3" />}
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                          style={{ width: `${caseItem.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 w-8 text-left">{caseItem.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
