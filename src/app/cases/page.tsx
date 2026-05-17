"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { ActionButton } from '@/components/ActionButton';

const casesData = [
  { id: '2048', title: 'قضية تعويضات عمالية', client: 'أحمد العامري', status: 'قيد التقاضي', type: 'عمالي', date: '15 مايو', priority: 'عالي', progress: 75 },
  { id: '2047', title: 'نزاع عقاري - ملكية أرض', client: 'فاطمة السويدي', status: 'قيد الدراسة', type: 'عقاري', date: '12 مايو', priority: 'متوسط', progress: 45 },
  { id: '2046', title: 'قضية تصفية تركة', client: 'محمود الكعبي', status: 'مُغلقة', type: 'أحوال شخصية', date: '10 مايو', priority: 'منخفض', progress: 100 },
];

const statuses = ['الكل', 'قيد التقاضي', 'قيد الدراسة', 'مُغلقة'];

export default function CasesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [caseFiles, setCaseFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filtered = casesData.filter((item) => {
    const matchesSearch = item.title.includes(search) || item.client.includes(search);
    const matchesStatus = statusFilter === 'الكل' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Helpers
  function openCaseDetails(c: any) {
    setSelectedCase(c);
    fetchCaseFiles(c.id);
  }

  async function fetchCaseFiles(caseId: string) {
    try {
      const res = await fetch(`/api/files?caseId=${caseId}`);
      const data = await res.json();
      if (res.ok) setCaseFiles(data.files || []);
      else setCaseFiles([]);
    } catch (err) {
      setCaseFiles([]);
    }
  }

  function closeModal() {
    setSelectedCase(null);
    setCaseFiles([]);
    setUploadError(null);
    setUploadProgress(0);
    setUploading(false);
  }

  async function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !selectedCase) return;
    setUploadError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      const presignRes = await fetch('/api/files/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: selectedCase.id, fileName: file.name, contentType: file.type })
      });

      const presignJson = await presignRes.json();
      if (!presignRes.ok) throw new Error(presignJson.error || 'فشل طلب رابط التحميل');

      const { uploadUrl, key } = presignJson;

      await uploadToS3(uploadUrl, file, (percent) => setUploadProgress(percent));

      // Save metadata
      const saveRes = await fetch('/api/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: selectedCase.id, fileName: file.name, fileType: file.type, fileSize: file.size, s3Key: key })
      });

      const saveJson = await saveRes.json();
      if (!saveRes.ok) throw new Error(saveJson.error || 'فشل حفظ بيانات الملف');

      // Refresh list
      await fetchCaseFiles(selectedCase.id);
      setUploading(false);
      setUploadProgress(100);
    } catch (err: any) {
      setUploadError(err?.message || 'فشل تحميل الملف');
      setUploading(false);
    }
  }

  function uploadToS3(url: string, file: File, onProgress: (p: number) => void) {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error('فشل تحميل الملف إلى S3'));
      };
      xhr.onerror = () => reject(new Error('فشل تحميل الملف إلى S3'));
      xhr.send(file);
    });
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="القضايا"
        description="لوحة إدارة القضايا مع بحث سريع وفلترة واضحة وأداء جدول احترافي."
        action={<ActionButton variant="primary"><Plus className="h-4 w-4" />إضافة قضية</ActionButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="card-compact bg-slate-50">
            <div className="grid gap-4 lg:grid-cols-[1.5fr_0.6fr]">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="ابحث عن قضية أو موكل..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pr-10"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field max-w-xs"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button className="btn-secondary">
                  <Filter className="h-4 w-4" />
                  فلتر
                </button>
              </div>
            </div>
          </div>

          <div className="card overflow-x-auto bg-slate-50">
            <table className="min-w-full text-right">
              <thead className="table-head">
                <tr>
                  {['رقم القضية', 'العنوان', 'الموكل', 'الحالة', 'الأولوية', 'التقدم', ''].map((title) => (
                    <th key={title} className="px-5 py-4">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((caseItem) => (
                  <tr key={caseItem.id} className="table-row">
                    <td className="px-5 py-4 font-semibold text-slate-900">#{caseItem.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{caseItem.title}</div>
                      <p className="mt-1 text-sm text-slate-500">{caseItem.type}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-700">{caseItem.client}</td>
                    <td className="px-5 py-4">
                      <StatusBadge
                        status={caseItem.status}
                        variant={caseItem.status === 'مُغلقة' ? 'success' : caseItem.status === 'قيد التقاضي' ? 'warning' : 'info'}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{caseItem.priority}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-gold-500" style={{ width: `${caseItem.progress}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">{caseItem.progress}%</p>
                    </td>
                    <td className="px-5 py-4">
                      <button className="btn-ghost text-slate-700" onClick={() => openCaseDetails(caseItem)}>عرض</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-compact bg-slate-50">
            <p className="text-label">ملخص سريع</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">بأرقام واضحة</h3>
            <div className="mt-5 grid gap-3">
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">القضايا العاجلة</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">8</p>
              </div>
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">جلسات هذا الأسبوع</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">7</p>
              </div>
              <div className="rounded-3xl bg-white p-4 border border-slate-200">
                <p className="text-sm text-slate-600">القضايا المكتملة</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">18</p>
              </div>
            </div>
          </div>

          <div className="card-compact bg-slate-50">
            <p className="text-label">ملاحظات سريعة</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>• راجع المستندات النهائية قبل جلسة 2048.</p>
              <p>• أضف خطة الاستئناف إلى قضية 2047.</p>
              <p>• تأكيد حضور الشهود في قضية 2043.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-[90%] max-w-2xl rounded-lg bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">تفاصيل القضية #{selectedCase.id}</h3>
              <button className="btn-ghost" onClick={closeModal}>إغلاق</button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-slate-600">{selectedCase.title}</p>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold">رفع ملف</p>
              <input ref={fileInputRef} type="file" onChange={handleSelectFile} className="mt-2" />
              {uploading && <div className="mt-3">جارٍ التحميل: {uploadProgress}%</div>}
              {uploadError && <div className="mt-3 text-error-600">{uploadError}</div>}
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold">الملفات المرفوعة</p>
              <div className="mt-3 space-y-2">
                {caseFiles.length === 0 && <p className="text-sm text-slate-500">لا توجد ملفات</p>}
                {caseFiles.map((f) => (
                  <div key={f.id} className="flex items-center justify-between border-b py-2">
                    <div>
                      <div className="font-medium">{f.file_name}</div>
                      <div className="text-sm text-slate-500">{f.file_type} • {f.file_size} bytes</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {f.downloadUrl ? (
                        <a className="btn-ghost" href={f.downloadUrl} target="_blank" rel="noreferrer">فتح</a>
                      ) : (
                        <button className="btn-ghost" onClick={() => window.open(f.downloadUrl || '#')}>فتح</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
