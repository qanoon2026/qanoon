'use client';

import { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

const clientsData = [
  { id: 1, name: 'أحمد محمد العامري', email: 'ahmad@example.com', phone: '+966501234567', cases: 5, active: true, city: 'الرياض', joinDate: 'يناير 2026', type: 'شركة' },
  { id: 2, name: 'فاطمة علي السويدي', email: 'fatima@example.com', phone: '+966505678901', cases: 3, active: true, city: 'جدة', joinDate: 'فبراير 2026', type: 'فرد' },
  { id: 3, name: 'محمود حسن الكعبي', email: 'mahmoud@example.com', phone: '+966509876543', cases: 2, active: false, city: 'الدمام', joinDate: 'مارس 2026', type: 'شركة' },
  { id: 4, name: 'نورا خالد الحمادي', email: 'nora@example.com', phone: '+966507654321', cases: 4, active: true, city: 'الرياض', joinDate: 'أبريل 2026', type: 'فرد' },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');

  const filteredClients = clientsData.filter((client) =>
    client.name.includes(search) || client.email.includes(search) || client.city.includes(search)
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="الموكلون"
        description="قاعدة بيانات الموكلين مع معلومات اتصال واضحة وأولوية الأعمال القانونية."
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />إضافة موكل</ActionButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="card-compact bg-slate-50">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-label">بحث سريع</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">إدارة الموكلين</h3>
              </div>
              <div className="relative max-w-md">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="ابحث عن موكل أو بريد إلكتروني..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pr-10"
                />
              </div>
            </div>
          </div>

          <div className="card overflow-x-auto bg-slate-50">
            <table className="min-w-full text-right">
              <thead className="table-head">
                <tr>
                  {['الاسم', 'البريد', 'الهاتف', 'المدينة', 'قضايا', 'حالة', ''].map((title) => (
                    <th key={title} className="px-5 py-4">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="table-row">
                    <td className="px-5 py-4 font-semibold text-slate-900">{client.name}</td>
                    <td className="px-5 py-4 text-slate-700">{client.email}</td>
                    <td className="px-5 py-4 text-slate-700">{client.phone}</td>
                    <td className="px-5 py-4 text-slate-700">{client.city}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{client.cases}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${client.active ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-600'}`}>
                        {client.active ? 'نشط' : 'غير نشط'}
                      </span>
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
            <p className="text-label">نظرة سريعة</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">الوضع الحالي</h3>
            <div className="mt-5 grid gap-3">
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">الموكلين النشطين</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">3</p>
              </div>
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">عملاء الشركات</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">2</p>
              </div>
            </div>
          </div>

          <div className="card-compact bg-slate-50">
            <p className="text-label">الاتصال السريع</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold-600" />البريد الوارد وتذكير العملاء</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold-600" />رقم الهاتف في ملف الموكل</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-600" />المدينة ومساحة العمل الميداني</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
