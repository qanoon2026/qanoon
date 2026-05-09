import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { timeline } from "@/lib/data";

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        title="التقويم"
        description="متابعة الجلسات، الاجتماعات، ومواعيد تسليم المستندات القانونية القادمة."
        action="إضافة موعد"
      />
      <section className="rounded-lg border border-slate-200 bg-white shadow-soft">
        <div className="grid border-b border-slate-200 bg-slate-50 text-center text-sm font-bold text-slate-500 md:grid-cols-7">
          {["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].map((day) => (
            <div key={day} className="border-b border-slate-200 px-4 py-3 md:border-b-0 md:border-l">
              {day}
            </div>
          ))}
        </div>
        <div className="grid min-h-[420px] md:grid-cols-7">
          {Array.from({ length: 35 }, (_, index) => {
            const day = index + 1;
            const event = timeline[index % timeline.length];
            const hasEvent = [4, 8, 12, 18, 22, 28].includes(day);

            return (
              <div key={day} className="min-h-28 border-b border-l border-slate-100 p-3">
                <p className="font-bold text-navy-950">{day}</p>
                {hasEvent ? (
                  <div className="mt-3 rounded-md bg-gold-100 p-2 text-xs font-semibold leading-5 text-navy-900">
                    <CalendarDays className="mb-1 size-4" />
                    {event.title}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
