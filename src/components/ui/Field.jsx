export default function Field({ label, error, ...p }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        className={`w-full rounded-xl border bg-white px-3.5 py-3 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${error ? "border-red-400" : "border-slate-200"}`}
        {...p}
      />
      {error && <small className="text-red-500">{error}</small>}
    </label>
  );
}
