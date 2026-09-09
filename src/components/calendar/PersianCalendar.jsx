import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  months,
  week,
  calendarMonth,
  todayJalali,
  jalaliKey,
  compareJalali,
} from "../../utils/jalali";
export default function PersianCalendar({
  value,
  onChange,
  holidays = [],
  disabledPast = true,
  disabledDate = () => false,
}) {
  const t = todayJalali();
  const [view, setView] = useState({
    jy: value?.jy || t.jy,
    jm: value?.jm || t.jm,
  });
  const cells = calendarMonth(view.jy, view.jm);
  const prev = () =>
    setView((v) =>
      v.jm === 1 ? { jy: v.jy - 1, jm: 12 } : { ...v, jm: v.jm - 1 },
    );
  const next = () =>
    setView((v) =>
      v.jm === 12 ? { jy: v.jy + 1, jm: 1 } : { ...v, jm: v.jm + 1 },
    );
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={prev} className="rounded-lg p-2 hover:bg-slate-100">
          <ChevronRight size={18} />
        </button>
        <b>
          {months[view.jm - 1]}{" "}
          {view.jy.toLocaleString("fa-IR", { useGrouping: false })}
        </b>
        <button onClick={next} className="rounded-lg p-2 hover:bg-slate-100">
          <ChevronLeft size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
        {week.map((w) => (
          <span key={w} className="py-2 font-bold">
            {w.slice(0, 2)}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const key = jalaliKey(d),
            past = disabledPast && compareJalali(d, t) < 0,
            holiday = holidays.find((h) => h.date === key),
            selected = value && key === jalaliKey(value),
            disabled = past || holiday || disabledDate(d);
          return (
            <button
              key={key}
              disabled={disabled}
              onClick={() => onChange(d)}
              className={`relative rounded-lg py-2 text-sm transition ${selected ? "bg-brand-600 text-white" : holiday ? "bg-red-50 text-red-400" : past ? "text-slate-300" : "hover:bg-brand-50"}`}
            >
              {d.jd.toLocaleString("fa-IR")}
              {holiday && (
                <i className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-400" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex gap-3 text-xs text-slate-500">
        <span>🔴 تعطیل</span>
        <span>سبز: انتخاب‌شده</span>
      </div>
    </div>
  );
}
