import { Download, FileText, FolderOpen } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { files } from "@/lib/data";

export default function FilesPage() {
  return (
    <>
      <PageHeader
        title="الملفات"
        description="مستودع تجريبي للمستندات المرتبطة بالقضايا والعملاء مع تصنيف واضح وسجل تحديث."
        action="رفع ملف"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {files.map((file) => (
          <section key={file.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-gold-100 text-navy-900">
                <FileText className="size-5" />
              </span>
              <button className="inline-flex size-9 items-center justify-center rounded-md border border-slate-200 text-slate-600">
                <Download className="size-4" />
              </button>
            </div>
            <h2 className="mt-5 min-h-12 font-bold leading-6 text-navy-950">{file.name}</h2>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <FolderOpen className="size-4" />
              {file.category}
            </div>
            <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
              <span>{file.size}</span>
              <span>{file.updated}</span>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
