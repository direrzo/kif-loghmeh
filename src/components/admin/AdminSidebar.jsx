import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  CalendarDays,
  Sun,
  ClipboardList,
  Settings,
} from "lucide-react";
const links = [
  ["/admin", "داشبورد", LayoutDashboard],
  ["/admin/foods", "مدیریت غذاها", Utensils],
  ["/admin/daily-menu", "منوی روزانه", CalendarDays],
  ["/admin/holidays", "تعطیلات", Sun],
  ["/admin/orders", "سفارش‌ها", ClipboardList],
];
export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm lg:block">
      <div className="mb-5 rounded-2xl bg-gradient-to-br from-brand-800 to-brand-600 p-5 text-white">
        <p className="text-xs text-brand-100">پنل مدیریت کیف لقمه</p>
        <h2 className="mt-2 text-xl font-black">مرکز کنترل</h2>
        <p className="mt-2 text-xs leading-5 text-brand-100">
          مدیریت منو، غذاها و سفارش‌های مدرسه
        </p>
      </div>
      <nav className="space-y-1">
        {links.map(([to, label, Icon]) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition ${isActive ? "bg-brand-50 text-brand-700" : "text-slate-500 hover:bg-slate-50 hover:text-brand-700"}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <Settings size={15} className="text-brand-600" /> وضعیت سامانه
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> سیستم فعال
          است
        </div>
      </div>
    </aside>
  );
}
