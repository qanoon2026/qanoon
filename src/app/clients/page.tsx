import { PageHeader } from "@/components/PageHeader";
import { clients } from "@/lib/data";

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        title="العملاء"
        description="دليل العملاء والشركات مع توزيع الملفات القانونية والمسؤول الداخلي عن العلاقة."
        action="إضافة عميل"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {clients.map((client) => (
          <section key={client.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-navy-950">{client.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{client.type}</p>
              </div>
              <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-navy-900">
                {client.cases} ملفات
              </span>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-4">
              <p className="text-xs font-semibold text-slate-400">مسؤول العلاقة</p>
              <p className="mt-1 font-semibold text-slate-800">{client.owner}</p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
