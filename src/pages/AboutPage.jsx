export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border bg-white p-7 shadow-sm md:p-12">
      <span className="text-5xl">🍱</span>
      <h1 className="mt-5 text-3xl font-extrabold text-brand-700">
        درباره کیف لقمه
      </h1>
      <p className="mt-5 leading-9 text-slate-600">
        کیف لقمه یک MVP فرانت‌اند برای ساده‌کردن سفارش غذای مدرسه است. والدین
        می‌توانند روز موردنظر را در تقویم شمسی انتخاب کنند، غذای فرزندشان را
        سفارش دهند و وضعیت سفارش را پیگیری کنند.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "پنل مدیریت",
          "منوی اختصاصی روزانه",
          "ذخیره‌سازی لوکال",
        ].map((x) => (
          <div
            className="rounded-2xl bg-brand-50 p-4 text-center font-semibold text-brand-700"
            key={x}
          >
            {x}
          </div>
        ))}
      </div>
      <p className="mt-12 text-center font-bold text-brand-700">
        ساخته شده با ❤️ توسط رضا نجفی
      </p>
    </div>
  );
}
