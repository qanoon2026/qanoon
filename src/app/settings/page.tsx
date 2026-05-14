'use client';

import { useState } from 'react';
import { Save, Key, Bell, Shield, User as UserIcon, Palette } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">الإعدادات</h1>
        <p className="text-slate-600 mt-1">إدارة إعدادات حسابك والتفضيلات</p>
      </div>

      {/* Profile Section */}
      <div className="card-lg">
        <div className="flex items-center gap-4 mb-6">
          <UserIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">الملف الشخصي</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">الاسم الكامل</label>
            <input
              type="text"
              defaultValue="محمد أحمد الشعيبي"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              defaultValue="lawyer@example.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">رقم الهاتف</label>
            <input
              type="tel"
              defaultValue="+966501234567"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="card-lg">
        <div className="flex items-center gap-4 mb-6">
          <Bell className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">الإشعارات</h2>
        </div>

        <div className="space-y-3">
          {[
            { label: 'إشعارات القضايا الجديدة', defaultChecked: true },
            { label: 'تنبيهات المهام المستحقة', defaultChecked: true },
            { label: 'رسائل الموكلين', defaultChecked: true },
            { label: 'إشعارات التحديثات الأسبوعية', defaultChecked: false },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={item.defaultChecked}
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <label className="mr-3 text-sm font-medium text-slate-700 cursor-pointer">
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="card-lg">
        <div className="flex items-center gap-4 mb-6">
          <Shield className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">الأمان</h2>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="font-medium text-slate-700">تغيير كلمة المرور</span>
            <Key className="h-5 w-5 text-slate-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="font-medium text-slate-700">تفعيل المصادقة الثنائية</span>
            <Shield className="h-5 w-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="card-lg">
        <div className="flex items-center gap-4 mb-6">
          <Palette className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">المظهر</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">اللغة</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>العربية (RTL)</option>
              <option>English (LTR)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          حفظ الإعدادات
        </button>
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
            <span>✓ تم الحفظ بنجاح</span>
          </div>
        )}
      </div>
    </div>
  );
}
