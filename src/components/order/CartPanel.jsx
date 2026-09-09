import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Button from "../ui/Button";
import { toman } from "../../utils/format";
export default function CartPanel({ cart, onChange, onRemove, onCheckout }) {
  const items = Object.values(cart);
  const total = items.reduce((s, x) => s + x.food.price * x.qty, 0);
  return (
    <aside className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <ShoppingBag size={19} />
          </span>
          <div>
            <h2 className="font-extrabold">سبد سفارش</h2>
            <p className="text-xs text-slate-400">انتخاب‌های شما</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
          {items.length} قلم
        </span>
      </div>
      {!items.length ? (
        <div className="py-12 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-50 text-3xl">
            🛒
          </div>
          <p className="mt-4 text-sm font-bold text-slate-700">
            سبد شما خالی است
          </p>
          <p className="mt-1 text-xs leading-6 text-slate-400">
            غذاهای موردنظرتان را از منوی امروز انتخاب کنید.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 max-h-[560px] space-y-3 overflow-y-auto pl-1">
            {items.map((x) => (
              <div
                key={x.id}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white text-2xl shadow-sm">
                    {x.food.image ? (
                      <img
                        src={x.food.image}
                        alt={x.food.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      x.food.emoji
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <b className="block truncate text-sm">{x.food.name}</b>
                    <span className="mt-1 block text-[11px] font-bold text-brand-700">
                      روز سفارش: {x.day}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemove(x.id, 0)}
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {toman(x.food.price * x.qty)}
                  </span>
                  <div className="flex items-center gap-2 rounded-xl bg-white p-1 shadow-sm">
                    <button
                      onClick={() => onChange(x.id, x.qty - 1)}
                      className="grid h-7 w-7 place-items-center rounded-lg text-slate-500 transition hover:bg-brand-50 hover:text-brand-700"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="min-w-5 text-center text-sm font-bold">
                      {x.qty.toLocaleString("fa-IR")}
                    </span>
                    <button
                      onClick={() => onChange(x.id, x.qty + 1)}
                      className="grid h-7 w-7 place-items-center rounded-lg text-slate-500 transition hover:bg-brand-50 hover:text-brand-700"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-brand-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">مبلغ کل</span>
              <b className="text-xl text-brand-700">{toman(total)}</b>
            </div>
            <Button
              className="mt-4 flex w-full items-center justify-center gap-2 py-3.5"
              onClick={onCheckout}
            >
              ادامه و پرداخت <ArrowLeft size={17} />
            </Button>
          </div>
        </>
      )}
    </aside>
  );
}
