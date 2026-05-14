'use client';

import { useState } from 'react';
import { Plus, Download, Trash2, File, Folder } from 'lucide-react';

const files = [
  { id: 1, name: 'عقد الموكالة - أحمد العامري.pdf', size: '2.4 MB', date: '15 مايو 2026', type: 'pdf' },
  { id: 2, name: 'أوراق القضية #2048', size: 'مجلد', date: '12 مايو 2026', type: 'folder' },
  { id: 3, name: 'رسالة المحكمة.docx', size: '450 KB', date: '10 مايو 2026', type: 'doc' },
  { id: 4, name: 'قائمة الشهود.xlsx', size: '180 KB', date: '8 مايو 2026', type: 'sheet' },
];

export default function FilesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">الملفات</h1>
          <p className="text-slate-600 mt-1">إدارة ملفاتك والمستندات</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          رفع ملف
        </button>
      </div>

      {/* File Storage Stats */}
      <div className="card-lg">
        <h3 className="font-bold text-slate-900 mb-4">سعة التخزين</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">المستخدم</span>
            <span className="font-semibold text-slate-900">7.2 GB / 10 GB</span>
          </div>
          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="card-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">الملف</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">الحجم</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">التاريخ</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-2">
                    {file.type === 'folder' ? (
                      <Folder className="h-5 w-5 text-amber-500" />
                    ) : (
                      <File className="h-5 w-5 text-blue-500" />
                    )}
                    <span className="font-medium text-slate-900">{file.name}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{file.size}</td>
                  <td className="px-4 py-3 text-slate-600 text-sm">{file.date}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
