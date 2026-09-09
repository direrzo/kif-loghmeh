import { useState } from "react";
import { useApp } from "../context/AppContext";
import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import FoodImagePicker from "../components/admin/FoodImagePicker";
import { toman } from "../utils/format";

export default function AdminFoodsPopularPage() {
  const { foods, setFoods, menus, setMenus } = useApp();
  const [editing, setEditing] = useState(null);
  const save = (e) => {
    e.preventDefault();
    const f = editing;
    if (!f.name || !f.price) return;
    const next = { ...f, price: +f.price, popular: Boolean(f.popular) };
    if (foods.some((x) => x.id === f.id))
      setFoods(foods.map((x) => (x.id === f.id ? next : x)));
    else
      setFoods([
        ...foods,
        { ...next, id: "f" + Date.now(), emoji: f.emoji || "🍱", active: true },
      ]);
    setEditing(null);
  };
  const removeFood = (id) => {
    const food = foods.find((x) => x.id === id);
    if (!food || !window.confirm("آیا از حذف این غذا مطمئن هستید؟")) return;
    setFoods(foods.filter((x) => x.id !== id));
    setMenus(
      Object.fromEntries(
        Object.entries(menus).map(([date, menu]) => [
          date,
          {
            ...menu,
            items: (menu.items || []).filter((foodId) => foodId !== id),
            prices: Object.fromEntries(
              Object.entries(menu.prices || {}).filter(
                ([foodId]) => foodId !== id,
              ),
            ),
          },
        ]),
      ),
    );
    if (editing?.id === id) setEditing(null);
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
              popular: false,
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
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 md:col-span-2">
            <input
              type="checkbox"
              checked={Boolean(editing.popular)}
              onChange={(e) =>
                setEditing((prev) => ({ ...prev, popular: e.target.checked }))
              }
              className="h-5 w-5 accent-brand-600"
            />{" "}
            نمایش برچسب «انتخاب محبوب» برای والدین
          </label>
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
              <div className="flex flex-wrap items-center gap-2">
                <b>{f.name}</b>
                {f.popular && (
                  <span className="rounded-full bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-600">
                    محبوب
                  </span>
                )}
              </div>
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
            <Button variant="danger" onClick={() => removeFood(f.id)}>
              حذف
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
