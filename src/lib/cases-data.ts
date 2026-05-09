export type LegalCase = {
  id: string;
  title: string;
  client: string;
  court: string;
  lawyer: string;
  status: "نشطة" | "جلسة قادمة" | "قيد المراجعة" | "بانتظار الحكم" | "مغلقة";
  priority: "عالية" | "متوسطة" | "منخفضة";
  progress: number;
  risk: number;
  value: string;
  nextSession: string;
  openedAt: string;
  description: string;
  timeline: Array<{ title: string; date: string; note: string }>;
  sessions: Array<{ date: string; court: string; result: string }>;
  files: Array<{ name: string; type: string; size: string }>;
  insight: string;
};

export const legalCases: LegalCase[] = [
  {
    id: "Q-2026-014",
    title: "مطالبة تجارية ضد مورد رئيسي",
    client: "شركة المدار القابضة",
    court: "المحكمة التجارية بالرياض",
    lawyer: "نورة الحربي",
    status: "نشطة",
    priority: "عالية",
    progress: 76,
    risk: 31,
    value: "1.2M",
    nextSession: "18 مايو 2026",
    openedAt: "12 يناير 2026",
    description: "نزاع تجاري متعلق بتأخر توريد معدات تشغيلية ومطالبات تعويض عن الأضرار المباشرة.",
    timeline: [
      { title: "استلام ملف القضية", date: "12 يناير", note: "تمت مراجعة العقد والملاحق الأولية." },
      { title: "إيداع صحيفة الدعوى", date: "28 يناير", note: "تم قبول القيد وإشعار الخصم." },
      { title: "مذكرة رد الخصم", date: "4 أبريل", note: "تحتاج مقارنة مع بنود التسليم." }
    ],
    sessions: [
      { date: "18 مايو 2026", court: "الدائرة التجارية الثالثة", result: "جلسة مرافعة قادمة" },
      { date: "21 أبريل 2026", court: "الدائرة التجارية الثالثة", result: "تأجيل لتقديم مستندات إضافية" }
    ],
    files: [
      { name: "صحيفة الدعوى.pdf", type: "مرافعة", size: "2.4 MB" },
      { name: "عقد التوريد.docx", type: "عقد", size: "640 KB" },
      { name: "إشعارات التأخير.zip", type: "مرفقات", size: "7.8 MB" }
    ],
    insight: "احتمالية التسوية مرتفعة إذا تم تقديم جدول الضرر المالي قبل الجلسة القادمة."
  },
  {
    id: "Q-2026-021",
    title: "نزاع عمالي جماعي",
    client: "مؤسسة روافد",
    court: "المحكمة العمالية بجدة",
    lawyer: "ماجد الدوسري",
    status: "جلسة قادمة",
    priority: "متوسطة",
    progress: 58,
    risk: 44,
    value: "420K",
    nextSession: "22 مايو 2026",
    openedAt: "5 فبراير 2026",
    description: "مطالبات عمالية تتعلق بنهاية الخدمة وساعات العمل الإضافية لعدد من الموظفين السابقين.",
    timeline: [
      { title: "جلسة صلح", date: "19 فبراير", note: "لم يتم الوصول لاتفاق نهائي." },
      { title: "تجهيز كشوف الرواتب", date: "3 مارس", note: "تمت مطابقة 80% من المستندات." },
      { title: "مذكرة دفاع أولى", date: "15 أبريل", note: "أرسلت للمراجعة الداخلية." }
    ],
    sessions: [
      { date: "22 مايو 2026", court: "الدائرة العمالية الثانية", result: "جلسة سماع أقوال" },
      { date: "7 أبريل 2026", court: "الدائرة العمالية الثانية", result: "طلب مستندات رواتب إضافية" }
    ],
    files: [
      { name: "كشوف الرواتب.xlsx", type: "مالي", size: "1.1 MB" },
      { name: "محضر الصلح.pdf", type: "محضر", size: "900 KB" }
    ],
    insight: "ينبغي إرفاق سجل الحضور والانصراف قبل 48 ساعة لتقليل المخاطر الإجرائية."
  },
  {
    id: "Q-2026-032",
    title: "صياغة عقد توريد استراتيجي",
    client: "مجموعة السهل",
    court: "استشارات وعقود",
    lawyer: "فهد القحطاني",
    status: "قيد المراجعة",
    priority: "منخفضة",
    progress: 64,
    risk: 18,
    value: "860K",
    nextSession: "25 مايو 2026",
    openedAt: "18 مارس 2026",
    description: "صياغة ومراجعة عقد توريد متعدد المراحل مع بنود جزاءات وضمان جودة.",
    timeline: [
      { title: "استلام المتطلبات", date: "18 مارس", note: "تم تحديد نطاق التوريد." },
      { title: "إرسال المسودة الأولى", date: "29 مارس", note: "بانتظار ملاحظات الإدارة المالية." },
      { title: "مراجعة بنود الضمان", date: "9 أبريل", note: "تمت إضافة بند فحص الجودة." }
    ],
    sessions: [
      { date: "25 مايو 2026", court: "اجتماع تفاوض", result: "مراجعة شروط الدفع" },
      { date: "30 أبريل 2026", court: "اجتماع داخلي", result: "اعتماد نطاق الخدمات" }
    ],
    files: [
      { name: "مسودة العقد v2.docx", type: "عقد", size: "720 KB" },
      { name: "ملحق الأسعار.xlsx", type: "مالي", size: "340 KB" }
    ],
    insight: "بنود الجزاءات متوازنة، لكن شرط الإنهاء يحتاج صياغة أدق لحماية العميل."
  },
  {
    id: "Q-2026-045",
    title: "استئناف حكم مدني",
    client: "عبدالله العتيبي",
    court: "محكمة الاستئناف",
    lawyer: "سارة الزهراني",
    status: "بانتظار الحكم",
    priority: "عالية",
    progress: 88,
    risk: 27,
    value: "310K",
    nextSession: "2 يونيو 2026",
    openedAt: "2 أبريل 2026",
    description: "استئناف على حكم مدني متعلق بالتعويض عن إخلال بالتزام تعاقدي.",
    timeline: [
      { title: "تحليل الحكم الابتدائي", date: "3 أبريل", note: "تم تحديد 4 أسباب استئناف." },
      { title: "تقديم اللائحة", date: "11 أبريل", note: "تم قبول اللائحة شكلا." },
      { title: "إرفاق مستندات داعمة", date: "25 أبريل", note: "اكتملت المرفقات الأساسية." }
    ],
    sessions: [
      { date: "2 يونيو 2026", court: "محكمة الاستئناف", result: "النطق بالحكم" },
      { date: "12 مايو 2026", court: "محكمة الاستئناف", result: "قفل باب المرافعة" }
    ],
    files: [
      { name: "لائحة الاستئناف.pdf", type: "مرافعة", size: "1.7 MB" },
      { name: "الحكم الابتدائي.pdf", type: "حكم", size: "1.2 MB" }
    ],
    insight: "نقاط الاستئناف قوية في السبب الثاني، ويوصى بتجهيز ملخص شفهي مختصر."
  },
  {
    id: "Q-2026-052",
    title: "تحصيل مستحقات خدمات",
    client: "شركة رواسي التقنية",
    court: "المحكمة التجارية بالدمام",
    lawyer: "نورة الحربي",
    status: "نشطة",
    priority: "متوسطة",
    progress: 42,
    risk: 35,
    value: "690K",
    nextSession: "9 يونيو 2026",
    openedAt: "20 أبريل 2026",
    description: "مطالبة مالية عن خدمات تقنية منفذة وفق أوامر شراء معتمدة وفواتير غير مسددة.",
    timeline: [
      { title: "إشعار مطالبة", date: "20 أبريل", note: "تم إرسال خطاب مطالبة نهائي." },
      { title: "تحضير المستندات", date: "28 أبريل", note: "تم جمع الفواتير وأوامر الشراء." }
    ],
    sessions: [
      { date: "9 يونيو 2026", court: "الدائرة التجارية الأولى", result: "جلسة أولى" }
    ],
    files: [
      { name: "الفواتير.pdf", type: "مالي", size: "3.3 MB" },
      { name: "أوامر الشراء.zip", type: "مرفقات", size: "5.1 MB" }
    ],
    insight: "إرفاق مراسلات الاعتماد سيعزز موقف المطالبة قبل الجلسة الأولى."
  }
];

export const caseTrend = [
  { month: "يناير", open: 18, closed: 9 },
  { month: "فبراير", open: 22, closed: 14 },
  { month: "مارس", open: 19, closed: 17 },
  { month: "أبريل", open: 27, closed: 21 },
  { month: "مايو", open: 31, closed: 24 }
];
