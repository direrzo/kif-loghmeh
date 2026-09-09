import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Field from "../components/ui/Field";
import Button from "../components/ui/Button";
import { seedUser } from "../data/seed";
export function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const { setUser } = useApp();
  const nav = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (!sent) {
      if (phone.length < 10) return setErr("شماره موبایل معتبر وارد کنید");
      setErr("");
      setSent(true);
    } else if (otp !== "1234")
      setErr("کد واردشده صحیح نیست؛ کد آزمایشی ۱۲۳۴ است");
    else {
      const existing = JSON.parse(localStorage.getItem("kl_user") || "null");
      setUser(existing || { ...seedUser, phone });
      nav(existing ? "/home" : "/register");
    }
  };
  return (
    <Auth title="ورود والدین">
      <form onSubmit={submit} className="space-y-4">
        <Field
          label="شماره موبایل"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="۰۹۱۲۱۲۳۴۵۶۷"
          disabled={sent}
        />
        {sent && (
          <Field
            label="کد تأیید"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="۱۲۳۴"
          />
        )}
        {err && <p className="text-sm text-red-500">{err}</p>}
        <Button className="w-full">
          {sent ? "تأیید و ورود" : "دریافت کد تأیید"}
        </Button>
      </form>
    </Auth>
  );
}
export function RegisterPage() {
  const { setUser } = useApp();
  const nav = useNavigate();
  const [form, setForm] = useState({ ...seedUser });
  const [err, setErr] = useState("");
  const set = (k, v) => setForm({ ...form, [k]: v });
  const submit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v)) {
      setErr("لطفاً همه فیلدها را تکمیل کنید");
      return;
    }
    setUser(form);
    nav("/home");
  };
  return (
    <Auth title="ثبت‌نام والد">
      <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        {[
          ["parentName", "نام و نام خانوادگی والد"],
          ["childName", "نام و نام خانوادگی فرزند"],
          ["nationalId", "کد ملی فرزند"],
          ["school", "نام مدرسه"],
          ["address", "آدرس مدرسه"],
          ["phone", "شماره موبایل"],
        ].map(([k, l]) => (
          <Field
            key={k}
            label={l}
            value={form[k]}
            onChange={(e) => set(k, e.target.value)}
          />
        ))}
        <label className="block">
          <span className="text-sm font-semibold">مقطع تحصیلی</span>
          <select
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3"
            value={form.level}
            onChange={(e) => set("level", e.target.value)}
          >
            <option>دبستان</option>
            <option>متوسطه اول</option>
            <option>متوسطه دوم</option>
          </select>
        </label>
        <Field
          label="پایه تحصیلی"
          value={form.grade}
          onChange={(e) => set("grade", e.target.value)}
        />
        {err && <p className="text-sm text-red-500 md:col-span-2">{err}</p>}
        <Button className="md:col-span-2">ثبت‌نام و ورود</Button>
      </form>
    </Auth>
  );
}
function Auth({ title, children }) {
  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center py-8">
      <div className="w-full max-w-lg rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-9">
        <div className="mb-7 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-700 text-3xl text-white shadow-brand">
            🍱
          </span>
          <h1 className="mt-4 text-2xl font-black text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">
            کیف لقمه؛ سفارش غذای مدرسه
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
