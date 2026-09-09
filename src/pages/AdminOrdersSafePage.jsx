import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { toman } from "../utils/format";
import EmptyState from "../components/ui/EmptyState";

const statuses = [
  "همه",
  "در انتظار آماده‌سازی",
  "در حال آماده‌سازی",
  "تحویل داده شد",
  "لغو شده",
];
const doneStatuses = ["تحویل داده شد", "لغو شده"];
const statusClass = {
  "در انتظار آماده‌سازی": "bg-amber-50 text-amber-700",
  "در حال آماده‌سازی": "bg-blue-50 text-blue-700",
  "تحویل داده شد": "bg-green-50 text-green-700",
  "لغو شده": "bg-red-50 text-red-700",
};

export default function AdminOrdersSafePage() {
  const { orders, setOrders } = useApp();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("همه");
  const [tab, setTab] = useState("active");
  const filtered = useMemo(
    () =>
      orders.filter((order) => {
        const items = Array.isArray(order.items) ? order.items : [];
        const text = [
          order.id,
          order.parent,
          order.child,
          order.date,
          ...items.map((item) => item?.food?.name || ""),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return (
          (tab === "previous" ? Boolean(order.archived) : !order.archived) &&
          text.includes(query.trim().toLowerCase()) &&
          (status === "همه" || order.status === status)
        );
      }),
    [orders, query, status, tab],
  );
  const updateStatus = (id, next) =>
    setOrders((list) =>
      list.map((order) =>
        order.id === id ? { ...order, status: next } : order,
      ),
    );
  const archive = (id) =>
    setOrders((list) =>
      list.map((order) =>
        order.id === id ? { ...order, archived: true } : order,
      ),
    );
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">مدیریت سفارش‌ها</h1>
        <div className="flex rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => setTab("active")}
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${tab === "active" ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"}`}
          >
            سفارش‌های جاری
          </button>
          <button
            onClick={() => setTab("previous")}
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${tab === "previous" ? "bg-white text-brand-700 shadow-sm" : "text-slate-500"}`}
          >
            سفارش‌های قبل
          </button>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          className="w-full rounded-xl border bg-white p-3"
          placeholder="جستجو با شماره، نام والد، فرزند، تاریخ یا نام غذا"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="rounded-xl border bg-white px-4 py-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {statuses.map((item) => (
          <button
            key={item}
            onClick={() => setStatus(item)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${status === item ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-400"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {filtered.length ? (
          filtered.map((order) => {
            const items = Array.isArray(order.items) ? order.items : [];
            return (
              <div className="rounded-2xl border bg-white p-5" key={order.id}>
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <b>{order.id}</b>
                    <p className="text-sm text-slate-500">
                      {order.parent || "والد"} / {order.child || "فرزند"} —{" "}
                      {order.date || "بدون تاریخ"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[order.status] || "bg-slate-100 text-slate-600"}`}
                    >
                      {order.status || "در انتظار آماده‌سازی"}
                    </span>
                    <select
                      className="rounded-lg border p-2"
                      value={order.status || "در انتظار آماده‌سازی"}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option>در انتظار آماده‌سازی</option>
                      <option>در حال آماده‌سازی</option>
                      <option>تحویل داده شد</option>
                      <option>لغو شده</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-sm">
                  {items.map((item, index) => (
                    <p key={item.id || index}>
                      {item?.food?.name || "غذای حذف‌شده"} ×{" "}
                      {(item.qty || 0).toLocaleString("fa-IR")}{" "}
                      <span className="text-xs text-slate-500">
                        ({item.day || order.date || "بدون تاریخ"})
                      </span>
                    </p>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <b className="text-brand-700">{toman(order.total)}</b>
                  {tab === "active" && doneStatuses.includes(order.status) && (
                    <button
                      onClick={() => archive(order.id)}
                      className="text-sm font-semibold text-red-600"
                    >
                      انتقال به سفارش‌های قبل
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <EmptyState
            title="سفارشی پیدا نشد"
            text="فیلتر یا عبارت جستجو را تغییر دهید."
          />
        )}
      </div>
    </div>
  );
}
