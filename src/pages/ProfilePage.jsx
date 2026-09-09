import { useEffect, useState } from "react";
import { CheckCircle2, Save, UserRound } from "lucide-react";
import { useApp } from "../context/AppContext";
import Field from "../components/ui/Field";
import Button from "../components/ui/Button";

const fields = [
  ["parentName", "نام و نام خانوادگی والد"],
  ["childName", "نام و نام خانوادگی فرزند"],
  ["nationalId", "کد ملی فرزند"],
  ["school", "نام مدرسه"],
  ["address", "آدرس مدرسه"],
  ["phone", "شماره موبایل"],
];

export default function ProfilePage() {
  const { user, setUser } = useApp();
  const [form, setForm] = useState(user || {});
  const [saved, setSaved] = useState(false);
  useEffect(() => setForm(user || {}), [user]);
  const update = (key, value) => {
    setSaved(false);
    setForm((current) => ({ ...current, [key]: value }));
  };
  const submit = (e) => {
    e.preventDefault();
    setUser(form);
    setSaved(true);
  };
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#123f36] via-brand-800 to-[#0a2722] p-7 text-white shadow-brand md:p-9">
        <div className="absolute -left-12 -top-20 h-60 w-60 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
            <UserRound size={27} />
          </span>
          <div>
            <p className="text-sm text-emerald-100">حساب کاربری</p>
            <h1 className="mt-1 text-2xl font-black">پروفایل من</h1>
          </div>
        </div>
        <p className="relative mt-5 max-w-2xl text-sm leading-7 text-emerald-50">
          اطلاعات خود و فرزندتان را بررسی کنید و در صورت نیاز تغییر دهید.
        </p>
      </section>
      <form
        onSubmit={submit}
        className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-7"
      >
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              اطلاعات ثبت‌نام
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              این اطلاعات برای ثبت و پیگیری سفارش‌ها استفاده می‌شود.
            </p>
          </div>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600">
              <CheckCircle2 size={17} /> ذخیره شد
            </span>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map(([key, label]) => (
            <Field
              key={key}
              label={label}
              value={form[key] || ""}
              onChange={(e) => update(key, e.target.value)}
              required
            />
          ))}
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-slate-700">
              مقطع تحصیلی
            </span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              value={form.level || "دبستان"}
              onChange={(e) => update("level", e.target.value)}
            >
              <option>دبستان</option>
              <option>متوسطه اول</option>
              <option>متوسطه دوم</option>
            </select>
          </label>
          <Field
            label="پایه تحصیلی"
            value={form.grade || ""}
            onChange={(e) => update("grade", e.target.value)}
            required
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button type="submit" className="flex items-center gap-2">
            <Save size={17} /> ذخیره تغییرات
          </Button>
        </div>
      </form>
    </div>
  );
}
