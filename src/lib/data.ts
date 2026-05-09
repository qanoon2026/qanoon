import {
  Archive,
  Clock3,
  FileText,
  Scale,
  Users
} from "lucide-react";

export const cases = [
  {
    id: "Q-2026-014",
    title: "مطالبة تجارية",
    client: "شركة المدار القابضة",
    court: "المحكمة التجارية بالرياض",
    status: "قيد المرافعة",
    priority: "عالية",
    nextDate: "18 مايو 2026"
  },
  {
    id: "Q-2026-021",
    title: "نزاع عمالي",
    client: "مؤسسة روافد",
    court: "المحكمة العمالية بجدة",
    status: "جلسة قادمة",
    priority: "متوسطة",
    nextDate: "22 مايو 2026"
  },
  {
    id: "Q-2026-032",
    title: "صياغة عقد توريد",
    client: "مجموعة السهل",
    court: "استشارات وعقود",
    status: "قيد المراجعة",
    priority: "منخفضة",
    nextDate: "25 مايو 2026"
  },
  {
    id: "Q-2026-045",
    title: "استئناف مدني",
    client: "عبدالله العتيبي",
    court: "محكمة الاستئناف",
    status: "بانتظار الحكم",
    priority: "عالية",
    nextDate: "2 يونيو 2026"
  }
];

export const clients = [
  { name: "شركة المدار القابضة", type: "شركة", owner: "نورة الحربي", cases: 12 },
  { name: "مجموعة السهل", type: "شركة", owner: "فهد القحطاني", cases: 7 },
  { name: "عبدالله العتيبي", type: "فرد", owner: "سارة الزهراني", cases: 3 },
  { name: "مؤسسة روافد", type: "منشأة", owner: "ماجد الدوسري", cases: 5 }
];

export const timeline = [
  { title: "جلسة مطالبة تجارية", date: "18 مايو", time: "10:30 ص", icon: Scale },
  { title: "مراجعة عقد توريد", date: "20 مايو", time: "1:00 م", icon: FileText },
  { title: "اجتماع عميل جديد", date: "21 مايو", time: "4:15 م", icon: Users },
  { title: "موعد تسليم مذكرة", date: "24 مايو", time: "9:00 ص", icon: Clock3 }
];

export const files = [
  { name: "مذكرة دفاع - المدار.pdf", category: "مرافعات", size: "2.4 MB", updated: "اليوم" },
  { name: "عقد توريد - السهل.docx", category: "عقود", size: "580 KB", updated: "أمس" },
  { name: "محضر جلسة Q-2026-021.pdf", category: "محاضر", size: "1.1 MB", updated: "قبل 3 أيام" },
  { name: "مرفقات استئناف.zip", category: "أرشيف", size: "8.7 MB", updated: "قبل أسبوع" }
];

export const tasks = [
  { task: "إعداد مذكرة الرد", owner: "سارة الزهراني", due: "اليوم", status: "عاجلة" },
  { task: "مراجعة مستندات العميل", owner: "نورة الحربي", due: "غدًا", status: "قيد التنفيذ" },
  { task: "رفع لائحة الاستئناف", owner: "ماجد الدوسري", due: "23 مايو", status: "مجدولة" },
  { task: "أرشفة ملف القضية", owner: "فهد القحطاني", due: "26 مايو", status: "منخفضة" }
];

export const settings = [
  { title: "إعدادات المكتب", description: "بيانات المنشأة، العنوان، والهوية البصرية" },
  { title: "صلاحيات المستخدمين", description: "الأدوار، فرق العمل، ومستويات الوصول" },
  { title: "قوالب المستندات", description: "نماذج العقود والمذكرات والخطابات" },
  { title: "الأرشفة", description: "سياسات حفظ الملفات وربطها بالقضايا", icon: Archive }
];
