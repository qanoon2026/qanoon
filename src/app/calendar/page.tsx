'use client';

import { Plus, Clock, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

const events = [
  { id: 1, title: 'جلسة استئناف - قضية 2048', date: '16 مايو', time: '10:00', location: 'محكمة الاستئناف' },
  { id: 2, title: 'مرافعة نهائية - قضية 2045', date: '18 مايو', time: '14:00', location: 'المحكمة الإدارية' },
  { id: 3, title: 'جلسة تحكيم - قضية 2043', date: '22 مايو', time: '15:00', location: 'مركز التحكيم' },
];

const weekDays = ['ح', 'ن', 'ث', 'ع', 'خ', 'ج', 'س'];

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="التقويم"
        description="تقويم الجلسات وموعد الاستحقاقات مع عرض واضح ومنظم."
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />إضافة حدث</ActionButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_0.9fr]">
        <div className="card bg-slate-50">
          <div className="section-header">
            <div>
              <p className="text-label">الأحداث المهمة</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">جلسات هذا الشهر</h3>
            </div>
            <ActionButton variant="secondary">طباعة الجدول</ActionButton>
          </div>
          <div className="mt-6 space-y-4">
            {events.map((event) => (
              <div key={event.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{event.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{event.location}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">{event.date}</div>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                    <Clock className="h-4 w-4 text-gold-600" />{event.time}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                    <MapPin className="h-4 w-4 text-gold-600" />{event.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="card-compact bg-slate-50">
            <div className="section-header">
              <div>
                <p className="text-label">التقويم الشهري</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">مايو 2026</h3>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
              {weekDays.map((day) => (
                <div key={day} className="py-3">{day}</div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, index) => {
                const day = index + 1;
                const isEvent = [16, 18, 22].includes(day);
                return (
                  <div
                    key={day}
                    className={`rounded-3xl p-3 text-sm font-semibold ${
                      isEvent ? 'bg-gold-100 text-slate-900 shadow-sm' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-compact bg-slate-50">
            <p className="text-label">أداء الجدولة</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">معدل حضور المواعيد</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>• 92% من الجلسات محددة في الوقت المناسب.</p>
              <p>• 3 جلسات مهمة تحتاج تأكيد حضور الشهود.</p>
              <p>• تذكير تلقائي مرسل إلى فريق الدعم.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
