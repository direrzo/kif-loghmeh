import { Plus, Star } from "lucide-react";
import Button from "../ui/Button";
import { toman } from "../../utils/format";
export default function FoodCard({ food, onAdd }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-50 to-orange-50">
        {food.image ? (
          <img
            src={food.image}
            alt={food.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-7xl transition duration-500 group-hover:scale-110">
            {food.emoji}
          </div>
        )}
        {food.popular && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-orange-600 shadow-sm">
            <Star size={12} fill="currentColor" /> انتخاب محبوب
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {food.name}
            </h3>
            <p className="mt-1 text-xs font-semibold text-brand-600">
              {food.category}
            </p>
          </div>
        </div>
        <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
          {food.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <b className="text-brand-700">{toman(food.price)}</b>
          <Button
            onClick={() => onAdd(food)}
            className="flex items-center gap-1.5"
          >
            <Plus size={16} /> افزودن
          </Button>
        </div>
      </div>
    </article>
  );
}
