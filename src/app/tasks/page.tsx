'use client';

import { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';

const tasks = [
  { id: 1, title: 'تجميع المستندات لقضية #2048', priority: 'عالي', dueDate: 'غداً', completed: false },
  { id: 2, title: 'إرسال رسالة إلى موكل الحالة', priority: 'متوسط', dueDate: 'الأسبوع القادم', completed: false },
  { id: 3, title: 'مراجعة اتفاقية الموكل', priority: 'منخفض', dueDate: 'في ساعتين', completed: true },
  { id: 4, title: 'الرد على استفسار المحكمة', priority: 'عالي', dueDate: 'اليوم', completed: false },
];

export default function TasksPage() {
  const [taskList, setTaskList] = useState(tasks);

  const toggleTask = (id: number) => {
    setTaskList(taskList.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">المهام</h1>
          <p className="text-slate-600 mt-1">تنظيم ومتابعة مهامك اليومية</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          مهمة جديدة
        </button>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-lg text-center">
          <p className="text-3xl font-bold text-blue-600">{taskList.length}</p>
          <p className="text-sm text-slate-600 mt-1">إجمالي المهام</p>
        </div>
        <div className="card-lg text-center">
          <p className="text-3xl font-bold text-purple-600">{taskList.filter(t => !t.completed).length}</p>
          <p className="text-sm text-slate-600 mt-1">مهام معلقة</p>
        </div>
        <div className="card-lg text-center">
          <p className="text-3xl font-bold text-green-600">{taskList.filter(t => t.completed).length}</p>
          <p className="text-sm text-slate-600 mt-1">مهام مُنجزة</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {taskList.map((task) => (
          <div
            key={task.id}
            className={`card flex items-center gap-3 transition-all ${
              task.completed ? 'opacity-60' : 'opacity-100'
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`flex-shrink-0 h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-gradient-to-r from-green-400 to-green-600 border-green-600'
                  : 'border-slate-300 hover:border-blue-500'
              }`}
            >
              {task.completed && <Check className="h-4 w-4 text-white" />}
            </button>

            <div className="flex-1 min-w-0">
              <h4 className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                {task.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{task.dueDate}</p>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
              task.priority === 'عالي' ? 'bg-red-100 text-red-800' :
              task.priority === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              className="flex-shrink-0 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
