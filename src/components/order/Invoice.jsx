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
      <div className="my-4 space-y-2">
        {order.items.map((i) => (
          <div className="flex justify-between text-sm" key={i.food.id}>
            <span>
              {i.food.name} × {i.qty.toLocaleString("fa-IR")}
            </span>
            <b>{toman(i.food.price * i.qty)}</b>
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
