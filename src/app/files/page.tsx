'use client';

import { Plus, Download, Trash2, File, Folder, Upload } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

const filesList = [
  { id: 1, name: 'عقد الموكالة - أحمد العامري.pdf', size: '2.4 MB', date: '15 مايو', type: 'pdf', caseId: '2048' },
  { id: 2, name: 'أوراق القضية 2048', size: 'مجلد', date: '12 مايو', type: 'folder', caseId: '2048' },
  { id: 3, name: 'رسالة المحكمة - الرد.docx', size: '450 KB', date: '10 مايو', type: 'doc', caseId: '2045' },
  { id: 4, name: 'قائمة الشهود.xlsx', size: '180 KB', date: '8 مايو', type: 'sheet', caseId: '2046' },
];

export default function FilesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="الملفات"
        description="مستودع الوثائق القانوني مع تنظيم واضح وسجل تحميل مباشر."
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />رفع ملف</ActionButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="card bg-slate-50">
          <div className="section-header">
            <div>
              <p className="text-label">تخزين الملفات</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">مستودع الوثائق الآمن</h3>
            </div>
            <ActionButton variant="secondary">تنظيم الملفات</ActionButton>
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gold-100 text-gold-700">
              <Upload className="h-8 w-8" />
            </div>
            <p className="mt-5 text-lg font-semibold text-slate-900">اسحب الملفات أو قم بتحميلها</p>
            <p className="mt-2 text-sm text-slate-600">PDF، DOCX، XLSX، JPG، PNG</p>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="card-compact bg-slate-50">
            <p className="text-label">السعة المستخدمة</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">7.2 / 10 جيجابايت</h3>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[72%] rounded-full bg-gold-500" />
            </div>
            <p className="mt-2 text-sm text-slate-600">3.8 جيجابايت متاحة</p>
          </div>

          <div className="card-compact bg-slate-50">
            <p className="text-label">ملاحظات تنظيمية</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li>• أعد تسمية الملفات بشكل موحد لكل قضية.</li>
              <li>• حفظ المجلدات حسب النوع القانوني.</li>
              <li>• ربط المستندات بالقضية المناسبة.</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="card overflow-x-auto bg-slate-50">
        <div className="section-header">
          <div>
            <p className="text-label">الملفات الأخيرة</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">أحدث المستندات</h3>
          </div>
          <button className="btn-ghost text-slate-700">عرض الكل</button>
        </div>
        <table className="min-w-full text-right mt-6">
          <thead className="table-head">
            <tr>
              {['الملف', 'الحجم', 'التاريخ', 'القضية', ''].map((title) => (
                <th key={title} className="px-5 py-4">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filesList.map((file) => (
              <tr key={file.id} className="table-row">
                <td className="px-5 py-4 flex items-center gap-3">
                  {file.type === 'folder' ? <Folder className="h-5 w-5 text-gold-600" /> : <File className="h-5 w-5 text-gold-600" />}
                  <span className="font-medium text-slate-900">{file.name}</span>
                </td>
                <td className="px-5 py-4 text-slate-700">{file.size}</td>
                <td className="px-5 py-4 text-slate-700">{file.date}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">#{file.caseId}</span>
                </td>
                <td className="px-5 py-4 flex items-center justify-end gap-2">
                  <button className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:bg-slate-50"><Download className="h-4 w-4" /></button>
                  <button className="rounded-2xl border border-error-200 bg-error-50 px-3 py-2 text-error-600 transition hover:bg-error-100"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
