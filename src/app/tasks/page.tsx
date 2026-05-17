'use client';

import { useState } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';
import { StatusBadge } from '@/components/StatusBadge';

const tasksList = [
  { id: 1, title: 'تجميع المستندات لقضية #2048', priority: 'عالي', dueDate: 'غداً', completed: false, caseId: '2048' },
  { id: 2, title: 'إرسال رسالة إلى موكل الحالة', priority: 'متوسط', dueDate: 'الأسبوع القادم', completed: false, caseId: '2045' },
  { id: 3, title: 'مراجعة اتفاقية الموكل', priority: 'منخفض', dueDate: 'في ساعتين', completed: true, caseId: '2046' },
  { id: 4, title: 'الرد على استفسار المحكمة', priority: 'عالي', dueDate: 'اليوم', completed: false, caseId: '2050' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(tasksList);

  const toggleTask = (id: number) => setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  const deleteTask = (id: number) => setTasks(tasks.filter((task) => task.id !== id));

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="المهام"
        description="لوحة إدارة المهام مع تتبع التقدم وتنبيهات الأولوية" 
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />مهمة جديدة</ActionButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_0.55fr] gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">إجمالي</p>
              <p className="mt-4 text-3xl font-semibold text-[rgb(var(--text-primary))]">{tasks.length}</p>
            </div>
            <div className="glass-card p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">قيد التنفيذ</p>
              <p className="mt-4 text-3xl font-semibold text-[rgb(var(--text-primary))]">{pendingCount}</p>
            </div>
            <div className="glass-card p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">مكتملة</p>
              <p className="mt-4 text-3xl font-semibold text-[rgb(var(--text-primary))]">{completedCount}</p>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-semibold text-[rgb(var(--text-primary))]">قائمة المهام</h2>
                <p className="mt-2 text-sm text-[rgb(var(--text-secondary))]">مهام منظمة حسب الأولوية وتاريخ الاستحقاق.</p>
              </div>
              <ActionButton variant="secondary">عرض الكل</ActionButton>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className={`rounded-3xl border p-5 transition duration-200 ${task.completed ? 'border-[rgba(var(--accent),0.14)] bg-[rgba(var(--surface-soft),0.12)] opacity-90' : 'border-[rgba(var(--border),0.16)] bg-[rgba(var(--surface-soft),0.08)] hover:border-[rgba(var(--accent),0.24)] hover:bg-[rgba(var(--surface-soft),0.16)]'}`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className={`text-lg font-semibold ${task.completed ? 'text-[rgb(var(--text-secondary))] line-through' : 'text-[rgb(var(--text-primary))]'}`}>{task.title}</p>
                      <p className="mt-2 text-sm text-[rgb(var(--text-secondary))] flex items-center gap-3"><Clock className="h-4 w-4 text-[rgb(var(--accent))]" />{task.dueDate} • قضية #{task.caseId}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <StatusBadge status={task.priority} variant={task.priority === 'عالي' ? 'danger' : task.priority === 'متوسط' ? 'warning' : 'success'} />
                      <button onClick={() => toggleTask(task.id)} className="rounded-2xl border border-[rgba(var(--border),0.18)] bg-[rgba(var(--surface-soft),0.2)] px-4 py-2 text-sm text-[rgb(var(--text-primary))] transition hover:border-[rgba(var(--accent),0.3)]">
                        {task.completed ? 'إلغاء' : 'مكتمل'}
                      </button>
                      <button onClick={() => deleteTask(task.id)} className="rounded-2xl border border-rose-400/20 bg-[rgba(239,68,68,0.12)] px-4 py-2 text-sm text-rose-200 transition hover:bg-[rgba(239,68,68,0.18)]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">تنبيهات</p>
            <div className="mt-5 space-y-4 text-sm text-[rgb(var(--text-secondary))]">
              <p>• يجب إرسال 3 ملفات ساعات قبل الجلسة.</p>
              <p>• تحديث حالة قضية #2047 خلال اليوم.</p>
              <p>• تحضير سؤال الشاهد لقضية #2050.</p>
            </div>
          </div>

          <div className="glass-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">أولوية الجلسات</p>
            <div className="mt-5 space-y-3">
              <div className="rounded-3xl bg-[rgba(var(--surface-soft),0.16)] p-4">
                <p className="text-sm text-[rgb(var(--text-secondary))]">جلسة استئناف</p>
                <p className="mt-2 text-lg font-semibold text-[rgb(var(--text-primary))]">#2048</p>
              </div>
              <div className="rounded-3xl bg-[rgba(var(--surface-soft),0.16)] p-4">
                <p className="text-sm text-[rgb(var(--text-secondary))]">جلسة مرافعة</p>
                <p className="mt-2 text-lg font-semibold text-[rgb(var(--text-primary))]">#2045</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
