'use client';

import { Plus, Download, Trash2, File, Folder, Upload, FileText } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

const filesList = [
  {
    id: 1,
    name: 'عقد الموكالة - أحمد العامري.pdf',
    size: '2.4 MB',
    date: '15 مايو 2026',
    type: 'pdf',
    case: '2048'
  },
  {
    id: 2,
    name: 'أوراق القضية #2048',
    size: 'مجلد',
    date: '12 مايو 2026',
    type: 'folder',
    case: '2048'
  },
  {
    id: 3,
    name: 'رسالة المحكمة - الرد.docx',
    size: '450 KB',
    date: '10 مايو 2026',
    type: 'doc',
    case: '2045'
  },
  {
    id: 4,
    name: 'قائمة الشهود والمستندات.xlsx',
    size: '180 KB',
    date: '8 مايو 2026',
    type: 'sheet',
    case: '2046'
  },
];

export default function FilesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="الملفات"
        description="إدارة ملفاتك والمستندات القانونية"
        action={
          <ActionButton variant="primary">
            <Plus className="h-4 w-4" />
            رفع ملف
          </ActionButton>
        }
      />

      {/* Upload Area Design */}
      <div className="card-lg border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-blue-50 hover:border-blue-500 transition-colors cursor-pointer">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">اسحب ملفاتك هنا</h3>
          <p className="text-slate-600 mt-2">أو انقر لاختيار ملفات</p>
          <p className="text-xs text-slate-500 mt-2">الملفات المدعومة: PDF، DOCX، XLSX، JPG، PNG</p>
        </div>
      </div>

      {/* Storage Stats */}
      <div className="card-lg">
        <h3 className="font-bold text-slate-900 mb-4">سعة التخزين</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">المستخدم</span>
            <span className="font-bold text-slate-900">7.2 GB من 10 GB</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>
          <p className="text-xs text-slate-500">3.8 GB متبقية</p>
        </div>
      </div>

      {/* Files List Table */}
      <div className="card-lg overflow-hidden">
        <h3 className="text-lg font-bold text-slate-900 mb-4">الملفات الأخيرة</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-head">
              <tr>
                <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">الملف</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">الحجم</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">التاريخ</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm">القضية</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-700 text-sm"></th>
              </tr>
            </thead>
            <tbody>
              {filesList.map((file) => (
                <tr key={file.id} className="table-row">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {file.type === 'folder' ? (
                      <Folder className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    ) : (
                      <File className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    )}
                    <span className="font-medium text-slate-900">{file.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{file.size}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{file.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                      #{file.case}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-end">
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

      {/* File Organization Tips */}
      <div className="card-lg bg-gradient-to-br from-amber-50 to-amber-50 border-amber-200">
        <h3 className="font-bold text-slate-900 mb-3">💡 نصيحة: تنظيم الملفات</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>• قم بإنشاء مجلدات منفصلة لكل قضية</li>
          <li>• احفظ العقود والاتفاقيات في مجلد خاص</li>
          <li>• استخدم أسماء واضحة للملفات مع التاريخ</li>
          <li>• قم بنسخ احتياطي للملفات المهمة بانتظام</li>
        </ul>
      </div>
    </div>
  );
}
