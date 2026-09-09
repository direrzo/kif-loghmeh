import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../ui/Button";
export default function NavbarModern() {
  const { user, setUser, admin, setAdmin, cart } = useApp();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const adminView =
    admin &&
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin/login";
  const links = adminView
    ? [
        ["/admin", "داشبورد"],
        ["/admin/foods", "غذاها"],
        ["/admin/daily-menu", "منوی روزانه"],
        ["/admin/holidays", "تعطیلات"],
        ["/admin/orders", "سفارش‌ها"],
      ]
    : [
        ["/home", "خانه"],
        ["/orders", "سفارش‌های من"],
        ["/profile", "پروفایل من"],
        ["/about", "درباره ما"],
      ];
  const logout = () => {
    setUser(null);
    setAdmin(false);
    setOpen(false);
    localStorage.removeItem("kl_user");
    localStorage.removeItem("kl_admin");
    window.location.replace("/");
  };
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          to={adminView ? "/admin" : "/home"}
          className="flex items-center gap-3"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-700 text-2xl text-white shadow-brand">
            🍱
          </span>
          <span>
            <b className="block text-lg leading-tight text-brand-800">
              کیف لقمه
            </b>
            <small className="text-[10px] font-semibold text-slate-400">
              سفارش غذای مدرسه
            </small>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-2xl bg-slate-50 p-1 md:flex">
          {links.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${location.pathname === to ? "bg-white text-brand-700 shadow-sm" : "text-slate-500 hover:text-brand-700"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {!adminView && user && (
            <Link
              to="/home"
              className="relative grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition hover:bg-brand-100"
            >
              <ShoppingBag size={19} />
              {Object.keys(cart).length > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-[10px] font-black text-white">
                  {Object.keys(cart).length}
                </span>
              )}
            </Link>
          )}
          {adminView && (
            <span className="hidden items-center gap-1 rounded-full bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700 md:flex">
              <ShieldCheck size={15} /> مدیر سیستم
            </span>
          )}
          {(user || adminView) && (
            <Button
              variant="secondary"
              className="hidden items-center gap-1.5 md:flex"
              onClick={logout}
            >
              <LogOut size={15} /> خروج
            </Button>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-300 hover:text-brand-700 md:hidden"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 shadow-lg md:hidden">
          <div className="space-y-1">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-brand-50 hover:text-brand-700"
              >
                {label}
                <ChevronDown size={16} />
              </Link>
            ))}
            {(user || adminView) && (
              <button
                onClick={logout}
                className="mt-2 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
              >
                <LogOut size={17} /> خروج
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
