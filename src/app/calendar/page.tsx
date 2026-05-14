'use client';

import { Plus } from 'lucide-react';

const events = [
  { date: 'الأحد', day: 15, month: 'مايو', events: ['جلسة قضائية - الساعة 10:00', 'اجتماع موكل'] },
  { date: 'الاثنين', day: 16, month: 'مايو', events: ['تقديم مستندات'] },
  { date: 'الثلاثاء', day: 17, month: 'مايو', events: ['مراجعة ملفات'] },
];

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">التقويم</h1>
          <p className="text-slate-600 mt-1">جدول مواعيدك وأنشطتك القانونية</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          حدث جديد
        </button>
      </div>

      {/* Calendar Info */}
      <div className="card-lg">
        <h3 className="text-lg font-bold text-slate-900 mb-4">الأحداث القادمة</h3>
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="border-r-4 border-blue-500 bg-gradient-to-l from-blue-50 to-transparent pl-4 pr-4 py-3 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-slate-900">{event.date}</h4>
                  <p className="text-sm text-slate-600">{event.day} {event.month}</p>
                </div>
              </div>
              <div className="space-y-1">
                {event.events.map((e, i) => (
                  <p key={i} className="text-sm text-slate-700">• {e}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="card-lg">
        <h3 className="text-lg font-bold text-slate-900 mb-4">مايو 2026</h3>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['ح', 'ن', 'ث', 'ع', 'خ', 'ج', 'س'].map((day, idx) => (
            <div key={idx} className="font-semibold text-slate-600 py-2">{day}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i}
              className={`py-2 rounded-lg transition-colors ${
                [15, 16, 17].includes(i + 1)
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold'
                  : 'hover:bg-slate-100'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
