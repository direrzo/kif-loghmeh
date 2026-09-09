import { useState } from "react";
import { useApp } from "../context/AppContext";
import Invoice from "../components/order/Invoice";
import EmptyState from "../components/ui/EmptyState";

const doneStatuses = ["تحویل داده شد", "لغو شده"];
const statusClass = {
  "در انتظار آماده‌سازی": "bg-amber-50 text-amber-700",
  "در حال آماده‌سازی": "bg-blue-50 text-blue-700",
  "تحویل داده شد": "bg-green-50 text-green-700",
  "لغو شده": "bg-red-50 text-red-700",
};

export default function OrdersHistoryPage() {
  const { orders, setOrders } = useApp();
  const [tab, setTab] = useState("active");
  const visible = orders.filter((order) =>
    tab === "previous" ? order.archived : !order.archived,
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
        <h1 className="text-2xl font-extrabold">سفارش‌های من</h1>
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
      <div className="mt-6 space-y-4">
        {visible.length ? (
          visible.map((order) => (
            <div key={order.id} className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-2xl border border-b-0 bg-white px-5 pt-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[order.status] || "bg-slate-100 text-slate-600"}`}
                >
                  وضعیت: {order.status}
                </span>
                {tab === "active" && doneStatuses.includes(order.status) && (
                  <button
                    onClick={() => archive(order.id)}
                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    انتقال به سفارش‌های قبل
                  </button>
                )}
              </div>
              <Invoice order={order} />
            </div>
          ))
        ) : (
          <EmptyState
            title={
              tab === "previous" ? "سفارش قبلی ندارید" : "سفارش جاری ندارید"
            }
            text={
              tab === "previous"
                ? "سفارش‌های انجام‌شده یا لغوشده اینجا نگهداری می‌شوند."
                : "هنوز سفارشی در حال پیگیری ندارید."
            }
          />
        )}
      </div>
    </div>
  );
}
