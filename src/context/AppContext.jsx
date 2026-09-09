import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultFoods } from "../data/foods";
import { seedUser, seedHolidays, seedMenus } from "../data/seed";
import { store } from "../services/storage";
const C = createContext(null);
export function AppProvider({ children }) {
  const [user, setUser] = useState(() => store.get("kl_user", null));
  const [admin, setAdmin] = useState(() => store.get("kl_admin", false));
  const [foods, setFoods] = useState(() => store.get("kl_foods", defaultFoods));
  const [orders, setOrders] = useState(() => store.get("kl_orders", []));
  const [holidays, setHolidays] = useState(() =>
    store.get("kl_holidays", seedHolidays),
  );
  const [menus, setMenus] = useState(() => store.get("kl_menus", seedMenus));
  const [cart, setCart] = useState({});
  useEffect(() => store.set("kl_user", user), [user]);
  useEffect(() => store.set("kl_admin", admin), [admin]);
  useEffect(() => store.set("kl_foods", foods), [foods]);
  useEffect(() => store.set("kl_orders", orders), [orders]);
  useEffect(() => store.set("kl_holidays", holidays), [holidays]);
  useEffect(() => store.set("kl_menus", menus), [menus]);
  const add = (food, day) =>
    setCart((c) => {
      const itemId = `${food.id}__${day}`;
      return {
        ...c,
        [itemId]: { id: itemId, food, day, qty: (c[itemId]?.qty || 0) + 1 },
      };
    });
  const change = (id, qty) =>
    setCart((c) => {
      const n = { ...c };
      if (qty <= 0) delete n[id];
      else if (n[id]) n[id] = { ...n[id], qty };
      return n;
    });
  const value = useMemo(
    () => ({
      user,
      setUser,
      admin,
      setAdmin,
      foods,
      setFoods,
      orders,
      setOrders,
      holidays,
      setHolidays,
      menus,
      setMenus,
      cart,
      add,
      change,
      clearCart: () => setCart({}),
    }),
    [user, admin, foods, orders, holidays, menus, cart],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useApp = () => useContext(C);
