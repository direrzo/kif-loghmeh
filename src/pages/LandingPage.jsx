import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-amber-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-16 text-center md:py-24">
        <span className="grid h-20 w-20 place-items-center rounded-3xl bg-brand-600 text-5xl shadow-xl">
          🍱
        </span>
        <h1 className="mt-7 text-4xl font-extrabold text-brand-700 md:text-6xl">
          غذای خوب، خیال راحت
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-600">
          کیف لقمه، راهی ساده و مطمئن برای سفارش غذای روزانه فرزندتان از مدرسه.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/login">
            <Button>شروع سفارش</Button>
          </Link>
          <Link to="/admin/login">
            <Button variant="secondary">ورود پنل مدیریت</Button>
          </Link>
        </div>
        <p className="mt-5 text-xs text-slate-500">
          ورود آزمایشی ادمین: admin / 1234
        </p>
      </div>
    </div>
  );
}
