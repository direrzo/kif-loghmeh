export default function EmptyState({
  icon = "📭",
  title = "موردی پیدا نشد",
  text = "",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-3 font-bold">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}
