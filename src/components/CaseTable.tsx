import clsx from "clsx";
import { ArrowUpLeft, MoreHorizontal } from "lucide-react";
import { cases } from "@/lib/data";
import { statusClass } from "@/lib/status";

type CaseTableProps = {
  variant?: "default" | "glass";
};

export function CaseTable({ variant = "default" }: CaseTableProps) {
  return (
    <section
      className={clsx(
        "overflow-hidden rounded-2xl border shadow-[0_24px_70px_rgba(7,17,31,0.10)]",
        variant === "glass"
          ? "border-white/80 bg-white/72 backdrop-blur-xl"
          : "border-slate-200 bg-white"
      )}
    >
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200/80 px-5 py-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black text-navy-950">القضايا ذات الأولوية</h2>
          <p className="mt-1 text-sm text-slate-500">عرض تنفيذي للحالة، المخاطر، والموعد القادم</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-navy-900 transition hover:border-gold-400/50 hover:bg-gold-100/50">
          عرض الكل
          <ArrowUpLeft className="size-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[920px] table-fixed text-right text-sm">
          <thead className="bg-navy-950 text-white">
            <tr>
              <th className="w-32 px-5 py-4 font-bold">رقم القضية</th>
              <th className="w-44 px-5 py-4 font-bold">العنوان</th>
              <th className="w-44 px-5 py-4 font-bold">العميل</th>
              <th className="w-52 px-5 py-4 font-bold">الجهة</th>
              <th className="w-36 px-5 py-4 font-bold">الحالة</th>
              <th className="w-28 px-5 py-4 font-bold">الأولوية</th>
              <th className="w-36 px-5 py-4 font-bold">الموعد القادم</th>
              <th className="w-16 px-5 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.map((item) => (
              <tr key={item.id} className="group transition hover:bg-gold-100/35">
                <td className="whitespace-nowrap px-5 py-5 font-black text-navy-900">{item.id}</td>
                <td className="whitespace-nowrap px-5 py-5 font-bold text-slate-900">{item.title}</td>
                <td className="whitespace-nowrap px-5 py-5 text-slate-600">{item.client}</td>
                <td className="whitespace-nowrap px-5 py-5 text-slate-600">{item.court}</td>
                <td className="whitespace-nowrap px-5 py-5">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-black ring-1 ${statusClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-5">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-black ring-1 ${statusClass(item.priority)}`}>
                    {item.priority}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-5 font-semibold text-slate-600">{item.nextDate}</td>
                <td className="px-5 py-5">
                  <button className="inline-flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white hover:text-navy-900">
                    <MoreHorizontal className="size-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
