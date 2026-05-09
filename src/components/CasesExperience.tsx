"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  ArrowUpLeft,
  Bot,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  ChevronLeft,
  CircleDollarSign,
  Download,
  FileText,
  Filter,
  Gavel,
  Layers3,
  Search,
  ShieldAlert,
  UserRound,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { caseTrend, legalCases, type LegalCase } from "@/lib/cases-data";

const statuses = ["الكل", "نشطة", "جلسة قادمة", "قيد المراجعة", "بانتظار الحكم", "مغلقة"];
const courts = ["الكل", ...Array.from(new Set(legalCases.map((item) => item.court)))];
const lawyers = ["الكل", ...Array.from(new Set(legalCases.map((item) => item.lawyer)))];
const priorities = ["الكل", "عالية", "متوسطة", "منخفضة"];

function priorityTone(priority: LegalCase["priority"]) {
  if (priority === "عالية") return "red";
  if (priority === "متوسطة") return "gold";
  return "green";
}

function statusTone(status: LegalCase["status"]) {
  if (status === "نشطة") return "navy";
  if (status === "جلسة قادمة") return "gold";
  if (status === "بانتظار الحكم") return "blue";
  if (status === "مغلقة") return "green";
  return "slate";
}

function FilterSelect({
  label,
  value,
  values,
  onChange
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-black text-slate-500">{label}</span>
      <Select value={value} onChange={(event) => onChange(event.target.value)}>
        {values.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </label>
  );
}

function ProgressBar({ value, tone = "gold" }: { value: number; tone?: "gold" | "red" | "navy" }) {
  return (
    <div className="h-2 rounded-full bg-slate-100">
      <div
        className={
          tone === "red"
            ? "h-2 rounded-full bg-red-500"
            : tone === "navy"
              ? "h-2 rounded-full bg-navy-950"
              : "h-2 rounded-full bg-gold-500"
        }
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function CaseDrawer({
  legalCase,
  onClose
}: {
  legalCase: LegalCase | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {legalCase ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy-950/35 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: 460, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 460, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-3 right-3 z-50 flex w-[calc(100vw-1.5rem)] max-w-xl flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/92 shadow-[0_28px_90px_rgba(7,17,31,0.26)] backdrop-blur-2xl"
            dir="rtl"
          >
            <div className="border-b border-slate-200/80 bg-navy-950 p-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge tone={priorityTone(legalCase.priority)}>{legalCase.priority}</Badge>
                  <h2 className="mt-4 text-2xl font-black leading-9">{legalCase.title}</h2>
                  <p className="mt-2 text-sm font-semibold text-white/60">{legalCase.id} - {legalCase.client}</p>
                </div>
                <Button variant="ghost" size="icon" className="bg-white/10 text-white hover:bg-white/15 hover:text-white" onClick={onClose}>
                  <X className="size-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["التقدم", `${legalCase.progress}%`],
                  ["المخاطر", `${legalCase.risk}%`],
                  ["القيمة", legalCase.value]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-black text-slate-400">{label}</p>
                    <p className="mt-2 text-2xl font-black text-navy-950">{value}</p>
                  </div>
                ))}
              </div>

              <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="font-black text-navy-950">Progress Tracking</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">{legalCase.description}</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-xs font-black text-slate-500">
                      <span>اكتمال الملف</span>
                      <span>{legalCase.progress}%</span>
                    </div>
                    <ProgressBar value={legalCase.progress} />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between text-xs font-black text-slate-500">
                      <span>مؤشر المخاطر</span>
                      <span>{legalCase.risk}%</span>
                    </div>
                    <ProgressBar value={legalCase.risk} tone="red" />
                  </div>
                </div>
              </section>

              <section className="mt-5 rounded-2xl border border-gold-400/20 bg-gold-100/60 p-4">
                <div className="flex items-center gap-2 text-navy-950">
                  <Bot className="size-5 text-gold-500" />
                  <h3 className="font-black">AI Legal Insights</h3>
                </div>
                <p className="mt-3 text-sm font-semibold leading-7 text-navy-900">{legalCase.insight}</p>
              </section>

              <section className="mt-5">
                <h3 className="mb-3 font-black text-navy-950">Case Timeline</h3>
                <div className="space-y-3">
                  {legalCase.timeline.map((item) => (
                    <div key={`${legalCase.id}-${item.title}`} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <span className="mt-1 size-3 rounded-full bg-gold-500 ring-4 ring-gold-100" />
                      <div>
                        <p className="font-black text-navy-950">{item.title}</p>
                        <p className="mt-1 text-xs font-bold text-gold-500">{item.date}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-5">
                <h3 className="mb-3 font-black text-navy-950">Session History</h3>
                <div className="space-y-3">
                  {legalCase.sessions.map((item) => (
                    <div key={`${legalCase.id}-${item.date}`} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-black text-navy-950">{item.date}</p>
                        <Badge tone="blue">{item.court}</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{item.result}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-5">
                <h3 className="mb-3 font-black text-navy-950">Attached Files</h3>
                <div className="space-y-3">
                  {legalCase.files.map((file) => (
                    <div key={`${legalCase.id}-${file.name}`} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                          <FileText className="size-5" />
                        </span>
                        <div>
                          <p className="font-black text-navy-950">{file.name}</p>
                          <p className="mt-1 text-xs font-semibold text-slate-500">{file.type} - {file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function CasesExperience() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");
  const [court, setCourt] = useState("الكل");
  const [lawyer, setLawyer] = useState("الكل");
  const [priority, setPriority] = useState("الكل");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activeCase, setActiveCase] = useState<LegalCase | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCases = useMemo(() => {
    return legalCases.filter((item) => {
      const query = search.trim();
      const matchesSearch =
        !query ||
        [item.id, item.title, item.client, item.court, item.lawyer].some((value) => value.includes(query));

      return (
        matchesSearch &&
        (status === "الكل" || item.status === status) &&
        (court === "الكل" || item.court === court) &&
        (lawyer === "الكل" || item.lawyer === lawyer) &&
        (priority === "الكل" || item.priority === priority)
      );
    });
  }, [court, lawyer, priority, search, status]);

  const kpis = [
    { label: "إجمالي القضايا", value: legalCases.length.toString(), icon: BriefcaseBusiness, hint: "ملفات فعالة ومؤرشفة" },
    { label: "قضايا عالية الأولوية", value: legalCases.filter((item) => item.priority === "عالية").length.toString(), icon: ShieldAlert, hint: "تحتاج متابعة يومية" },
    { label: "جلسات قادمة", value: legalCases.filter((item) => item.status === "جلسة قادمة").length.toString(), icon: CalendarClock, hint: "خلال 30 يومًا" },
    { label: "قيمة الملفات", value: "3.48M", icon: CircleDollarSign, hint: "ريال سعودي تقديري" }
  ];

  function toggleRow(id: string) {
    setSelectedRows((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl border border-white/70 bg-navy-950 p-5 text-white shadow-[0_28px_80px_rgba(7,17,31,0.24)] sm:p-7"
      >
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge tone="gold">Legal Cases OS</Badge>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-normal sm:text-4xl">
              إدارة قضايا Enterprise بوضوح تنفيذي ودقة تشغيلية.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
              صفحة موحدة لفرز القضايا، متابعة التقدم، مراجعة الجلسات، الملفات، ورؤى الذكاء الاصطناعي القانونية.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="gold">قضية جديدة <ArrowUpLeft className="size-4" /></Button>
              <Button className="border-white/15 bg-white/10 text-white hover:bg-white/15" variant="outline">
                تصدير التقرير
              </Button>
            </div>
          </div>
          <div className="h-56 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={caseTrend}>
                  <defs>
                    <linearGradient id="caseGold" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#dfbd52" stopOpacity={0.55} />
                      <stop offset="95%" stopColor="#dfbd52" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="open" name="مفتوحة" stroke="#dfbd52" strokeWidth={3} fill="url(#caseGold)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-2xl bg-white/10" />
            )}
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.section
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-white/80 bg-white/78 p-5 shadow-[0_18px_55px_rgba(7,17,31,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(7,17,31,0.13)]"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-navy-950 text-gold-400">
                <Icon className="size-5" />
              </span>
              <p className="mt-5 text-sm font-black text-slate-500">{item.label}</p>
              <p className="mt-2 text-4xl font-black text-navy-950">{item.value}</p>
              <p className="mt-2 text-xs font-semibold text-slate-500">{item.hint}</p>
            </motion.section>
          );
        })}
      </div>

      <section className="rounded-3xl border border-white/80 bg-white/76 p-4 shadow-[0_24px_70px_rgba(7,17,31,0.10)] backdrop-blur-xl sm:p-5">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_repeat(4,1fr)]">
          <label className="space-y-2">
            <span className="text-xs font-black text-slate-500">بحث سريع</span>
            <div className="relative">
              <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="pr-11"
                placeholder="ابحث برقم القضية، العميل، المحكمة، أو المحامي"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </label>
          <FilterSelect label="الحالة" value={status} values={statuses} onChange={setStatus} />
          <FilterSelect label="المحكمة" value={court} values={courts} onChange={setCourt} />
          <FilterSelect label="المحامي" value={lawyer} values={lawyers} onChange={setLawyer} />
          <FilterSelect label="الأولوية" value={priority} values={priorities} onChange={setPriority} />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-slate-200/80 pt-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm font-black text-slate-500">
            <Filter className="size-4 text-gold-500" />
            {filteredCases.length} قضية معروضة - {selectedRows.length} محددة
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">تعيين محام</Button>
            <Button variant="outline" size="sm">تحديث الحالة</Button>
            <Button variant="default" size="sm">تقرير مختصر</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 2xl:grid-cols-[1fr_360px]">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-white/80 bg-white/78 shadow-[0_24px_70px_rgba(7,17,31,0.10)] backdrop-blur-xl"
        >
          <div className="max-h-[680px] overflow-auto">
            <table className="min-w-[1120px] table-fixed text-right text-sm">
              <thead className="sticky top-0 z-10 bg-navy-950 text-white shadow-sm">
                <tr>
                  <th className="w-14 px-5 py-4"></th>
                  <th className="w-36 px-5 py-4 font-black">رقم القضية</th>
                  <th className="w-64 px-5 py-4 font-black">الملف</th>
                  <th className="w-52 px-5 py-4 font-black">المحكمة</th>
                  <th className="w-40 px-5 py-4 font-black">المحامي</th>
                  <th className="w-36 px-5 py-4 font-black">الحالة</th>
                  <th className="w-28 px-5 py-4 font-black">الأولوية</th>
                  <th className="w-40 px-5 py-4 font-black">التقدم</th>
                  <th className="w-36 px-5 py-4 font-black">الجلسة القادمة</th>
                  <th className="w-16 px-5 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.map((item) => {
                  const selected = selectedRows.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`cursor-pointer transition hover:bg-gold-100/40 ${selected ? "bg-gold-100/55" : "bg-white/40"}`}
                      onClick={() => setActiveCase(item)}
                    >
                      <td className="px-5 py-5">
                        <button
                          className={`inline-flex size-6 items-center justify-center rounded-lg border transition ${
                            selected ? "border-gold-500 bg-gold-500 text-navy-950" : "border-slate-300 bg-white text-transparent"
                          }`}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleRow(item.id);
                          }}
                        >
                          <Check className="size-4" />
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-5 py-5 font-black text-navy-950">{item.id}</td>
                      <td className="px-5 py-5">
                        <p className="font-black text-navy-950">{item.title}</p>
                        <p className="mt-1 truncate text-xs font-semibold text-slate-500">{item.client}</p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-5 text-slate-600">{item.court}</td>
                      <td className="whitespace-nowrap px-5 py-5">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-slate-100 text-navy-950">
                            <UserRound className="size-4" />
                          </span>
                          <span className="font-bold text-slate-700">{item.lawyer}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-5">
                        <Badge tone={statusTone(item.status)}>{item.status}</Badge>
                      </td>
                      <td className="whitespace-nowrap px-5 py-5">
                        <Badge tone={priorityTone(item.priority)}>{item.priority}</Badge>
                      </td>
                      <td className="px-5 py-5">
                        <div className="mb-2 flex justify-between text-xs font-black text-slate-500">
                          <span>{item.progress}%</span>
                          <span>جاهزية</span>
                        </div>
                        <ProgressBar value={item.progress} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-5 font-semibold text-slate-600">{item.nextSession}</td>
                      <td className="px-5 py-5">
                        <ChevronLeft className="size-5 text-slate-400" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.section>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-white/80 bg-white/78 p-5 shadow-[0_24px_70px_rgba(7,17,31,0.10)] backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-navy-950">توزيع الحالات</h2>
                <p className="mt-1 text-sm text-slate-500">مفتوحة ومغلقة شهريًا</p>
              </div>
              <Layers3 className="size-5 text-gold-500" />
            </div>
            <div className="h-56">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart data={caseTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="open" name="مفتوحة" fill="#12345a" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="closed" name="مغلقة" fill="#c9a227" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full rounded-2xl bg-slate-100/80" />
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-gold-400/20 bg-gold-100/70 p-5 shadow-[0_24px_70px_rgba(7,17,31,0.08)]">
            <div className="flex items-center gap-2">
              <Bot className="size-5 text-gold-500" />
              <h2 className="text-xl font-black text-navy-950">AI Legal Insights</h2>
            </div>
            <div className="mt-4 space-y-3">
              {[
                "3 ملفات عالية الأولوية تحتاج مستندات داعمة قبل الجلسات القادمة.",
                "القضايا التجارية تمثل أعلى قيمة مالية ويستحسن مراجعة فرص التسوية.",
                "معدل تقدم الملفات فوق 65%، لكن ملفين لديهما مخاطر إجرائية متوسطة."
              ].map((item) => (
                <p key={item} className="rounded-2xl border border-gold-400/20 bg-white/55 p-4 text-sm font-semibold leading-7 text-navy-900">
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/78 p-5 shadow-[0_24px_70px_rgba(7,17,31,0.10)] backdrop-blur-xl">
            <h2 className="text-xl font-black text-navy-950">الجلسات القريبة</h2>
            <div className="mt-4 space-y-3">
              {legalCases.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-right transition hover:border-gold-400/40 hover:bg-gold-100/30"
                  onClick={() => setActiveCase(item)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-black text-navy-950">{item.nextSession}</span>
                    <Gavel className="size-4 text-gold-500" />
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item.title}</p>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <CaseDrawer legalCase={activeCase} onClose={() => setActiveCase(null)} />
    </div>
  );
}
