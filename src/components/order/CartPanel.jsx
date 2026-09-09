import { Trash2, Plus, Minus } from "lucide-react";
import Button from "../ui/Button";
import { toman } from "../../utils/format";
export default function CartPanel({ cart, onChange, onRemove, onCheckout }) {
  const items = Object.values(cart);
  const total = items.reduce((s, x) => s + x.food.price * x.qty, 0);
  return (
    <aside className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="flex items-center justify-between text-lg font-bold">
        سبد سفارش{" "}
        <span className="text-sm text-slate-400">{items.length} قلم</span>
      </h2>
      {!items.length ? (
        <p className="py-10 text-center text-sm text-slate-500">
          سبد شما خالی است
        </p>
      ) : (
        <>
          <div className="mt-4 max-h-[560px] space-y-4 overflow-y-auto">
            {items.map((x) => (
              <div key={x.id} className="flex items-center gap-3 border-b pb-4">
                <span className="text-3xl">{x.food.emoji}</span>
                <div className="min-w-0 flex-1">
                  <b className="block truncate text-sm">{x.food.name}</b>
                  <span className="mt-1 block text-xs font-semibold text-brand-700">
                    روز سفارش: {x.day}
                  </span>
                  <span className="text-xs text-slate-500">
                    {toman(x.food.price * x.qty)}
                  </span>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => onChange(x.id, x.qty - 1)}
                      className="rounded bg-slate-100 p-1"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{x.qty.toLocaleString("fa-IR")}</span>
                    <button
                      onClick={() => onChange(x.id, x.qty + 1)}
                      className="rounded bg-slate-100 p-1"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(x.id, 0)}
                  className="text-red-400"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t pt-4">
            <b>مبلغ کل</b>
            <b className="text-lg text-brand-700">{toman(total)}</b>
          </div>
          <Button className="mt-4 w-full" onClick={onCheckout}>
            ادامه و پرداخت
          </Button>
        </>
      )}
    </aside>
  );
}
