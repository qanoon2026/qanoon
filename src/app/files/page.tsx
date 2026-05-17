'use client';

import { Plus, Download, Trash2, File, Folder, Upload } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

const filesList = [
  { id: 1, name: 'عقد الموكالة - أحمد العامري.pdf', size: '2.4 MB', date: '15 مايو', type: 'pdf', caseId: '2048' },
  { id: 2, name: 'أوراق القضية #2048', size: 'مجلد', date: '12 مايو', type: 'folder', caseId: '2048' },
  { id: 3, name: 'رسالة المحكمة - الرد.docx', size: '450 KB', date: '10 مايو', type: 'doc', caseId: '2045' },
  { id: 4, name: 'قائمة الشهود والمستندات.xlsx', size: '180 KB', date: '8 مايو', type: 'sheet', caseId: '2046' },
];

export default function FilesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="الملفات"
        description="نظام الملفات القانوني مع تخزين ذكي وتنظيم قضائي" 
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />رفع ملف</ActionButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">
        <section className="glass-card p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">رفع الملفات</p>
              <h2 className="mt-3 text-2xl font-semibold text-[rgb(var(--text-primary))]">مستودع الوثائق الآمن</h2>
            </div>
            <ActionButton variant="secondary">تنظيم الملفات</ActionButton>
          </div>
          <div className="mt-6 rounded-[2rem] border border-dashed border-[rgba(var(--border),0.22)] bg-[rgba(var(--surface-soft),0.12)] p-10 text-center transition hover:border-[rgba(var(--accent),0.35)] hover:bg-[rgba(var(--surface-soft),0.2)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[rgba(var(--accent),0.16)] text-[rgb(var(--accent))]">
              <Upload className="h-8 w-8" />
            </div>
            <p className="mt-4 text-lg font-semibold text-[rgb(var(--text-primary))]">اسحب الملفات أو قم بتحميلها</p>
            <p className="mt-2 text-sm text-[rgb(var(--text-secondary))]">PDF، DOCX، XLSX، JPG، PNG</p>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">السعة</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm text-[rgb(var(--text-secondary))]">
                <span>المستخدم</span>
                <span className="font-semibold text-[rgb(var(--text-primary))]">7.2 GB / 10 GB</span>
              </div>
              <div className="h-3 rounded-full bg-[rgba(var(--border),0.18)] overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-[rgba(var(--accent),0.9)]"></div>
              </div>
              <p className="text-xs text-[rgb(var(--text-secondary))]">3.8 GB متاحة</p>
            </div>
          </div>

          <div className="glass-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">التنظيم الذكي</p>
            <ul className="mt-4 space-y-3 text-sm text-[rgb(var(--text-secondary))]">
              <li>• أنشئ مجلدات لكل قضية مهمة.</li>
              <li>• عِدّل أسماء الملفات بمستوى دقة عالٍ.</li>
              <li>• اربط المستندات بالقضايا ذات الصلة.</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="glass-card p-6 overflow-x-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">الملفات الأخيرة</p>
            <h2 className="mt-3 text-2xl font-semibold text-[rgb(var(--text-primary))]">أحدث المستندات القضائية</h2>
          </div>
          <ActionButton variant="ghost">عرض الكل</ActionButton>
        </div>
        <table className="w-full text-right">
          <thead className="table-head">
            <tr>
              {['الملف', 'الحجم', 'التاريخ', 'القضية', ''].map((title) => (
                <th key={title} className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em]">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filesList.map((file) => (
              <tr key={file.id} className="table-row">
                <td className="px-6 py-4 flex items-center gap-3">
                  {file.type === 'folder' ? <Folder className="h-5 w-5 text-[rgb(var(--accent))]" /> : <File className="h-5 w-5 text-[rgb(var(--accent))]" />}
                  <span className="font-medium text-[rgb(var(--text-primary))]">{file.name}</span>
                </td>
                <td className="px-6 py-4 text-[rgb(var(--text-secondary))]">{file.size}</td>
                <td className="px-6 py-4 text-[rgb(var(--text-secondary))]">{file.date}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-[rgba(var(--accent),0.16)] px-3 py-1 text-xs font-semibold text-[rgb(var(--accent))]">#{file.caseId}</span>
                </td>
                <td className="px-6 py-4 flex items-center justify-end gap-2">
                  <button className="rounded-2xl border border-[rgba(var(--border),0.16)] bg-[rgba(var(--surface-soft),0.14)] p-2 text-[rgb(var(--text-primary))] transition hover:bg-[rgba(var(--surface-soft),0.24)]"><Download className="h-4 w-4" /></button>
                  <button className="rounded-2xl border border-rose-400/20 bg-[rgba(239,68,68,0.12)] p-2 text-rose-200 transition hover:bg-[rgba(239,68,68,0.2)]"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
