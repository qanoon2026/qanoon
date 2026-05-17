'use client';

import { useState } from 'react';
import { Plus, Check, Trash2, Clock, AlertCircle } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';
import { StatusBadge } from '@/components/StatusBadge';

const tasksList = [
  {
    id: 1,
    title: 'تجميع المستندات لقضية #2048',
    priority: 'عالي',
    dueDate: 'غداً',
    completed: false,
    caseId: '2048'
  },
  {
    id: 2,
    title: 'إرسال رسالة إلى موكل الحالة',
    priority: 'متوسط',
    dueDate: 'الأسبوع القادم',
    completed: false,
    caseId: '2045'
  },
  {
    id: 3,
    title: 'مراجعة اتفاقية الموكل',
    priority: 'منخفض',
    dueDate: 'في ساعتين',
    completed: true,
    caseId: '2046'
  },
  {
    id: 4,
    title: 'الرد على استفسار المحكمة',
    priority: 'عالي',
    dueDate: 'اليوم',
    completed: false,
    caseId: '2050'
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(tasksList);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="المهام"
        description="تنظيم ومتابعة مهامك القانونية اليومية"
        action={
          <ActionButton variant="primary">
            <Plus className="h-4 w-4" />
            مهمة جديدة
          </ActionButton>
        }
      />

      {/* Task Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-lg bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-slate-600 font-medium">إجمالي المهام</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{tasks.length}</p>
        </div>
        <div className="card-lg bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-slate-600 font-medium">مهام معلقة</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{pendingCount}</p>
        </div>
        <div className="card-lg bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-slate-600 font-medium">مهام مُنجزة</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{completedCount}</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">قائمة المهام</h3>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`card flex items-start gap-4 transition-all ${
                task.completed ? 'opacity-60 bg-slate-50' : 'bg-white'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 h-6 w-6 mt-1 rounded-lg border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? 'bg-gradient-to-r from-green-400 to-green-600 border-green-600'
                    : 'border-slate-300 hover:border-blue-500'
                }`}
              >
                {task.completed && <Check className="h-4 w-4 text-white" />}
              </button>

              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold ${
                  task.completed ? 'line-through text-slate-500' : 'text-slate-900'
                }`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {task.dueDate}
                  </span>
                  <span>القضية #{task.caseId}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusBadge
                  status={task.priority}
                  variant={
                    task.priority === 'عالي' ? 'danger' :
                    task.priority === 'متوسط' ? 'warning' :
                    'success'
                  }
                />
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Form Design */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">إضافة مهمة جديدة</h3>
        <div className="card-lg max-w-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">عنوان المهمة</label>
              <input
                type="text"
                placeholder="مثال: تجميع المستندات"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">الأولوية</label>
                <select className="input-field">
                  <option>منخفضة</option>
                  <option>متوسطة</option>
                  <option>عالية</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">تاريخ الاستحقاق</label>
                <input type="date" className="input-field" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">القضية المرتبطة (اختياري)</label>
              <input
                type="text"
                placeholder="رقم القضية"
                className="input-field"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <ActionButton variant="primary">إنشاء مهمة</ActionButton>
              <ActionButton variant="ghost">إلغاء</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
