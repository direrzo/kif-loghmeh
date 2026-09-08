import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PersianCalendar from "../components/calendar/PersianCalendar";
import FoodCard from "../components/food/FoodCard";
import CartPanel from "../components/order/CartPanel";
import { todayJalali, jalaliKey, addJalaliDays } from "../utils/jalali";
import { useToast } from "../hooks/useToast";
import Toast from "../components/ui/Toast";
export default function HomePage() {
  const { user, foods, cart, add, change, clearCart, holidays, menus } =
    useApp();
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
      <section className="rounded-3xl bg-gradient-to-l from-brand-700 to-brand-500 p-7 text-white shadow-lg md:p-10">
        <p className="text-brand-100">
          سلام {user?.parentName || "والد گرامی"} 👋
        </p>
        <h1 className="mt-2 text-3xl font-extrabold">
          برای روزهای خوب آماده‌ایم
        </h1>
        <p className="mt-3 max-w-xl text-brand-50">
          غذای موردعلاقه فرزندتان را برای روز مجاز انتخاب کنید.
        </p>
      </section>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr_330px]">
        <div>
          <h2 className="mb-3 font-bold">۱. انتخاب روز</h2>
          <PersianCalendar
            value={day}
            onChange={(d) => {
              setDay(d);
              clearCart();
            }}
            holidays={holidays}
            disabledDate={(d) => jalaliKey(d) === tomorrowKey && tomorrowClosed}
          />
        </div>
        <section>
          <h2 className="mb-3 font-bold">
            ۲. انتخاب غذا{" "}
            <span className="text-sm font-normal text-slate-500">({key})</span>
          </h2>
          {tomorrowClosed ? (
            <p className="rounded-2xl bg-amber-50 p-8 text-center text-amber-700">
              مهلت سفارش برای فردا به پایان رسیده است.
            </p>
          ) : available.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {available.map((f) => (
                <FoodCard key={f.id} food={f} onAdd={addFood} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl bg-white p-8 text-center text-slate-500">
              برای این روز منویی ثبت نشده است.
            </p>
          )}
        </section>
        <div>
          <h2 className="mb-3 font-bold">۳. سبد سفارش</h2>
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
