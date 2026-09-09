import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import FoodImagePicker from "../components/admin/FoodImagePicker";
import PersianCalendar from "../components/calendar/PersianCalendar";
import { todayJalali, jalaliKey } from "../utils/jalali";
import { toman } from "../utils/format";
export function AdminLogin() {
  const { setAdmin } = useApp();
  const nav = useNavigate();
  const [u, setU] = useState(""),
    [p, setP] = useState(""),
    [e, setE] = useState("");
  return (
    <div className="mx-auto max-w-md rounded-3xl border bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold">ورود پنل مدیریت</h1>
      <p className="mt-2 text-sm text-slate-500">
        اطلاعات آزمایشی: admin / 1234
      </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(x) => {
          x.preventDefault();
          if (u === "admin" && p === "1234") {
            setAdmin(true);
            nav("/admin");
          } else setE("نام کاربری یا رمز عبور اشتباه است");
        }}
      >
        <Field
          label="نام کاربری"
          value={u}
          onChange={(x) => setU(x.target.value)}
        />
        <Field
          label="رمز عبور"
          type="password"
          value={p}
          onChange={(x) => setP(x.target.value)}
        />
        {e && <p className="text-sm text-red-500">{e}</p>}
        <Button className="w-full">ورود</Button>
      </form>
    </div>
  );
}
export function AdminDashboard() {
  const { orders, foods } = useApp();
  const stats = [
    ["کل سفارش‌ها", orders.length],
    ["پرداخت‌شده", orders.filter((o) => o.status !== "لغو شده").length],
    ["غذاهای فعال", foods.filter((f) => f.active).length],
    ["فروش کل", toman(orders.reduce((s, o) => s + o.total, 0))],
  ];
  return (
    <div>
      <h1 className="text-2xl font-extrabold">داشبورد مدیریت</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div className="rounded-2xl border bg-white p-5" key={s[0]}>
            <p className="text-sm text-slate-500">{s[0]}</p>
            <b className="mt-3 block text-2xl text-brand-700">{s[1]}</b>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-brand-50 p-6">
        <h2 className="font-bold">مدیریت سریع</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/admin/foods">
            <Button>مدیریت غذاها</Button>
          </Link>
          <Link to="/admin/daily-menu">
            <Button variant="secondary">منوی روزانه</Button>
          </Link>
          <Link to="/admin/orders">
            <Button variant="secondary">مشاهده سفارش‌ها</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export function AdminFoods() {
  const { foods, setFoods } = useApp();
  const [editing, setEditing] = useState(null);
  const save = (e) => {
    e.preventDefault();
    const f = editing;
    if (!f.name || !f.price) return;
    if (foods.some((x) => x.id === f.id))
      setFoods(
        foods.map((x) => (x.id === f.id ? { ...x, ...f, price: +f.price } : x)),
      );
    else
      setFoods([
        ...foods,
        {
          ...f,
          id: "f" + Date.now(),
          price: +f.price,
          emoji: f.emoji || "🍱",
          active: true,
        },
      ]);
    setEditing(null);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">مدیریت غذاها</h1>
        <Button
          onClick={() =>
            setEditing({
              name: "",
              price: "",
              description: "",
              emoji: "🍱",
              image: "",
            })
          }
        >
          غذای جدید
        </Button>
      </div>
      {editing && (
        <form
          onSubmit={save}
          className="my-5 grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-4"
        >
          <Field
            label="نام"
            value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
          />
          <Field
            label="قیمت"
            type="number"
            value={editing.price}
            onChange={(e) => setEditing({ ...editing, price: e.target.value })}
          />
          <Field
            label="توضیح"
            value={editing.description}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
          />
          <FoodImagePicker
            value={editing.image}
            onChange={(image) => setEditing((prev) => ({ ...prev, image }))}
            emoji={editing.emoji}
            onEmojiChange={(emoji) =>
              setEditing((prev) => ({ ...prev, emoji }))
            }
            onSelectIcon={(icon) =>
              setEditing((prev) => ({ ...prev, emoji: icon, image: "" }))
            }
          />
          <div className="flex items-end gap-2 md:col-span-4">
            <Button>ذخیره</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditing(null)}
            >
              لغو
            </Button>
          </div>
        </form>
      )}
      <div className="mt-5 grid gap-3">
        {foods.map((f) => (
          <div
            className="flex items-center gap-3 rounded-2xl border bg-white p-4"
            key={f.id}
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-brand-50 text-3xl">
              {f.image ? (
                <img
                  src={f.image}
                  alt={f.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                f.emoji
              )}
            </div>
            <div className="flex-1">
              <b>{f.name}</b>
              <p className="text-sm text-slate-500">{toman(f.price)}</p>
            </div>
            <button
              onClick={() =>
                setFoods(
                  foods.map((x) =>
                    x.id === f.id ? { ...x, active: !x.active } : x,
                  ),
                )
              }
              className={`rounded-full px-3 py-1 text-xs ${f.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}
            >
              {f.active ? "فعال" : "غیرفعال"}
            </button>
            <Button variant="secondary" onClick={() => setEditing(f)}>
              ویرایش
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
export function AdminDailyMenu() {
  const { foods, menus, setMenus } = useApp();
  const [day, setDay] = useState(todayJalali());
  const key = jalaliKey(day);
  const current = menus[key] || { items: [], prices: {} };
  const toggle = (id) =>
    setMenus({
      ...menus,
      [key]: {
        ...current,
        items: current.items.includes(id)
          ? current.items.filter((x) => x !== id)
          : [...current.items, id],
      },
    });
  const price = (id, v) =>
    setMenus({
      ...menus,
      [key]: { ...current, prices: { ...current.prices, [id]: +v } },
    });
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div>
        <h1 className="mb-3 text-2xl font-extrabold">منوی روزانه</h1>
        <PersianCalendar value={day} onChange={setDay} disabledPast={false} />
      </div>
      <div>
        <h2 className="font-bold">منوی {key}</h2>
        <p className="mt-2 text-sm text-slate-500">
          غذاها و قیمت مستقل این روز را تنظیم کنید.
        </p>
        <div className="mt-5 space-y-3">
          {foods.map((f) => (
            <div
              className="flex items-center gap-3 rounded-2xl border bg-white p-4"
              key={f.id}
            >
              <input
                type="checkbox"
                checked={current.items.includes(f.id)}
                onChange={() => toggle(f.id)}
                className="h-5 w-5 accent-brand-600"
              />
              <span className="text-2xl">{f.emoji}</span>
              <span className="flex-1 font-semibold">{f.name}</span>
              <input
                type="number"
                className="w-32 rounded-lg border p-2"
                value={current.prices[f.id] || f.price}
                onChange={(e) => price(f.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function AdminHolidays() {
  const { holidays, setHolidays } = useApp();
  const [day, setDay] = useState(todayJalali()),
    [title, setTitle] = useState("تعطیلی مدرسه");
  const add = () => {
    const date = jalaliKey(day);
    if (!holidays.some((h) => h.date === date))
      setHolidays([...holidays, { date, title }]);
  };
  return (
    <div>
      <h1 className="text-2xl font-extrabold">مدیریت تعطیلات</h1>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <PersianCalendar value={day} onChange={setDay} disabledPast={false} />
        <div className="rounded-2xl border bg-white p-5">
          <Field
            label="عنوان تعطیلی"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button className="mt-4" onClick={add}>
            ثبت تعطیلی {jalaliKey(day)}
          </Button>
          <div className="mt-6 space-y-2">
            {holidays.map((h) => (
              <div
                className="flex justify-between rounded-xl bg-red-50 p-3 text-sm"
                key={h.date}
              >
                <span>
                  {h.date} - {h.title}
                </span>
                <button
                  className="text-red-600"
                  onClick={() =>
                    setHolidays(holidays.filter((x) => x.date !== h.date))
                  }
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export function AdminOrders() {
  const { orders, setOrders } = useApp();
  const [q, setQ] = useState("");
  const filtered = orders.filter((o) =>
    `${o.id} ${o.parent} ${o.child} ${o.date}`.includes(q),
  );
  return (
    <div>
      <h1 className="text-2xl font-extrabold">مدیریت سفارش‌ها</h1>
      <input
        className="mt-5 w-full rounded-xl border bg-white p-3"
        placeholder="جستجو بر اساس شماره، نام یا تاریخ"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="mt-5 space-y-3">
        {filtered.map((o) => (
          <div className="rounded-2xl border bg-white p-5" key={o.id}>
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <b>{o.id}</b>
                <p className="text-sm text-slate-500">
                  {o.parent} / {o.child} — {o.date}
                </p>
              </div>
              <select
                className="rounded-lg border p-2"
                value={o.status}
                onChange={(e) =>
                  setOrders(
                    orders.map((x) =>
                      x.id === o.id ? { ...x, status: e.target.value } : x,
                    ),
                  )
                }
              >
                <option>در انتظار آماده‌سازی</option>
                <option>در حال آماده‌سازی</option>
                <option>تحویل داده شد</option>
                <option>لغو شده</option>
              </select>
            </div>
            <p className="mt-3 text-sm">
              {o.items
                .map((i) => `${i.food.name} × ${i.qty.toLocaleString("fa-IR")}`)
                .join("، ")}
            </p>
            <b className="mt-2 block text-brand-700">{toman(o.total)}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
