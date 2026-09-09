import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardList,
  TrendingUp,
  Utensils,
  Wallet,
  CalendarDays,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { toman } from "../utils/format";
import Button from "../components/ui/Button";
export default function AdminDashboardModernPage() {
  const { orders, foods } = useApp();
  const stats = [
    ["کل سفارش‌ها", orders.length, ClipboardList, "از شروع فعالیت"],
    [
      "سفارش‌های فعال",
      orders.filter((o) => o.status !== "لغو شده").length,
      TrendingUp,
      "نیازمند پیگیری",
    ],
    [
      "غذاهای فعال",
      foods.filter((f) => f.active).length,
      Utensils,
      "در منوی سامانه",
    ],
    [
      "فروش کل",
      toman(orders.reduce((s, o) => s + o.total, 0)),
      Wallet,
      "مجموع سفارش‌ها",
    ],
  ];
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-800 to-brand-600 p-7 text-white shadow-brand md:p-9">
        <div className="absolute -left-10 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-brand-100">
              نمای کلی سامانه
            </span>
            <h1 className="mt-2 text-3xl font-black">صبح بخیر، مدیر 👋</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-brand-100">
              از اینجا می‌توانید وضعیت سفارش‌ها، منوی روزانه و غذاهای مدرسه را
              مدیریت کنید.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-sm backdrop-blur">
            <CalendarDays className="mb-2 text-orange-300" size={22} />
            <span className="block text-brand-100">وضعیت سامانه</span>
            <b>فعال و آماده دریافت سفارش</b>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, Icon, caption]) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon size={21} />
              </span>
              <span className="text-xs font-bold text-emerald-600">
                ● آنلاین
              </span>
            </div>
            <p className="mt-5 text-sm font-bold text-slate-500">{label}</p>
            <b className="mt-1 block text-2xl font-black text-slate-900">
              {value}
            </b>
            <span className="mt-2 block text-xs text-slate-400">{caption}</span>
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-brand-600">دسترسی سریع</p>
              <h2 className="mt-1 text-xl font-black">مدیریت روزانه</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              ۴ بخش اصلی
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <QuickLink
              to="/admin/foods"
              icon="🍽️"
              title="غذاها"
              text="افزودن، ویرایش و تصویر غذا"
            />
            <QuickLink
              to="/admin/daily-menu"
              icon="📅"
              title="منوی روزانه"
              text="تنظیم غذای هر تاریخ"
            />
            <QuickLink
              to="/admin/holidays"
              icon="🌤️"
              title="تعطیلات"
              text="مدیریت روزهای تعطیل"
            />
            <QuickLink
              to="/admin/orders"
              icon="📦"
              title="سفارش‌ها"
              text="جستجو و تغییر وضعیت"
            />
          </div>
        </div>
        <div className="rounded-3xl bg-orange-50 p-6">
          <span className="text-4xl">✨</span>
          <h2 className="mt-4 text-xl font-black text-slate-900">
            یک تجربه بهتر بسازید
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            منوی روزانه را به‌روز نگه دارید تا والدین همیشه انتخاب‌های دقیق و
            تازه ببینند.
          </p>
          <Link to="/admin/daily-menu" className="mt-5 inline-flex">
            <Button variant="secondary" className="flex items-center gap-2">
              تنظیم منو <ArrowLeft size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
function QuickLink({ to, icon, title, text }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-brand-200 hover:bg-brand-50"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 text-2xl transition group-hover:bg-white">
        {icon}
      </span>
      <span className="min-w-0">
        <b className="block text-sm text-slate-800">{title}</b>
        <small className="mt-1 block truncate text-xs text-slate-500">
          {text}
        </small>
      </span>
      <ArrowLeft
        size={16}
        className="mr-auto text-slate-300 transition group-hover:-translate-x-1 group-hover:text-brand-600"
      />
    </Link>
  );
}
