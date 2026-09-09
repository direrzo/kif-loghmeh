import { toman } from "../../utils/format";

const statusClass = {
  "در انتظار آماده‌سازی": "bg-amber-50 text-amber-700",
  "در حال آماده‌سازی": "bg-blue-50 text-blue-700",
  "تحویل داده شد": "bg-green-50 text-green-700",
  "لغو شده": "bg-red-50 text-red-700",
};

export default function OrderInvoice({ order }) {
  const items = Array.isArray(order?.items) ? order.items : [];
  const status = order?.status || "در انتظار آماده‌سازی";
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-4">
        <div>
          <h3 className="font-bold">فاکتور کیف لقمه</h3>
          <p className="text-xs text-slate-500">
            شماره سفارش: {order?.id || "بدون شماره"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[status] || "bg-slate-100 text-slate-600"}`}
          >
            وضعیت: {status}
          </span>
          <span className="text-sm text-brand-700">
            {order?.date || "بدون تاریخ"}
          </span>
        </div>
      </div>
      <div className="my-4 space-y-3">
        {items.map((item, index) => (
          <div
            className="flex justify-between gap-3 border-b border-slate-100 pb-3 text-sm"
            key={item?.id || index}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-brand-50 text-xl">
                {item?.food?.image ? (
                  <img
                    src={item.food.image}
                    alt={item.food.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  item?.food?.emoji || "🍱"
                )}
              </div>
              <div>
                <span className="block">
                  {item?.food?.name || "غذای حذف‌شده"} ×{" "}
                  {(item?.qty || 0).toLocaleString("fa-IR")}
                </span>
                {item?.day && (
                  <span className="mt-1 block text-xs text-brand-700">
                    روز سفارش: {item.day}
                  </span>
                )}
              </div>
            </div>
            <b>{toman((item?.food?.price || 0) * (item?.qty || 0))}</b>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t pt-4 font-bold">
        <span>مبلغ نهایی</span>
        <span className="text-brand-700">{toman(order?.total || 0)}</span>
      </div>
    </div>
  );
}
