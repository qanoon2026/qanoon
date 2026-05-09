export function statusClass(status: string) {
  if (["عالية", "عاجلة"].includes(status)) {
    return "bg-red-50 text-red-700 ring-red-100";
  }

  if (["جلسة قادمة", "قيد التنفيذ", "قيد المرافعة"].includes(status)) {
    return "bg-gold-100 text-navy-900 ring-gold-400/30";
  }

  if (["بانتظار الحكم", "مجدولة", "قيد المراجعة"].includes(status)) {
    return "bg-blue-50 text-blue-700 ring-blue-100";
  }

  return "bg-slate-100 text-slate-700 ring-slate-200";
}
