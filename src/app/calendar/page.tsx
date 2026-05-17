'use client';

import { Plus, Clock, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

const events = [
  { id: 1, title: 'جلسة استئناف - القضية #2048', date: '16 مايو', time: '10:00', location: 'محكمة الاستئناف - الرياض' },
  { id: 2, title: 'مرافعة نهائية - القضية #2045', date: '17 مايو', time: '14:00', location: 'المحكمة الإدارية' },
  { id: 3, title: 'جلسة تحكيم - القضية #2043', date: '20 مايو', time: '15:00', location: 'مركز التحكيم السعودي' },
];

const weekDays = ['ح', 'ن', 'ث', 'ع', 'خ', 'ج', 'س'];

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="التقويم"
        description="لوحة تنظيمية للجلسات، الاجتماعات، والعروض التقديمية" 
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />إضافة حدث</ActionButton>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[0.7fr_1.3fr] gap-6">
        <aside className="glass-card p-6 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">الأحداث القادمة</p>
            <h2 className="mt-3 text-2xl font-semibold text-[rgb(var(--text-primary))]">جدول الجلسات</h2>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="rounded-3xl border border-[rgba(var(--border),0.18)] bg-[rgba(var(--surface-soft),0.14)] p-5 transition duration-200 hover:border-[rgba(var(--accent),0.35)]">
                <p className="text-lg font-semibold text-[rgb(var(--text-primary))]">{event.title}</p>
                <div className="mt-3 space-y-2 text-sm text-[rgb(var(--text-secondary))]">
                  <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-[rgb(var(--accent))]" />{event.date} • {event.time}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[rgb(var(--accent))]" />{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="glass-card p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">تقويم الشهر</p>
              <h2 className="mt-3 text-2xl font-semibold text-[rgb(var(--text-primary))]">مايو 2026</h2>
            </div>
            <ActionButton variant="secondary">عرض الجدول الكامل</ActionButton>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-[rgb(var(--text-secondary))] uppercase text-xs tracking-[0.2em] mb-3">
            {weekDays.map((day) => (
              <div key={day} className="py-3">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, index) => {
              const day = index + 1;
              const isEvent = [16, 17, 20].includes(day);
              return (
                <div
                  key={day}
                  className={`rounded-3xl p-3 text-sm font-semibold transition duration-200 ${isEvent ? 'bg-[rgba(var(--accent),0.22)] text-[rgb(var(--text-primary))] shadow-soft' : 'bg-[rgba(var(--surface-soft),0.08)] text-[rgb(var(--text-secondary))] hover:bg-[rgba(var(--surface-soft),0.2)]'}`}
                >
                  <div>{day}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">إدارة الأحداث</p>
            <h2 className="mt-3 text-xl font-semibold text-[rgb(var(--text-primary))]">تنسيق الخط الزمني القانوني</h2>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[rgb(var(--text-secondary))]">
            <span className="rounded-full bg-[rgba(var(--surface-soft),0.16)] px-4 py-2">أحداث: 14</span>
            <span className="rounded-full bg-[rgba(var(--surface-soft),0.16)] px-4 py-2">جلسات هذا الشهر: 7</span>
            <span className="rounded-full bg-[rgba(var(--surface-soft),0.16)] px-4 py-2">مواعيد ملغاة: 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
