'use client';

import { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';
import { StatusBadge } from '@/components/StatusBadge';

const clientsData = [
  {
    id: 1,
    name: 'أحمد محمد العامري',
    email: 'ahmad@example.com',
    phone: '+966501234567',
    cases: 5,
    active: true,
    city: 'الرياض',
    joinDate: 'يناير 2026',
    type: 'شركة'
  },
  {
    id: 2,
    name: 'فاطمة علي السويدي',
    email: 'fatima@example.com',
    phone: '+966505678901',
    cases: 3,
    active: true,
    city: 'جدة',
    joinDate: 'فبراير 2026',
    type: 'فرد'
  },
  {
    id: 3,
    name: 'محمود حسن الكعبي',
    email: 'mahmoud@example.com',
    phone: '+966509876543',
    cases: 2,
    active: false,
    city: 'الدمام',
    joinDate: 'مارس 2026',
    type: 'شركة'
  },
  {
    id: 4,
    name: 'نورا خالد الحمادي',
    email: 'nora@example.com',
    phone: '+966507654321',
    cases: 4,
    active: true,
    city: 'الرياض',
    joinDate: 'أبريل 2026',
    type: 'فرد'
  },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [viewType, setViewType] = useState<'cards' | 'table'>('cards');

  const filteredClients = clientsData.filter(client =>
    client.name.includes(search) || client.email.includes(search)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="الموكلون"
        description="إدارة قاعدة بيانات موكليك والتواصل معهم"
        action={
          <ActionButton variant="primary">
            <Plus className="h-4 w-4" />
            إضافة موكل جديد
          </ActionButton>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن موكل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-4 pr-10 h-full"
          />
        </div>

        <div className="flex gap-2 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setViewType('cards')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              viewType === 'cards'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            بطاقات
          </button>
          <button
            onClick={() => setViewType('table')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              viewType === 'table'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            جدول
          </button>
        </div>
      </div>

      {/* Clients Cards View */}
      {viewType === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="card-lg hover:shadow-lg transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {client.name.charAt(0)}
                </div>
                <StatusBadge
                  status={client.active ? 'نشط' : 'غير نشط'}
                  variant={client.active ? 'success' : 'info'}
                />
              </div>

              <h3 className="font-bold text-slate-900 text-lg">{client.name}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="px-2 py-1 bg-slate-100 rounded-full">{client.type}</span>
                <span className="px-2 py-1 bg-slate-100 rounded-full">{client.city}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="truncate text-xs">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  {client.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-xs">📋 {client.cases} قضايا نشطة</span>
                </div>
              </div>

              <button className="mt-4 w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                عرض الملف الشخصي
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Clients Table View */}
      {viewType === 'table' && (
        <div className="card-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="table-head">
                <tr>
                  <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">الاسم</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">البريد الإلكتروني</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">الهاتف</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">المدينة</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">القضايا</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">الحالة</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="table-row">
                    <td className="px-6 py-4 font-medium text-slate-900">{client.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{client.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{client.phone}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{client.city}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                        {client.cases}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        status={client.active ? 'نشط' : 'معطل'}
                        variant={client.active ? 'success' : 'warning'}
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionButton variant="ghost" size="sm">عرض</ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Client Profile Preview Design */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">معاينة ملف الموكل</h3>
        <div className="card-lg bg-gradient-to-br from-white via-slate-50 to-blue-50 max-w-2xl">
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">أحمد محمد العامري</h2>
              <p className="text-slate-600 mt-1">شركة عامة التأسيس - الرياض</p>
            </div>
            <StatusBadge status="نشط" variant="success" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-slate-600 mb-1">البريد الإلكتروني</p>
              <p className="font-medium text-slate-900">ahmad@company.com</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">رقم الهاتف</p>
              <p className="font-medium text-slate-900">+966 50 123 4567</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">تاريخ الانضمام</p>
              <p className="font-medium text-slate-900">يناير 15، 2026</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">القضايا النشطة</p>
              <p className="font-medium text-slate-900">5 قضايا</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <ActionButton variant="primary">تعديل البيانات</ActionButton>
            <ActionButton variant="secondary">عرض القضايا</ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
