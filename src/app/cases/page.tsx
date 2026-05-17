'use client';

import { useState } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { ActionButton } from '@/components/ActionButton';

const casesData = [
  { id: '2048', title: 'قضية تعويضات عمالية', client: 'أحمد العامري', status: 'قيد التقاضي', type: 'عمالي', date: '15 مايو', priority: 'عالي', progress: 75 },
  { id: '2047', title: 'نزاع عقاري - ملكية أرض', client: 'فاطمة السويدي', status: 'قيد الدراسة', type: 'عقاري', date: '12 مايو', priority: 'متوسط', progress: 45 },
  { id: '2046', title: 'قضية تصفية تركة', client: 'محمود الكعبي', status: 'مُغلقة', type: 'أحوال شخصية', date: '10 مايو', priority: 'منخفض', progress: 100 },
];

const statuses = ['الكل', 'قيد التقاضي', 'قيد الدراسة', 'مُغلقة'];

export default function CasesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  const filtered = casesData.filter((item) => {
    const matchesSearch = item.title.includes(search) || item.client.includes(search);
    const matchesStatus = statusFilter === 'الكل' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="القضايا"
        description="لوحة إدارة القضايا مع بحث سريع وفلترة واضحة وأداء جدول احترافي."
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />إضافة قضية</ActionButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="card-compact bg-slate-50">
            <div className="grid gap-4 lg:grid-cols-[1.5fr_0.6fr]">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="ابحث عن قضية أو موكل..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pr-10"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field max-w-xs"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button className="btn-secondary">
                  <Filter className="h-4 w-4" />
                  فلتر
                </button>
              </div>
            </div>
          </div>

          <div className="card overflow-x-auto bg-slate-50">
            <table className="min-w-full text-right">
              <thead className="table-head">
                <tr>
                  {['رقم القضية', 'العنوان', 'الموكل', 'الحالة', 'الأولوية', 'التقدم', ''].map((title) => (
                    <th key={title} className="px-5 py-4">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((caseItem) => (
                  <tr key={caseItem.id} className="table-row">
                    <td className="px-5 py-4 font-semibold text-slate-900">#{caseItem.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{caseItem.title}</div>
                      <p className="mt-1 text-sm text-slate-500">{caseItem.type}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-700">{caseItem.client}</td>
                    <td className="px-5 py-4">
                      <StatusBadge
                        status={caseItem.status}
                        variant={caseItem.status === 'مُغلقة' ? 'success' : caseItem.status === 'قيد التقاضي' ? 'warning' : 'info'}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{caseItem.priority}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-gold-500" style={{ width: `${caseItem.progress}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">{caseItem.progress}%</p>
                    </td>
                    <td className="px-5 py-4">
                      <button className="btn-ghost text-slate-700">عرض</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-compact bg-slate-50">
            <p className="text-label">ملخص سريع</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">بأرقام واضحة</h3>
            <div className="mt-5 grid gap-3">
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">القضايا العاجلة</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">8</p>
              </div>
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">جلسات هذا الأسبوع</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">7</p>
              </div>
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">القضايا المكتملة</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">18</p>
              </div>
            </div>
          </div>

          <div className="card-compact bg-slate-50">
            <p className="text-label">ملاحظات سريعة</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>• راجع المستندات النهائية قبل جلسة 2048.</p>
              <p>• أضف خطة الاستئناف إلى قضية 2047.</p>
              <p>• تأكيد حضور الشهود في قضية 2043.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
