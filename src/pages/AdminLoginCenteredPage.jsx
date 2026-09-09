import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Field from "../components/ui/Field";
import Button from "../components/ui/Button";
export default function AdminLoginCenteredPage() {
  const { setAdmin } = useApp();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setAdmin(true);
      nav("/admin");
    } else setError("نام کاربری یا رمز عبور اشتباه است");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f8f6] px-4 py-8">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-9">
        <div className="mb-7 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-700 text-3xl text-white shadow-brand">
            🛡️
          </span>
          <h1 className="mt-4 text-2xl font-black text-slate-900">
            ورود پنل مدیریت
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            مدیریت منو، غذاها و سفارش‌های کیف لقمه
          </p>
        </div>
        <form className="space-y-4" onSubmit={submit}>
          <Field
            label="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
          <Field
            label="رمز عبور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••"
          />
          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}
          <Button className="w-full py-3">ورود به پنل</Button>
        </form>
        <p className="mt-5 text-center text-xs text-slate-400">
          ورود آزمایشی: admin / 1234
        </p>
      </div>
    </div>
  );
}
