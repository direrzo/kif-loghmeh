import Button from "../ui/Button";
import { toman } from "../../utils/format";
export default function FoodCard({ food, onAdd }) {
  return (
    <article className="group flex flex-col rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-50 to-amber-50 text-6xl">
        {food.image ? (
          <img
            src={food.image}
            alt={food.name}
            className="h-full w-full object-cover"
          />
        ) : (
          food.emoji
        )}
      </div>
      <div className="mt-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold">{food.name}</h3>
          <span className="rounded-full bg-brand-50 px-2 py-1 text-xs text-brand-700">
            {food.category}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-500">{food.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <b className="text-brand-700">{toman(food.price)}</b>
        <Button onClick={() => onAdd(food)}>افزودن</Button>
      </div>
    </article>
  );
}
