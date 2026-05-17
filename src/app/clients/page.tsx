'use client';

import { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';
import { StatusBadge } from '@/components/StatusBadge';

const clientsData = [
  { id: 1, name: 'أحمد محمد العامري', email: 'ahmad@example.com', phone: '+966501234567', cases: 5, active: true, city: 'الرياض', joinDate: 'يناير 2026', type: 'شركة' },
  { id: 2, name: 'فاطمة علي السويدي', email: 'fatima@example.com', phone: '+966505678901', cases: 3, active: true, city: 'جدة', joinDate: 'فبراير 2026', type: 'فرد' },
  { id: 3, name: 'محمود حسن الكعبي', email: 'mahmoud@example.com', phone: '+966509876543', cases: 2, active: false, city: 'الدمام', joinDate: 'مارس 2026', type: 'شركة' },
  { id: 4, name: 'نورا خالد الحمادي', email: 'nora@example.com', phone: '+966507654321', cases: 4, active: true, city: 'الرياض', joinDate: 'أبريل 2026', type: 'فرد' },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [viewType, setViewType] = useState<'cards' | 'table'>('cards');

  const filteredClients = clientsData.filter((client) => client.name.includes(search) || client.email.includes(search));

  return (
    <div className="space-y-8">
      <PageHeader
        title="الموكلون"
        description="قاعدة بيانات موكليك الأكثر قيمة مع تحليلات الأولوية والاتصال السريع" 
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />إضافة موكل</ActionButton>}
      />

      <div className="glass-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--text-primary))]">إدارة الموكلين</h2>
            <p className="mt-2 text-sm text-[rgb(var(--text-secondary))]">تبديل العرض بين البطاقات والجدول بشكل سريع.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--text-muted))]" />
              <input
                type="text"
                placeholder="ابحث عن موكل..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pr-10"
              />
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-[rgba(var(--surface-soft),0.22)] p-1">
              <button
                onClick={() => setViewType('cards')}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${viewType === 'cards' ? 'bg-[rgba(var(--accent),0.16)] text-[rgb(var(--text-primary))]' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'}`}
              >
                بطاقات
              </button>
              <button
                onClick={() => setViewType('table')}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${viewType === 'table' ? 'bg-[rgba(var(--accent),0.16)] text-[rgb(var(--text-primary))]' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'}`}
              >
                جدول
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewType === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="glass-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[rgba(var(--accent),0.18)] text-[rgb(var(--accent))] font-semibold">{client.name.charAt(0)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">{client.name}</h3>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">{client.type} • {client.city}</p>
                  </div>
                </div>
                <StatusBadge status={client.active ? 'نشط' : 'غير نشط'} variant={client.active ? 'success' : 'warning'} />
              </div>
              <div className="space-y-4 text-[rgb(var(--text-secondary))]">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[rgb(var(--accent))]" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[rgb(var(--accent))]" />
                  {client.phone}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[rgb(var(--accent))]" />
                  {client.joinDate}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 text-sm text-[rgb(var(--text-secondary))]">
                <span>قضايا نشطة: {client.cases}</span>
                <ActionButton variant="ghost" size="sm">عرض الملف</ActionButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-6 overflow-x-auto">
          <table className="w-full text-right">
            <thead className="table-head">
              <tr>
                {['الاسم', 'البريد', 'الهاتف', 'المدينة', 'قضايا', 'حالة', ''].map((title) => (
                  <th key={title} className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em]">{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="table-row">
                  <td className="px-6 py-4 font-semibold text-[rgb(var(--text-primary))]">{client.name}</td>
                  <td className="px-6 py-4 text-[rgb(var(--text-secondary))]">{client.email}</td>
                  <td className="px-6 py-4 text-[rgb(var(--text-secondary))]">{client.phone}</td>
                  <td className="px-6 py-4 text-[rgb(var(--text-secondary))]">{client.city}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-[rgba(var(--surface-soft),0.16)] px-3 py-1 text-sm text-[rgb(var(--text-primary))]">{client.cases}</span>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={client.active ? 'نشط' : 'غير نشط'} variant={client.active ? 'success' : 'warning'} /></td>
                  <td className="px-6 py-4 text-left"><ActionButton variant="ghost" size="sm">عرض</ActionButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
