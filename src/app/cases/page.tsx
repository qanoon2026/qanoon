'use client';

import { useState } from 'react';
import { Search, Plus, Filter, ChevronDown, Clock, AlertCircle } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { ActionButton } from '@/components/ActionButton';

const casesData = [
  { id: '2048', title: 'قضية تعويضات عمالية', client: 'أحمد العامري', status: 'قيد التقاضي', type: 'عمالي', date: '15 مايو', priority: 'عالي', progress: 75 },
  { id: '2047', title: 'نزاع عقاري - ملكية أرض', client: 'فاطمة السويدي', status: 'قيد الدراسة', type: 'عقاري', date: '12 مايو', priority: 'متوسط', progress: 45 },
  { id: '2046', title: 'قضية تصفية تركة', client: 'محمود الكعبي', status: 'مُغلقة', type: 'أحوال شخصية', date: '10 مايو', priority: 'منخفض', progress: 100 },
];

export default function CasesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = casesData.filter((item) => {
    const matchesSearch = item.title.includes(search) || item.client.includes(search);
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="القضايا"
        description="مركز القيادة للقضايا الجارية، الأولويات، والتقدّم" 
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />إضافة قضية جديدة</ActionButton>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-6">
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <h2 className="text-xl font-semibold text-[rgb(var(--text-primary))]">قائمة القضايا</h2>
                <p className="mt-2 text-sm text-[rgb(var(--text-secondary))]">تصفية، بحث، وتحليل حالة القضايا في مكان واحد.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--text-muted))]" />
                  <input
                    type="text"
                    placeholder="ابحث عن قضية أو موكل..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field pr-10"
                  />
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button className="btn-ghost inline-flex items-center gap-2"><Filter className="h-4 w-4" />تصفية</button>
                  <div className="relative group">
                    <button className="btn-ghost inline-flex items-center gap-2"><span>الحالة</span><ChevronDown className="h-4 w-4" /></button>
                    <div className="invisible group-hover:visible absolute right-0 top-full mt-2 w-44 rounded-3xl border border-[rgba(var(--border),0.18)] bg-[rgba(var(--surface),0.96)] p-2 shadow-soft">
                      <button onClick={() => setStatusFilter(null)} className="w-full rounded-2xl px-4 py-3 text-right text-sm text-[rgb(var(--text-secondary))] hover:bg-[rgba(var(--surface-soft),0.22)]">كل الحالات</button>
                      {['قيد التقاضي', 'قيد الدراسة', 'مُغلقة'].map((status) => (
                        <button key={status} onClick={() => setStatusFilter(status)} className="w-full rounded-2xl px-4 py-3 text-right text-sm text-[rgb(var(--text-secondary))] hover:bg-[rgba(var(--surface-soft),0.22)]">{status}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="table-head">
                  <tr>
                    {['رقم القضية', 'العنوان', 'الموكل', 'الحالة', 'الأولوية', 'التقدّم', ''].map((title) => (
                      <th key={title} className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em]">{title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((caseItem) => (
                    <tr key={caseItem.id} className="table-row">
                      <td className="px-6 py-4 text-[rgb(var(--accent))] font-semibold">#{caseItem.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[rgb(var(--text-primary))]">{caseItem.title}</div>
                        <p className="mt-1 text-xs text-[rgb(var(--text-secondary))]">{caseItem.type}</p>
                      </td>
                      <td className="px-6 py-4 text-[rgb(var(--text-secondary))]">{caseItem.client}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={caseItem.status} variant={caseItem.status === 'مُغلقة' ? 'success' : caseItem.status === 'قيد التقاضي' ? 'danger' : 'warning'} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(var(--surface-soft),0.16)] px-3 py-1 text-xs font-semibold text-[rgb(var(--text-secondary))]">
                          {caseItem.priority === 'عالي' && <AlertCircle className="h-3.5 w-3.5" />}
                          {caseItem.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-2.5 w-full rounded-full bg-[rgba(var(--border),0.18)] overflow-hidden">
                          <div className="h-full rounded-full bg-[rgba(var(--accent),0.9)]" style={{ width: `${caseItem.progress}%` }}></div>
                        </div>
                        <p className="mt-2 text-xs text-[rgb(var(--text-secondary))]">{caseItem.progress}%</p>
                      </td>
                      <td className="px-6 py-4 text-left">
                        <ActionButton variant="ghost" size="sm">عرض</ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">مؤشرات سريعة</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-[rgba(var(--surface-soft),0.14)] p-4">
                <p className="text-sm text-[rgb(var(--text-secondary))]">القضايا العاجلة</p>
                <p className="mt-2 text-2xl font-semibold text-[rgb(var(--text-primary))]">8</p>
              </div>
              <div className="rounded-3xl bg-[rgba(var(--surface-soft),0.14)] p-4">
                <p className="text-sm text-[rgb(var(--text-secondary))]">جلسات هذا الأسبوع</p>
                <p className="mt-2 text-2xl font-semibold text-[rgb(var(--text-primary))]">7</p>
              </div>
              <div className="rounded-3xl bg-[rgba(var(--surface-soft),0.14)] p-4">
                <p className="text-sm text-[rgb(var(--text-secondary))]">قضايا مغلقة</p>
                <p className="mt-2 text-2xl font-semibold text-[rgb(var(--text-primary))]">18</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">رؤى ذكية</h3>
            <div className="mt-4 space-y-3 text-sm text-[rgb(var(--text-secondary))]">
              <p>• 12 قضية تحتاج متابعة وثائق خلال 24 ساعة.</p>
              <p>• توصية بتوزيع جلسات المرافعة بناءً على الأولوية.</p>
              <p>• معدل استجابة العملاء 94%.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
