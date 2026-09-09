import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Clock3,
} from "lucide-react";
import Button from "../components/ui/Button";
const benefits = [
  ["غذای سالم و تازه", UtensilsCrossed],
  ["تنوع بالای غذایی", Sparkles],
  ["سفارش ساده و سریع", Clock3],
];
export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f8f6] text-slate-800">
      <section className="soft-grid relative">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-orange-100/70 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-8 md:pb-28 md:pt-12">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-700 text-2xl text-white shadow-brand">
                🍱
              </span>
              <div>
                <b className="block text-lg text-brand-800">کیف لقمه</b>
                <span className="text-xs text-slate-500">سفارش غذای مدرسه</span>
              </div>
            </div>
            <Link
              to="/admin/login"
              className="flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-sm font-bold text-brand-700 transition hover:border-brand-300 hover:bg-white"
            >
              <ShieldCheck size={16} /> ورود مدیریت
            </Link>
          </nav>
          <div className="mx-auto max-w-3xl pt-20 text-center md:pt-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-brand-700">
              <Sparkles size={14} /> تجربه‌ای ساده برای والدین
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.4] text-slate-900 md:text-6xl">
              هر روز، یک انتخاب خوشمزه برای{" "}
              <span className="text-brand-700">فرزند شما</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              کیف لقمه سفارش غذای مدرسه را برای والدین ساده، شفاف و مطمئن
              می‌کند؛ از انتخاب روز تا پیگیری آماده‌سازی، همه‌چیز در یکجا.
            </p>
            <Link to="/login" className="mt-8 inline-flex">
              <Button className="px-8 py-3.5">شروع سفارش</Button>
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-slate-500">
              {benefits.map(([label, Icon]) => (
                <span key={label} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-brand-600" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map(([title, Icon]) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                یک تجربه آرام و مطمئن برای مدیریت غذای مدرسه.
              </p>
            </article>
          ))}
        </div>
      </section>
      <footer className="border-t border-slate-200 bg-white/70 py-6 text-center text-sm text-slate-500">
        ساخته شده با ❤️ توسط رضا نجفی
      </footer>
    </div>
  );
}
