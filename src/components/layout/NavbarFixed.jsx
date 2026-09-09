import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, LogOut, ShieldCheck, Menu, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Button from "../ui/Button";

export default function NavbarFixed() {
  const { user, setUser, admin, setAdmin, cart } = useApp();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const nav = useNavigate();
  const adminView =
    admin &&
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin/login";
  const publicLinks = [
    ["/home", "خانه"],
    ["/orders", "سفارش‌های من"],
    ["/about", "درباره ما"],
  ];
  const adminLinks = [
    ["/admin", "داشبورد"],
    ["/admin/foods", "غذاها"],
    ["/admin/daily-menu", "منوی روزانه"],
    ["/admin/holidays", "تعطیلات"],
    ["/admin/orders", "سفارش‌ها"],
  ];
  const links = adminView ? adminLinks : publicLinks;
  const logout = () => {
    setUser(null);
    setAdmin(false);
    setOpen(false);
    localStorage.removeItem("kl_user");
    localStorage.removeItem("kl_admin");
    window.location.replace("/");
  };
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          to={adminView ? "/admin" : "/home"}
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-xl text-white">
            🍱
          </span>
          <span className="text-xl font-extrabold text-brand-700">
            کیف لقمه
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
          {links.map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {!adminView && user && (
            <Link
              to="/home"
              className="relative rounded-xl bg-brand-50 p-2 text-brand-700"
            >
              <ShoppingBag size={20} />
              {Object.keys(cart).length > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-xs text-white">
                  {Object.keys(cart).length}
                </span>
              )}
            </Link>
          )}
          {(user || adminView) && (
            <Button
              variant="secondary"
              className="hidden md:inline-flex"
              onClick={logout}
            >
              <LogOut size={16} className="ml-1 inline" /> خروج
            </Button>
          )}
          {adminView && (
            <ShieldCheck size={21} className="hidden text-brand-600 md:block" />
          )}
          <button
            type="button"
            aria-label="باز کردن منو"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="rounded-xl p-2 text-slate-700 transition hover:bg-brand-50 md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t bg-white px-4 py-3 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {label}
              </Link>
            ))}
            {(user || adminView) && (
              <button
                type="button"
                onClick={logout}
                className="mt-1 flex items-center gap-2 rounded-xl px-3 py-3 text-right text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={17} /> خروج
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
