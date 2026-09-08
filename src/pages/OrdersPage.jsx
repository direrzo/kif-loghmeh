import { useApp } from "../context/AppContext";
import Invoice from "../components/order/Invoice";
import EmptyState from "../components/ui/EmptyState";
export default function OrdersPage() {
  const { orders } = useApp();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold">سفارش‌های من</h1>
      {orders.length ? (
        <div className="space-y-4">
          {orders.map((o) => (
            <Invoice key={o.id} order={o} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="هنوز سفارشی ندارید"
          text="اولین سفارش غذای مدرسه را ثبت کنید."
        />
      )}
    </div>
  );
}
