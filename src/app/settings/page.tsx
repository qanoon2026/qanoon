import { ChevronLeft, Settings } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { settings } from "@/lib/data";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="الإعدادات"
        description="تهيئة النظام، الصلاحيات، قوالب العمل، وسياسات حفظ المستندات."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {settings.map((item) => {
          const Icon = item.icon ?? Settings;

          return (
            <section
              key={item.title}
              className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-md bg-navy-900 text-gold-400">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="font-bold text-navy-950">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p>
                </div>
              </div>
              <ChevronLeft className="size-5 shrink-0 text-slate-400" />
            </section>
          );
        })}
      </div>
    </>
  );
}
