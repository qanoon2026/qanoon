'use client';

import { useState } from 'react';
import { Search, Plus, Filter, ChevronDown, Clock, AlertCircle } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { ActionButton } from '@/components/ActionButton';

const casesData = [
  {
    id: '2048',
    title: 'قضية تعويضات عمالية',
    client: 'أحمد محمد العامري',
    status: 'قيد التقاضي',
    type: 'عمالي',
    date: '15 مايو 2026',
    priority: 'عالي',
    progress: 75,
  },
  {
    id: '2047',
    title: 'نزاع عقاري - ملكية أرض',
    client: 'فاطمة علي السويدي',
    status: 'قيد الدراسة',
    type: 'عقاري',
    date: '12 مايو 2026',
    priority: 'متوسط',
    progress: 45,
  },
  {
    id: '2046',
    title: 'قضية تصفية تركة',
    client: 'محمود حسن الكعبي',
    status: 'مُغلقة',
    type: 'أحوال شخصية',
    date: '10 مايو 2026',
    priority: 'منخفض',
    progress: 100,
  },
];

export default function CasesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredCases = casesData.filter(caseItem => {
    const matchesSearch = caseItem.title.includes(search) || caseItem.client.includes(search);
    const matchesStatus = !statusFilter || caseItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="القضايا"
        description="إدارة وتتبع جميع قضاياك القانونية"
        action={
          <ActionButton variant="primary">
            <Plus className="h-4 w-4" />
            إضافة قضية جديدة
          </ActionButton>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن قضية أو موكل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-4 pr-10"
          />
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
            <Filter className="h-4 w-4" />
            تصفية
          </button>

          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
              الحالة
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="hidden group-hover:block absolute top-full right-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => setStatusFilter(null)}
                className="w-full text-right px-4 py-2.5 hover:bg-slate-50 text-sm font-medium border-b border-slate-200"
              >
                جميع الحالات
              </button>
              {['قيد التقاضي', 'قيد الدراسة', 'مُغلقة'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className="w-full text-right px-4 py-2.5 hover:bg-slate-50 text-sm font-medium"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cases Table */}
      <DataTable
        headers={['رقم القضية', 'العنوان', 'الموكل', 'الحالة', 'الأولوية', 'التقدم', '']}
        rows={filteredCases}
        renderRow={(caseItem) => (
          <>
            <td className="px-6 py-4 font-mono font-bold text-blue-600">#{caseItem.id}</td>
            <td className="px-6 py-4">
              <div className="font-semibold text-slate-900">{caseItem.title}</div>
              <div className="text-xs text-slate-500 mt-1">{caseItem.type}</div>
            </td>
            <td className="px-6 py-4 text-slate-700">{caseItem.client}</td>
            <td className="px-6 py-4">
              <StatusBadge
                status={caseItem.status}
                variant={
                  caseItem.status === 'مُغلقة' ? 'success' :
                  caseItem.status === 'قيد التقاضي' ? 'danger' :
                  'warning'
                }
              />
            </td>
            <td className="px-6 py-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                caseItem.priority === 'عالي' ? 'bg-red-100 text-red-800' :
                caseItem.priority === 'متوسط' ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }`}>
                {caseItem.priority === 'عالي' && <AlertCircle className="h-3 w-3" />}
                {caseItem.priority}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden min-w-[100px]">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                    style={{ width: `${caseItem.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-slate-600 w-8 text-left">{caseItem.progress}%</span>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              <ActionButton variant="ghost" size="sm">
                عرض
              </ActionButton>
            </td>
          </>
        )}
      />

      {/* Add Case Modal Design */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">تصميم إضافة قضية جديدة</h3>
        <div className="card-lg max-w-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">عنوان القضية</label>
              <input
                type="text"
                placeholder="مثال: قضية تعويضات عمالية"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">اختر الموكل</label>
                <select className="input-field">
                  <option>اختر موكل...</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">نوع القضية</label>
                <select className="input-field">
                  <option>عمالي</option>
                  <option>عقاري</option>
                  <option>جنائي</option>
                  <option>مدني</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <ActionButton variant="primary">إنشاء قضية</ActionButton>
              <ActionButton variant="ghost">إلغاء</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
