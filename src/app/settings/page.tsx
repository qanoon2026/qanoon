'use client';

import { useState } from 'react';
import { Save, Bell, Shield, User as UserIcon, Palette, LogOut } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="الإعدادات"
        description="إدارة إعدادات الحساب، الأمان، والمظهر على مستوى المؤسسة" 
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
        <div className="space-y-6">
          <section className="glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <UserIcon className="h-6 w-6 text-[rgb(var(--accent))]" />
              <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">الملف الشخصي</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
                <span>الاسم الكامل</span>
                <input className="input-field" defaultValue="محمد أحمد الشعيبي" />
              </label>
              <label className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
                <span>البريد الإلكتروني</span>
                <input className="input-field" defaultValue="lawyer@example.com" />
              </label>
              <label className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
                <span>رقم الهاتف</span>
                <input className="input-field" defaultValue="+966501234567" />
              </label>
              <label className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
                <span>المكتب / الشركة</span>
                <input className="input-field" defaultValue="مكتب الشعيبي للمحاماة" />
              </label>
            </div>
            <div className="mt-4">
              <label className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
                <span>التخصص القانوني</span>
                <select className="input-field">
                  <option>قانون عمالي</option>
                  <option>قانون عقاري</option>
                  <option>قانون جنائي</option>
                  <option>قانون تجاري</option>
                </select>
              </label>
            </div>
          </section>

          <section className="glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <Bell className="h-6 w-6 text-[rgb(var(--accent))]" />
              <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">الإشعارات</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: 'إشعارات القضايا الجديدة', description: 'تنبيه عند إضافة قضية جديدة', defaultChecked: true },
                { label: 'تنبيهات الجلسات', description: 'تذكير قبل الجلسات بـ24 ساعة', defaultChecked: true },
                { label: 'رسائل الموكلين', description: 'أخطار عند وصول رسائل', defaultChecked: true },
                { label: 'التحديثات الأسبوعية', description: 'ملخص أمني أسبوعي', defaultChecked: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-3xl border border-[rgba(var(--border),0.16)] bg-[rgba(var(--surface-soft),0.12)] p-4">
                  <div>
                    <p className="font-semibold text-[rgb(var(--text-primary))]">{item.label}</p>
                    <p className="mt-1 text-sm text-[rgb(var(--text-secondary))]">{item.description}</p>
                  </div>
                  <input type="checkbox" defaultChecked={item.defaultChecked} className="h-5 w-5 rounded-lg accent-[rgb(var(--accent))]" />
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <Shield className="h-6 w-6 text-[rgb(var(--accent))]" />
              <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">الأمان</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full rounded-3xl border border-[rgba(var(--border),0.18)] bg-[rgba(var(--surface-soft),0.12)] px-4 py-4 text-right text-sm text-[rgb(var(--text-primary))] transition hover:border-[rgba(var(--accent),0.28)]">
                <span className="font-semibold">تغيير كلمة المرور</span>
              </button>
              <button className="w-full rounded-3xl border border-[rgba(var(--border),0.18)] bg-[rgba(var(--surface-soft),0.12)] px-4 py-4 text-right text-sm text-[rgb(var(--text-primary))] transition hover:border-[rgba(var(--accent),0.28)]">
                <span className="font-semibold">تفعيل المصادقة الثنائية</span>
              </button>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="h-6 w-6 text-[rgb(var(--accent))]" />
              <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">المظهر</h2>
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-[rgb(var(--text-secondary))]">اللغة</label>
              <select className="input-field w-full">
                <option>العربية (RTL)</option>
                <option>English (LTR)</option>
              </select>
              <label className="block text-sm text-[rgb(var(--text-secondary))]">المنطقة الزمنية</label>
              <select className="input-field w-full">
                <option>التوقيت الموحد للخليج (GMT+3)</option>
                <option>التوقيت الشرقي للخليج (GMT+4)</option>
              </select>
            </div>
          </div>

          <div className="glass-card p-6 bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.16)]">
            <div className="flex items-center gap-3 mb-4">
              <LogOut className="h-6 w-6 text-rose-300" />
              <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]">منطقة الخطر</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full rounded-3xl bg-[rgba(239,68,68,0.16)] px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-[rgba(239,68,68,0.24)]">تسجيل الخروج من جميع الأجهزة</button>
              <button className="w-full rounded-3xl bg-[rgba(239,68,68,0.16)] px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-[rgba(239,68,68,0.24)]">حذف الحساب</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="glass-card p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">حفظ التغييرات</h3>
          <p className="mt-2 text-sm text-[rgb(var(--text-secondary))]">الإعدادات محفوظة محليًا وتدعم وضع النظام تلقائيًا.</p>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton variant="primary" onClick={handleSave}><Save className="h-4 w-4" />حفظ</ActionButton>
          {saved && <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-200">✓ تم الحفظ</span>}
        </div>
      </div>
    </div>
  );
}
