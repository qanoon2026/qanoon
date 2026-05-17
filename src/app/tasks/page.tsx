'use client';

import { useState } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';
import { StatusBadge } from '@/components/StatusBadge';

const tasksList = [
  { id: 1, title: 'تجميع مستندات قضية 2048', priority: 'عالي', dueDate: 'غداً', completed: false, caseId: '2048' },
  { id: 2, title: 'إرسال تقرير العميل', priority: 'متوسط', dueDate: 'اليوم', completed: false, caseId: '2045' },
  { id: 3, title: 'مراجعة اتفاقية محكمة', priority: 'منخفض', dueDate: '23 مايو', completed: true, caseId: '2046' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(tasksList);

  const toggleTask = (id: number) => setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  const deleteTask = (id: number) => setTasks(tasks.filter((task) => task.id !== id));

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="space-y-8">
      <PageHeader
        title="المهام"
        description="لوحة متابعة المهام مع أولوية عالية للمهام القانونية الحرجة."
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />مهمة جديدة</ActionButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card-compact bg-slate-50">
              <p className="text-label">إجمالي المهام</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{tasks.length}</p>
            </div>
            <div className="card-compact bg-slate-50">
              <p className="text-label">قيد التنفيذ</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{pendingCount}</p>
            </div>
            <div className="card-compact bg-slate-50">
              <p className="text-label">مكتملة</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{completedCount}</p>
            </div>
          </div>

          <div className="card bg-slate-50">
            <div className="section-header">
              <div>
                <p className="text-label">قائمة المهام</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">المهام الحالية</h3>
              </div>
              <ActionButton variant="secondary">عرض الكل</ActionButton>
            </div>
            <div className="mt-6 space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-3xl border p-5 transition duration-200 ${task.completed ? 'border-slate-200 bg-slate-100/80' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className={`text-lg font-semibold ${task.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>{task.title}</p>
                      <p className="mt-2 text-sm text-slate-600 flex items-center gap-3">
                        <Clock className="h-4 w-4 text-gold-600" />{task.dueDate} • قضية {task.caseId}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge
                        status={task.priority}
                        variant={task.priority === 'عالي' ? 'danger' : task.priority === 'متوسط' ? 'warning' : 'success'}
                      />
                      <button onClick={() => toggleTask(task.id)} className="btn-secondary text-slate-700">
                        {task.completed ? 'إلغاء' : 'إنهاء'}
                      </button>
                      <button onClick={() => deleteTask(task.id)} className="inline-flex items-center gap-2 rounded-2xl border border-error-200 bg-error-50 px-4 py-2 text-sm font-semibold text-error-600">
                        <Trash2 className="h-4 w-4" /> حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-compact bg-slate-50">
            <p className="text-label">تنبيهات سريعة</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>• موعد تسليم مستندات 2048 غداً.</p>
              <p>• تأكيد حضور موكل 2045 قبل الظهر.</p>
              <p>• اكتمال إعداد تقرير القضية 2046.</p>
            </div>
          </div>

          <div className="card-compact bg-slate-50">
            <p className="text-label">أولوية المراجعة</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">أعلى أولوية</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">قضية 2048</p>
              </div>
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">متابعة</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">قضية 2045</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
