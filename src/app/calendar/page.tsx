'use client';

import { Plus, Clock, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

const upcomingEvents = [
  {
    id: 1,
    title: 'جلسة استئناف - القضية #2048',
    date: '16 مايو 2026',
    time: '10:00 صباحاً',
    location: 'محكمة الاستئناف - الرياض',
    type: 'session',
    caseId: '2048'
  },
  {
    id: 2,
    title: 'مرافعة نهائية',
    date: '17 مايو 2026',
    time: '02:00 مساءً',
    location: 'المحكمة الإدارية',
    type: 'hearing',
    caseId: '2045'
  },
  {
    id: 3,
    title: 'جلسة تحكيم',
    date: '20 مايو 2026',
    time: '03:00 مساءً',
    location: 'مركز التحكيم السعودي',
    type: 'mediation',
    caseId: '2043'
  },
];

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="التقويم"
        description="جدول مواعيدك والجلسات القضائية"
        action={
          <ActionButton variant="primary">
            <Plus className="h-4 w-4" />
            إضافة حدث
          </ActionButton>
        }
      />

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">الأحداث القادمة</h3>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="card-lg border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg">{event.title}</h4>
                  <div className="flex flex-col sm:flex-row gap-4 mt-3 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      {event.date} في {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <ActionButton variant="ghost" size="sm">عرض</ActionButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="card-lg">
        <h3 className="text-lg font-bold text-slate-900 mb-6">مايو 2026</h3>
        <div className="space-y-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['ح', 'ن', 'ث', 'ع', 'خ', 'ج', 'س'].map((day, idx) => (
              <div key={idx} className="font-bold text-slate-600 text-center py-2 text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const isEventDay = [16, 17, 20].includes(day);
              return (
                <div
                  key={day}
                  className={`p-2 rounded-lg text-center cursor-pointer transition-all text-sm font-medium ${
                    isEventDay
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {day}
                  {isEventDay && <div className="h-1 w-1 bg-yellow-300 rounded-full mx-auto mt-1"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Event Form Design */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">إضافة حدث جديد</h3>
        <div className="card-lg max-w-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">عنوان الحدث</label>
              <input
                type="text"
                placeholder="مثال: جلسة استئناف"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">التاريخ</label>
                <input type="date" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">الوقت</label>
                <input type="time" className="input-field" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">المكان</label>
              <input
                type="text"
                placeholder="المحكمة أو الموقع"
                className="input-field"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <ActionButton variant="primary">حفظ الحدث</ActionButton>
              <ActionButton variant="ghost">إلغاء</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
