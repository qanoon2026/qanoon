'use client';

import { useState } from 'react';
import { Save, Key, Bell, Shield, User as UserIcon, Palette, Lock, LogOut } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ActionButton } from '@/components/ActionButton';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <PageHeader
        title="الإعدادات"
        description="إدارة إعدادات حسابك والتفضيلات الشخصية"
      />

      {/* Profile Section */}
      <div className="card-lg">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
          <UserIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">الملف الشخصي</h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم الكامل</label>
              <input
                type="text"
                defaultValue="محمد أحمد الشعيبي"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                defaultValue="lawyer@example.com"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">رقم الهاتف</label>
              <input
                type="tel"
                defaultValue="+966501234567"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">المكتب / الشركة</label>
              <input
                type="text"
                defaultValue="مكتب الشعيبي للمحاماة"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">تخصص قانوني</label>
            <select className="input-field">
              <option>قانون عمالي</option>
              <option>قانون عقاري</option>
              <option>قانون جنائي</option>
              <option>قانون تجاري</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="card-lg">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
          <Bell className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">الإشعارات</h2>
        </div>

        <div className="space-y-4">
          {[
            { label: 'إشعارات القضايا الجديدة', description: 'احصل على تنبيه عند إضافة قضية جديدة', defaultChecked: true },
            { label: 'تنبيهات الجلسات القضائية', description: 'تنبيهات قبل الجلسات بـ 24 ساعة', defaultChecked: true },
            { label: 'رسائل الموكلين', description: 'إخطارات عند تواصل الموكلين', defaultChecked: true },
            { label: 'التحديثات الأسبوعية', description: 'ملخص أسبوعي للنشاطات', defaultChecked: false },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-medium text-slate-900">{item.label}</p>
                <p className="text-sm text-slate-600 mt-1">{item.description}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={item.defaultChecked}
                className="w-5 h-5 text-blue-600 rounded cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="card-lg">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
          <Shield className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">الأمان</h2>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors font-medium text-slate-900">
            <span className="flex items-center gap-3">
              <Key className="h-5 w-5 text-blue-600" />
              تغيير كلمة المرور
            </span>
            <span className="text-slate-400">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors font-medium text-slate-900">
            <span className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-blue-600" />
              تفعيل المصادقة الثنائية
            </span>
            <span className="text-slate-400">→</span>
          </button>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="card-lg">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
          <Palette className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">المظهر والتفضيلات</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">اللغة</label>
            <select className="input-field">
              <option selected>العربية (RTL)</option>
              <option>English (LTR)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">المنطقة الزمنية</label>
            <select className="input-field">
              <option selected>التوقيت الموحد للخليج (GMT+3)</option>
              <option>التوقيت الشرقي للخليج (GMT+4)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card-lg border-red-200 bg-gradient-to-br from-red-50 to-red-50">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-red-200">
          <LogOut className="h-6 w-6 text-red-600" />
          <h2 className="text-lg font-bold text-slate-900">منطقة الخطر</h2>
        </div>

        <div className="space-y-3">
          <button className="w-full py-2.5 px-4 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded-lg transition-colors">
            تسجيل الخروج من جميع الأجهزة
          </button>
          <button className="w-full py-2.5 px-4 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded-lg transition-colors">
            حذف الحساب
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3 pt-4">
        <ActionButton variant="primary" onClick={handleSave}>
          <Save className="h-4 w-4" />
          حفظ التغييرات
        </ActionButton>
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-800 rounded-lg font-medium">
            <span>✓ تم الحفظ بنجاح</span>
          </div>
        )}
      </div>
    </div>
  );
}
