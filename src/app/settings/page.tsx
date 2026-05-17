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
        description="ضبط إعدادات الحساب، الأمان، والمظهر بطريقة احترافية ومريحة."
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="card bg-slate-50">
            <div className="section-header">
              <div className="flex items-center gap-3">
                <UserIcon className="h-5 w-5 text-gold-600" />
                <h2 className="text-xl font-semibold text-slate-900">الملف الشخصي</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-600">
                <span>الاسم الكامل</span>
                <input className="input-field" defaultValue="محمد أحمد الشعيبي" />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>البريد الإلكتروني</span>
                <input className="input-field" defaultValue="lawyer@example.com" />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>رقم الهاتف</span>
                <input className="input-field" defaultValue="+966501234567" />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>المكتب / الشركة</span>
                <input className="input-field" defaultValue="مكتب الشعيبي للمحاماة" />
              </label>
            </div>
            <div className="mt-6">
              <label className="space-y-2 text-sm text-slate-600">
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

          <section className="card bg-slate-50">
            <div className="section-header">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gold-600" />
                <h2 className="text-xl font-semibold text-slate-900">الإشعارات</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { label: 'إشعارات القضايا الجديدة', description: 'تنبيه عند إضافة قضية جديدة', defaultChecked: true },
                { label: 'تنبيهات الجلسات', description: 'تذكير قبل الجلسات بـ24 ساعة', defaultChecked: true },
                { label: 'رسائل الموكلين', description: 'أخطار عند وصول رسائل', defaultChecked: true },
                { label: 'التحديثات الأسبوعية', description: 'ملخص أمني أسبوعي', defaultChecked: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </div>
                  <input type="checkbox" defaultChecked={item.defaultChecked} className="h-5 w-5 rounded-lg accent-gold-600" />
                </div>
              ))}
            </div>
          </section>

          <section className="card bg-slate-50">
            <div className="section-header">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gold-600" />
                <h2 className="text-xl font-semibold text-slate-900">الأمان</h2>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 text-right transition hover:bg-slate-50">
                تغيير كلمة المرور
              </button>
              <button className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 text-right transition hover:bg-slate-50">
                تفعيل المصادقة الثنائية
              </button>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="card-compact bg-slate-50">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-gold-600" />
              <h2 className="text-lg font-semibold text-slate-900">المظهر</h2>
            </div>
            <div className="mt-5 space-y-4">
              <label className="block text-sm text-slate-600">اللغة</label>
              <select className="input-field w-full">
                <option>العربية (RTL)</option>
                <option>English (LTR)</option>
              </select>
              <label className="block text-sm text-slate-600">المنطقة الزمنية</label>
              <select className="input-field w-full">
                <option>التوقيت الموحد للخليج (GMT+3)</option>
                <option>التوقيت الشرقي للخليج (GMT+4)</option>
              </select>
            </div>
          </div>

          <div className="card-compact bg-white border border-rose-100">
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-rose-500" />
              <h2 className="text-lg font-semibold text-slate-900">منطقة الخطر</h2>
            </div>
            <div className="mt-5 space-y-3">
              <button className="w-full rounded-3xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100">
                تسجيل الخروج من جميع الأجهزة
              </button>
              <button className="w-full rounded-3xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100">
                حذف الحساب
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div className="card bg-slate-50 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">حفظ التغييرات</h3>
          <p className="mt-2 text-sm text-slate-600">أضف تحديثات الحساب والأمان بشكل مركزي.</p>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton variant="primary" onClick={handleSave}><Save className="h-4 w-4" />حفظ</ActionButton>
          {saved && <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-800">✓ تم الحفظ</span>}
        </div>
      </div>
    </div>
  );
}
