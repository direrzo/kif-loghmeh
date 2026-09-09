import { toman } from "../../utils/format";

export default function Invoice({ order }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex justify-between border-b pb-4">
        <div>
          <h3 className="font-bold">فاکتور کیف لقمه</h3>
          <p className="text-xs text-slate-500">شماره سفارش: {order.id}</p>
        </div>
        <span className="text-sm text-brand-700">{order.date}</span>
      </div>
      <div className="my-4 space-y-3">
        {order.items.map((item, index) => (
          <div
            className="flex justify-between gap-3 border-b border-slate-100 pb-3 text-sm"
            key={item.id || `${item.food.id}-${item.day || index}`}
          >
            <div>
              <span className="block">
                {item.food.name} × {item.qty.toLocaleString("fa-IR")}
              </span>
              {item.day && (
                <span className="mt-1 block text-xs text-brand-700">
                  روز سفارش: {item.day}
                </span>
              )}
            </div>
            <b>{toman(item.food.price * item.qty)}</b>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t pt-4 font-bold">
        <span>مبلغ نهایی</span>
        <span className="text-brand-700">{toman(order.total)}</span>
      </div>
    </div>
  );
}
