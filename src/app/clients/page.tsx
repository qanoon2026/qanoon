'use client';

import { useState } from 'react';
import { Search, Plus, Mail, Phone } from 'lucide-react';

const clients = [
  { id: 1, name: 'أحمد محمد العامري', email: 'ahmed@example.com', phone: '+966501234567', cases: 5, active: true },
  { id: 2, name: 'فاطمة علي السويدي', email: 'fatima@example.com', phone: '+966505678901', cases: 3, active: true },
  { id: 3, name: 'محمود حسن الكعبي', email: 'mahmoud@example.com', phone: '+966509876543', cases: 2, active: false },
  { id: 4, name: 'نورا خالد الحمادي', email: 'nora@example.com', phone: '+966507654321', cases: 4, active: true },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">الموكلون</h1>
          <p className="text-slate-600 mt-1">إدارة قاعدة بيانات موكليك</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          موكل جديد
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="ابحث عن موكل..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="card-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {client.name.charAt(0)}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                client.active ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
              }`}>
                {client.active ? 'نشط' : 'غير نشط'}
              </span>
            </div>
            <h3 className="font-bold text-slate-900">{client.name}</h3>
            <p className="text-sm text-slate-500 mt-2">قضايا: {client.cases}</p>
            
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="h-4 w-4 text-blue-500" />
                {client.phone}
              </div>
            </div>

            <button className="mt-4 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition-colors">
              عرض التفاصيل
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
