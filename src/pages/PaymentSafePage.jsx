import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { toman } from "../utils/format";
import Button from "../components/ui/Button";
import OrderInvoice from "../components/order/OrderInvoice";
import { useToast } from "../hooks/useToast";
import Toast from "../components/ui/Toast";

export default function PaymentSafePage() {
  const { cart, user, setOrders, clearCart } = useApp();
  const nav = useNavigate();
  const { toast, show } = useToast();
  const items = Object.values(cart);
  const total = items.reduce(
    (sum, item) => sum + item.food.price * item.qty,
    0,
  );
  const orderDate = items[0]?.day || "";
  const pay = () => {
    if (!items.length) return nav("/home");
    const order = {
      id: `KL-${Date.now().toString().slice(-6)}`,
      date: orderDate,
      parent: user?.parentName || "والد",
      child: user?.childName || "فرزند",
      school: user?.school || "",
      items,
      total,
      status: "در انتظار آماده‌سازی",
      archived: false,
    };
    setOrders((list) => [order, ...list]);
    clearCart();
    show("پرداخت نمایشی با موفقیت انجام شد");
    setTimeout(() => nav("/orders"), 900);
  };
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-extrabold">پرداخت نمایشی</h1>
      <OrderInvoice
        order={{
          id: "پیش‌نمایش",
          date: orderDate,
          items,
          total,
          status: "در انتظار آماده‌سازی",
        }}
      />
      <div className="mt-5 rounded-2xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          درگاه پرداخت واقعی در نسخه MVP فعال نیست.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <b>قابل پرداخت</b>
          <b className="text-xl text-brand-700">{toman(total)}</b>
        </div>
        <Button className="mt-5 w-full" onClick={pay}>
          تکمیل پرداخت
        </Button>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
