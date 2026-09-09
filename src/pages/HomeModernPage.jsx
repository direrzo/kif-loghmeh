import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, ChevronLeft, MapPin, Utensils } from "lucide-react";
import { useApp } from "../context/AppContext";
import PersianCalendar from "../components/calendar/PersianCalendar";
import FoodCard from "../components/food/FoodCard";
import CartPanel from "../components/order/CartPanel";
import { todayJalali, jalaliKey, addJalaliDays } from "../utils/jalali";
import { useToast } from "../hooks/useToast";
import Toast from "../components/ui/Toast";
export default function HomeModernPage() {
  const { user, foods, cart, add, change, holidays, menus } = useApp();
  const [day, setDay] = useState(todayJalali());
  const { toast, show } = useToast();
  const nav = useNavigate();
  const key = jalaliKey(day);
  const tomorrowKey = jalaliKey(addJalaliDays(todayJalali(), 1));
  const tomorrowClosed = key === tomorrowKey && new Date().getHours() >= 17;
  const menu = menus[key];
  const available = foods
    .filter((f) => f.active && (!menu || menu.items?.includes(f.id)))
    .slice(0, 2);
  const addFood = (f) => {
    add({ ...f, price: menu?.prices?.[f.id] || f.price }, key);
    show("غذا به سبد اضافه شد");
  };
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#123f36] via-brand-800 to-[#0a2722] px-6 py-8 text-white shadow-brand md:px-10 md:py-10">
        <div className="absolute -left-12 -top-20 h-60 w-60 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="absolute -bottom-24 right-20 h-64 w-64 rounded-full bg-orange-400/15 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-emerald-100">
              <Utensils size={14} /> منوی امروز مدرسه
            </div>
            <h1 className="text-3xl font-black text-white md:text-4xl">
              سلام {user?.parentName || "والد گرامی"} 👋
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-emerald-50 md:text-base">
              غذای فرزندتان را برای امروز یا روزهای آینده انتخاب کنید و همه را
              در یک سبد مدیریت کنید.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-400 text-white">
              <CalendarDays size={21} />
            </span>
            <div>
              <span className="block text-xs text-emerald-100">مدرسه</span>
              <b className="text-white">{user?.school || "مدرسه فرزند شما"}</b>
            </div>
          </div>
        </div>
      </section>
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)_340px]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-brand-600">مرحله اول</p>
              <h2 className="mt-1 text-lg font-black">انتخاب روز</h2>
            </div>
            <MapPin size={19} className="text-brand-600" />
          </div>
          <PersianCalendar
            value={day}
            onChange={setDay}
            holidays={holidays}
            disabledDate={(d) => jalaliKey(d) === tomorrowKey && tomorrowClosed}
          />
          <div className="mt-3 rounded-2xl border border-brand-100 bg-brand-50 p-3 text-xs leading-6 text-brand-700">
            با انتخاب روز جدید، سبد شما حفظ می‌شود و می‌توانید برای چند روز
            سفارش ثبت کنید.
          </div>
        </div>
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold text-brand-600">مرحله دوم</p>
              <h2 className="mt-1 text-lg font-black">غذای روز انتخابی</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
              {key}
            </span>
          </div>
          {tomorrowClosed ? (
            <div className="rounded-3xl border border-orange-100 bg-orange-50 p-8 text-center text-orange-700">
              مهلت سفارش برای فردا به پایان رسیده است.
            </div>
          ) : available.length ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {available.map((f) => (
                <FoodCard key={f.id} food={f} onAdd={addFood} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              برای این روز منویی ثبت نشده است.
            </div>
          )}
        </section>
        <div>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold text-brand-600">مرحله سوم</p>
              <h2 className="mt-1 text-lg font-black">سبد سفارش</h2>
            </div>
            <button
              onClick={() => nav("/orders")}
              className="flex items-center gap-1 text-xs font-bold text-brand-700"
            >
              سفارش‌ها <ChevronLeft size={14} />
            </button>
          </div>
          <CartPanel
            cart={cart}
            onChange={change}
            onRemove={change}
            onCheckout={() =>
              Object.keys(cart).length
                ? nav("/payment")
                : show("سبد سفارش خالی است", "error")
            }
          />
        </div>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
