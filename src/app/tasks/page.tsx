import { PageHeader } from "@/components/PageHeader";
import { tasks } from "@/lib/data";
import { statusClass } from "@/lib/status";

export default function TasksPage() {
  return (
    <>
      <PageHeader
        title="المهام"
        description="تنظيم أعمال الفريق القانونية اليومية حسب المسؤولية والموعد والأولوية."
        action="مهمة جديدة"
      />
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
        <div className="grid grid-cols-4 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-500">
          <span>المهمة</span>
          <span>المسؤول</span>
          <span>الموعد</span>
          <span>الحالة</span>
        </div>
        <div className="divide-y divide-slate-100">
          {tasks.map((item) => (
            <div key={item.task} className="grid grid-cols-4 items-center px-5 py-4 text-sm">
              <span className="font-bold text-navy-950">{item.task}</span>
              <span className="text-slate-600">{item.owner}</span>
              <span className="text-slate-600">{item.due}</span>
              <span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusClass(item.status)}`}>
                  {item.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
